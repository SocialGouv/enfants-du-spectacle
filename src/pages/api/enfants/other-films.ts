import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import client from "src/lib/prismaClient";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).end();
    return;
  }

  if (req.method === "POST") {
    await getOtherFilms(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

const getOtherFilms: NextApiHandler = async (req, res) => {
  try {
    const { nameIds, currentDossierId } = req.body;
    
    if (!nameIds || !Array.isArray(nameIds) || nameIds.length === 0) {
      res.status(400).json({ error: "nameIds array is required" });
      return;
    }

    // Rechercher tous les enfants qui ont les mêmes nameId mais dans d'autres dossiers
    const otherFilms = await client.enfant.findMany({
      where: {
        nameId: {
          in: nameIds
        },
        dossierId: {
          not: currentDossierId
        }
      },
      include: {
        dossier: {
          select: {
            id: true,
            nom: true,
            categorie: true,
            dateDebut: true,
            dateFin: true,
            statut: true,
            societeProduction: {
              select: {
                nom: true,
                raisonSociale: true
              }
            }
          }
        }
      }
    });

    // Grouper les résultats par nameId
    const groupedResults = nameIds.reduce((acc: any, nameId: string) => {
      const filmsForChild = otherFilms.filter(enfant => enfant.nameId === nameId);
      if (filmsForChild.length > 0) {
        acc[nameId] = filmsForChild;
      }
      return acc;
    }, {});

    res.status(200).json(groupedResults);
  } catch (error) {
    console.error("Error fetching other films:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default withSentry(handler);
