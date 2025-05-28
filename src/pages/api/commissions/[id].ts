import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler, NextApiRequest } from "next";
import superjson from "superjson";

import client from "src/lib/prismaClient";

const handler: NextApiHandler = async (req, res) => {
  const { id: commissionIdStr } = req.query;
  if (typeof commissionIdStr !== "string") {
    res.status(404).send(`not a valid commission id`);
    return;
  }

  if (req.method == "GET") {
    await get(req, res);
  } else if (req.method == "PUT") {
    await update(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

function getId(req: NextApiRequest): number {
  return Number(req.query.id as string);
}

const get: NextApiHandler = async (req, res) => {
  const id = getId(req);
  // Query commission data with included relations
  // TypeScript doesn't recognize all the fields, so we need to cast
  const commission = await (client.commission.findUnique as any)({
    include: {
      dossiers: {
        include: {
          _count: { select: { enfants: true } },
          demandeur: {
            include: {
              societeProduction: true
            }
          },
          piecesDossier: true,
          enfants: {
            include: {
              piecesDossier: true
            }
          },
          societeProduction: true,
          instructeur: true, // Use instructeur instead of user
          medecin: true,     // Include medecin as well
          comments: true
        },
        orderBy: { id: "desc" },
      },
    },
    where: { id },
  });

  // Log the fetched commission data to help debug
  if (commission) {
    // Safely access the commission data using optional chaining
    const dossierCount = commission?.dossiers?.length || 0;
    console.log(`Commission ${id} fetched with ${dossierCount} dossiers`);
    
    // Count dossiers with societeProduction
    let dossiersWithSocieteCount = 0;
    if (commission.dossiers) {
      for (const dossier of commission.dossiers) {
        if (dossier.societeProduction) {
          dossiersWithSocieteCount++;
        }
      }
      console.log(`Found ${dossiersWithSocieteCount} dossiers with societeProduction data out of ${dossierCount} total`);
    }
  } else {
    console.log(`Commission ${id} fetched but is null`);
  }

  res.status(200).json(commission);
};

const update: NextApiHandler = async (req, res) => {
  if (typeof req.body !== "string") {
    res.status(400).end();
    return;
  }

  const parsed = JSON.parse(req.body);
  if (!parsed) {
    res.status(400).end();
    return;
  }

  const updates: { lastSent?: Date; date?: Date; dateLimiteDepot?: Date } = {};

  if (parsed.lastSent !== null) {
    updates.lastSent = parsed.lastSent;
  }

  if (parsed.date !== null) {
    updates.date = parsed.date;
  }

  if (parsed.dateLimiteDepot !== null) {
    updates.dateLimiteDepot = parsed.dateLimiteDepot;
  }

  const updateCommission = await client.commission.update({
    data: updates,
    where: { id: parsed.id },
  });

  res.status(200).json(updateCommission);
};

export default withSentry(handler);
