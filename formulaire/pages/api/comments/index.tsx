import { Comments } from "@prisma/client";
import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../src/lib/prismaClient";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const handler: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).end();
    return;
  }
  if (req.method == "POST") {
    await post(req, res);
  } else if (req.method == "GET") {
    await get(req, res);
  } else if (req.method == "PUT") {
    await updateCommentairesNotifications(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

const get: NextApiHandler = async (req, res) => {
  const dossierId = req.query.dossierId as string;
  try {
    const comments = await prisma.comments.findMany({
      where: {
        dossierId: parseInt(dossierId),
      },
    });
    res.status(200).json(comments);
  } catch (e: unknown) {
    console.log(e);
  }
};
const updateCommentairesNotifications: NextApiHandler = async (req, res) => {
  let data = req.query as {
    commentIds: string[];
  };

  if (req.query.commentIds) {
    if (Array.isArray(req.query.commentIds)) {
      data.commentIds = req.query.commentIds;
    } else {
      data.commentIds = [req.query.commentIds];
    }
  }

  //console.log("data received : ", data.commentIds);

  const commentIds = data.commentIds.map((id: string) =>
    parseInt(id)
  ) as number[];

  //console.log("commentIds : ", commentIds);
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
};

const post: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  let data = JSON.parse(req.body) as Comments;
  //@ts-ignore
  data.userId = session?.dbUser.id;
  console.log("comment to create : ", data);
  try {
    const comment = await prisma.comments.create({ data });
    res.status(200).json(comment);
  } catch (e: unknown) {
    console.log(e);
  }
};

export default withSentry(handler);
