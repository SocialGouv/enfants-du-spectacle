import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { getSignedUrlForFile } from "../../../src/lib/s3Client";
import prisma from "../../../src/lib/prismaClient";

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
    const { path } = req.query;
    console.log("=== Route documents ===");
    console.log("Path reçu:", path);
    
    if (!path || !Array.isArray(path)) {
      console.log("Erreur: chemin manquant ou invalide");
      return res.status(400).json({ error: "Chemin requis" });
    }

    // Reconstituer le chemin complet
    const fullPath = path.join('/');
    console.log("Chemin complet reconstitué:", fullPath);
    
    // Vérifier que le document existe en base
    const document = await prisma.documentPublic.findFirst({
      where: { path: fullPath },
    });

    console.log("Document trouvé en base:", document ? "OUI" : "NON");
    if (document) {
      console.log("Document path en base:", document.path);
    }

    if (!document) {
      console.log("Document non trouvé pour le path:", fullPath);
      return res.status(404).json({ error: "Document non trouvé" });
    }

    // Générer une URL signée pour accéder au fichier S3
    console.log("Génération URL signée pour:", document.path);
    const signedUrl = await getSignedUrlForFile(document.path, 3600); // 1 heure d'expiration
    console.log("URL signée générée:", signedUrl);

    // Rediriger vers l'URL signée
    console.log("Redirection vers l'URL signée");
    return res.redirect(302, signedUrl);
  } catch (error) {
    console.error("Erreur lors de la génération de l'URL signée:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};

export default withSentry(handler);
