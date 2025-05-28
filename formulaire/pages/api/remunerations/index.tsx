import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import prisma from "../../../src/lib/prismaClient";
import { Remuneration } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions }  from '../auth/[...nextauth]'

const handler: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).end();
    return;
  }
  if (req.method == "POST") {
    await post(req, res);
  } else if (req.method == "DELETE") {
    await remove(req, res);
  } else if (req.method == "PUT") {
    await update(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

const post: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  let data = JSON.parse(req.body) as Remuneration;
  try {
    const remuneration = await prisma.remuneration.create({ data });
    res.status(200).json(remuneration);
  } catch (e: unknown) {
    console.log(e);
  }
};

const remove: NextApiHandler = async (req, res) => {
  const enfantId = Number(req.body as string);
  try {
    await prisma.remuneration.deleteMany({
      where: { enfantId: enfantId },
    });

    res.status(200).json({ message: "Rémunérations supprimées" });
  } catch (e: unknown) {
    console.log(e);
    res.status(200).json({ message: "Rémunérations non trouvées" });
  }
};

export default withSentry(handler);
