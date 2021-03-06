import type {
  Dossier,
  SocieteProduction,
  TypeEmploi,
  User,
} from "@prisma/client";
import { grandeCategorieToCategorieValues } from "src/lib/categories";
import type {
  CommissionData,
  DossiersFilters,
  SearchResultsType,
} from "src/lib/queries";

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

function birthDateToFrenchAge(birthDate: Date): string {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return `${age} ans`;
}

function uniqueById<Type extends { id: number }>(array: Type[]): Type[] {
  const map: Map<number, Type> = new Map();
  for (const item of array) {
    map.set(item.id, item);
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
    return (
      (!filters.userId || dossier.userId == filters.userId) &&
      (!filters.societeProductionId ||
        dossier.societeProductionId == filters.societeProductionId) &&
      (!filters.grandeCategorie ||
        grandeCategorieToCategorieValues(filters.grandeCategorie).includes(
          dossier.categorie
        ))
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

function getFormatedTypeDossier(type: string): string {
  return (
    {
      Autre: "AUTRE",
      Ballet: "BALLET",
      Cirque: "CIRQUE",
      Clip: "CLIP",
      "Comp??tition de jeux vid??os": "JEU_VIDEO",
      "Com??die musicale": "COMEDIE_MUSICALE",
      Concert: "CONCERT",
      "Enregistrement doublage": "DOUBLAGE",
      "Enregistrement musique en studio": "MUSIQUE_STUDIO",
      "Film institutionnel": "FILM_INSTITUTIONNEL",
      "Film long m??trage": "LONG_METRAGE",
      "Film moyen ou court m??trage": "COURT_METRAGE",
      Op??ra: "OPERA",
      Photo: "PHOTO",
      "Pi??ce de th????tre": "THEATRE",
      "Plateformes de vid??os en ligne": "VIDEO_EN_LIGNE",
      "Spectacle de danse": "DANSE",
      S??rie: "SERIE",
      T??l??film: "TELEFILM",
      "??mission radio": "RADIO",
      "??mission t??l??": "EMISSION_TV",
    }[type] ?? "AUTRE"
  );
}

function strNoAccent(a: string) {
  const b = "????????????????????????????????????????????????????????????????????????????????????????????????????????";
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
];

const ALL_DEPARTEMENTS = ["75", "92", "93", "94", "78", "77", "91", "95", ""];

const TYPES_EMPLOI = [
  { label: "R??le 1er choix", value: "ROLE_1" },
  { label: "R??le 2nd choix", value: "ROLE_2" },
  { label: "Figurant", value: "FIGURATION" },
  { label: "Silhouette", value: "SILHOUETTE" },
  { label: "Silhouette parlante", value: "SILHOUETTE_PARLANTE" },
  { label: "Doublure", value: "DOUBLURE" },
  { label: "Doublage", value: "DOUBLAGE" },
  { label: "Chanteur", value: "CHANT" },
  { label: "Danseur", value: "DANSE" },
  { label: "Joueur professionnel de jeux vid??o", value: "JEU_VIDEO" },
  { label: "Autre", value: "AUTRE" },
];

const WORDING_MAILING = [
  {
    button: "T??l??charger",
    bye: "Ce lien sera valide pendant cinq jours apr??s r??ception de cet email.",
    subject: "T??l??chargement commission Enfants du spectacle",
    text: "Cliquez sur le bouton ci-dessous pour t??l??charger les dossiers de la commission via un lien s??curis??.",
    type: "dl_commission",
  },
  {
    button: "T??l??charger",
    bye: "Ce lien sera valide pendant cinq jours apr??s r??ception de cet email.",
    subject: "D??cision d'autorisation Enfants du spectacle",
    text: "Votre dossier a ??t?? accept??. Cliquez sur le bouton ci-dessous pour t??l??charger la d??cision d'autorisation via un lien s??curis??.",
    type: "dl_decision",
  },
  {
    button: "Connexion",
    bye: "Si vous n'??tes pas ?? l'origine de cette demande de connexion, vous pouvez ignorer ce mail.",
    subject: "Connexion ?? enfants du spectacle",
    text: "Connectez-vous en suivant ce lien : ",
    type: "auth",
  },
];

const JUSTIFS_DOSSIER: { label: string; value: string }[] = [
  { label: "Synopsis", value: "SYNOPSIS" },
  { label: "Scenario ou script", value: "SCENARIO" },
  {
    label: "Note pr??cisant les mesures de s??curit??",
    value: "MESURES_SECURITE",
  },
  { label: "Plan de travail", value: "PLAN_TRAVAIL" },
  {
    label: "El??ments d'information compl??mentaires ",
    value: "INFOS_COMPLEMENTAIRES",
  },
];

const JUSTIFS_ENFANT: { label: string; value: string }[] = [
  { label: "Livret de famille", value: "LIVRET_FAMILLE" },
  { label: "Autorisation parentale", value: "AUTORISATION_PARENTALE" },
  {
    label: "Situations particuli??res relatives ?? l'autorit?? parentale",
    value: "SITUATION_PARTICULIERE",
  },
  { label: "Projet de contrat de travail", value: "CONTRAT" },
  {
    label: "Certificat de scolarit?? ou avis p??dagogique",
    value: "CERTIFICAT_SCOLARITE",
  },
  { label: "Avis m??dical d'aptitude", value: "AVIS_MEDICAL" },
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

export {
  ALL_DEPARTEMENTS,
  BINDING_DS_STATUS,
  birthDateToFrenchAge,
  compact,
  delay,
  filterCommissions,
  filterSearchResults,
  frenchDateHour,
  frenchDateText,
  frenchDepartementName,
  getFilterableSocietesProductions,
  getFormatedTypeDossier,
  JUSTIFS_DOSSIER,
  JUSTIFS_ENFANT,
  ROLES_USERS,
  searchResultsToSocieteProductions,
  shortUserName,
  STATUS_ODJ,
  stringToNumberOrNull,
  strNoAccent,
  typeEmploiLabel,
  typeEmploiValue,
  TYPES_EMPLOI,
  uniqueById,
  WORDING_MAILING,
};
