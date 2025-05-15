import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../../../lib/prismaClient";
import { CommentaireNotifications } from "../../../../../../lib/types";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).end();
    return;
  }
  if (req.method == "GET") {
    await getCommentsNotificationsByDossierIds(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

const getCommentsNotificationsByDossierIds: NextApiHandler = async (
  req,
  res
) => {
  try {
    let dossierIds: string[] = [];
    if (Array.isArray(req.query.externalId)) {
      dossierIds = req.query.externalId as string[];
    } else if (req.query.externalId) {
      dossierIds = [req.query.externalId as string];
    }

    console.log("Fetching notifications for dossier externalIds:", dossierIds);
    
    // First find the dossiers by their externalIds
    const dossiers = await prisma.dossier.findMany({
      where: {
        externalId: {
          in: dossierIds,
        },
      },
    });

    if (dossiers.length === 0) {
      console.log("No dossiers found with externalIds:", dossierIds);
      return res.status(200).json([]);
    }

    // Map externalIds to internal ids
    const dossierInternalIds = dossiers.map(dossier => dossier.id);
    const externalIdToInternalIdMap = dossiers.reduce((map, dossier) => {
      if (dossier.externalId) {
        map[dossier.externalId] = dossier.id;
      }
      return map;
    }, {} as Record<string, number>);
    
    // Get the pieces for the dossiers
    const piecesJustifDossier = await prisma.pieceDossier.findMany({
      where: {
        dossierId: {
          in: dossierInternalIds,
        },
      },
    });

    // Get the enfants and their pieces
    const enfants = await prisma.enfant.findMany({
      include: {
        piecesDossier: true,
      },
      where: {
        dossierId: {
          in: dossierInternalIds,
        },
      },
    });

    // Get the comments
    const comments = await prisma.comments.findMany({
      where: {
        dossierId: {
          in: dossierInternalIds,
        },
      },
    });

    // Create the notifications response
    const notificationsByDossier: CommentaireNotifications[] = dossierIds.map(
      (externalId) => {
        const internalId = externalIdToInternalIdMap[externalId];
        
        if (!internalId) {
          return {
            dossierId: parseInt(externalId),
            notificationsChildren: 0,
            notificationsProject: 0,
            newPiecesEnfant: 0,
            newPiecesDossier: 0,
          };
        }
        
        const piecesDossier = piecesJustifDossier.filter(
          (piece) =>
            piece.dossierId === internalId &&
            piece.statut !== "REFUSE" &&
            piece.statut !== "VALIDE"
        ).length;

        const piecesEnfant = enfants
          .filter((enfant) => enfant.dossierId === internalId)
          .flatMap((enfant) => {
            const piecesUnseen = enfant.piecesDossier.filter(
              (piece) => piece.statut !== "REFUSE" && piece.statut !== "VALIDE"
            );
            return piecesUnseen;
          }).length;

        const commentsChildren = comments.filter(
          (comment) =>
            comment.dossierId === internalId &&
            comment.enfantId !== null &&
            comment.source === "SOCIETE_PROD"
        );
        const commentsProject = comments.filter(
          (comment) =>
            comment.dossierId === internalId &&
            comment.enfantId === null &&
            comment.source === "SOCIETE_PROD"
        );
        const commentsProjectSeen = commentsProject.filter(
          (comment) => comment.seen === true
        );
        const commentsChildrenSeen = commentsChildren.filter(
          (comment) => comment.seen === true
        );
        const notificationsChildren =
          commentsChildren.length - commentsChildrenSeen.length;
        const notificationsProject =
          commentsProject.length - commentsProjectSeen.length;
        
        return {
          dossierId: parseInt(externalId),
          notificationsChildren,
          notificationsProject,
          newPiecesEnfant: piecesEnfant,
          newPiecesDossier: piecesDossier,
        };
      }
    );

    res.status(200).json(notificationsByDossier);
  } catch (error) {
    console.error("Error fetching comment notifications:", error);
    res.status(500).json({ error: "Failed to fetch comment notifications" });
  }
};

export default withSentry(handler);
