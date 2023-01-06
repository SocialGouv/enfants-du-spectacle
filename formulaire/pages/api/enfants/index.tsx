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
    } else if (req.method == "GET") {
      await get(req, res);
    } else if (req.method == "PUT") {
      await update(req, res);
    } else {
      res.status(405).end();
      return;
    }
};

const get: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  let nom = req.query.nom as string
  let prenom = req.query.prenom as string
  let userId = session?.dbUser.id
  try {
    const enfants = await prisma.enfant.findMany({
      take: 5,
      include: {
        dossier: true,
        piecesDossier: true
      },
      where: {
        AND: [
          {
            nom: {
              contains: nom,
              mode: "insensitive",
            }
          },
          {
            prenom: {
              contains: prenom,
              mode: "insensitive",
            }
          },
          {userId: userId}
        ]
      }
    })
    res.status(200).json(enfants)
  } catch(e: unknown) {
    console.log(e)
  }
};

const post: NextApiHandler = async (req, res) => {
    const session = await getSession({ req });
    let data = JSON.parse(req.body) as Enfant
    data.userId = session?.dbUser.id
    try {
      const enfant = await prisma.enfant.create({ data });
      res.status(200).json(enfant);
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
  parsed.montantCachet = parseFloat(parsed.montantCachet?.toString() || '0')
  parsed.nombreCachets = parseInt(parsed.nombreCachets?.toString() || '0')
  parsed.nombreLignes = parseInt(parsed.nombreLignes?.toString() || '0')
  parsed.remunerationTotale = parseFloat(parsed.remunerationTotale?.toString() || '0')
  parsed.dateDerniereModification = new Date();

  delete parsed.piecesDossier

  const enfantUpdated = await prisma.enfant.update({
    data: parsed as Enfant,
    where: { id: parsed.id },
  })

  res.status(200).json(enfantUpdated);
};

export default withSentry(handler);