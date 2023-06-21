import type { NextApiHandler, NextApiRequest } from "next";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";
import { generateToken } from "src/lib/utils";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).end();
    return;
  }
  const { id: articleIdStr } = req.query;
  if (typeof articleIdStr !== "string") {
    res.status(404).send(`not a valid dosarticlesier id`);
    return;
  }

  if (req.method == "GET") {
    await get(req, res);
  }
  if (req.method == "DELETE") {
    await remove(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

function getId(req: NextApiRequest): number {
  return Number(req.query.id as string);
}

const remove: NextApiHandler = async (req, res) => {
  const prisma = new PrismaClient();
  try {
    const dossierId = getId(req);
    const dossierDeleted = await prisma.dossier.delete({
      where: { id: dossierId },
    });

    const url = `${process.env.API_URL_INSTRUCTEUR}/inc/dossiers/${dossierId}`;

    const fetching = fetch(url, {
      body: JSON.stringify({ api_key: process.env.API_KEY_SDP }),
      method: "DELETE",
    }).then(async (r) => {
      if (!r.ok) {
        throw Error(`got status ${r.status}`);
      }
      return r.json();
    });
    await prisma?.$disconnect()

    res.status(200).json({ dossierDeleted });
  } catch (e: unknown) {
    await prisma?.$disconnect()
    console.log(e);
    res.status(200).json({ message: "Dossier non trouvé" });
  }
};

const get: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  const prisma = new PrismaClient();

  var jwt = require("jsonwebtoken");

  try {
    const dossierId = getId(req);
    const dossier = await prisma.dossier.findUnique({
      include: {
        user: true,
        enfants: {
          include: {
            piecesDossier: true,
            remuneration: true,
          },
        },
        Demandeur: {
          include: {
            societeProduction: true,
          },
        },
        piecesDossier: true,
      },
      where: { id: dossierId },
    });
    if (
      dossier?.userId === session?.dbUser.id ||
      dossier?.collaboratorIds.includes(session?.dbUser.id)
    ) {
      await prisma?.$disconnect()
      res.status(200).json({
        dossier: dossier,
        docs: {
          dossier: {
            id: dossier?.id,
            piecesDossier: dossier?.piecesDossier.map((piece) => {
              return generateToken(
                piece.id,
                dossier.id,
                piece.type,
                piece.link,
                piece.statut
              );
            }),
          },
          enfants: dossier?.enfants.map((enfant) => {
            return {
              id: enfant.id,
              piecesDossier: enfant.piecesDossier.map((piece) => {
                return generateToken(
                  piece.id,
                  dossier.id,
                  piece.type,
                  piece.link,
                  piece.statut
                );
              }),
            };
          }),
        },
      });
    } else {
      await prisma?.$disconnect()
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (e: unknown) {
    await prisma?.$disconnect()
    console.log(e);
    res.status(200).json({ message: "Dossier non trouvé" });
  }
};

export default handler;
