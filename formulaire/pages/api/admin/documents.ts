import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../src/lib/prismaClient";

const handler: NextApiHandler = async (req, res) => {
  // Gérer les CORS dynamiquement
  const origin = req.headers.origin;
  const allowedOrigins = [
    "http://localhost:3000", // Développement
    "https://enfants-du-spectacle.fabrique.social.gouv.fr", // Production
    "https://enfants-du-spectacle-preprod.ovh.fabrique.social.gouv.fr" // Preprod
  ];
  
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
  }

  // Gérer les requêtes preflight CORS (OPTIONS)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    return await getDocuments(req, res);
  } else {
    res.setHeader("Allow", ["GET", "OPTIONS"]);
    return res.status(405).json({ error: "Méthode non autorisée - seule la consultation est disponible" });
  }
};

const getDocuments: NextApiHandler = async (req, res) => {
  try {
    const { categorie } = req.query;
    
    const documents = await prisma.documentPublic.findMany({
      where: categorie ? { categorie: categorie as any } : undefined,
      include: {
        user: {
          select: {
            prenom: true,
            nom: true,
            email: true,
          },
        },
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
