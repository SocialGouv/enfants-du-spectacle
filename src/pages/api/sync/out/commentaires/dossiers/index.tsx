import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).end();
    return;
  }
  if (req.method == "GET") {
    await getCommentsNotificationsByDossierIds(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

const getCommentsNotificationsByDossierIds: NextApiHandler = async (
  req,
  res
) => {
  const dossierIds = req.query.externalId as string[];
  console.log("external Ids to get from : ", dossierIds);
  console.log('check : ', Array.isArray(dossierIds))

  const url = `${process.env.API_URL_SDP}/inc/commentaires${
    dossierIds.length > 0 ? "?" : ""
  }${Array.isArray(dossierIds) ? dossierIds.map((id, index) => {
    return `${index !== 0 ? "&" : ""}externalId=${id}`;
  }) : `externalId=${dossierIds}`}&token=${process.env.API_KEY_SDP}`
    .split(",")
    .join("");

    console.log('url : ', url)

  const fetching = await fetch(url, {
    method: "GET",
  }).then(async (r) => {
    if (!r.ok) {
      console.log("r : ", r.status);
      res.status(500).json({ error: `Something went wrong : ${r.status}` });
    }
    return r.json();
  });
  res.status(200).json(fetching);
};

export default withSentry(handler);
