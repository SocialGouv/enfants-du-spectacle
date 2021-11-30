import type { CategorieDossier } from "@prisma/client";

interface Categorie {
  label: string;
  value: CategorieDossier;
}
type GrandeCategorieValue =
  | "CINEMA"
  | "DIVERS"
  | "ENREGISTREMENT"
  | "NOUVELLES_TECHNOLOGIES"
  | "PUBLICITE"
  | "RADIO"
  | "SPECTACLE"
  | "TELEVISION"
  | "THEATRE";
interface GrandeCategorie {
  label: string;
  className: string;
  value: GrandeCategorieValue;
  categories: Categorie[];
}

const grandesCategories: GrandeCategorie[] = [
  {
    categories: [
      { label: "Tournage film long-métrage", value: "LONG_METRAGE" },
      { label: "Tournage film moyen ou court-métrage", value: "COURT_METRAGE" },
    ],
    className: "cinema",
    label: "Cinéma",
    value: "CINEMA",
  },
  {
    categories: [
      { label: "Tournage téléfilm", value: "TELEFILM" },
      { label: "Tournage série", value: "SERIE" },
      { label: "Émission TV", value: "EMISSION_TV" },
      { label: "Clip", value: "CLIP" },
    ],
    className: "television",
    label: "Télévision",
    value: "TELEVISION",
  },
  {
    categories: [{ label: "Pièce de théâtre", value: "THEATRE" }],
    className: "theatre",
    label: "Théâtre",
    value: "THEATRE",
  },
  {
    categories: [
      { label: "Enregistrement doublage", value: "DOUBLAGE" },
      { label: "Enregistrement musique en studio", value: "MUSIQUE_STUDIO" },
    ],
    className: "enregistrement",
    label: "Enregistrement",
    value: "ENREGISTREMENT",
  },
  {
    categories: [
      { label: "Comédie musicale", value: "COMEDIE_MUSICALE" },
      { label: "Concert", value: "CONCERT" },
      { label: "Opéra", value: "OPERA" },
      { label: "Ballet", value: "BALLET" },
      { label: "Spectacle de danse", value: "DANSE" },
      { label: "Cirque", value: "CIRQUE" },
    ],
    className: "spectacle",
    label: "Spectacle",
    value: "SPECTACLE",
  },
  {
    categories: [{ label: "Émission radio", value: "RADIO" }],
    className: "radio",
    label: "Radio",
    value: "RADIO",
  },
  {
    categories: [
      { label: "Photo", value: "PHOTO" },
      { label: "Film institutionnel", value: "FILM_INSTITUTIONNEL" },
    ],
    className: "publicite",
    label: "Publicité",
    value: "PUBLICITE",
  },
  {
    categories: [
      { label: "Compétition de jeux vidéos", value: "JEU_VIDEO" },
      { label: "Plateforme de vidéos en ligne", value: "VIDEO_EN_LIGNE" },
    ],
    className: "nouvellesTechnologies",
    label: "Nouvelles technologies",
    value: "NOUVELLES_TECHNOLOGIES",
  },
  {
    categories: [{ label: "Autre", value: "AUTRE" }],
    className: "divers",
    label: "Divers",
    value: "DIVERS",
  },
];

const grandesCategoriesOptions = grandesCategories.map((c) => ({
  label: c.label,
  value: c.value,
}));

function categorieToLabel(categorie: CategorieDossier): string | undefined {
  return Object.values(grandesCategories)
    .flatMap((gc) => gc.categories)
    .find((c) => c.value == categorie)?.label;
}

function categorieToGrandeCategorieLabel(
  categorie: CategorieDossier
): string | undefined {
  return grandesCategories.find((gc) =>
    gc.categories.find((c) => c.value == categorie)
  )?.label;
}

function categorieToGrandeCategorieClassName(
  categorie: CategorieDossier
): string | undefined {
  return grandesCategories.find((gc) =>
    gc.categories.find((c) => c.value == categorie)
  )?.className;
}

function grandeCategorieToCategorieValues(
  grandeCategorieValue: GrandeCategorieValue
): CategorieDossier[] {
  const grandeCategorie = grandesCategories.find(
    (gc) => gc.value == grandeCategorieValue
  );
  if (!grandeCategorie)
    throw Error(`grande categorie '${grandeCategorieValue}' not found`);
  return grandeCategorie.categories.map((c) => c.value);
}

export {
  categorieToGrandeCategorieClassName,
  categorieToGrandeCategorieLabel,
  categorieToLabel,
  grandeCategorieToCategorieValues,
  grandesCategoriesOptions,
};

export type { GrandeCategorieValue };
