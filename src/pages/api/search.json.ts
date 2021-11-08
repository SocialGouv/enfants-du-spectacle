import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { searchEnfants, searchProjets } from "src/lib/queries";
import superjson from "superjson";

import { PrismaClient } from ".prisma/client";

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

  const prisma = new PrismaClient();
  const enfants = await searchEnfants(prisma, req.query.search);
  const projets = await searchProjets(prisma, req.query.search);
  res.status(200).json(superjson.stringify({ enfants, projets }));
};

export default handler;
