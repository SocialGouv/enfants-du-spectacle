import { SocieteProduction } from "@prisma/client";
import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../src/lib/prismaClient";

const handler: NextApiHandler = async (req, res) => {
    const session = await getSession({ req });
    if (!session) {
      res.status(401).end();
      return;
    }
    if (req.method == "POST") {
      await post(req, res);
    } if (req.method == "GET") {
      await get(req, res);
    } else {
      res.status(405).end();
      return;
    }
};

const get: NextApiHandler = async (req, res) => {
    const siret = req.query.siret as string;
    try {
      const societe = await prisma.societeProduction.findFirst({
        where: {
          siret: siret
        }
      })
      res.status(200).json(societe)
    } catch (e: unknown) {
      console.log(e);
    }
};

const post: NextApiHandler = async (req, res) => {
    const data = JSON.parse(req.body) as SocieteProduction
    try {
      const societe = await prisma.societeProduction.create({ data });
      res.status(200).json(societe);
    } catch (e: unknown) {
      console.log(e);
    }
};

export default withSentry(handler);