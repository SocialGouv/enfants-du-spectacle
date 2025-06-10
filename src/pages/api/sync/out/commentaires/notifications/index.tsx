import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../../../lib/prismaClient";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).end();
    return;
  }
  if (req.method == "PUT") {
    await updateComments(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

const updateComments: NextApiHandler = async (req, res) => {
  try {
    const commentIds = Array.isArray(req.query.commentIds)
      ? req.query.commentIds
      : [req.query.commentIds];
    
    if (!commentIds || commentIds.length === 0 || !commentIds[0]) {
      return res.status(400).json({ error: "No comment IDs provided" });
    }
    
    // Convert string IDs to numbers
    const parsedCommentIds = commentIds.map(id => parseInt(id as string));
    
    // Update the comments to set seen = true
    const updateResult = await prisma.comments.updateMany({
      where: {
        id: {
          in: parsedCommentIds
        }
      },
      data: {
        seen: true
      }
    });
    
    res.status(200).json({ 
      updated: updateResult.count, 
      message: `${updateResult.count} comments marked as seen`
    });
  } catch (error) {
    console.error("Error updating comments:", error);
    res.status(500).json({ error: "Failed to update comments" });
  }
};

export default withSentry(handler);
