import React from "react";
import { Email } from "read-excel-file";

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

const useDebouncedCallback = (func: Function, wait: number) => {
  const timeout = React.useRef();

  return React.useCallback(
    (...args) => {
      const later = () => {
        clearTimeout(timeout.current);
        func(...args);
      };

      clearTimeout(timeout.current);
      timeout.current = setTimeout(later, wait);
  }, [func, wait]);
};

const CHECKS = [
    {
      entity: 'Demandeur',
      mandatory_fields: [ 
          {label : 'Prenom', code: 'prenom'},
          {label : 'Nom', code: 'nom'},
          {label : 'Mail', code: 'email'},
          {label : 'Fonction', code: 'fonction'},
          {label : 'Convention collective applicable', code: 'conventionCollectiveCode'},
      ]
    },
    {
      entity: 'Projet',
      mandatory_fields: [ 
        {label : 'Titre du projet', code: 'nom'},
        {label : 'Catégorie', code: 'categorie'},
        {label : 'Présentation globale du projet', code: 'presentation'},
        {label : 'Date de commencement du projet', code: 'dateDebut'},
        {label : 'Date de fin du projet', code: 'dateFin'},
      ],
      mandatory_files: [
        {label : 'Scénario ou script', code : 'SCENARIO'},
        {label: 'Note précisant les mesures de sécurité', code: 'MESURES_SECURITE'}
      ]
    },
    {
      entity: 'Enfants',
      mandatory_fields: [
        {label : 'Prenom(s)', code: 'prenom'},
        {label : 'Nom', code: 'nom'},
        {label : 'Né(e) le', code: 'dateNaissance'},
        {label : 'Type d\'emploi', code: 'typeEmploi'},
        {label : 'Nombre de jours de travail', code: 'nombreJours'},
        {label : 'Période de travail', code: 'periodeTravail'},
        {label : 'Temps et lieu de travail', code: 'contexteTravail'},
        {label : 'Montant du cachet', code: 'montantCachet'},
        {label : 'Nombre de cachets', code: 'nombreCachets'},
        {label : 'Rémunération totale', code: 'remunerationTotale'},
      ],
      mandatory_files: [
        {label : 'Livret de famille', code : 'LIVRET_FAMILLE'},
        {label: 'Autorisation parentale', code: 'AUTORISATION_PARENTALE'},
        {label: 'Projet de contrat de travail', code: 'CONTRAT'},
        
      ]
    }
]

const SCENES_SENSIBLES = [
  { label: "Bagarres", value: "Bagarres" },
  { label: "Nudité / Actes sexuels", value: "Nudité / Actes sexuels" },
  { label: "Violence psychologique ou physique", value: "Violence psychologique ou physique" },
  { label: "Animaux", value: "Animaux" },
  { label: "Eau", value: "Eau" },
  { label: "Feu", value: "Feu" },
  { label: "Cascades", value: "Cascades" },
  { label: "Hauteur", value: "Hauteur" },
  {
    label: "Machines dangereuses, produits chimiques ou agents biologiques",
    value: "Machines dangereuses, produits chimiques ou agents biologiques",
  },
];

const STATUS_EN_COURS = [
  'BROUILLON',
  'CONSTRUCTION',
  'INSTRUCTION',
  'PRET',
  'AVIS_AJOURNE',
  'AVIS_FAVORABLE',
  'AVIS_FAVORABLE_SOUS_RESERVE',
  'AVIS_DEFAVORABLE'
]

const STATUS_TERMINES = [
  'ACCEPTE',
  'REFUSE'
]

const CATEGORIES = [
  "LONG_METRAGE",
  "COURT_METRAGE",
  "TELEFILM",
  "SERIE",
  "EMISSION_TV",
  "DOCUMENTAIRE_FICTIONNEL",
  "CLIP",
  "THEATRE",
  "DOUBLAGE",
  "MUSIQUE_STUDIO",
  "COMEDIE_MUSICALE",
  "CONCERT",
  "OPERA",
  "BALLET",
  "DANSE",
  "CIRQUE",
  "RADIO",
  "PHOTO",
  "FILM_INSTITUTIONNEL",
  "JEU_VIDEO",
  "VIDEO_EN_LIGNE",
  "AUTRE"
]

