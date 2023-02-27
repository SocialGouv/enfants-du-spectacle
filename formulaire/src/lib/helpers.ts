import React from "react";

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
      text: "Cliquez sur le bouton ci-dessous pour télécharger les dossiers de la commission via un lien sécurisé.",
      type: "dl_commission",
    },
    {
      button: "Télécharger",
      bye: "N'hésitez pas à nous contacter pour toute information complémentaire.",
      subject: "Décision d'autorisation Enfants du spectacle",
      text: "Votre dossier a été accepté. Vous trouverez en pièce jointe de ce mail la décision d'autorisation.",
      type: "dl_decision",
    },
    {
      button: "Connexion",
      bye: "Si vous n'êtes pas à l'origine de cette demande de connexion, vous pouvez ignorer ce mail.",
      subject: "Connexion au formulaire enfants du spectacle",
      text: "Connectez-vous en suivant ce lien : ",
      type: "auth",
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
    SCENES_SENSIBLES
  };