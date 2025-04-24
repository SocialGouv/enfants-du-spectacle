import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { SocieteProductionModel } from "../../../src/lib/schemas";
import prisma from "../../../src/lib/prismaClient";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const handler: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).end();
    return;
  }
  if (req.method == "POST") {
    await post(req, res);
  } else if (req.method == "GET") {
    await get(req, res);
  } else if (req.method == "PUT") {
    await update(req, res);
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
        siret: siret,
      },
    });
    res.status(200).json(societe);
  } catch (e: unknown) {
    console.log(e);
  }
};

const update: NextApiHandler = async (req, res) => {
  console.log("in societe update");
  const data = JSON.parse(req.body);
  const societeData = SocieteProductionModel.omit({ id: true });
  try {
    const societe = await prisma.societeProduction.update({
      data: { ...societeData.parse(data) },
      where: {
        id: data.id,
      },
    });
    res.status(200).json(societe);
  } catch (e: unknown) {
    console.log(e);
  }
};

const post: NextApiHandler = async (req, res) => {
  console.log("in societe create");
  const data = JSON.parse(req.body);
  const societeData = SocieteProductionModel.omit({ id: true });
  try {
    const societe = await prisma.societeProduction.create({
      data: { ...societeData.parse(data) },
    });
    console.log("societe created : ", societe);
    res.status(200).json(societe);
  } catch (e: unknown) {
    console.log(e);
  }
};

export default withSentry(handler);