const TYPE_EMPLOI = [
  "ROLE_1",
  "ROLE_2",
  "FIGURATION",
  "SILHOUETTE",
  "SILHOUETTE_PARLANTE",
  "DOUBLURE",
  "DOUBLAGE",
  "CHANT",
  "CHORISTE",
  "CIRCASSIEN",
  "MUSICIEN",
  "DANSE",
  "JEU_VIDEO",
  "AUTRE"
]

const WORDING_MAILING = [
    {
      button: "Télécharger",
      bye: "Ce lien sera valide pendant cinq jours après réception de cet email.",
      subject: "Téléchargement commission Enfants du spectacle",
      title: "Bonjour, vous avez été invité à télécharger les dossiers de la commission",
      text: "Cliquez sur le bouton ci-dessous pour télécharger les dossiers de la commission via un lien sécurisé.",
      type: "dl_commission",
    },
    {
      button: "Accéder au dossier",
      bye: "Ce lien sera valide pendant cinq jours après réception de cet email.",
      subject: "Invitation à collaborer sur un dossier",
      title: "Bonjour, vous avez été invité à modifiter le dossier",
      text: "Vous pouvez accéder au dossier en cliquant sur le bouton suivant :",
      type: "share_dossier",
    },
    {
      bye: "N'hésitez pas à nous contacter pour toute information complémentaire.",
      subject: "Décision d'autorisation Enfants du spectacle",
      title: "Bonjour, vous avez été invité à télécharger la décision d'autorisation",
      text: "Votre dossier a été accepté. Vous trouverez en pièce jointe de ce mail la décision d'autorisation.",
      type: "dl_decision",
    },
    {
      button: "Connexion",
      bye: "Si vous n'êtes pas à l'origine de cette demande de connexion, vous pouvez ignorer ce mail.",
      subject: "Connexion au formulaire enfants du spectacle",
      title: "Bonjour,",
      text: "Connectez-vous en suivant ce lien : ",
      type: "auth",
    },
    {
      button: "Accéder au dossier",
      bye: "Si vous n'êtes pas à l'origine de cette demande de connexion, vous pouvez ignorer ce mail.",
      subject: "Transmission de votre dossier aux services d’instructions de la DRIEETS",
      title: "Bonjour,",
      text: "Votre dossier ___DOSSIERID____ a été transmis aux services d’instructions de la DRIEETS. Il est en statut “En construction” et reste modifiable jusqu’à une semaine avant la commission afin que vous puissiez ajouter les pièces justificatives au fil de l’eau. C’est ensuite les services d’instruction de la DRIEETS qui changeront le statut de votre dossier pour le passer “En instruction” et bloquer toute modification avant la commission.",
      type: "depot_dossier",
    },
    {
      button: "Accéder au dossier",
      bye: "Si vous n'êtes pas à l'origine de cette demande de connexion, vous pouvez ignorer ce mail.",
      subject: "Mise à jour de votre dossier auprès des services d’instruction de la DRIEETS",
      title: "Bonjour,",
      text: "Les mises à jour apportées à votre dossier ___DOSSIERID____ ont bien été transmises aux services d’instruction de la DRIEETS. Votre dossier est toujours en statut “En construction” et reste modifiable jusqu’à une semaine avant la commission.”",
      type: "update_dossier",
    },
];


const CONVENTIONS = [
  {
    code: "1261",
    label: "centres sociaux et socioculturels",
    legifranceUrl:
      "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635384",
  },
  {
    code: "1285",
    label: "entreprises artistiques et culturelles",
    legifranceUrl:
      "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635964",
  },
  {
    code: "1518",
    label: "métiers de l'éducation, de la culture, des loisirs et de l'animation",
    legifranceUrl:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635177",
  },
  {
    code: "1734",
    label: "artistes interprètes engagés pour des émissions de TV",
    legifranceUrl:
      "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635286",
  },
  {
    code: "1790",
    label: "parcs de loisirs et d'attractions",
    legifranceUrl:
      "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635453",
  },
  {
    code: "1922",
    label: "radiodiffusion",
    legifranceUrl:
      "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635741",
  },
  {
    code: "2411",
    label: "chaînes thématiques",
    legifranceUrl:
      "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635585",
  },
  {
    code: "2412",
    label: "production des films d'animation",
    legifranceUrl:
      "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635129",
  },
  {
    code: "2642",
    label: "production audiovisuelle",
    legifranceUrl:
      "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000018828041",
  },
  {
    code: "2717",
    label: "entreprises techniques au service de la création et de l'évènement",
    legifranceUrl:
      "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000019906603",
  },
  {
    code: "2770",
    label: "l'édition phonographique",
    legifranceUrl:
      "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000023974024",
  },
  {
    code: "3090",
    label: "entreprises du secteur privé du spectacle vivant",
    legifranceUrl:
      "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000028157262",
  },
  {
    code: "3097",
    label: "production cinématographique",
    legifranceUrl:
      "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000028059838",
  },
  {
    code: "5580",
    label: "Radio France",
    legifranceUrl: null,
  }
];

