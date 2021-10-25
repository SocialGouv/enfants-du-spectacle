import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";

import { getCommissions } from "../../lib/queries";
import { PrismaClient } from ".prisma/client";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const session = await getSession({ req });
    if (session) {
      const prisma = new PrismaClient();
      const commissions = await getCommissions(
        prisma,
        req.query.search as string
      );
      res.status(200).json(commissions);
    } else {
      res.status(401);
    }
  } else {
    res.status(405);
  }
};

export default handler;
