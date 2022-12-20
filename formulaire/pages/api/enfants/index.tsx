import { Enfant } from "@prisma/client";
import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { EnfantData } from "src/fetching/dossiers";
import prisma from "../../../src/lib/prismaClient";

const handler: NextApiHandler = async (req, res) => {
    const session = await getSession({ req });
    if (!session) {
      res.status(401).end();
      return;
    }
    if (req.method == "POST") {
      await post(req, res);
    } else if (req.method == "PUT") {
      await update(req, res);
    } else {
      res.status(405).end();
      return;
    }
};

const post: NextApiHandler = async (req, res) => {
    const session = await getSession({ req });
    const data = JSON.parse(req.body) as Enfant
    try {
      const dossier = await prisma.enfant.create({ data });
      res.status(200).json(dossier);
    } catch (e: unknown) {
      console.log(e);
    }
};

const update: NextApiHandler = async (req, res) => {

  if (typeof req.body !== "string") {
    res.status(400).end();
    return;
  }

  const parsed: EnfantData = JSON.parse(req.body);
  if (!parsed) {
    res.status(400).end();
    return;
  }

  parsed.nombreJours = parseInt(parsed.nombreJours?.toString() || '0')
  parsed.montantCachet = parseInt(parsed.montantCachet?.toString() || '0')
  parsed.nombreCachets = parseInt(parsed.nombreCachets?.toString() || '0')
  parsed.nombreLignes = parseInt(parsed.nombreLignes?.toString() || '0')

  delete parsed.piecesDossier

  console.log('parsed : ', parsed)

  const produitupdated = await prisma.enfant.update({
    data: parsed,
    where: { id: parsed.id },
  })

  res.status(200).json(produitupdated);
};

export default withSentry(handler);