import type { NextApiHandler, NextApiRequest } from "next";
import { Dossier, PrismaClient, StatutDossier } from "@prisma/client";
import { getSession } from "next-auth/react";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).end();
    return;
  }

  if (req.method == "POST") {
    await create(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

function getId(req: NextApiRequest): number {
  return Number(req.query.id as string);
}

const create: NextApiHandler = async (req, res) => {
  const prisma = new PrismaClient();
  const dossier: Dossier = JSON.parse(req.body);
  const session = await getSession({ req });

  const data = {
    userId: session?.dbUser.id,
    dateDerniereModification: new Date(),
    demandeurId: dossier.demandeurId,
    nom: dossier.nom ? "Copie de " + dossier.nom : "",
    statut: "BROUILLON" as StatutDossier,
    categorie: dossier.categorie ? dossier.categorie : null,
    justificatifs: dossier.justificatifs ? dossier.justificatifs : [],
    scenesSensibles: dossier.scenesSensibles ? dossier.scenesSensibles : "",
    presentation: dossier.presentation ? dossier.presentation : "",
    dateDebut: dossier.dateDebut ? dossier.dateDebut : null,
    dateFin: dossier.dateFin ? dossier.dateFin : null,
    number: dossier.number ? dossier.number : null,
    cdc: dossier.cdc ? dossier.cdc : null,
    dateDepot: dossier.dateDepot ? dossier.dateDepot : null,
    complementaire: dossier.complementaire ? dossier.complementaire : "",
    scenario: dossier.scenario ? dossier.scenario : "",
    securite: dossier.securite ? dossier.securite : "",
  };

  try {
    const dossier = await prisma.dossier.create({ data });
    res.status(200).json(dossier);
  } catch (e: unknown) {
    console.log(e);
    res.status(200).json({ message: "Dossier non trouvé" });
  }
};

export default handler;
