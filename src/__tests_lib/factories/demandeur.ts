import prismaClient from "src/lib/prismaClient";

import type { Demandeur, SocieteProduction } from ".prisma/client";

const DATA = [
  {
    email: "jean@gaumont.fr",
    fonction: "Responsable prod",
    nom: "Maputo",
    phone: "06 12 34 56 78",
    prenom: "Jean",
  },
  {
    email: "philou@canalmoins.fr",
    fonction: "chef op",
    nom: "spector",
    phone: "06 78 65 43 21",
    prenom: "Phil",
  },
];

export async function createDemandeur(
  { societeProduction }: { societeProduction: SocieteProduction },
  idx = 0
): Promise<Demandeur> {
  if (idx > DATA.length - 1) throw Error("not enough data");
  return prismaClient.demandeur.create({
    data: { ...DATA[idx], societeProductionId: societeProduction.id },
  });
}
