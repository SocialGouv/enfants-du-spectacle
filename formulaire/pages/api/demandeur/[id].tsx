import type { NextApiHandler, NextApiRequest } from "next";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions }  from '../auth/[...nextauth]'

const handler: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
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
  const demandeurId = getId(req);
  try {
    const demandeur = await prisma.demandeur.findFirst({
      where: {
        id: demandeurId,
      },
    });
    res.status(200).json(demandeur);
  } catch (e: unknown) {
    console.log(e);
  }
};

const remove: NextApiHandler = async (req, res) => {
  const prisma = new PrismaClient();
  try {
    const demandeurId = getId(req);
    await prisma.demandeur.delete({
      where: { id: demandeurId },
    });

    const url = `${process.env.API_URL_INSTRUCTEUR}/inc/demandeurs/${demandeurId}`;

    const fetching = fetch(url, {
      body: JSON.stringify({ api_key: process.env.API_KEY_SDP }),
      method: "DELETE",
    }).then(async (r) => {
      if (!r.ok) {
        throw Error(`got status ${r.status}`);
      }
      return r.json();
    });
    await prisma?.$disconnect()

    res.status(200).json({ message: "Demandeur supprimé" });
  } catch (e: unknown) {
    await prisma?.$disconnect()
    console.log(e);
    res.status(200).json({ message: "Demandeur non trouvé" });
  }
};

export default handler;
