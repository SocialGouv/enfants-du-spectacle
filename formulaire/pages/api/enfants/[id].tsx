import type { NextApiHandler, NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import client from "src/lib/prismaClient";

const handler: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).end();
    return;
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

const remove: NextApiHandler = async (req, res) => {
  try {
    const enfantId = getId(req);
    const enfantDeleted = await client.enfant.delete({
      where: { id: enfantId },
    });

    const url = `${process.env.API_URL_INSTRUCTEUR}/inc/enfant/${enfantId}`;

    const fetching = fetch(url, {
      body: JSON.stringify({ api_key: process.env.API_KEY_SDP }),
      method: "DELETE",
    }).then(async (r) => {
      if (!r.ok) {
        throw Error(`got status ${r.status}`);
      }
      return r.json();
    });

    res.status(200).json({ message: fetching });
  } catch (e: unknown) {
    console.log(e);
    res.status(200).json({ message: "Enfant non trouvé" });
  }
};

export default handler;