const SCHEMA_ENFANTS = {
  'Date de création': {
    prop: 'date',
    type: Date,
    required: true
  },
  'Prénom(s)': {
    prop: 'prenom',
    type: String,
    required: true
  },
  'Nom': {
    prop: 'nom',
    type: String,
    required: true
  },
  'Né(e) le': {
    prop: 'dateNaissance',
    type: Date,
  },
  "Type d'emploi": {
    prop: 'typeEmploi',
    type: String
  },
  'Nom du personnage incarné': {
    prop: 'nomPersonnage',
    type: String
  },
  'Nombre de jours de travail': {
    prop: 'nombreJours',
    type: Number
  },
  'Période de travail': {
    prop: 'periodeTravail',
    type: String
  },
  'Temps de travail': {
    prop: 'tempsTravail',
    type: String
  },
  'Lieu de travail': {
    prop: 'lieuTravail',
    type: String
  },
  'Montant du cachet': {
    prop: 'montantCachet',
    type: Number
  },
  'Nombre de cachets': {
    prop: 'nombreCachets',
    type: Number
  },
  'Nombre de lignes (pour les doublages uniquement)': {
    prop: 'nombreLignes',
    type: Number
  },
  'Rémunérations additionnelles': {
    prop: 'remunerationsAdditionnelles',
    type: Number
  },
  "L'enfant doit consulter": {
    prop: "typeConsultation",
    type: String
  },
  'Qualité du représentant légal 1': {
    prop: 'repQuality',
    type: String
  },
  'Nom du représentant légal 1': {
    prop: "nomRepresentant1",
    type: String
  },
  'Prénom du représentant légal 1': {
    prop: "prenomRepresentant1",
    type: String
  },
  'N° de rue': {
    prop: 'roadNumber',
    type: Number
  },
  'Libellé de voie': {
    prop: 'streetName',
    type: String
  },
  'Code postal': {
    prop: 'postalCode',
    type: Number
  },
  'Ville': {
    prop: 'city',
    type: String
  },
  'Email du représentant légal 1': {
    prop: "mailRepresentant1",
    type: Email
  },
  'Téléphone du réprésentant légal 1': {
    prop: "telRepresentant1",
    type: String
  },
  'Qualité du représentant légal 2': {
    prop: 'repQualityTwo',
    type: String
  },
  'Nom du représentant légal 2': {
    prop: "nomRepresentant2",
    type: String
  },
  'Prénom du représentant légal 2': {
    prop: "prenomRepresentant2",
    type: String
  },
  'N° de rue du représentant légal 2': {
    prop: 'roadNumberTwo',
    type: Number
  },
  'Libellé de voie du représentant légal 2': {
    prop: 'streetNameTwo',
    type: String
  },
  'Code postal du représentant légal 2': {
    prop: 'postalCodeTwo',
    type: Number
  },
  'Ville du représentant légal 2': {
    prop: 'cityTwo',
    type: String
  },
  'Email du représentant légal 2': {
    prop: "mailRepresentant2",
    type: Email
  },
  'Téléphone du réprésentant légal 2': {
    prop: "telRepresentant2",
    type: String
  },
  'Etablissement scolaire': {
    prop: 'school',
    type: String
  },
}


export {
    frenchDateText,
    frenchDateHour,
    birthDateToFrenchAge,
    useDebouncedCallback,
    CHECKS,
    STATUS_EN_COURS,
    STATUS_TERMINES,
    TYPE_EMPLOI,
    WORDING_MAILING,
    CATEGORIES,
    CONVENTIONS,
    SCENES_SENSIBLES,
    SCHEMA_ENFANTS
  };