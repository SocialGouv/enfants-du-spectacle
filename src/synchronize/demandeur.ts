import type { Demandeur, Prisma, SocieteProduction } from "@prisma/client";
import prismaClient from "src/lib/prismaClient";
import type { Dossier as DossierDS } from "src/synchronize/demarchesSimplifiees";
import { getValue, groupChampsDossierDS } from "src/synchronize/utils";

export function parseDemandeur(
  dossierDS: DossierDS
): Prisma.DemandeurCreateWithoutSocieteProductionInput {
  const champs = groupChampsDossierDS(dossierDS).demandeur;
  const v = (key: string, required = true) => getValue(champs, key, required);
  return {
    email: v("mail"),
    fonction: v("fonctions"),
    nom: v("nom"),
    phone: v("telephone"),
    prenom: v("prenom"),
  };
}

export async function upsertDemandeur(
  demandeur: Prisma.DemandeurCreateWithoutSocieteProductionInput,
  societeProduction: SocieteProduction
): Promise<Demandeur> {
  const data = { ...demandeur, societeProductionId: societeProduction.id };
  const { email, ...dataWithoutEmail } = data;
  return prismaClient.demandeur.upsert({
    create: data,
    update: dataWithoutEmail,
    where: { email },
  });
}
