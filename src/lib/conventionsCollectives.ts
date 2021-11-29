const CONVENTIONS = Object.freeze({
  "1261": {
    label: "centres sociaux et socioculturels",
    legifranceUrl:
      "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635384",
  },
  "1285": {
    label: "entreprises artistiques et culturelles",
    legifranceUrl:
      "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635964",
  },
  "1734": {
    label: "artistes interprètes engagés pour des émissions de TV",
    legifranceUrl:
      "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635286",
  },
  "1790": {
    label: "parcs de loisirs et d'attractions",
    legifranceUrl:
      "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635453",
  },
  "1922": {
    label: "radiodiffusion",
    legifranceUrl:
      "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635741",
  },
  "2411": {
    label: "chaînes thématiques",
    legifranceUrl:
      "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635585",
  },
  "2412": {
    label: "production des films d'animation",
    legifranceUrl:
      "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635129",
  },
  "2642": {
    label: "production audiovisuelle",
    legifranceUrl:
      "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000018828041",
  },
  "2717": {
    label: "entreprises techniques au service de la création et de l'évènement",
    legifranceUrl:
      "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000019906603",
  },
  "2770": {
    label: "l'édition phonographique",
    legifranceUrl:
      "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000023974024",
  },
  "3090": {
    label: "entreprises du secteur privé du spectacle vivant",
    legifranceUrl:
      "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000028157262",
  },
  "3097": {
    label: "production cinématographique",
    legifranceUrl:
      "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000028059838",
  },
  "5580": {
    label: "Radio France",
    legifranceUrl: null,
  },
});

type CODE = keyof typeof CONVENTIONS;

function getConventionLabel(code: string): string {
  if (code in CONVENTIONS) return CONVENTIONS[code as CODE].label;
  else return "Autre";
}

function getConventionLegifranceUrl(code: string): string | null {
  if (code in CONVENTIONS) return CONVENTIONS[code as CODE].legifranceUrl;
  else return null;
}

export { getConventionLabel, getConventionLegifranceUrl };
