import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Configuration du client S3 pour OVH
const s3Client = new S3Client({
  region: process.env.BUCKET_REGION || "gra",
  endpoint: process.env.BUCKET_ENDPOINT,
  credentials: {
    accessKeyId: process.env.BUCKET_ACCESS_KEY!,
    secretAccessKey: process.env.BUCKET_SECRET_KEY!,
  },
  forcePathStyle: true, // Nécessaire pour OVH S3
});

const BUCKET_NAME = process.env.BUCKET_NAME!;

export interface UploadResult {
  key: string;
  url: string;
}

/**
 * Upload un fichier vers S3
 */
export async function uploadFileToS3(
  file: Buffer,
  key: string,
  contentType: string,
  originalName: string
): Promise<UploadResult> {
  
  // Nettoyer le nom de fichier pour les métadonnées S3
  const cleanedOriginalName = originalName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9.-]/g, "_");
  
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: file,
    ContentType: contentType,
    Metadata: {
      originalName: cleanedOriginalName,
    },
  });

  try {
    const result = await s3Client.send(command);
    
    return {
      key,
      url: `${process.env.BUCKET_ENDPOINT}/${BUCKET_NAME}/${key}`,
    };
  } catch (error) {
    console.error("Erreur upload S3:", error);
    throw error;
  }
}

/**
 * Supprime un fichier de S3
 */
export async function deleteFileFromS3(key: string): Promise<void> {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  await s3Client.send(command);
}

/**
 * Génère une URL signée pour accéder à un fichier S3
 */
export async function getSignedUrlForFile(key: string, expiresIn: number = 3600): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  return await getSignedUrl(s3Client, command, { expiresIn });
}

/**
 * Génère une clé S3 unique pour un fichier
 */
export function generateS3Key(originalName: string, categorie: string): string {
  const timestamp = Date.now();
  const uuid = Math.random().toString(36).substring(2, 10);
  const sanitizedName = sanitizeFilename(originalName);
  const year = new Date().getFullYear();
  const month = String(new Date().getMonth() + 1).padStart(2, '0');
  
  const basePath = process.env.PATH_S3 || 'documents';
  
  return `${basePath}/${year}/${month}/${categorie}/${timestamp}-${uuid}-${sanitizedName}`;
}

/**
 * Nettoie un nom de fichier pour S3
 */
function sanitizeFilename(filename: string): string {
  return filename
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9.-]/g, "_")
    .toLowerCase();
}

export { s3Client };
