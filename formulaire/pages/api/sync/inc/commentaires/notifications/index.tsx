import { Comments } from "@prisma/client";
import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { CommentaireNotifications } from "src/lib/types";
// import prisma from "../../../../../src/lib/prismaClient";

const handler: NextApiHandler = async (req, res) => {
  if (req.method == "PUT") {
    await update(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

const update: NextApiHandler = async (req, res) => {
  let data = req.query as {
    commentIds: string[];
    token: string;
  };

  if (req.query.commentIds) {
    if (Array.isArray(req.query.commentIds)) {
      data.commentIds = req.query.commentIds;
    } else {
      data.commentIds = [req.query.commentIds];
    }
  }

  console.log("data received : ", data.commentIds);

  const commentIds = data.commentIds.map((id: string) =>
    parseInt(id)
  ) as number[];

  console.log("commentIds : ", commentIds);

  if (data.token !== process.env.API_KEY_SDP) {
    res.status(401).json({ error: `Unauthorized` });
  } else {
    const updateComments = await prisma?.comments.updateMany({
      data: {
        seen: true,
      },
      where: {
        id: {
          in: commentIds,
        },
      },
    });
    res.status(200).json(updateComments);
  }
};

export default withSentry(handler);
