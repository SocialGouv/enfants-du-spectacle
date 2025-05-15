import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";

import client from "src/lib/prismaClient";

/**
 * Helper endpoint to diagnose issues with societeProduction relations
 * This endpoint returns diagnostic information about dossiers and their societeProduction relations
 */
const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (
    !session ||
    (session.dbUser.role !== "ADMIN" &&
      session.dbUser.role !== "INSTRUCTEUR")
  ) {
    res.status(401).end();
    return;
  }

  if (req.method === "GET") {
    await checkSocieteProduction(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

const checkSocieteProduction: NextApiHandler = async (req, res) => {
  try {
    // 1. Check for dossiers with societeProductionId but missing societeProduction relation
    const dossiersWithId = await client.dossier.findMany({
      select: {
        id: true,
        nom: true,
        societeProductionId: true,
        societeProduction: true,
      },
      where: {
        societeProductionId: {
          not: null,
        },
      },
      take: 10, // Limit results
    });

    // 2. Check if societeProduction entities exist
    const societeProductionIds = dossiersWithId
      .map(d => d.societeProductionId)
      .filter(Boolean) as number[];
    
    const societeProductions = await client.societeProduction.findMany({
      where: {
        id: {
          in: societeProductionIds,
        },
      },
    });

    // 3. Check for any missing relations
    const missingRelations = dossiersWithId.filter(
      dossier => dossier.societeProductionId && !dossier.societeProduction
    );

    // 4. Prepare diagnostic information
    const diagnostic = {
      dossiersChecked: dossiersWithId.length,
      societeProductionsFound: societeProductions.length,
      missingRelations: missingRelations.length,
      details: {
        dossiersWithId: dossiersWithId.map(d => ({
          id: d.id,
          nom: d.nom,
          societeProductionId: d.societeProductionId,
          hasSocieteProduction: Boolean(d.societeProduction),
        })),
        societeProductions: societeProductions.map(s => ({
          id: s.id,
          nom: s.nom,
        })),
        missingRelations: missingRelations.map(d => ({
          dossierId: d.id,
          dossierNom: d.nom,
          societeProductionId: d.societeProductionId,
        })),
      },
    };

    res.status(200).json(diagnostic);
  } catch (error) {
    console.error("Error in societe-production diagnostic:", error);
    res.status(500).json({ error: "Internal server error during diagnostic" });
  }
};

export default withSentry(handler);
