import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import prisma from "src/lib/prismaClient";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  try {
    const { categorie } = req.query;

    if (!categorie) {
      return res.status(400).json({ error: "Catégorie requise" });
    }

    // Vérifier que la catégorie est valide
    const categoriesValides = [
      "CALENDRIER_COMMISSION_92",
      "CALENDRIER_COMMISSION_HORS_92",
    ];

    if (!categoriesValides.includes(categorie as string)) {
      return res.status(400).json({ error: "Catégorie invalide" });
    }

    // Récupérer le dernier document publié pour cette catégorie
    const document = await prisma.documentPublic.findFirst({
      where: {
        categorie: categorie as any,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!document) {
      return res
        .status(404)
        .json({ error: "Aucun calendrier publié pour cette catégorie" });
    }

    // Rediriger vers l'API de download existante
    return res.redirect(
      302,
      `/api/download/documents-publics/${document.id}?view=inline`
    );
  } catch (error) {
    console.error("Erreur lors de la récupération du calendrier:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};

export default withSentry(handler);
