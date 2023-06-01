import type { NextApiHandler, NextApiRequest } from "next";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).end();
    return;
  }

  if (req.method == "GET") {
    await get(req, res);
  }

  if (req.method == "DELETE") {
    await remove(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

function getId(req: NextApiRequest): number {
  return Number(req.query.id as string);
}

const get: NextApiHandler = async (req, res) => {
  const prisma = new PrismaClient();
  const enfantId = getId(req);
  try {
    const remuneration = await prisma.remuneration.findMany({
      where: {
        enfantId: enfantId,
      },
    });
    res.status(200).json(remuneration);
  } catch (e: unknown) {
    console.log(e);
  }
};

const remove: NextApiHandler = async (req, res) => {
  const prisma = new PrismaClient();
  try {
    const remunerationId = getId(req);
    await prisma.remuneration.delete({
      where: { id: remunerationId },
    });

    const url = `${process.env.API_URL_INSTRUCTEUR}/inc/remuneration/${remunerationId}`;

    const fetching = fetch(url, {
      body: JSON.stringify({ api_key: process.env.API_KEY_SDP }),
      method: "DELETE",
    }).then(async (r) => {
      if (!r.ok) {
        throw Error(`got status ${r.status}`);
      }
      return r.json();
    });

    res.status(200).json({ message: "Rémunération supprimée" });
  } catch (e: unknown) {
    console.log(e);
    res.status(200).json({ message: "Rémunération non trouvée" });
  }
};

export default handler;
