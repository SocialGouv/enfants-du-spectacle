import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prismaClient";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).end();
    return;
  }

  if (req.method == "GET") {
    await get(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

const get: NextApiHandler = async (req, res) => {
  try {
    const externalId = req.query.externalid as string;
    
    // Find the dossier by its externalId
    const dossier = await prisma.dossier.findUnique({
      where: {
        externalId: externalId,
      },
      include: {
        piecesDossier: true, // Include the dossier's pieces
        enfants: {
          include: {
            piecesDossier: true, // Include each enfant's pieces
          }
        }
      }
    });

    if (!dossier) {
      return res.status(404).json({ error: "Dossier not found" });
    }

    // Format response to match the expected DataLinks interface structure
    const formattedResponse = {
      id: parseInt(externalId),
      dossier: {
        id: dossier.id,
        piecesDossier: dossier.piecesDossier.map(piece => ({
          id: piece.id,
          type: piece.type,
          link: piece.link,
          statut: piece.statut,
          externalId: piece.externalId,
          nom: piece.nom,
          dossierId: piece.dossierId
        }))
      },
      enfants: dossier.enfants.map(enfant => ({
        id: enfant.id,
        piecesDossier: enfant.piecesDossier.map(piece => ({
          id: piece.id,
          type: piece.type,
          link: piece.link,
          statut: piece.statut,
          externalId: piece.externalId,
          nom: piece.nom,
          dossierId: piece.dossierId,
          enfantId: piece.enfantId
        }))
      }))
    };
    
    res.status(200).json(formattedResponse);
  } catch (error) {
    console.error("Error fetching document links:", error);
    res.status(500).json({ error: "Failed to fetch document links" });
  }
};

export default withSentry(handler);
