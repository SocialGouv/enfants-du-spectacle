import { Enfant } from "@prisma/client";
import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { EnfantData } from "src/fetching/dossiers";
import prisma from "../../../src/lib/prismaClient";
import { getServerSession } from "next-auth";
import { authOptions }  from '../auth/[...nextauth]'

const handler: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
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
  const session = await getServerSession(req, res, authOptions);
  let nom = req.query.nom as string;
  let prenom = req.query.prenom as string;
  let userId = session?.dbUser.id;
  try {
    const enfants = await prisma.enfant.findMany({
      take: 5,
      include: {
        dossier: true,
        piecesDossier: true,
      },
      where: {
        AND: [
          {
            nom: {
              contains: nom,
              mode: "insensitive",
            },
          },
          {
            prenom: {
              contains: prenom,
              mode: "insensitive",
            },
          },
          { userId: userId },
        ],
      },
    });
    await prisma?.$disconnect()
    res.status(200).json(enfants);
  } catch (e: unknown) {
    await prisma?.$disconnect()
    console.log(e);
  }
};

const post: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  let data = JSON.parse(req.body) as Enfant;
  data.userId = session?.dbUser.id;
  try {
    const enfant = await prisma.enfant.create({ data });
    await prisma?.$disconnect()
    res.status(200).json(enfant);
  } catch (e: unknown) {
    await prisma?.$disconnect()
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

  console.log("ENFANT UPDATED: ", parsed);

  parsed.nombreJours = parseInt(parsed.nombreJours?.toString() || "0");
  parsed.montantCachet = parseFloat(parsed.montantCachet?.toString() || "0");
  parsed.nombreCachets = parseInt(parsed.nombreCachets?.toString() || "0");
  parsed.nombreLignes = parseInt(parsed.nombreLignes?.toString() || "0");
  parsed.remunerationTotale = parseFloat(
    parsed.remunerationTotale?.toString() || "0"
  );
  parsed.dateDerniereModification = new Date();

  if (parsed.remuneration) {
    parsed.remuneration.forEach(async (rem) => {
      await prisma.remuneration.update({
        data: rem,
        where: { id: rem.id },
      });
    });
  }

  delete parsed.piecesDossier;
  delete parsed.remuneration;
  delete parsed.Comments;

  const enfantUpdated = await prisma.enfant.update({
    data: parsed as Enfant,
    where: { id: parsed.id },
  });
  await prisma?.$disconnect()

  res.status(200).json(enfantUpdated);
};

export default withSentry(handler);
