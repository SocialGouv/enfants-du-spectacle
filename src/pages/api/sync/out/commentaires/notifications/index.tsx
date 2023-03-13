import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).end();
    return;
  }
  if (req.method == "PUT") {
    await updateComments(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

const updateComments: NextApiHandler = async (req, res) => {
  const commentIds = req.query.commentIds as string[];
  console.log("comment Ids to get from : ", commentIds);

  const url = `${process.env.API_URL_SDP}/inc/commentaires/notifications${
    commentIds.length > 0 ? "?" : ""
  }${commentIds.map((id, index) => {
    return `${index !== 0 ? "&" : ""}commentIds=${id}`;
  })}&token=${process.env.API_KEY_SDP}`
    .split(",")
    .join("");

  const fetching = await fetch(url, {
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
