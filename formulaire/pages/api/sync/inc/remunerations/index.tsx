import { Remuneration } from "@prisma/client";
import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import prisma from "../../../../../src/lib/prismaClient";

const handler: NextApiHandler = async (req, res) => {
  if (req.method == "GET") {
    await get(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

const get: NextApiHandler = async (req, res) => {
  const data = req.query;
  let ids = data.externalId as string[];
  if (ids) {
    if (!Array.isArray(ids)) {
      ids = [ids];
    }
  }
  const externalIds = ids.map((id: string) => parseInt(id)) as number[];
  console.log("data externalIds received : ", data);

  if (data.token !== process.env.API_KEY_SDP) {
    res.status(401).json({ error: `Unauthorized` });
  } else {
    const remunerations = await prisma.remuneration.findMany({
      where: {
        enfantId: {
          in: externalIds,
        },
      },
    });
    console.log("REMUNERATIONS: ", remunerations);
    res.status(200).json(remunerations);
  }
};

export default withSentry(handler);
