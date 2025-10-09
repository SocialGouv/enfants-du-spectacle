import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler, NextApiRequest } from "next";
import { uploadFileToS3 } from "../../../../../src/lib/s3Client";
import prisma from "../../../../../src/lib/prismaClient";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Pour gérer les PDFs volumineux
    },
  },
};

const handler: NextApiHandler = async (req, res) => {
  // Gérer les CORS
  const origin = req.headers.origin;
  const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://enfants-du-spectacle.fabrique.social.gouv.fr",
    "https://enfants-du-spectacle-preprod.ovh.fabrique.social.gouv.fr",
  ];

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  }

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method == "POST") {
    await uploadDecision(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

const uploadDecision: NextApiHandler = async (req, res) => {
  try {
    const { pdfBase64, dossierId, fileName, enfantId } = req.body;

    if (!pdfBase64 || !dossierId || !fileName) {
      return res.status(400).json({ error: "Paramètres manquants" });
    }

    // Convertir le base64 en Buffer
    const pdfBuffer = Buffer.from(pdfBase64.replace('data:application/pdf;base64,', ''), 'base64');

    // Générer la clé S3 pour les décisions (sans cryptage)
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    const basePath = process.env.PATH_S3 || 'documents';
    const s3Key = `${basePath}/decisions/${year}/${month}/${dossierId}/${Date.now()}_${fileName}.pdf`;
    
    // Upload vers S3 sans cryptage (contrairement aux pièces justificatives)
    const uploadResult = await uploadFileToS3(
      pdfBuffer,
      s3Key,
      "application/pdf",
      `${fileName}.pdf`
    );

    // Mettre à jour le lien S3 dans le dossier UNIQUEMENT si c'est une décision COMPLÈTE
    // (pas une décision individuelle pour un enfant)
    if (!enfantId) {
      await prisma.dossier.update({
        where: { id: parseInt(dossierId) },
        // @ts-ignore - Le champ decisonS3Link existe dans le schéma mais le client n'a pas encore été régénéré
        data: { decisonS3Link: uploadResult.url }
      });
      console.log(`[UPLOAD-DECISION] Lien de décision COMPLÈTE mis à jour pour le dossier ${dossierId}: ${uploadResult.url}`);
    } else {
      console.log(`[UPLOAD-DECISION] Décision INDIVIDUELLE pour enfant ${enfantId} du dossier ${dossierId} uploadée, pas de mise à jour du lien du dossier`);
    }

    res.status(200).json({ 
      s3Url: uploadResult.url, 
      s3Key: s3Key 
    });
  } catch (error) {
    console.error("Erreur lors de l'upload de la décision vers S3:", error);
    res.status(500).json({ error: "Erreur lors de l'upload de la décision" });
  }
};

export default withSentry(handler);
