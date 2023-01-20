import { PieceDossier } from "@prisma/client";
import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../src/lib/prismaClient";
import fs from "fs";

const handler: NextApiHandler = async (req, res) => {
    const session = await getSession({ req });
    if (!session) {
      res.status(401).end();
      return;
    }
    if (req.method == "POST") {
      await post(req, res);
    } else {
      res.status(405).end();
      return;
    }
};

const post: NextApiHandler = async (req, res) => {
    const data = JSON.parse(req.body) as PieceDossier
    try {
      const piece = await prisma.pieceDossier.create({ data });
      res.status(200).json(piece);
    } catch (e: unknown) {
      console.log(e);
    }
};

export default withSentry(handler);