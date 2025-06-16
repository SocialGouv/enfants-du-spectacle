import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  
  if (!session?.dbUser || session.dbUser.role !== "ADMIN") {
    return res.status(403).json({ error: "Accès refusé" });
  }

  // Rediriger vers l'API du formulaire
  const formulaireUrl = process.env.FORMULAIRE_URL || "http://localhost:3001";
  const targetUrl = `${formulaireUrl}/api/admin/documents`;

  if (req.method === "GET") {
    return await proxyRequest(req, res, targetUrl, "GET");
  } else if (req.method === "POST") {
    return await proxyRequest(req, res, targetUrl, "POST");
  } else if (req.method === "PUT") {
    return await proxyRequest(req, res, targetUrl, "PUT");
  } else if (req.method === "DELETE") {
    return await proxyRequest(req, res, targetUrl, "DELETE");
  } else {
    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    return res.status(405).json({ error: "Méthode non autorisée" });
  }
};

const proxyRequest = async (req: any, res: any, targetUrl: string, method: string) => {
  try {
    const session = await getSession({ req });
    
    if (method === "GET") {
      // Pour GET, on passe les query params
      const url = new URL(targetUrl);
      if (req.query.categorie) {
        url.searchParams.append("categorie", req.query.categorie as string);
      }
      if (req.query.id) {
        url.searchParams.append("id", req.query.id as string);
      }

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Cookie": req.headers.cookie || "",
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      return res.status(response.status).json(data);
    } else if (method === "DELETE") {
      // Pour DELETE, on passe l'ID dans l'URL
      const url = `${targetUrl}${req.query.id ? `?id=${req.query.id}` : ""}`;
      
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Cookie": req.headers.cookie || "",
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      return res.status(response.status).json(data);
    } else if (method === "PUT") {
      // Pour PUT, on passe le body JSON
      const response = await fetch(targetUrl, {
        method: "PUT",
        headers: {
          "Cookie": req.headers.cookie || "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      });

      const data = await response.json();
      return res.status(response.status).json(data);
    } else if (method === "POST") {
      // Pour POST avec formdata, on doit traiter différemment
      const form = formidable({
        maxFileSize: 5 * 1024 * 1024, // 5MB
        uploadDir: "/tmp",
        keepExtensions: true,
      });

      const result = await new Promise<[formidable.Fields, formidable.Files]>((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          else resolve([fields, files]);
        });
      });
      
      const [fields, files] = result;
      
      // Créer un FormData pour la requête
      const formData = new FormData();
      
      // Ajouter les champs
      Object.entries(fields).forEach(([key, value]) => {
        const val = Array.isArray(value) ? value[0] : value;
        if (val) formData.append(key, val);
      });
      
      // Ajouter le fichier
      if (files.file) {
        const file = Array.isArray(files.file) ? files.file[0] : files.file;
        if (file.filepath) {
          const fs = await import("fs");
          const fileBuffer = fs.readFileSync(file.filepath);
          const blob = new Blob([fileBuffer], { type: file.mimetype || "application/octet-stream" });
          formData.append("file", blob, file.originalFilename || "file");
        }
      }

      const response = await fetch(targetUrl, {
        method: "POST",
        headers: {
          "Cookie": req.headers.cookie || "",
        },
        body: formData,
      });

      const data = await response.json();
      return res.status(response.status).json(data);
    }
  } catch (error) {
    console.error("Erreur lors du proxy:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};

export default withSentry(handler);
