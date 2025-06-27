import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler, NextApiRequest } from "next";
import formidable from "formidable";
import fs from "fs";
import fsp from "fs/promises";
import * as crypto from "crypto";
import { getServerSession } from "next-auth";
import { authOptions }  from '../auth/[...nextauth]'
import { uploadFileToS3 } from "../../../src/lib/s3Client";

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

const handler: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).end();
    return;
  }
  if (req.method == "POST") {
    await post(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

function getId(req: NextApiRequest): number {
  return Number(req.query.id as string);
}

const cleanFileName = (originalFilename: string): string => {
  const cleaned = originalFilename
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, (match) => {
      const specialChars: Record<string, string> = {
        è: "e",
        ç: "c",
        à: "a",
        "¨": "",
        "~": "",
        ê: "e",
        î: "i",
        ĩ: "i",
      };

      return specialChars[match] || match;
    })
    .replace(/@/g, "")
    .replace(/\s/g, "_");

  return cleaned;
};

export const uploadFile = async (
  req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files; s3Key: string }> => {
  const dossierId = getId(req);
  const form = formidable({});

  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        reject(err);
        return;
      }

      try {
        const key = process.env.CIPHER_KEY as string;
        const iv = process.env.CIPHER_IV as string;
        
        const file = Array.isArray(files.justificatif) ? files.justificatif[0] : files.justificatif;
        if (!file) {
          reject(new Error("Aucun fichier trouvé"));
          return;
        }

        const originalFilename = file.originalFilename || "document";
        const cleanedFilename = cleanFileName(originalFilename);

        // Lire le fichier en mémoire
        const fileBuffer = await fsp.readFile(file.filepath);
        
        // Crypter le fichier en mémoire
        const cipher = crypto.createCipheriv("aes-256-cfb", key, iv);
        const encryptedParts: any[] = [];
        encryptedParts.push(cipher.update(fileBuffer as any));
        encryptedParts.push(cipher.final());
        const encryptedBuffer = Buffer.concat(encryptedParts as any);

        // Générer la clé S3 pour les documents cryptés
        const s3Key = `${dossierId}/${Date.now()}_${cleanedFilename}.encrypted`;
        
        // Upload vers S3
        await uploadFileToS3(
          encryptedBuffer,
          s3Key,
          file.mimetype || "application/octet-stream",
          originalFilename
        );

        // Nettoyer le fichier temporaire
        await fsp.unlink(file.filepath);

        resolve({ fields, files, s3Key });
      } catch (error) {
        console.error("Erreur lors de l'upload crypté vers S3:", error);
        reject(error);
      }
    });
  });
};

const post: NextApiHandler = async (req, res) => {
  try {
    const upload = await uploadFile(req);
    res.status(200).json({ filePath: upload.s3Key });
  } catch (error) {
    console.error("Erreur lors de l'upload:", error);
    res.status(500).json({ error: "Erreur lors de l'upload du fichier" });
  }
};

export default withSentry(handler);
