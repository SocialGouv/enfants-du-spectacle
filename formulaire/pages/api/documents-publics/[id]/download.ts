import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import prisma from "../../../../src/lib/prismaClient";
import fs from "fs";
import path from "path";

const UPLOAD_DIR = "/mnt/documents-publics";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "ID requis" });
  }

  try {
    // Récupérer le document depuis la base de données
    const document = await prisma.documentPublic.findUnique({
      where: { id: parseInt(id) },
    });

    if (!document) {
      return res.status(404).json({ error: "Document non trouvé" });
    }

    // Construire le chemin vers le fichier
    const filePath = path.join(UPLOAD_DIR, document.path);

    // Vérifier que le fichier existe
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Fichier non trouvé" });
    }

    // Lire le fichier
    const fileBuffer = fs.readFileSync(filePath);

    // Définir les headers appropriés
    res.setHeader("Content-Type", document.mimeType);
    res.setHeader("Content-Length", document.size);
    res.setHeader("Content-Disposition", `attachment; filename="${document.originalName}"`);
    res.setHeader("Cache-Control", "public, max-age=3600"); // Cache pendant 1 heure

    // Envoyer le fichier
    res.status(200).send(fileBuffer);
  } catch (error) {
    console.error("Erreur lors du téléchargement:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};

export default withSentry(handler);
