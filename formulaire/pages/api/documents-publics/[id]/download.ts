import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { getSignedUrlForFile } from "../../../../src/lib/s3Client";
import prisma from "../../../../src/lib/prismaClient";

const handler: NextApiHandler = async (req, res) => {
  // Gérer les CORS dynamiquement
  const origin = req.headers.origin;
  const allowedOrigins = [
    "http://localhost:3000", // Développement
    "http://localhost:3001", // Développement formulaire
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

  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET", "OPTIONS"]);
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  try {
    const { id } = req.query;
    
    if (!id) {
      return res.status(400).json({ error: "ID requis" });
    }

    // Récupérer le document depuis la base de données
    const document = await prisma.documentPublic.findUnique({
      where: { id: parseInt(id as string) },
    });

    if (!document) {
      return res.status(404).json({ error: "Document non trouvé" });
    }

    // Générer une URL signée pour accéder au fichier S3
    const signedUrl = await getSignedUrlForFile(document.path, 3600); // 1 heure d'expiration

    // Rediriger vers l'URL signée
    res.redirect(302, signedUrl);
    return;
  } catch (error) {
    console.error("Erreur lors du téléchargement:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};

export default withSentry(handler);
