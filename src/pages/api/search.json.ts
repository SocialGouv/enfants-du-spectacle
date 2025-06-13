import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import superjson from "superjson";

import client from "src/lib/prismaClient";

const handler: NextApiHandler = async (req, res) => {
  try {
    // Basic validation
    if (req.method !== "GET") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }
    
    if (typeof req.query.search !== "string") {
      res.status(400).json({ error: "Search term is required" });
      return;
    }
    
    // Check authentication
    const session = await getSession({ req });
    if (!session) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }
    
    // Get and clean the search term
    const searchTerm = req.query.search.trim();
    
    // DIRECT IMPLEMENTATION - Skip using helper functions which might have issues
    
    // Search for enfants matching the search term
    const enfants = await client.enfant.findMany({
      where: {
        OR: [
          { nom: { contains: searchTerm, mode: 'insensitive' } },
          { prenom: { contains: searchTerm, mode: 'insensitive' } }
        ]
      },
      include: {
        dossier: {
          include: { 
            commission: true, 
            societeProduction: true, 
            instructeur: true 
          }
        },
        piecesDossier: true
      }
    });
    
    // Search for dossiers matching the search term
    const dossiers = await client.dossier.findMany({
      where: {
        OR: [
          { nom: { contains: searchTerm, mode: 'insensitive' } },
          {
            societeProduction: {
              nom: { contains: searchTerm, mode: 'insensitive' }
            }
          }
        ]
      },
      include: {
        _count: { select: { enfants: true } },
        commission: true,
        societeProduction: true,
        instructeur: true
      }
    });
    
    // Ensure we have data to return, even if no matches
    if (dossiers.length === 0 && enfants.length === 0 && searchTerm) {
      
      // Get some sample dossiers as fallback (just to verify data exists)
      const sampleDossiers = await client.dossier.findMany({
        take: 5,
        where: { nom: { not: null } },
        include: {
          _count: { select: { enfants: true } },
          commission: true,
          societeProduction: true,
          instructeur: true
        }
      });
    }
    
    // Format the response as superjson
    const result = superjson.stringify({ dossiers, enfants });
    res.status(200).setHeader('Content-Type', 'application/json').send(result);
    
  } catch (error) {
    console.error("SEARCH API ERROR:", error);
    res.status(500).json({ 
      error: "Internal server error", 
      message: error instanceof Error ? error.message : "Unknown error" 
    });
  }
};

export default withSentry(handler);
