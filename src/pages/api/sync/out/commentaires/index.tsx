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
    await getComments(req, res);
  } else if (req.method == "POST") {
    await postComment(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

const postComment: NextApiHandler = async (req, res) => {
  const url = `${process.env.API_URL_SDP}/inc/commentaires`;
  const fetching = await fetch(url, {
    body: JSON.stringify({
      comment: JSON.parse(req.body),
      api_key: process.env.API_KEY_SDP,
    }),
    method: "POST",
  }).then(async (r) => {
    if (!r.ok) {
      console.log("r : ", r.status);
      res.status(500).json({ error: `Something went wrong : ${r.status}` });
    }
    return r.json();
  });
  res.status(200).json(fetching);
};

const getComments: NextApiHandler = async (req, res) => {
  const dossierId = req.query.externalId as string;

  console.log("id to get from : ", dossierId);

  const url = `${process.env.API_URL_SDP}/inc/commentaires`;
  const fetching = await fetch(url, {
    body: JSON.stringify({ id: dossierId, api_key: process.env.API_KEY_SDP }),
    method: "PUT",
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
