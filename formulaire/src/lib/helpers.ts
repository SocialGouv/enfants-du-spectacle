
function frenchDateText(date: Date): string {
  const newDate = new Date(date);
  return newDate.toLocaleDateString("fr-FR", {
    day: "numeric",
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
      subject: "Connexion à enfants du spectacle",
      text: "Connectez-vous en suivant ce lien : ",
      type: "auth",
    },
  ];


export {
    frenchDateText,
    birthDateToFrenchAge,
    TYPE_EMPLOI,
    WORDING_MAILING,
    CATEGORIES
  };