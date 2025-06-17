import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../src/lib/prismaClient";
import formidable from "formidable";
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export const config = {
  api: {
    bodyParser: false,
  },
};

const UPLOAD_DIR = "/mnt/documents-publics";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/png",
  "image/jpeg",
];

const handler: NextApiHandler = async (req, res) => {
  // Gérer les CORS dynamiquement
  const origin = req.headers.origin;
  const allowedOrigins = [
    "http://localhost:3000", // Développement
    "https://enfants-du-spectacle.fabrique.social.gouv.fr", // Production
    "https://enfants-du-spectacle-preprod.ovh.fabrique.social.gouv.fr" // Preprod
  ];
  
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
  }

  // Gérer les requêtes preflight CORS (OPTIONS)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const session = await getServerSession(req, res, authOptions);
  
  if (!session?.dbUser) {
    return res.status(403).json({ error: "Accès refusé" });
  }

  // Récupérer l'utilisateur complet depuis la base de données
  const user = await prisma.user.findUnique({
    where: { id: session.dbUser.id },
  });

  if (!user || user.role !== "ADMIN") {
    return res.status(403).json({ error: "Accès refusé - droits administrateur requis" });
  }

  if (req.method === "GET") {
    return await getDocuments(req, res);
  } else if (req.method === "POST") {
    return await uploadDocument(req, res, user.id);
  } else if (req.method === "PUT") {
    return await updateDocument(req, res);
  } else if (req.method === "DELETE") {
    return await deleteDocument(req, res);
  } else {
    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE", "OPTIONS"]);
    return res.status(405).json({ error: "Méthode non autorisée" });
  }
};

const getDocuments: NextApiHandler = async (req, res) => {
  try {
    const { categorie } = req.query;
    
    const documents = await prisma.documentPublic.findMany({
      where: categorie ? { categorie: categorie as any } : undefined,
      include: {
        user: {
          select: {
            prenom: true,
            nom: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json(documents);
  } catch (error) {
    console.error("Erreur lors de la récupération des documents:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};

const uploadDocument = async (req: any, res: any, userId: number) => {
  try {
    // Ensure upload directory exists
    await ensureDirectoryExists(UPLOAD_DIR);

    const form = formidable({
      maxFileSize: MAX_FILE_SIZE,
      uploadDir: UPLOAD_DIR, // Upload directement dans le répertoire final
      keepExtensions: true,
      filename: (name, ext, part) => {
        // Générer un nom unique directement
        const timestamp = Date.now();
        const uuid = uuidv4().substring(0, 8);
        const sanitizedName = sanitizeFilename(part.originalFilename || "file");
        return `${timestamp}-${uuid}-${sanitizedName}`;
      },
    });

    const result = await new Promise<[formidable.Fields, formidable.Files]>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });
    const fields = result[0];
    const files = result[1];
    
    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    const nom = Array.isArray(fields.nom) ? fields.nom[0] : fields.nom;
    const description = Array.isArray(fields.description) ? fields.description[0] : fields.description;
    const categorie = Array.isArray(fields.categorie) ? fields.categorie[0] : fields.categorie;

    if (!file || !nom || !categorie) {
      return res.status(400).json({ error: "Fichier, nom et catégorie requis" });
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.mimetype || "")) {
      await fs.unlink(file.filepath);
      return res.status(400).json({ 
        error: "Type de fichier non autorisé. Types acceptés: PDF, DOC, DOCX, PNG, JPG" 
      });
    }

    // Check if document exists for this category and replace it
    const existingDocument = await prisma.documentPublic.findFirst({
      where: { categorie: categorie as any },
    });

    if (existingDocument) {
      // Delete the old file
      const oldFilePath = path.join(UPLOAD_DIR, existingDocument.path);
      try {
        await fs.unlink(oldFilePath);
      } catch (error) {
        console.warn("Ancien fichier déjà supprimé ou non trouvé:", oldFilePath);
      }
      
      // Delete from database
      await prisma.documentPublic.delete({
        where: { id: existingDocument.id },
      });
    }

    // Le fichier est déjà dans le bon répertoire, on récupère juste son nom
    const fileName = path.basename(file.filepath);

    // Save to database
    const document = await prisma.documentPublic.create({
      data: {
        nom: nom as string,
        description: description as string || null,
        fileName,
        originalName: file.originalFilename || "",
        mimeType: file.mimetype || "",
        size: file.size || 0,
        path: fileName,
        categorie: categorie as any,
        uploadedBy: userId,
      },
      include: {
        user: {
          select: {
            prenom: true,
            nom: true,
            email: true,
          },
        },
      },
    });

    return res.status(201).json(document);
  } catch (error) {
    console.error("Erreur lors de l'upload:", error);
    return res.status(500).json({ error: "Erreur lors de l'upload" });
  }
};

const updateDocument: NextApiHandler = async (req, res) => {
  try {
    const { id, nom, description, categorie } = req.body;

    if (!id || !nom) {
      return res.status(400).json({ error: "ID et nom requis" });
    }

    const document = await prisma.documentPublic.update({
      where: { id: parseInt(id) },
      data: {
        nom,
        description: description || null,
        categorie,
      },
      include: {
        user: {
          select: {
            prenom: true,
            nom: true,
            email: true,
          },
        },
      },
    });

    return res.status(200).json(document);
  } catch (error) {
    console.error("Erreur lors de la mise à jour:", error);
    return res.status(500).json({ error: "Erreur lors de la mise à jour" });
  }
};

const deleteDocument: NextApiHandler = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "ID requis" });
    }

    const document = await prisma.documentPublic.findUnique({
      where: { id: parseInt(id as string) },
    });

    if (!document) {
      return res.status(404).json({ error: "Document non trouvé" });
    }

    // Delete file from filesystem
    const filePath = path.join(UPLOAD_DIR, document.path);
    try {
      await fs.unlink(filePath);
    } catch (error) {
      console.warn("Fichier déjà supprimé ou non trouvé:", filePath);
    }

    // Delete from database
    await prisma.documentPublic.delete({
      where: { id: parseInt(id as string) },
    });

    return res.status(200).json({ message: "Document supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    return res.status(500).json({ error: "Erreur lors de la suppression" });
  }
};

const ensureDirectoryExists = async (dir: string) => {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
};

const sanitizeFilename = (filename: string) => {
  return filename
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9.-]/g, "_")
    .toLowerCase();
};

export default withSentry(handler);
