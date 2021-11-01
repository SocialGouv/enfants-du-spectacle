import type { StatutProjet } from "@prisma/client";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import type { TransitionEvent } from "src/lib/statutProjetStateMachine";
import { factory as statutProjetStateMachineFactory } from "src/lib/statutProjetStateMachine";
import superjson from "superjson";

import { PrismaClient } from ".prisma/client";

const handler: NextApiHandler = async (req, res) => {
  const { id: projetIdStr } = req.query;
  if (typeof projetIdStr !== "string") {
    res.status(404).send(`${projetIdStr} is not a valid projet id`);
    return;
  }
  const projetId = parseInt(projetIdStr, 10);

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

  const prisma = new PrismaClient();
  const updates: { statut?: StatutProjet; userId?: number } = {};

  if (typeof parsed.transitionEvent === "string") {
    const transition = parsed.transitionEvent;

    const projet = await prisma.projet.findUnique({ where: { id: projetId } });
    if (!projet) {
      res.status(404).end();
      return;
    }

    const stateMachine = statutProjetStateMachineFactory(projet.statut);
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

  const updatedProjet = await prisma.projet.update({
    data: updates,
    include: {
      commission: true,
      enfants: true,
      societeProduction: true,
      user: true,
    },
    where: { id: projetId },
  });

  res.status(200).json(superjson.stringify(updatedProjet));
};

export default handler;
