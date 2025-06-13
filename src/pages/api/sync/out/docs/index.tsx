import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import formidable from "formidable";
import FormData from "form-data";
import fs from "fs";
import prisma from "../../../../../lib/prismaClient";

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).end();
    return;
  }
  if (req.method == "POST") {
    await sendDoc(req, res);
  }
  if (req.method == "DELETE") {
    await deleteDoc(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

const deleteDoc: NextApiHandler = async (req, res) => {
  try {
    const docId = req.query.id as string;
    
    // First check if this is a PieceDossier or PieceDossierEnfant
    // Try to delete from PieceDossier first
    let deleted = await prisma.pieceDossier.deleteMany({
      where: {
        id: parseInt(docId),
      },
    });
    
    // If nothing was deleted, try PieceDossierEnfant
    if (deleted.count === 0) {
      deleted = await prisma.pieceDossierEnfant.deleteMany({
        where: {
          id: parseInt(docId),
        },
      });
    }
        
    // The physical file might still exist, but we've at least removed the database record
    res.status(200).json({ success: true, deleted: deleted.count });
  } catch (error) {
    console.error("Error deleting document:", error);
    res.status(500).json({ error: "Failed to delete document" });
  }
};

const sendDoc: NextApiHandler = async (req, res) => {
  const options: formidable.Options = {};

  try {
    // Define the return type for formidable
    interface FormidableResult {
      err: Error | null;
      fields: formidable.Fields;
      files: formidable.Files;
    }
    
    const data = await new Promise<FormidableResult>((resolve, reject) => {
      const form = formidable(options);
  
      form.parse(req, (err, fields, files) => {
        if (err) reject({ err });
        resolve({ err, fields, files } as FormidableResult);
      });
    });
      
    const dossierId = req.query.dossierId as string;
    const typeJustif = req.query.typeJustif as string;
    const enfantId = req.query.enfantId as string;
    
    // Find the dossier first to ensure it exists
    const dossier = await prisma.dossier.findUnique({
      where: {
        externalId: dossierId,
      },
    });
    
    if (!dossier) {
      return res.status(404).json({ error: "Dossier not found" });
    }
    
    // Process file - in a real implementation, you would upload to a storage service
    // and get back a URL. For now, we'll simulate this by creating a placeholder URL
    // Safely access file properties with type assertions
    const justificatifFile = data.files.justificatif as formidable.File;
    const fileName = justificatifFile.originalFilename || 'unnamed-file';
    const filePath = justificatifFile.filepath;
    
    // TODO: Implement file storage logic - for now, we'll use a placeholder
    const fileUrl = `/uploads/${dossierId}/${enfantId || 'dossier'}/${fileName}`;
    
    // Create the appropriate record in the database
    if (enfantId && enfantId !== 'null') {
      // This is a document for an enfant
      const enfant = await prisma.enfant.findFirst({
        where: {
          externalId: enfantId,
        },
      });
      
      if (!enfant) {
        return res.status(404).json({ error: "Enfant not found" });
      }
      
      // Create the piece for the enfant
      const piece = await prisma.pieceDossierEnfant.create({
        data: {
          type: typeJustif as any, // Cast to the enum type
          link: fileUrl,
          enfantId: enfant.id,
          dossierId: dossier.id,
          nom: fileName,
        },
      });
            
      res.status(200).json({ 
        message: "ok",
        piece: piece
      });
    } else {
      // This is a document for the dossier
      const piece = await prisma.pieceDossier.create({
        data: {
          type: typeJustif as any, // Cast to the enum type
          link: fileUrl,
          dossierId: dossier.id,
          nom: fileName,
        },
      });
      
      
      res.status(200).json({ 
        message: "ok",
        piece: piece
      });
    }
  } catch (error) {
    console.error("Error uploading document:", error);
    res.status(500).json({ error: "Failed to upload document" });
  }
};

export default withSentry(handler);
