import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler, NextApiRequest } from "next";

import client from "src/lib/prismaClient";

const handler: NextApiHandler = async (req, res) => {
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
  const parsed = JSON.parse(req.body as string);
  const enfantId = getId(req);
  if (parsed.api_key !== process.env.API_KEY_SDP) {
    res.status(401).json({ error: `Unauthorized` });
  } else {
    try {
      await client.enfant.delete({
        where: { externalId: enfantId.toString() },
      });
    } catch (e: unknown) {
      console.log(e);
    }
  }
};

export default withSentry(handler);
