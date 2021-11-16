import prismaClient from "src/lib/prismaClient";

import type { SocieteProduction } from ".prisma/client";

const DATA = [
  {
    adresse: "10 rue du Char, Paris, France",
    adresseCodeCommune: "75111",
    adresseCodePostal: "75011",
    conventionCollectiveCode: "9030Z",
    departement: "75",
    formeJuridique: "SASU simplifiee",
    naf: "2030",
    nom: "Les Magnifiques",
    raisonSociale: "MAGNIFIQUE CORP",
    siren: "390 009 100",
    siret: "390 009 100 2003 230",
  },
  {
    adresse: "20 rue des poulets, Marseille, France",
    adresseCodeCommune: "13102",
    adresseCodePostal: "13002",
    conventionCollectiveCode: "1020B",
    departement: "13",
    formeJuridique: "Association",
    naf: "1022",
    nom: "La scop",
    raisonSociale: "SCOP",
    siren: "100 394 200",
    siret: "100 394 200 1023 942",
  },
];

export async function createSocieteProduction(
  idx = 0
): Promise<SocieteProduction> {
  if (idx > DATA.length - 1) throw Error("not enough data");
  return prismaClient.societeProduction.create({
    data: DATA[idx],
  });
}
