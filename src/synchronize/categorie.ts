import type { CategorieDossier } from "@prisma/client";
import { transliterate } from "src/synchronize/utils";

const MAP: Record<string, CategorieDossier> = {
  autre: "AUTRE",
  ballet: "BALLET",
  cirque: "CIRQUE",
  clip: "CLIP",
  comedie_musicale: "COMEDIE_MUSICALE",
  competition_de_jeux_vidéo: "JEU_VIDEO",
  concert: "CONCERT",
  emission_radio: "RADIO",
  emission_tv: "EMISSION_TV",
  enregistrement_doublage: "DOUBLAGE",
  enregistrement_musique_en_studio: "MUSIQUE_STUDIO",
  film_institutionnel: "FILM_INSTITUTIONNEL",
  film_long_metrage: "LONG_METRAGE",
  film_moyen_ou_court_metrage: "COURT_METRAGE",
  opera: "OPERA",
  photo: "PHOTO",
  piece_de_theatre: "THEATRE",
  plateforme_de_vidéos_en_ligne: "VIDEO_EN_LIGNE",
  serie: "SERIE",
  spectacle_de_danse: "DANSE",
  telefilm: "TELEFILM",
};

function parseCategorie(rawCategorie: string): CategorieDossier {
  return MAP[transliterate(rawCategorie)];
}

export { parseCategorie };
