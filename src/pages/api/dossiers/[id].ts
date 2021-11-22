import type { StatutDossier } from "@prisma/client";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import getPrismaClient from "src/lib/prismaClient";
import type { TransitionEvent } from "src/lib/statutDossierStateMachine";
import { factory as statutDossierStateMachineFactory } from "src/lib/statutDossierStateMachine";
import superjson from "superjson";

const handler: NextApiHandler = async (req, res) => {
  const prisma = getPrismaClient();
  const { id: dossierIdStr } = req.query;
  if (typeof dossierIdStr !== "string") {
    res.status(404).send(`${dossierIdStr} is not a valid dossier id`);
    return;
  }
  const dossierId = parseInt(dossierIdStr, 10);

  if (req.method !== "PUT") {
    res.status(405).end();
    return;
  }

  const session = await getSession({ req });
  if (!session) {
    res.status(401).end();
    return;
  }

  if (typeof req.body !== "string") {
    res.status(400).end();
    return;
  }

  const parsed = JSON.parse(req.body);
  if (!parsed) {
    res.status(400).end();
    return;
  }

  const updates: { statut?: StatutDossier; userId?: number } = {};

  if (typeof parsed.transitionEvent === "string") {
    const transition = parsed.transitionEvent;

    const dossier = await prisma.dossier.findUnique({
      where: { id: dossierId },
    });
    if (!dossier) {
      res.status(404).end();
      return;
    }

    const stateMachine = statutDossierStateMachineFactory(dossier.statut);
    if (!stateMachine.transitions().includes(transition as TransitionEvent)) {
      res.status(400).end();
      return;
    }

    eval(`stateMachine.${transition}()`);
    updates.statut = stateMachine.state;
  }

  if (typeof parsed.userId === "number" || parsed.userId === null) {
    updates.userId = parsed.userId;
  }

  const updatedDossier = await prisma.dossier.update({
    data: updates,
    include: {
      commission: true,
      demandeur: true,
      enfants: true,
      societeProduction: true,
      user: true,
    },
    where: { id: dossierId },
  });

  res.status(200).json(superjson.stringify(updatedDossier));
};

export default handler;
