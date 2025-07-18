import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import prismaClient from "src/lib/prismaClient";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).end();
    return;
  }

  if (req.method !== "GET") {
    res.status(405).end();
    return;
  }

  const { id } = req.query;

  if (!id || typeof id !== "string") {
    res.status(400).json({ error: "Invalid dossier ID" });
    return;
  }

  try {
    const dossier = await prismaClient.dossier.findUnique({
      where: { id: parseInt(id) },
      select: {
        creatorId: true,
        collaboratorIds: true,
      },
    });

    if (!dossier) {
      return res.status(404).json({ error: "Dossier not found" });
    }

    const userIds = [
      dossier.creatorId,
      ...(dossier.collaboratorIds || [])
    ].filter(Boolean);

    if (userIds.length === 0) {
      return res.status(200).json([]);
    }

    const users = await prismaClient.user.findMany({
      where: { id: { in: userIds } },
      select: { email: true },
    });

    const emails = users.map(user => user.email).filter(Boolean);
    res.status(200).json(emails);
  } catch (error) {
    console.error("Error fetching user emails:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default withSentry(handler);
