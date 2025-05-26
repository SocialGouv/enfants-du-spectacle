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
      // Récupération des IDs d'enfants depuis la requête
      const { enfantIds } = req.query;
      
      // Vérifier si enfantIds est fourni et le convertir en array si nécessaire
      let enfantIdsArray: number[] = [];
      if (typeof enfantIds === "string") {
        enfantIdsArray = [parseInt(enfantIds)];
      } else if (Array.isArray(enfantIds)) {
        enfantIdsArray = enfantIds.map(id => parseInt(id as string));
      }
      
      // Si aucun ID n'est fourni, retourner un tableau vide
      if (enfantIdsArray.length === 0) {
        return res.status(200).json([]);
      }

      // Récupérer les rémunérations pour les enfants spécifiés
      const remunerations = await prismaClient.remuneration.findMany({
        where: {
          enfantId: { in: enfantIdsArray }
        },
        include: {
          Enfant: {
            select: {
              id: true,
              nom: true,
              prenom: true
            }
          }
        }
      });

      return res.status(200).json(remunerations);
    } catch (error) {
      console.error("Erreur lors de la récupération des rémunérations:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withSentry(handler);
