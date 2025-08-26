import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { s3Client, getSignedUrlForFile } from "../../../../src/lib/s3Client";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import * as crypto from "crypto";
import prisma from "../../../../src/lib/prismaClient";

const handler: NextApiHandler = async (req, res) => {
  // Gérer les CORS
  const origin = req.headers.origin;
  const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://enfants-du-spectacle.fabrique.social.gouv.fr",
    "https://enfants-du-spectacle-preprod.ovh.fabrique.social.gouv.fr"
  ];
  
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
  }

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET", "OPTIONS"]);
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  try {
    const { type, id, view } = req.query;
    
    if (!type || !id) {
      return res.status(400).json({ error: "Type et ID requis" });
    }

    const isInlineView = view === "inline";

    if (type === "documents-publics") {
      return await handleDocumentPublic(req, res, id as string);
    } else if (type === "pieces-dossier") {
      return await handlePieceDossier(req, res, id as string);
    } else if (type === "pieces-enfant") {
      return await handlePieceEnfant(req, res, id as string);
    } else if (type === "decision") {
      return await handleDecision(req, res, id as string, isInlineView);
    } else {
      return res.status(400).json({ error: "Type de document non supporté" });
    }

  } catch (error) {
    console.error("Erreur lors du téléchargement:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};

/**
 * Gère le téléchargement des documents publics (non cryptés)
 */
async function handleDocumentPublic(req: any, res: any, id: string) {
  // Récupérer le document depuis la base de données
  const document = await prisma.documentPublic.findUnique({
    where: { id: parseInt(id) },
  });

  if (!document) {
    return res.status(404).json({ error: "Document non trouvé" });
  }

  // Générer une URL signée pour accéder au fichier S3
  const signedUrl = await getSignedUrlForFile(document.path, 3600); // 1 heure

  // Rediriger vers l'URL signée
  res.redirect(302, signedUrl);
}

/**
 * Gère le téléchargement des pièces cryptées de dossier
 */
async function handlePieceDossier(req: any, res: any, id: string) {
  const { view } = req.query;
  const isInlineView = view === "inline";
  
  // Vérifier l'authentification pour les pièces cryptées
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: "Non authentifié" });
  }

  // Récupérer la pièce de dossier depuis la base de données
  const piece = await prisma.pieceDossier.findUnique({
    where: { id: parseInt(id) },
    include: { dossier: true }
  });

  if (!piece) {
    return res.status(404).json({ error: "Document non trouvé" });
  }

  // Vérifier que l'utilisateur a accès au dossier
  if (!piece.dossier) {
    return res.status(404).json({ error: "Dossier non trouvé" });
  }

  // Vérifier les permissions : l'utilisateur doit être le créateur ou collaborateur
  const userId = session.user?.id;
  if (!userId) {
    return res.status(401).json({ error: "Utilisateur non identifié" });
  }
  
  const hasAccess = piece.dossier.creatorId === userId || 
                   (piece.dossier.collaboratorIds && piece.dossier.collaboratorIds.includes(userId));
  
  if (!hasAccess) {
    return res.status(403).json({ error: "Accès non autorisé à ce document" });
  }

  if (!piece.link) {
    return res.status(404).json({ error: "Fichier non trouvé" });
  }

  return await downloadAndDecryptFile(req, res, piece, isInlineView);
}

/**
 * Gère le téléchargement des pièces cryptées d'enfant
 */
async function handlePieceEnfant(req: any, res: any, id: string) {
  const { view } = req.query;
  const isInlineView = view === "inline";
  
  // Vérifier l'authentification pour les pièces cryptées
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: "Non authentifié" });
  }

  // Récupérer la pièce d'enfant depuis la base de données
  const pieceEnfant = await prisma.pieceDossierEnfant.findUnique({
    where: { id: parseInt(id) },
    include: { enfant: { include: { dossier: true } } }
  });

  if (!pieceEnfant) {
    return res.status(404).json({ error: "Document non trouvé" });
  }

  // Vérifier que l'utilisateur a accès au dossier
  if (!pieceEnfant.enfant?.dossier) {
    return res.status(404).json({ error: "Dossier non trouvé" });
  }

  // Vérifier les permissions : l'utilisateur doit être le créateur ou collaborateur
  const userId = session.user?.id;
  if (!userId) {
    return res.status(401).json({ error: "Utilisateur non identifié" });
  }
  
  const hasAccess = pieceEnfant.enfant.dossier.creatorId === userId || 
                   (pieceEnfant.enfant.dossier.collaboratorIds && pieceEnfant.enfant.dossier.collaboratorIds.includes(userId));
  
  if (!hasAccess) {
    return res.status(403).json({ error: "Accès non autorisé à ce document" });
  }

  if (!pieceEnfant.link) {
    return res.status(404).json({ error: "Fichier non trouvé" });
  }

  return await downloadAndDecryptFile(req, res, pieceEnfant, isInlineView);
}

/**
 * Gère le téléchargement des décisions (non cryptées)
 */
