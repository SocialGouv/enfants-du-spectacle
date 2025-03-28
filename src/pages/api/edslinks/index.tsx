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

  console.log("fetching for : ", dossierExternalId);

  const url = `${process.env.API_URL_SDP}/inc/docs?externalId=${dossierExternalId}&token=${process.env.API_KEY_SDP}`;
  console.log("url : ", url);
  const fetching = await fetch(url.split(",").join(""), {
    method: "GET",
  }).then(async (r) => {
    if (!r.ok) {
      res.status(500).json({ error: `Something went wrong : ${r.status}` });
    }
    return r.json();
  });
  res.status(fetching.errors ? 500 : 200).json(fetching);
};

export default withSentry(handler);
