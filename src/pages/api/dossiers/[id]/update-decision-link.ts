import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import client from "src/lib/prismaClient";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const session = await getSession({ req });
  if (
    !session ||
    (session.dbUser.role !== "ADMIN" &&
      session.dbUser.role !== "INSTRUCTEUR")
  ) {
    res.status(401).end();
    return;
  }

  try {
    const { id } = req.query;
    const { decisonS3Link } = req.body;
    
    if (!id || typeof id !== "string") {
      return res.status(400).json({ error: "ID du dossier requis" });
    }

    if (!decisonS3Link || typeof decisonS3Link !== "string") {
      return res.status(400).json({ error: "Lien de décision requis" });
    }

    const dossierId = parseInt(id);
    if (isNaN(dossierId)) {
      return res.status(400).json({ error: "ID du dossier invalide" });
    }

    // Mettre à jour le lien de décision du dossier
    await client.dossier.update({
      where: { id: dossierId },
      data: { decisonS3Link } as unknown as any
    });

    return res.status(200).json({ 
      success: true,
      message: "Lien de décision mis à jour avec succès"
    });

  } catch (error) {
    console.error("Erreur lors de la mise à jour du lien de décision:", error);
    return res.status(500).json({ 
      error: "Erreur serveur",
      details: error instanceof Error ? error.message : "Erreur inconnue"
    });
  }
};

export default withSentry(handler);
