import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../../lib/prismaClient";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).end();
    return;
  }
  if (req.method == "GET") {
    await getComments(req, res);
  } else if (req.method == "POST") {
    await postComment(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

const postComment: NextApiHandler = async (req, res) => {
  try {
    const commentData = JSON.parse(req.body);
    
    // If dossierId is actually an externalId, find the internal dossier ID
    if (commentData.dossierId && typeof commentData.dossierId === 'string') {
      const dossier = await prisma.dossier.findUnique({
        where: {
          externalId: commentData.dossierId.toString()
        }
      });
      
      if (!dossier) {
        return res.status(404).json({ error: "Dossier not found" });
      }
      
      // Use the internal dossier ID for the comment
      commentData.dossierId = dossier.id;
    }
    
    // Create the comment
    const comment = await prisma.comments.create({
      data: commentData
    });
    
    res.status(200).json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Failed to create comment" });
  }
};

const getComments: NextApiHandler = async (req, res) => {
  try {
    const externalId = req.query.externalId as string;
    
    // First find the dossier by its externalId
    const dossier = await prisma.dossier.findUnique({
      where: {
        externalId: externalId,
      }
    });

    if (!dossier) {
      return res.status(404).json({ error: "Dossier not found" });
    }

    // Then find comments by the dossier's actual ID
    const comments = await prisma.comments.findMany({
      where: {
        dossierId: dossier.id,
      }
    });
    
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

export default withSentry(handler);
