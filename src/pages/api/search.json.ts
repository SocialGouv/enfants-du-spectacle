import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import getPrismaClient from "src/lib/prismaClient";
import { searchDossiers, searchEnfants } from "src/lib/queries";
import superjson from "superjson";

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

  const prisma = getPrismaClient();
  const enfants = await searchEnfants(prisma, req.query.search);
  const dossiers = await searchDossiers(prisma, req.query.search);
  res.status(200).json(superjson.stringify({ dossiers, enfants }));
};

export default handler;
