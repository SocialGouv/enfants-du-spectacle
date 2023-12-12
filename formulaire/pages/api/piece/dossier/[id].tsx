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
  const { id: articleIdStr } = req.query;
  if (typeof articleIdStr !== "string") {
    res.status(404).send(`not a valid piece id`);
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
  const dossierId = getId(req);
  try {
    const pieces = await client.pieceDossier.findMany({
      where: {
        dossierId: dossierId,
      },
    });
    res.status(200).json(pieces);
  } catch (e: unknown) {
    console.log(e);
  }
};

const remove: NextApiHandler = async (req, res) => {
  try {
    const pieceId = getId(req);
    const dossierDeleted = await client.pieceDossier.delete({
      where: { id: pieceId },
    });
    res.status(200).json({ dossierDeleted });
  } catch (e: unknown) {
    console.log(e);
    res.status(200).json({ message: "Piece non trouvée" });
  }
};

export default handler;
