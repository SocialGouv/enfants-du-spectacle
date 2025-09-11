import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  try {
    const { enfantId, decisonS3Link } = req.body;

    if (!enfantId || !decisonS3Link) {
      res.status(400).json({ error: "enfantId and decisonS3Link are required" });
      return;
    }

    const updatedEnfant = await prisma.enfant.update({
      where: { id: parseInt(enfantId) },
      data: { decisonS3Link: decisonS3Link }
    });

    res.status(200).json({ success: true, enfant: updatedEnfant });
  } catch (error) {
    console.error("Error updating enfant decision link:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
};

export default withSentry(handler);
