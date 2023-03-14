import { Comments } from "@prisma/client";
import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { CommentaireNotifications } from "src/lib/types";
import prisma from "../../../../../src/lib/prismaClient";

const handler: NextApiHandler = async (req, res) => {
  if (req.method == "PUT") {
    await update(req, res);
  } else if (req.method == "POST") {
    await post(req, res);
  } else if (req.method == "GET") {
    await get(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

const update: NextApiHandler = async (req, res) => {
  const data = JSON.parse(req.body) as { id: string; api_key: string };

  console.log("data received : ", data);
  if (data.api_key !== process.env.API_KEY_SDP) {
    res.status(401).json({ error: `Unauthorized` });
  } else {
    const comments = await prisma.comments.findMany({
      where: {
        dossierId: parseInt(data.id as string),
      },
    });
    console.log("comments found : ", comments);
    res.status(200).json(comments);
  }
};

const post: NextApiHandler = async (req, res) => {
  const data = JSON.parse(req.body) as { comment: Comments; api_key: string };

  console.log("data received : ", data);
  if (data.api_key !== process.env.API_KEY_SDP) {
    res.status(401).json({ error: `Unauthorized` });
  } else {
    const comment = await prisma.comments.create({
      data: data.comment,
    });
    console.log("comments created : ", comment);
    res.status(200).json(comment);
  }
};

const get: NextApiHandler = async (req, res) => {
  const data = req.query;
  let ids = data.externalId as string[];
  const externalIds = ids.map((id: string) => parseInt(id)) as number[];
  console.log("data externalIds received : ", data);

  if (data.token !== process.env.API_KEY_SDP) {
    res.status(401).json({ error: `Unauthorized` });
  } else {
    const comments = await prisma.comments.findMany({
      where: {
        dossierId: {
          in: externalIds,
        },
      },
    });

    const commentsByDossier: CommentaireNotifications[] = externalIds.map(
      (externalId) => {
        const commentsChildren = comments.filter(
          (comment) =>
            comment.dossierId === externalId &&
            comment.enfantId !== null &&
            comment.source === "SOCIETE_PROD"
        );
        const commentsProject = comments.filter(
          (comment) =>
            comment.dossierId === externalId &&
            comment.enfantId === null &&
            comment.source === "SOCIETE_PROD"
        );
        const commentsProjectSeen = commentsProject.filter(
          (comment) => comment.seen !== null
        );
        const commentsChildrenSeen = commentsChildren.filter(
          (comment) => comment.seen !== null
        );
        const notificationsChildren =
          commentsChildren.length - commentsChildrenSeen.length;
        const notificationsProject =
          commentsProject.length - commentsProjectSeen.length;
        return {
          dossierId: externalId,
          notificationsChildren,
          notificationsProject,
        };
      }
    );

    res.status(200).json(commentsByDossier);
  }
};

export default withSentry(handler);
