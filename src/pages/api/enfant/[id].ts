import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler, NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import superjson from "superjson";

import { PrismaClient, Prisma } from '@prisma/client'
const client = new PrismaClient()

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).end();
    return;
  }
  const { id: enfantIdStr } = req.query;
  if (typeof enfantIdStr !== "string") {
    res.status(404).send(`not a valid dossier id`);
    return;
  }

  if (req.method == "PUT") {
    await update(req, res);
  } else {
    return;
  }
};

function getId(req: NextApiRequest): number {
  return Number(req.query.id as string);
}

const update: NextApiHandler = async (req, res) => {
  if (typeof req.body !== "string") {
    res.status(400).end();
    return;
  }

  const parsed = JSON.parse(req.body);
  if (!parsed) {
    res.status(400).end();
    return;
  }

  const enfantId = getId(req);

  const updatedEnfant = await client.enfant.update({
    data: {
      adresseEnfant: parsed.adresseEnfant,
      adresseRepresentant1: parsed.adresseRepresentant1,
      adresseRepresentant2: parsed.adresseRepresentant2,
      cdc: parsed.cdc,
      nomRepresentant1: parsed.nomRepresentant1,
      nomRepresentant2: parsed.nomRepresentant2,
      prenomRepresentant1: parsed.prenomRepresentant1,
      prenomRepresentant2: parsed.prenomRepresentant2,
      typeConsultationMedecin: parsed.typeConsultationMedecin,
      dateConsultation: parsed.dateConsultation,
      justificatifs: parsed.justificatifs
    },
    where: { id: enfantId },
  });

  res.status(200).json(superjson.stringify(updatedEnfant));
};
export default withSentry(handler);