async function handleDecision(req: any, res: any, id: string, isInlineView: boolean) {
  // Vérifier l'authentification
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: "Non authentifié" });
  }

  // Récupérer le dossier depuis la base de données
  const dossier = await prisma.dossier.findUnique({
    where: { id: parseInt(id) }
  });

  if (!dossier) {
    return res.status(404).json({ error: "Dossier non trouvé" });
  }

  // Vérifier que le dossier est accepté et a un lien S3
  // @ts-ignore - Le champ decisonS3Link existe dans le schéma mais le client n'a pas encore été régénéré
  if (dossier.statut !== "ACCEPTE" || !dossier.decisonS3Link) {
    return res.status(404).json({ error: "Décision non disponible" });
  }

  // Vérifier les permissions : l'utilisateur doit être le créateur ou collaborateur
  const userId = session.user?.id;
  if (!userId) {
    return res.status(401).json({ error: "Utilisateur non identifié" });
  }
  
  const hasAccess = dossier.creatorId === userId || 
                   (dossier.collaboratorIds && dossier.collaboratorIds.includes(userId));
  
  if (!hasAccess) {
    return res.status(403).json({ error: "Accès non autorisé à ce document" });
  }

  try {
    // @ts-ignore - Le champ decisonS3Link existe dans le schéma mais le client n'a pas encore été régénéré
    const fullUrl = dossier.decisonS3Link;
    
    // Extraire la clé S3 depuis l'URL complète
    // Format: https://s3.gra.io.cloud.ovh.net/enfants-du-spectacle-dev-app/documents/decisions/...
    // Clé attendue: documents/decisions/...
    const bucketName = process.env.BUCKET_NAME || 'enfants-du-spectacle-dev-app';
    const s3Key = fullUrl.substring(fullUrl.indexOf(`/${bucketName}/`) + bucketName.length + 2);
    
    console.log("URL complète:", fullUrl);
    console.log("Clé S3 extraite:", s3Key);
    
    // Générer une URL signée pour accéder au fichier S3 (non crypté)
    const signedUrl = await getSignedUrlForFile(s3Key, 3600); // 1 heure

    // Rediriger vers l'URL signée
    res.redirect(302, signedUrl);
  } catch (error) {
    console.error("Erreur lors de la génération de l'URL signée:", error);
    return res.status(500).json({ error: "Erreur lors de l'accès au document" });
  }
}

/**
 * Fonction commune pour télécharger et déchiffrer un fichier
 */
async function downloadAndDecryptFile(req: any, res: any, documentPiece: any, isInlineView: boolean) {
  // Télécharger et déchiffrer le fichier
  let encryptedBuffer: Buffer;
  
  try {
    // Essayer d'abord avec le SDK S3 direct
    const command = new GetObjectCommand({
      Bucket: process.env.BUCKET_NAME!,
      Key: documentPiece.link,
    });

    const s3Response = await s3Client.send(command);
    if (!s3Response.Body) {
      return res.status(404).json({ error: "Fichier non trouvé sur S3" });
    }

    // Lire le contenu crypté
    const chunks: any[] = [];
    const reader = s3Response.Body as any;
    
    if (reader.read) {
      for await (const chunk of reader) {
        chunks.push(chunk);
      }
    } else {
      chunks.push(reader);
    }
    
    encryptedBuffer = Buffer.concat(chunks as any);
    
  } catch (s3Error: any) {
    // Fallback : utiliser curl
    const { spawn } = require('child_process');
    const signedUrl = await getSignedUrlForFile(documentPiece.link, 300);
    
    encryptedBuffer = await new Promise<Buffer>((resolve, reject) => {
      const curl = spawn('curl', ['-s', '-L', signedUrl]);
      const chunks: any[] = [];
      
      curl.stdout.on('data', (chunk: any) => chunks.push(chunk));
      curl.on('close', (code: any) => {
        if (code === 0) {
          resolve(Buffer.concat(chunks as any));
        } else {
          reject(new Error(`curl exited with code ${code}`));
        }
      });
    });
  }

  // Déchiffrer le fichier
  const key = process.env.CIPHER_KEY as string;
  const iv = process.env.CIPHER_IV as string;
  const decipher = crypto.createDecipheriv("aes-256-cfb", key, iv);
  
  const decryptedParts: any[] = [];
  decryptedParts.push(decipher.update(encryptedBuffer as any));
  decryptedParts.push(decipher.final());
  const decryptedBuffer = Buffer.concat(decryptedParts as any);

  // Déterminer le type MIME
  const mimes: Record<string, string> = {
    'bmp': 'image/bmp',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'jpe': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'json': 'application/json',
    'pdf': 'application/pdf',
    'png': 'image/png',
    'svg': 'image/svg+xml',
    'svgz': 'image/svg+xml',
    'txt': 'text/plain',
    'xls': 'application/vnd.ms-excel'
  };

  const originalName = documentPiece.nom || "document";
  const extension = originalName.substring(originalName.lastIndexOf('.') + 1).toLowerCase();
  const contentType = mimes[extension] || "application/octet-stream";

  const disposition = isInlineView ? "inline" : "attachment";

  // ✅ Nouvelle logique sécurisée pour Content-Disposition
  const encodeRFC5987ValueChars = (str: string) =>
    encodeURIComponent(str)
      .replace(/'/g, '%27')
      .replace(/\(/g, '%28')
      .replace(/\)/g, '%29')
      .replace(/\*/g, '%2A')
      .replace(/,/g, '%2C')
      .replace(/;/g, '%3B')
      .replace(/\\/g, '%5C');

  // Fallback ASCII sans accents
  const fallbackFilename = originalName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // enlève les accents
    .replace(/[^\x20-\x7E]+/g, '')   // enlève tout caractère non-ASCII
    || 'document';

  // Encodage du nom de fichier selon RFC5987
  const encodedFilename = encodeRFC5987ValueChars(originalName);

  res.writeHead(200, {
    "Content-Length": decryptedBuffer.length,
    "Content-Type": contentType,
    "Content-Disposition": `${disposition}; filename="${fallbackFilename}"; filename*=UTF-8''${encodedFilename}`,
  });

  res.end(decryptedBuffer);
}

export default withSentry(handler);
