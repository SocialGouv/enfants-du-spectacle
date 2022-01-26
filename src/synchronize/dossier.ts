import type {
  Demandeur,
  Dossier,
  Prisma,
  SocieteProduction,
  StatutDossier,
} from "@prisma/client";
import prismaClient from "src/lib/prismaClient";
import { getUpcomingCommission } from "src/lib/queries";
import { parseCategorie } from "src/synchronize/categorie";
import { getJustificatifsDossier } from "src/synchronize/justificatifs";
import {
  getValue,
  groupChampsDossierDS,
  parseDate,
} from "src/synchronize/utils";

import type {
  Dossier as DossierDS,
  DossierState,
  MultipleDropDownListChamp,
} from "./demarchesSimplifiees";

function parseStatut(statutDS: DossierState): StatutDossier {
  return {
    accepte: "ACCEPTE",
    en_construction: "CONSTRUCTION",
    en_instruction: "INSTRUCTION",
    refuse: "REFUSE",
    sans_suite: "REFUSE",
  }[statutDS] as StatutDossier;
}

type DossierParsed = Omit<
  Prisma.DossierUncheckedCreateInput,
  "commissionId" | "demandeurId" | "societeProductionId"
>;

export function parseDossier(dossierDS: DossierDS): DossierParsed {
  const champs = groupChampsDossierDS(dossierDS).dossier;
  return {
    categorie: parseCategorie(getValue(champs, "categorie")),
    dateDebut: parseDate(getValue(champs, "date_de_commencement_du_projet")),
    dateFin: parseDate(getValue(champs, "date_de_fin_du_projet")),
    justificatifs: getJustificatifsDossier(champs),
    nom: getValue(champs, "titre_du_projet"),
    numeroDS: dossierDS.number,
    presentation: getValue(champs, "presentation_globale_du_projet"),
    scenesSensibles: (
      champs.projet_contenant_certains_types_de_scenes as MultipleDropDownListChamp
    ).values,
    statut: parseStatut(dossierDS.state),
  };
}

export async function upsertDossier(
  parsed: DossierParsed,
  {
    societeProduction,
    demandeur,
    enfants,
  }: {
    societeProduction: SocieteProduction;
    demandeur: Demandeur;
    enfants: Prisma.EnfantCreateWithoutDossierInput[];
  }
): Promise<Dossier> {
  const data = {
    ...parsed,
    commissionId: (await getUpcomingCommission()).id,
    demandeurId: demandeur.id,
    societeProductionId: societeProduction.id,
  };
  const { numeroDS, ...dataWithoutNumero } = data;
  const existing = await prismaClient.dossier.findUnique({
    where: { numeroDS },
  });
  if (existing) {
    await prismaClient.enfant.deleteMany({ where: { dossierId: existing.id } });
    await prismaClient.enfant.createMany({
      data: enfants.map((e) => ({ ...e, dossierId: existing.id })),
    });
    const dossier = await prismaClient.dossier.update({
      data: dataWithoutNumero,
      where: { id: existing.id },
    });
    return dossier;
  } else {
    return prismaClient.dossier.create({
      data: { ...data, enfants: { create: enfants } },
    });
  }
}
