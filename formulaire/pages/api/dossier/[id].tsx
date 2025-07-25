import type { NextApiHandler, NextApiRequest } from "next";
import { generateToken } from "src/lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import client from "src/lib/prismaClient";

const handler: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
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
  try {
    const dossierId = getId(req);
    const dossierDeleted = await client.dossier.delete({
      where: { id: dossierId },
    });

    res.status(200).json({ dossierDeleted });
  } catch (e: unknown) {
    console.log(e);
    res.status(200).json({ message: "Dossier non trouvé" });
  }
};

const get: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  var jwt = require("jsonwebtoken");

  try {
    const dossierId = getId(req);
    const dossier = await client.dossier.findUnique({
      include: {
        creator: true,
        instructeur: true,
        enfants: {
          include: {
            piecesDossier: true,
            remuneration: true,
          },
        },
        demandeur: {
          include: {
            societeProduction: true,
          },
        },
        piecesDossier: true,
        commission: true
      },
      where: { id: dossierId },
    });
    if (!session?.user?.id) {
      res.status(401).json({ error: "User ID is required" });
      return;
    }

    if (
      dossier?.creatorId === session.user.id ||
      (dossier?.collaboratorIds && dossier.collaboratorIds.includes(session.user.id))
    ) {
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
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (e: unknown) {
    console.log(e);
    res.status(200).json({ message: "Dossier non trouvé" });
  }
};

export default handler;
