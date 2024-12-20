import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { searchDossiers, searchEnfants } from "src/lib/queries";
import superjson from "superjson";

import client from "src/lib/prismaClient";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).end();
    return;
  }
  if (typeof req.query.search !== "string") {
    res.status(400).end();
    return;
  }
  const session = await getSession({ req });
  if (!session) {
    res.status(401).end();
    return;
  }

  const tsquery = req.query.search.trim().replace(/ +/g, " & ");

  const enfants = await searchEnfants(client, tsquery);
  const dossiers = await searchDossiers(client, tsquery);
  res.status(200).json({dossiers: dossiers, enfants: enfants});
};

export default withSentry(handler);
