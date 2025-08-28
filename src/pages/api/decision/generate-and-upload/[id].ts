import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import prisma from "../../../../lib/prismaClient";
import { generateAndUploadDAById } from "../../../../lib/pdf/pdfGenerateAndUploadDA";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  try {
    // Vérifier l'authentification via API key
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== process.env.API_KEY_INSTRUCTEUR) {
      return res.status(401).json({ error: "Non autorisé" });
    }

    const { id } = req.query;
    
    if (!id) {
      return res.status(400).json({ error: "ID du dossier requis" });
    }

    const dossierId = parseInt(id as string);
    if (isNaN(dossierId)) {
      return res.status(400).json({ error: "ID du dossier invalide" });
    }

    // Vérifier que le dossier existe et est accepté
    const dossier = await prisma.dossier.findUnique({
      where: { id: dossierId }
    });

    if (!dossier) {
      return res.status(404).json({ error: "Dossier non trouvé" });
    }

    if (dossier.statut !== "ACCEPTE") {
      return res.status(400).json({ error: "Le dossier doit être accepté pour générer la décision" });
    }

    // Si le lien S3 existe déjà, le retourner directement
    // @ts-ignore - Le champ decisonS3Link existe dans le schéma mais le client n'a pas encore été régénéré
    if (dossier.decisonS3Link) {
      return res.status(200).json({ 
        success: true, 
        // @ts-ignore
        s3Url: dossier.decisonS3Link,
        message: "Décision déjà existante"
      });
    }

    // Générer la décision, l'uploader sur S3 et mettre à jour la BDD
    const s3Url = await generateAndUploadDAById(dossierId);

    // Mettre à jour le dossier avec le lien S3
    await prisma.dossier.update({
      where: { id: dossierId },
      data: { decisonS3Link: s3Url } as any
    });

    return res.status(200).json({ 
      success: true, 
      s3Url,
      message: "Décision générée avec succès"
    });

  } catch (error) {
    console.error("Erreur lors de la génération de la décision:", error);
    return res.status(500).json({ 
      error: "Erreur serveur lors de la génération de la décision",
      details: error instanceof Error ? error.message : "Erreur inconnue"
    });
  }
};

export default withSentry(handler);
