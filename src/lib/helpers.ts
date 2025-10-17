import type {
  Dossier,
  Enfant,
  JustificatifEnfant,
  SocieteProduction,
  TypeConsultationMedecin,
  TypeEmploi,
  User,
} from "@prisma/client";
import { grandeCategorieToCategorieValues } from "src/lib/categories";
import type {
  CommissionData,
  DossierData,
  DossiersFilters,
  SearchResultsType,
} from "src/lib/queries";
import { Remuneration } from "./types";
import prismaClient from "./prismaClient";

function capitalizeWord(str: string): string {
  return str.replace(/^\w/, (c) => c.toUpperCase());
}

function shortUserName(user: User): string {
  if (!user.prenom || !user.nom) return "";
  return `${capitalizeWord(user.prenom)} ${user.nom[0].toUpperCase()}.`;
}

function frenchDateText(date: Date): string {
  const newDate = new Date(date);
  return newDate.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function frenchDateHour(date: Date): string {
  const newDate = new Date(date);
  return newDate.toLocaleDateString("fr-FR", {
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    month: "long",
    year: "numeric",
  });
}

function birthDateToFrenchAge(birthDate: Date | string): string {
  // Convertir la date en objet Date si ce n'est pas déjà le cas
  const parsedDate = birthDate instanceof Date 
    ? birthDate 
    : new Date(birthDate);
  
  const today = new Date();
  let age = today.getFullYear() - parsedDate.getFullYear();
  const m = today.getMonth() - parsedDate.getMonth();
  
  if (m < 0 || (m === 0 && today.getDate() < parsedDate.getDate())) {
    age--;
  }
  
  return `${age} ans`;
}

function uniqueById<Type extends { id: number }>(array: Type[]): Type[] {
  const map: Map<number, Type> = new Map();
  for (const item of array) {
    if (item && item.id !== undefined && item.id !== null) {
      map.set(item.id, item);
    }
  }
  return Array.from(map.values());
}

function searchResultsToSocieteProductions(
  searchResults: SearchResultsType
): SocieteProduction[] {
  return uniqueById(
    searchResults.dossiers
      .map((p) => p.societeProduction)
      .concat(searchResults.enfants.map((e) => e.dossier.societeProduction))
  );
}

type FilterDossierFn = (dossier: Dossier) => boolean;

function filterDossierFn(filters: DossiersFilters): FilterDossierFn {
  return function (dossier: Dossier) {
    // Handle the case where grandeCategorie is needed
    let categorieMatch = true;
    if (filters.grandeCategorie && dossier.categorie) {
      categorieMatch = grandeCategorieToCategorieValues(filters.grandeCategorie).includes(dossier.categorie);
    } else if (filters.grandeCategorie) {
      // If filters.grandeCategorie exists but dossier.categorie is null
      categorieMatch = false;
    }
    
    return (
      (!filters.instructeurId || dossier.instructeurId == filters.instructeurId) &&
      (!filters.societeProductionId ||
        dossier.societeProductionId == filters.societeProductionId) &&
      categorieMatch
    );
  };
}

function filterCommissions(
  commissions: CommissionData[],
  filters: DossiersFilters
): CommissionData[] {
  const filterFn = filterDossierFn(filters);
  return commissions
    .map((commission) => ({
      ...commission,
      dossiers: commission.dossiers.filter(filterFn),
    }))
    .filter((c) => c.dossiers.length > 0)
    .filter((c) => {
      if (filters.departement) {
        return c.departement == filters.departement;
      } else return true;
    });
}

function filterSearchResults(
  searchResults: SearchResultsType,
  filters: DossiersFilters
): SearchResultsType {
  const filterFn = filterDossierFn(filters);
  return {
    dossiers: searchResults.dossiers.filter(filterFn),
    enfants: searchResults.enfants.filter((enfant) => filterFn(enfant.dossier)),
  };
}

function getFilterableSocietesProductions(
  searchResults: SearchResultsType | null,
  commissions: CommissionData[]
): SocieteProduction[] {
  if (searchResults) {
    return searchResultsToSocieteProductions(searchResults);
  } else {
    return uniqueById(
      commissions.flatMap((c) => c.dossiers.map((p) => p.societeProduction))
    );
  }
}

const getRemunerations = async (commission: CommissionData): Promise<Remuneration[]> => {
  try {
    // Get all enfant IDs from the commission dossiers
    const enfantIds = commission.dossiers
      .filter(dossier => STATUS_ODJ.includes(dossier.statut))
      .flatMap(dossier => dossier.enfants.map(enfant => enfant.id));
    
    if (enfantIds.length === 0) {
      return [];
    }
    
    // Fetch remunerations using our API endpoint
    const queryParams = enfantIds.map(id => `enfantIds=${id}`).join('&');
    const response = await fetch(`/api/remunerations?${queryParams}`);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json() as Remuneration[];
    
    // Important: Attach remuneration data to each enfant object in all dossiers
    for (const dossier of commission.dossiers) {
      for (const enfant of dossier.enfants) {
        // Filter remunerations for this specific enfant
        const enfantRemunerations = data.filter(rem => rem.enfantId === enfant.id);
        // Attach the remuneration array to the enfant object
        // @ts-ignore - La propriété remuneration n'est pas dans le type Enfant mais est utilisée dans le code
        enfant.remuneration = enfantRemunerations;
      }
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching remunerations:", error);
    return [];
  }
}

const getRemsByDossier = async (dossier: DossierData): Promise<Remuneration[]> => {
  try {
    // Get all enfant IDs from the dossier
    const enfantIds = dossier.enfants.map(enfant => enfant.id);
    
    if (enfantIds.length === 0) {
      return [];
    }
    
    // Fetch remunerations using our API endpoint
    const queryParams = enfantIds.map(id => `enfantIds=${id}`).join('&');
    const response = await fetch(`/api/remunerations?${queryParams}`);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json() as Remuneration[];
    
    // Important: Attach remuneration data to each enfant object
    for (const enfant of dossier.enfants) {
      // Filter remunerations for this specific enfant
      const enfantRemunerations = data.filter(rem => rem.enfantId === enfant.id);
      // Attach the remuneration array to the enfant object
      // @ts-ignore - La propriété remuneration n'est pas dans le type Enfant mais est utilisée dans le code
      enfant.remuneration = enfantRemunerations;
    }
    
    // MIGRATION FIX: Ensure demandeur and societeProduction data is loaded
    if (dossier.demandeur && dossier.demandeur.societeProductionId && !dossier.demandeur.societeProduction) {
      try {
        // Attempt to load the demandeur's société production data from the dossier's direct societeProduction
        if (dossier.societeProduction && dossier.demandeur.societeProductionId === dossier.societeProductionId) {
          // @ts-ignore - This property will be added dynamically
          dossier.demandeur.societeProduction = dossier.societeProduction;
        }
      } catch (error) {
        console.error("Error trying to link demandeur.societeProduction:", error);
      }
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching remunerations by dossier:", error);
    return [];
  }
}

function getFormatedTypeDossier(type: string): string {
  return (
    {
      Autre: "AUTRE",
      Ballet: "BALLET",
      Cirque: "CIRQUE",
      Clip: "CLIP",
      "Compétition de jeux vidéos": "JEU_VIDEO",
      "Comédie musicale": "COMEDIE_MUSICALE",
      Concert: "CONCERT",
      "Documentaire fictionnel": "DOCUMENTAIRE_FICTIONNEL",
      "Enregistrement doublage": "DOUBLAGE",
      "Enregistrement musique en studio": "MUSIQUE_STUDIO",
      "Film institutionnel": "FILM_INSTITUTIONNEL",
      "Film long métrage": "LONG_METRAGE",
      "Film moyen ou court métrage": "COURT_METRAGE",
      Opéra: "OPERA",
      Photo: "PHOTO",
      "Pièce de théâtre": "THEATRE",
      "Plateformes de vidéos en ligne": "VIDEO_EN_LIGNE",
      "Spectacle de danse": "DANSE",
      Série: "SERIE",
      Téléfilm: "TELEFILM",
      "Émission radio": "RADIO",
      "Émission télé": "EMISSION_TV",
    }[type] ?? "AUTRE"
  );
}

function strNoAccent(a: string) {
  const b = "áàâäãåçéèêëíïîìñóòôöõúùûüýÁÀÂÄÃÅÇÉÈÊËÍÏÎÌÑÓÒÔÖÕÚÙÛÜÝ";
  const c = "aaaaaaceeeeiiiinooooouuuuyAAAAAACEEEEIIIINOOOOOUUUUY";
  let d = "";
  for (let i = 0, j = a.length; i < j; i++) {
    const e = a.substr(i, 1);
    d += b.includes(e) ? c.substr(b.indexOf(e), 1) : e;
  }
  return d;
}

function frenchDepartementName(departementNumber: string): string {
  return (
    {
      "75": "Paris",
      "77": "Seine-et-Marne",
      "78": "Yvelines",
      "91": "Essonne",
      "92": "Hauts-de-Seine",
      "93": "Seine-Saint-Denis",
      "94": "Val-de-Marne",
      "95": "Val-d'Oise",
    }[departementNumber] ?? "Tous"
  );
}

const ROLES_USERS = [
  { label: "Administrateur", value: "ADMIN" },
  { label: "Instructeur", value: "INSTRUCTEUR" },
  { label: "Membre commission", value: "MEMBRE" },
  { label: "Médecin travail", value: "MEDECIN" },
];

const TYPE_CONSULTATION_MEDECIN: {
  label: string;
  value: TypeConsultationMedecin;
  labelCol2: string;
  typeJustif: JustificatifEnfant;
}[] = [
  {
    label: "En physique ou en téléconsultation",
    labelCol2: "Date du rdv ",
    typeJustif: "AVIS_MEDICAL_THALIE",
    value: "PHYSIQUE",
  },
  {
    label: "Sur pièce",
    labelCol2: "Avis médical",
    typeJustif: "AVIS_MEDICAL_THALIE",
    value: "PIECE",
  },
  {
    label: "Bon de prise en charge",
    labelCol2: "Bon de prise en charge",
    typeJustif: "BON_PRISE_EN_CHARGE",
    value: "PRISE_EN_CHARGE",
  },
  {
    label: "Par le médecin traitant",
    labelCol2: "Autorisation de prise en charge",
    typeJustif: "AUTORISATION_PRISE_EN_CHARGE",
    value: "MEDECIN_TRAITANT",
  },
];

const INFOS_REPRESENTANTS: {
  col: string;
  rows: { label: string; value: keyof Enfant }[];
}[] = [
  {
    col: "ENFANT",
    rows: [{ label: "Adresse", value: "adresseEnfant" }],
  },
  {
    col: "REPRÉSENTANT LÉGAL 1",
    rows: [
      { label: "Nom", value: "nomRepresentant1" },
      { label: "Prénom", value: "prenomRepresentant1" },
      { label: "Adresse", value: "adresseRepresentant1" },
      { label: "Email", value: "mailRepresentant1" },
      { label: "Téléphone", value: "telRepresentant1" },
    ],
  },
  {
    col: "REPRÉSENTANT LÉGAL 2",
    rows: [
      { label: "Nom", value: "nomRepresentant2" },
      { label: "Prénom", value: "prenomRepresentant2" },
      { label: "Adresse", value: "adresseRepresentant2" },
      { label: "Email", value: "mailRepresentant2" },
      { label: "Téléphone", value: "telRepresentant2" },
    ],
  },
];

const ALL_DEPARTEMENTS = ["75", "92", "93", "94", "78", "77", "91", "95", ""];

const TYPES_EMPLOI = [
  { label: "Rôle 1er choix", value: "ROLE_1" },
  { label: "Rôle 2nd choix", value: "ROLE_2" },
  { label: "Figurant", value: "FIGURATION" },
  { label: "Silhouette", value: "SILHOUETTE" },
  { label: "Silhouette parlante", value: "SILHOUETTE_PARLANTE" },
  { label: "Doublure", value: "DOUBLURE" },
  { label: "Doublage", value: "DOUBLAGE" },
  { label: "Chanteur", value: "CHANT" },
  { label: "Choriste", value: "CHORISTE" },
  { label: "Circassien", value: "CIRCASSIEN" },
  { label: "Musicien", value: "MUSICIEN" },
  { label: "Danseur", value: "DANSE" },
  { label: "Joueur professionnel de jeux vidéo", value: "JEU_VIDEO" },
  { label: "Autre", value: "AUTRE" },
];

const EMPLOIS_CATEGORIES = [
  { label: "Rôles", value: ["ROLE_1", "ROLE_2"] },
  { label: "Figurants", value: "FIGURATION" },
  { label: "Silhouettes", value: ["SILHOUETTE", "SILHOUETTE_PARLANTE"] },
  { label: "Doublure", value: "DOUBLURE" },
  { label: "Doublage", value: "DOUBLAGE" },
  { label: "Chanteur", value: ["CHANT", "CHORISTE"] },
  { label: "Circassien", value: "CIRCASSIEN" },
  { label: "Musicien", value: "MUSICIEN" },
  { label: "Danseur", value: "DANSE" },
  { label: "Joueur professionnel de jeux vidéo", value: "JEU_VIDEO" },
  { label: "Autre", value: "AUTRE" },
];

const WORDING_MAILING = [
  {
    button: "Télécharger",
    bye: "Ce lien sera valide pendant cinq jours après réception de cet email.<br><br>Des suggestions d'améliorations à nous partager ? Dites-le nous 👉 <a href=\"https://tally.so/r/3NyqWj\" target=\"_blank\" style=\"color: #0070f3; text-decoration: none;\">https://tally.so/r/3NyqWj</a>",
    subject: "Téléchargement commission Enfants du spectacle",
    text: "Cliquez sur le bouton ci-dessous pour télécharger les dossiers de la commission via un lien sécurisé.",
    title: "Bonjour,",
    type: "dl_commission",
  },
  {
    button: "Accéder à la plate-forme",
    bye: "N'hésitez pas à nous contacter pour toute information complémentaire.<br><br>Des suggestions d'améliorations à nous partager ? Dites-le nous 👉 <a href=\"https://tally.so/r/3NyqWj\" target=\"_blank\" style=\"color: #0070f3; text-decoration: none;\">https://tally.so/r/3NyqWj</a>",
    subject: "Décision d'autorisation Enfants du spectacle",
    text: "Votre dossier a été accepté. Vous trouverez la décision d'autorisation en pièce jointe. Vous pouvez également accéder à la plate-forme afin d'y télécharger la décision d'autorisation.",
    title: "Bonjour,",
    type: "auth_access",
  },
  {
    button: "Connexion",
    bye: "N'hésitez pas à nous contacter pour toute information complémentaire.<br><br>Des suggestions d'améliorations à nous partager ? Dites-le nous 👉 <a href=\"https://tally.so/r/3NyqWj\" target=\"_blank\" style=\"color: #0070f3; text-decoration: none;\">https://tally.so/r/3NyqWj</a>",
    subject: "Connexion à l'interface enfants du spectacle",
    text: "Connectez-vous en suivant ce lien : ",
    title: "Bonjour,",
    type: "auth",
  },
  {
    button: "Accéder à la plate-forme",
    bye: "N'hésitez pas à nous contacter pour toute information complémentaire.<br><br>Des suggestions d'améliorations à nous partager ? Dites-le nous 👉 <a href=\"https://tally.so/r/3NyqWj\" target=\"_blank\" style=\"color: #0070f3; text-decoration: none;\">https://tally.so/r/3NyqWj</a>",
    subject: "Votre dossier ___DOSSIERID___ (___DOSSIER_NAME___) est passé en __STATUS__",
    text: "Les services d'instruction de la DRIEETS ont passé votre dossier au statut __STATUS__. __WARNING__",
    title: "Bonjour,",
    type: "status_changed",
  },
  {
    button: "Accéder à la plate-forme",
    bye: "N'hésitez pas à nous contacter pour toute information complémentaire.<br><br>Des suggestions d'améliorations à nous partager ? Dites-le nous 👉 <a href=\"https://tally.so/r/3NyqWj\" target=\"_blank\" style=\"color: #0070f3; text-decoration: none;\">https://tally.so/r/3NyqWj</a>",
    subject: "Pièce justificative refusée - Dossier ___DOSSIERID___ (___DOSSIER_NAME___)",
    text: "La pièce justificative \"___PIECE_NAME___\"___ENFANT_INFO___ de votre dossier \"___DOSSIER_NAME___\" a été refusée par l'instructeur. Veuillez consulter votre dossier pour plus de détails et procéder aux corrections nécessaires.",
    title: "Bonjour,",
    type: "piece_refused",
  },
  {
    button: "Accéder à la plate-forme",
    bye: "N'hésitez pas à nous contacter pour toute information complémentaire.<br><br>Des suggestions d'améliorations à nous partager ? Dites-le nous 👉 <a href=\"https://tally.so/r/3NyqWj\" target=\"_blank\" style=\"color: #0070f3; text-decoration: none;\">https://tally.so/r/3NyqWj</a>",
    subject: "Nouveau ___DOCUMENT_TYPE___ disponible - Dossier ___DOSSIERID___ (___DOSSIER_NAME___)",
    text: "Un médecin a déposé un nouvel ___DOCUMENT_TYPE___ pour l'enfant ___ENFANT_NAME___ de votre dossier \"___DOSSIER_NAME___\". Le document est maintenant disponible dans votre interface.",
    title: "Bonjour,",
    type: "medical_document_uploaded",
  },
  {
    button: "Consulter le dossier",
    bye: "N'hésitez pas à nous contacter pour toute information complémentaire.<br><br>Des suggestions d'améliorations à nous partager ? Dites-le nous 👉 <a href=\"https://tally.so/r/3NyqWj\" target=\"_blank\" style=\"color: #0070f3; text-decoration: none;\">https://tally.so/r/3NyqWj</a>",
    subject: "Nouveaux commentaires - Dossier ___DOSSIER_NAME___",
    text: "___COMMENT_COUNT___ nouveau(x) commentaire(s) ont été ajouté(s) à votre dossier \"___DOSSIER_NAME___\". Connectez-vous pour les consulter.",
    title: "Bonjour,",
    type: "new_comments_notification",
  },
  {
    button: "Accéder au portail",
    bye: "N'hésitez pas à nous contacter pour toute information complémentaire.<br><br>Des suggestions d'améliorations à nous partager ? Dites-le nous 👉 <a href=\"https://tally.so/r/3NyqWj\" target=\"_blank\" style=\"color: #0070f3; text-decoration: none;\">https://tally.so/r/3NyqWj</a>",
    subject: "Décision d'autorisation pour ___ENFANT_NAME___ - Dossier ___DOSSIER_NAME___",
    text: "La décision d'autorisation concernant votre enfant ___ENFANT_NAME___ pour le projet ___DOSSIER_NAME___ est disponible en pièce jointe.",
    title: "Bonjour,",
    type: "parent_notification",
  },
  {
    button: "Consulter le dossier",
    bye: "N'hésitez pas à nous contacter pour toute information complémentaire.<br><br>Des suggestions d'améliorations à nous partager ? Dites-le nous 👉 <a href=\"https://tally.so/r/3NyqWj\" target=\"_blank\" style=\"color: #0070f3; text-decoration: none;\">https://tally.so/r/3NyqWj</a>",
    subject: "Conflit de dates détecté - Enfant ___ENFANT_NAME___",
    text: "L'enfant ___ENFANT_NAME___ (né le ___ENFANT_BIRTH___) de votre dossier \"___DOSSIER_NAME___\" travaille également sur un autre projet avec des dates qui se chevauchent. Veuillez contacter votre instructeur pour obtenir plus d'informations.",
    title: "Bonjour,",
    type: "date_conflict_alert",
  },
  {
    button: "Consulter le dossier",
    bye: "N'hésitez pas à nous contacter pour toute information complémentaire.<br><br>Des suggestions d'améliorations à nous partager ? Dites-le nous 👉 <a href=\"https://tally.so/r/3NyqWj\" target=\"_blank\" style=\"color: #0070f3; text-decoration: none;\">https://tally.so/r/3NyqWj</a>",
    subject: "Partage de dossier - ___DOSSIER_NAME___",
    text: "Le dossier \"___DOSSIER_NAME___\" a été partagé avec vous. Vous pouvez désormais y accéder et le consulter.",
    title: "Bonjour,",
    type: "share_dossier",
  },
];

const JUSTIFS_DOSSIER: { label: string; value: string }[] = [
  { label: "Synopsis", value: "SYNOPSIS" },
  { label: "Scenario ou script", value: "SCENARIO" },
  {
    label: "Note précisant les mesures de sécurité",
    value: "MESURES_SECURITE",
  },
  { label: "Plan de travail", value: "PLAN_TRAVAIL" },
  {
    label: "Eléments d'information complémentaires ",
    value: "INFOS_COMPLEMENTAIRES",
  },
];

const JUSTIFS_ENFANT: { label: string; value: string }[] = [
  { label: "Livret de famille", value: "LIVRET_FAMILLE" },
  { label: "Autorisation parentale", value: "AUTORISATION_PARENTALE" },
  {
    label: "Situations particulières relatives à l'autorité parentale",
    value: "SITUATION_PARTICULIERE",
  },
  { label: "Projet de contrat de travail", value: "CONTRAT" },
  {
    label: "Certificat de scolarité ou avis pédagogique",
    value: "CERTIFICAT_SCOLARITE",
  },
  { label: "Avis médical d'aptitude", value: "AVIS_MEDICAL" },
  {
    label: "Déclaration sur l’honneur de l’enfant âgé de plus de 13 ans",
    value: "DECLARATION_HONNEUR",
  },
];

const STATUS_ODJ = [
  "PRET",
  "AVIS_AJOURNE",
  "AVIS_FAVORABLE",
  "AVIS_FAVORABLE_SOUS_RESERVE",
  "AVIS_DEFAVORABLE",
  "ACCEPTE",
  "REFUSE",
];

const BINDING_DS_STATUS = [
  { ds: "en_construction", eds: "CONSTRUCTION" },
  { ds: "en_instruction", eds: "INSTRUCTION" },
  { ds: "accepte", eds: "ACCEPTE" },
  { ds: "avis_ajourne", eds: "AVIS_AJOURNE" },
  { ds: "avis_favorable", eds: "AVIS_FAVORABLE" },
  { ds: "avis_favorable_sous_reserve", eds: "AVIS_FAVORABLE_SOUS_RESERVE" },
  { ds: "avis_defavorable", eds: "AVIS_DEFAVORABLE" },
  { ds: "refuse", eds: "REFUSE" },
];

const REMUNERATIONS = [
  {
    "Rémunérations garanties": [
      { label: "Cachet de tournage", value: "CACHET_TOURNAGE" },
      { label: "Cachet de doublage", value: "CACHET_DOUBLAGE" },
      { label: "Cachet de représentation", value: "CACHET_REPRESENTATION" },
      { label: "Cachet de répétition", value: "CACHET_REPETITION" },
      { label: "Cachet de horaire", value: "CACHET_HORAIRE" },
      { label: "Autre", value: "AUTRE_GARANTIE" },
    ],
  },
  {
    "Rémunérations additionnelles": [
      { label: "Cachet de sécurité", value: "CACHET_SECURITE" },
      { label: "Cachet de post-synchro", value: "CACHET_POST_SYNCHRO" },
      { label: "Cachet de captation", value: "CACHET_CAPTATION" },
      { label: "Cachet spectacle vivant", value: "CACHET_SPECTACLE_VIVANT" },
      { label: "Cachet RETAKE", value: "CACHET_RETAKE" },
      { label: "Autre", value: "AUTRE_ADDITIONNELLE" },
    ],
  },
];

function typeEmploiLabel(typeEmploi: TypeEmploi): string {
  const found = TYPES_EMPLOI.find((t) => t.value == typeEmploi);
  if (!found) throw Error(`invalid type emploi ${typeEmploi} `);
  return found.label;
}

function typeEmploiValue(typeEmploi: string): string {
  const found = TYPES_EMPLOI.find((t) => t.label == typeEmploi);
  if (!found) throw Error(`invalid type emploi ${typeEmploi} `);
  return found.value as TypeEmploi;
}

function stringToNumberOrNull(str: string | null | undefined): number | null {
  return str ? Number(str) : null;
}

function compact<Type>(obj: Record<string, Type>): Record<string, Type> {
  return Object.fromEntries(
    Object.entries(obj).filter(
      (pair) => pair[1] !== null && pair[1] !== undefined && pair[1] !== ""
    )
  );
}
async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Valide si un email respecte un format correct
 */
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Récupère les emails valides des parents d'un enfant
 */
function getParentEmailsForEnfant(enfant: any): string[] {
  const emails: string[] = [];
  
  if (enfant.mailRepresentant1 && validateEmail(enfant.mailRepresentant1)) {
    emails.push(enfant.mailRepresentant1);
  }
  
  if (enfant.mailRepresentant2 && validateEmail(enfant.mailRepresentant2)) {
    emails.push(enfant.mailRepresentant2);
  }
  
  // Retourner les emails uniques pour éviter les doublons
  return Array.from(new Set(emails));
}

export {
  ALL_DEPARTEMENTS,
  BINDING_DS_STATUS,
  birthDateToFrenchAge,
  compact,
  delay,
  EMPLOIS_CATEGORIES,
  filterCommissions,
  filterSearchResults,
  frenchDateHour,
  frenchDateText,
  frenchDepartementName,
  getFilterableSocietesProductions,
  getFormatedTypeDossier,
  getParentEmailsForEnfant,
  getRemunerations,
  getRemsByDossier,
  INFOS_REPRESENTANTS,
  JUSTIFS_DOSSIER,
  JUSTIFS_ENFANT,
  REMUNERATIONS,
  ROLES_USERS,
  searchResultsToSocieteProductions,
  shortUserName,
  STATUS_ODJ,
  stringToNumberOrNull,
  strNoAccent,
  TYPE_CONSULTATION_MEDECIN,
  typeEmploiLabel,
  typeEmploiValue,
  TYPES_EMPLOI,
  uniqueById,
  validateEmail,
  WORDING_MAILING,
};
