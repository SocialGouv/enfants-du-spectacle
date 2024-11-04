import type { NextApiHandler, NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import client from "src/lib/prismaClient";

const handler: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
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

function getId(req: NextApiRequest): number {
  return Number(req.query.id as string);
}

const get: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  // console.log("order : ", req.query.order);
  try {
    const dossierId = getId(req);
    const dossierConcerned = await client.dossier.findUnique({
      where: {
        id: dossierId,
      },
    });

    if (
      dossierConcerned?.userId === session?.dbUser.id ||
      dossierConcerned?.collaboratorIds.includes(session?.dbUser.id)
    ) {
      const enfantsByDossier = await client.enfant.findMany({
        take: req.query.numberByPage ? Number(req.query.numberByPage) : 25,
        skip: 25 * Number(req.query.page),
        include: {
          piecesDossier: true,
          remuneration: true,
          Comments: true,
        },
        where: {
          dossierId: dossierId,
        },
        orderBy: {
          [req.query.termToOrder as string]: req.query.order as string,
        },
      });
      const countEnfants = await client.enfant.count({
        where: {
          dossierId: dossierId,
        },
      });
      res.status(200).json({ enfants: enfantsByDossier, count: countEnfants });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (e) {
    console.log(e);
  }
};

export default handler;
