import type { NextApiRequest, NextApiResponse } from "next";
import { getBulkDossierNotifications } from "src/lib/notifications";
import prismaClient from "src/lib/prismaClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id } = req.query;
  const commissionId = parseInt(id as string);

  if (isNaN(commissionId)) {
    return res.status(400).json({ message: "Invalid commission ID" });
  }

  try {
    // Récupérer tous les dossiers de la commission
    const dossiers = await prismaClient.dossier.findMany({
      where: { commissionId },
      select: { id: true }
    });

    const dossierIds = dossiers.map(d => d.id);
    
    if (dossierIds.length === 0) {
      return res.status(200).json([]);
    }

    // DEBUG: Récupérer les données brutes pour voir ce qui se passe
    const debugData = await Promise.all(dossierIds.map(async (dossierId) => {
      const [comments, pieces, piecesEnfant] = await Promise.all([
        prismaClient.comments.findMany({
          where: { dossierId },
          select: { id: true, enfantId: true, seen: true, text: true }
        }),
        prismaClient.pieceDossier.findMany({
          where: { dossierId },
          select: { id: true, statut: true, nom: true }
        }),
        prismaClient.pieceDossierEnfant.findMany({
          where: { enfant: { dossierId } },
          select: { id: true, statut: true, nom: true }
        })
      ]);
      
      return {
        dossierId,
        comments: comments.length,
        commentsProject: comments.filter(c => c.enfantId === null).length,
        commentsChildren: comments.filter(c => c.enfantId !== null).length,
        commentsProjectUnseen: comments.filter(c => c.enfantId === null && c.seen === false).length,
        commentsChildrenUnseen: comments.filter(c => c.enfantId !== null && c.seen === false).length,
        pieces: pieces.length,
        piecesEnAttente: pieces.filter(p => p.statut === 'EN_ATTENTE').length,
        piecesEnfant: piecesEnfant.length,
        piecesEnfantEnAttente: piecesEnfant.filter(p => p.statut === 'EN_ATTENTE').length,
        debug: {
          allComments: comments,
          allPieces: pieces,
          allPiecesEnfant: piecesEnfant
        }
      };
    }));

    // Calculer les notifications
    const notifications = await getBulkDossierNotifications(dossierIds);
    
    res.status(200).json({ notifications, debug: debugData });
  } catch (error) {
    console.error("Erreur lors du chargement des notifications:", error);
    res.status(500).json({ 
      message: "Erreur serveur", 
      error: error instanceof Error ? error.message : "Unknown error" 
    });
  }
}
