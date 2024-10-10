import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler, NextApiRequest } from "next";

import { client } from "src/lib/prismaClient";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    await get(req, res);
  }
  if (req.method === "DELETE") {
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
  const dossierId = getId(req);

  if (parsed.api_key !== process.env.API_KEY_SDP) {
    res.status(401).json({ error: `Unauthorized` });
  } else {
    try {
      await client.dossier.delete({
        where: { externalId: dossierId.toString() },
      });
    } catch (e: unknown) {
      console.log(e);
    }
  }
};

const get: NextApiHandler = async (req, res) => {
  const reqData = req.query as { id: string };
  const match = /id=([^&]+)&token=([^&]+)/.exec(reqData.id);
  const id = match ? match[1] : "";
  const token = match ? match[2] : "";
  const data = { id, token };

  if (data.token !== process.env.API_KEY_INSTRUCTEUR) {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    try {
      console.log("try to fetch agent ...");
      if (data.id) {
        const dossier = await client.dossier.findFirst({
          where: { externalId: data.id.toString() },
        });
        const commission = await client.commission.findFirst({
          where: { id: dossier?.commissionId },
        });
        if (dossier?.userId) {
          const instructeur = await client.user.findFirst({
            where: { id: dossier.userId },
          });

          res.status(200).json({
            commissionDate: commission?.date,
            instructeur: instructeur,
          });
        } else {
          res.json({});
        }
      }
    } catch (e: unknown) {
      res.status(500).json({ message: "Internal server error" });
      console.log(e);
    }
  }
};

export default withSentry(handler);
