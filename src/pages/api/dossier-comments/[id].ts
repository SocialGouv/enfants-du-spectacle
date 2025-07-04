import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prismaClient";
import { Comments, Sourcecomment } from "@prisma/client";

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { id } = req.query;
  
  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: "Invalid dossier ID" });
  }

  const dossierId = parseInt(id, 10);
  
  if (isNaN(dossierId)) {
    return res.status(400).json({ error: "Dossier ID must be a number" });
  }

  if (req.method === "GET") {
    try {
      // Parse query params
      const { enfantId, includeChildren } = req.query;
      let enfantIdFilter = undefined;
      
      // Check if we should include children comments
      if (includeChildren === 'true') {
        // Don't filter by enfantId - return all comments for this dossier
      } else if (enfantId) {
        // Filter by specific enfantId
        if (typeof enfantId === 'string') {
          const parsedEnfantId = parseInt(enfantId, 10);
          if (!isNaN(parsedEnfantId)) {
            enfantIdFilter = parsedEnfantId;
          }
        }
      } else {
        // Default behavior: only project comments (enfantId = null)
        enfantIdFilter = null;
      }
      
      // Build the where clause based on the params
      const whereClause: any = { dossierId: dossierId };
      if (includeChildren !== 'true' && enfantIdFilter !== undefined) {
        whereClause.enfantId = enfantIdFilter;
      }
      
      // Fetch comments for the dossier with the appropriate filter
      const comments = await prisma.comments.findMany({
        where: whereClause,
        orderBy: { date: "desc" }
      });
      
      return res.status(200).json(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      return res.status(500).json({ error: "Failed to fetch comments" });
    }
  } else if (req.method === "POST") {
    try {
      // Parse the request body
      const commentData = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      
      // Ensure all required fields are present
      if (!commentData.text) {
        return res.status(400).json({ error: "Comment text is required" });
      }
      
      // Process enfantId - ensure it's a number type or null
      let enfantId = null;
      if (commentData.enfantId) {
        if (typeof commentData.enfantId === 'string') {
          enfantId = parseInt(commentData.enfantId, 10);
          if (isNaN(enfantId)) {
            enfantId = null;
            console.error("Invalid enfantId format - using null instead");
          }
        } else if (typeof commentData.enfantId === 'number') {
          enfantId = commentData.enfantId;
        }
      }
      
      // Create a new comment with proper type casting
      const comment = await prisma.comments.create({
        data: {
          text: commentData.text,
          source: (commentData.source || "INSTRUCTEUR") as Sourcecomment,
          dossierId: dossierId,
          enfantId: enfantId,
          date: new Date(),
          sender: commentData.sender || null,
          seen: false,
          // Make sure to provide any other required fields that might be missing
          userId: session.dbUser?.id || null,
          externalUserId: null,
          commentsId: null // For parent-child comment relationship
        }
      });
      
      return res.status(201).json(comment);
    } catch (error) {
      console.error("Error creating comment:", error);
      // Provide more detailed error information for debugging
      return res.status(500).json({
        error: "Failed to create comment",
        details: error instanceof Error ? error.message : String(error)
      });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
};

export default withSentry(handler);
