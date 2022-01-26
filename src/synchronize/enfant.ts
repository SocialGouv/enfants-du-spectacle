import type { Prisma, TypeEmploi } from "@prisma/client";
import type {
  Champ,
  Dossier as DossierDS,
  RepetitionChamp,
} from "src/synchronize/demarchesSimplifiees";
import { getJustificatifsEnfant } from "src/synchronize/justificatifs";
import {
  champsByLabel,
  getValue,
  groupChamps,
  groupChampsDossierDS,
  parseDate,
  transliterate,
} from "src/synchronize/utils";

function parseEnfants(
  dossierDS: DossierDS
): Prisma.EnfantCreateWithoutDossierInput[] {
  const champsEnfantsTopLevel = groupChampsDossierDS(dossierDS).enfants;
  const champsNested = (champsEnfantsTopLevel.enfant as RepetitionChamp).champs;
  return groupChamps(champsNested, ["prenom_s"])
    .map(champsByLabel)
    .map(parseEnfant);
}

const TYPE_EMPLOIS_MAP: Record<string, TypeEmploi> = {
  autre: "AUTRE",
  chanteur: "CHANT",
  danseur: "DANSE",
  doublage: "DOUBLAGE",
  doublure: "DOUBLURE",
  figurant: "FIGURATION",
  joueur_professionnel_de_jeux_video: "JEU_VIDEO",
  role_1er_choix: "ROLE_1",
  role_2nd_choix: "ROLE_2",
  silhouette: "SILHOUETTE",
  silhouette_parlante: "SILHOUETTE_PARLANTE",
};

function parseTypeEmploi(str: string): TypeEmploi {
  const key = transliterate(str);
  if (!(key in TYPE_EMPLOIS_MAP))
    throw Error(`unrecognized type emploi: ${str} (${key})`);
  return TYPE_EMPLOIS_MAP[key];
}

function parseEnfant<Type extends Champ>(
  champs: Record<string, Type>
): Prisma.EnfantCreateWithoutDossierInput {
  const v = (key: string, required = true) => getValue(champs, key, required);
  return {
    contexteTravail: v("temps_et_lieu_de_travail"),
    dateNaissance: parseDate(v("ne_e__le")),
    justificatifs: getJustificatifsEnfant(champs),
    montantCachet: Number(v("montant_du_cachet")),
    nom: v("nom"),
    nomPersonnage: v("nom_du_personnage_incarne_par_l_enfant", false),
    nombreCachets: Number(v("nombre_de_cachets")),
    nombreJours: Number(v("nombre_de_jours_de_travail")),
    periodeTravail: v("periode_de_travail"),
    prenom: v("prenom_s"),
    remunerationTotale: Number(v("remuneration_totale")),
    // nombreLignes: Number(v("nombre_de_cachets")),
    remunerationsAdditionnelles: v("remunerations_additionnelles", false),
    typeEmploi: parseTypeEmploi(v("type_d_emploi")),
  };
}

export { parseEnfants };
