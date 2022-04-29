import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { getDatasFromDS } from "src/lib/queries";
import superjson from "superjson";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
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

const get: NextApiHandler = async (req, res) => {
  const dossierExternalId = req.query.externalid;
  const fetching = await getDatasFromDS(parseInt(dossierExternalId));
  res.status(fetching.errors ? 500 : 200).json(superjson.stringify(fetching));
};

export default withSentry(handler);
