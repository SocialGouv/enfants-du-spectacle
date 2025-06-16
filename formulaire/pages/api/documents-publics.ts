import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import prisma from "../../src/lib/prismaClient";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  try {
    const { categorie } = req.query;
    
    const documents = await prisma.documentPublic.findMany({
      where: categorie ? { categorie: categorie as any } : undefined,
      select: {
        id: true,
        nom: true,
        description: true,
        fileName: true,
        originalName: true,
        mimeType: true,
        size: true,
        path: true,
        categorie: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json(documents);
  } catch (error) {
    console.error("Erreur lors de la récupération des documents:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};

export default withSentry(handler);
