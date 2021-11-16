import type { Prisma, SocieteProduction } from "@prisma/client";
import prismaClient from "src/lib/prismaClient";
import type {
  Dossier as DossierDS,
  PersonneMorale,
} from "src/synchronize/demarchesSimplifiees";
import { getValue, groupChampsDossierDS } from "src/synchronize/utils";

function parseConventionCollectiveCode(stringValue: string): string {
  const match = /(\d+)$/.exec(stringValue);
  if (!match) throw Error(`could not parse CCN code from ${stringValue}`);
  return match[0];
}

export function parseSocieteProduction(
  dossierDS: DossierDS
): Prisma.SocieteProductionCreateInput {
  const champsDemandeur = groupChampsDossierDS(dossierDS).demandeur;
  const personneMorale = dossierDS.demandeur as PersonneMorale;
  if (!personneMorale.entreprise) throw Error("missing entreprise");
  return {
    adresse: personneMorale.address.label.replace(/\r\n/g, ", "),
    adresseCodeCommune: personneMorale.address.cityCode,
    adresseCodePostal: personneMorale.address.postalCode,
    conventionCollectiveCode: parseConventionCollectiveCode(
      getValue(champsDemandeur, "convention_collective_applicable")
    ),
    departement: personneMorale.address.cityCode.slice(0, 2),
    formeJuridique: personneMorale.entreprise.formeJuridique ?? "",
    naf: personneMorale.naf,
    nom: personneMorale.entreprise.nom ?? "N/A",
    raisonSociale: personneMorale.entreprise.raisonSociale,
    siren: personneMorale.entreprise.siren,
    siret: personneMorale.siret,
  };
}

export async function upsertSocieteProduction(
  societeProduction: Prisma.SocieteProductionCreateInput
): Promise<SocieteProduction> {
  const { siret, ...dataWithoutSiret } = societeProduction;
  return prismaClient.societeProduction.upsert({
    create: societeProduction,
    update: dataWithoutSiret,
    where: { siret },
  });
}
