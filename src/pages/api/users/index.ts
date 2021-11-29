import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import prisma from "src/lib/prismaClient";
import superjson from "superjson";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).end();
    return;
  }

  if (req.method == "GET") {
    await get(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

const get: NextApiHandler = async (req, res) => {
  const allUsers = await prisma.user.findMany({ orderBy: { name: "asc" } });
  res.status(200).json(superjson.stringify(allUsers));
};

export default withSentry(handler);
