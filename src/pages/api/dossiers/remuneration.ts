import type { NextApiRequest, NextApiResponse } from "next";
import { withSentry } from "@sentry/nextjs";
import prismaClient from "src/lib/prismaClient";
import { getSession } from "next-auth/react";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    try {
      const { dossierId } = req.query;
      
      if (!dossierId || typeof dossierId !== "string") {
        return res.status(400).json({ error: "Missing or invalid dossierId" });
      }
      
      const dossier = await prismaClient.dossier.findUnique({
        where: { 
          id: parseInt(dossierId) 
        },
        include: {
          enfants: {
            include: {
              remuneration: true  // Inclure explicitement les rémunérations
            }
          },
          societeProduction: true,
          commission: true,
          instructeur: true,
          demandeur: true,
          piecesDossier: true,
          commentaires: true
        }
      });
      
      if (!dossier) {
        return res.status(404).json({ error: "Dossier not found" });
      }

      return res.status(200).json(dossier);
    } catch (error) {
      console.error("Error fetching dossier with remunerations:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withSentry(handler);
