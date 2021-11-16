import type { JustificatifDossier, JustificatifEnfant } from "@prisma/client";
import type {
  Champ,
  PieceJustificativeChamp,
} from "src/synchronize/demarchesSimplifiees";

const JUSTIFICATIFS_DOSSIER: Record<string, JustificatifDossier> = {
  elements_d_information_complementaires: "INFOS_COMPLEMENTAIRES",
  note_precisant_les_mesures_de_securite: "MESURES_SECURITE",
  plan_de_travail: "PLAN_TRAVAIL",
  scenario: "SCENARIO",
  synopsis: "SYNOPSIS",
};

const JUSTIFICATIFS_ENFANT: Record<string, JustificatifEnfant> = {
  autorisation_parentale: "AUTORISATION_PARENTALE",
  avis_medical_d_aptitude: "AVIS_MEDICAL",
  certificat_de_scolarite_ou_et_avis_pedagogique: "CERTIFICAT_SCOLARITE",
  livret_de_famille: "LIVRET_FAMILLE",
  projet_de_contrat_de_travail: "CONTRAT",
  situations_particulieres_relatives_a_l_autorite_parentale:
    "SITUATION_PARTICULIERE",
};

function getJustificatifsDossier<Type extends Champ>(
  champs: Record<string, Type | undefined>
): JustificatifDossier[] {
  return Object.entries(JUSTIFICATIFS_DOSSIER)
    .filter(([key]) => isJustificatifPresent(champs, key))
    .map(([_, value]) => value);
}

function getJustificatifsEnfant<Type extends Champ>(
  champs: Record<string, Type>
): JustificatifEnfant[] {
  return Object.entries(JUSTIFICATIFS_ENFANT)
    .filter(([key]) => isJustificatifPresent(champs, key))
    .map(([_, value]) => value);
}

function isJustificatifPresent<Type extends Champ>(
  champs: Record<string, Type | undefined>,
  name: string
): boolean {
  if (!champs[name]) throw Error(`missing champ ${name}`);
  const champ = champs[name] as PieceJustificativeChamp;
  // if (champ.__typename !== "PieceJustificativeChamp")
  //   throw Error(`champ ${name} has wrong type`);
  return champ.file !== null;
}

export { getJustificatifsDossier, getJustificatifsEnfant };
