import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import superjson from "superjson";

import type { TransitionEvent } from "../../../lib/statutProjet";
import { factory as statutProjetStateMachineFactory } from "../../../lib/statutProjet";
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
  if (!parsed || typeof parsed.transitionEvent !== "string") {
    res.status(400).end();
    return;
  }
  const transition = parsed.transitionEvent;

  const prisma = new PrismaClient();
  const projet = await prisma.projet.findUnique({ where: { id: projetId } });
  if (!projet) {
    res.status(404).end();
    return;
  }

  const stateMachine = statutProjetStateMachineFactory(projet.statut as string);
  if (!stateMachine.transitions().includes(transition as TransitionEvent)) {
    res.status(400).end();
    return;
  }

  eval(`stateMachine.${transition}()`);
  const targetState = stateMachine.state;

  const updatedProjet = await prisma.projet.update({
    data: { statut: targetState },
    include: {
      agent: true,
      commission: true,
      enfants: true,
      societeProduction: true,
    },
    where: { id: projetId },
  });

  res.status(200).json(superjson.stringify(updatedProjet));
};

export default handler;
