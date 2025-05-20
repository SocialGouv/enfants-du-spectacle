import type { NextApiHandler, NextApiRequest } from "next";
import { number } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import client from "src/lib/prismaClient";

const handler: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).end();
    return;
  }
  if (req.method == "GET") {
    await getUserById(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

const getUserById: NextApiHandler = async (req, res) => {
  let collaboratorIds: number[] | number = [];

  if (req.query.id) {
    if (Array.isArray(req.query.id)) {
      collaboratorIds = req.query.id.map((id) => {
        return parseInt(id);
      });
    } else {
      collaboratorIds = [parseInt(req.query.id)];
    }
  }
  try {
    const users = await client.user.findMany({
      where: {
        id: {
          in: collaboratorIds,
        },
      },
    });
    res.status(200).json(users);
  } catch (e: unknown) {
    console.log(e);
  }
};

export default handler;
