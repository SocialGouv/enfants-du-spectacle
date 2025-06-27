import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { s3Client, getSignedUrlForFile } from "../../../../lib/s3Client";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import * as crypto from "crypto";
import prisma from "../../../../lib/prismaClient";

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
    console.log(`=== ${isInlineView ? 'View' : 'Download'} ${type} ===`);
    console.log("ID:", id);
    console.log("Mode:", isInlineView ? "inline" : "download");

    if (type === "documents-publics") {
      return await handleDocumentPublic(req, res, id as string);
    } else if (type === "pieces") {
      return await handlePieceCryptee(req, res, id as string);
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

  console.log("Document public trouvé:", document.nom);
  console.log("Chemin S3:", document.path);

  // Générer une URL signée pour accéder au fichier S3
  const signedUrl = await getSignedUrlForFile(document.path, 3600); // 1 heure

  // Rediriger vers l'URL signée
  res.redirect(302, signedUrl);
}

/**
 * Gère le téléchargement des pièces cryptées (dossiers/enfants)
 */
async function handlePieceCryptee(req: any, res: any, id: string) {
  const { view } = req.query;
  const isInlineView = view === "inline";
  // Vérifier l'authentification pour les pièces cryptées
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: "Non authentifié" });
  }

  // Récupérer la pièce depuis la base de données (dossier ou enfant)
  let piece = await prisma.pieceDossier.findUnique({
    where: { id: parseInt(id) },
    include: { dossier: true }
  });

  let pieceEnfant = null;
  if (!piece) {
    pieceEnfant = await prisma.pieceDossierEnfant.findUnique({
      where: { id: parseInt(id) },
      include: { enfant: { include: { dossier: true } } }
    });
  }

  const documentPiece = piece || pieceEnfant;
  if (!documentPiece) {
    console.log("Pièce non trouvée pour l'ID:", id);
    return res.status(404).json({ error: "Document non trouvé" });
  }

  console.log("Pièce cryptée trouvée:", documentPiece.nom);
  console.log("Chemin S3:", documentPiece.link);

  // Vérifier que l'utilisateur a accès au dossier
  const dossier = piece ? piece.dossier : pieceEnfant?.enfant?.dossier;
  if (!dossier) {
    return res.status(404).json({ error: "Dossier non trouvé" });
  }

  // TODO: Ajouter ici la vérification des permissions utilisateur selon votre logique métier

  if (!documentPiece.link) {
    return res.status(404).json({ error: "Fichier non trouvé" });
  }

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
    console.log("Fichier lu depuis S3, taille:", encryptedBuffer.length);
    
  } catch (s3Error: any) {
    console.log("Erreur SDK S3, tentative avec curl:", s3Error?.message || s3Error);
    
    // Fallback : utiliser curl
    const { spawn } = require('child_process');
    const signedUrl = await getSignedUrlForFile(documentPiece.link, 300);
    
    encryptedBuffer = await new Promise<Buffer>((resolve, reject) => {
      const curl = spawn('curl', ['-s', '-L', signedUrl]);
      const chunks: any[] = [];
      
      curl.stdout.on('data', (chunk: any) => chunks.push(chunk));
      curl.stderr.on('data', (data: any) => console.log('curl stderr:', data.toString()));
      curl.on('close', (code: any) => {
        if (code === 0) {
          resolve(Buffer.concat(chunks as any));
        } else {
          reject(new Error(`curl exited with code ${code}`));
        }
      });
    });
    
    console.log("Fichier lu avec curl, taille:", encryptedBuffer.length);
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

  // Envoyer le fichier déchiffré
  const disposition = isInlineView ? "inline" : "attachment";
  res.writeHead(200, {
    "Content-Length": decryptedBuffer.length,
    "Content-Type": contentType,
    "Content-Disposition": `${disposition}; filename="${originalName}"`,
  });

  res.end(decryptedBuffer);
}

export default withSentry(handler);
