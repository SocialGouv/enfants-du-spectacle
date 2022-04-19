import type { StatutDossier } from "@prisma/client";
import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler, NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import prisma from "src/lib/prismaClient";
import type { TransitionEvent } from "src/lib/statutDossierStateMachine";
import { factory as statutDossierStateMachineFactory } from "src/lib/statutDossierStateMachine";
import superjson from "superjson";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).end();
    return;
  }
  const { id: dossierIdStr } = req.query;
  if (typeof dossierIdStr !== "string") {
    res.status(404).send(`not a valid dossier id`);
    return;
  }

  if (req.method == "PUT") {
    await update(req, res);
  } else if (req.method == "GET") {
    await get(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

function getId(req: NextApiRequest): number {
  return Number(req.query.id as string);
}

const get: NextApiHandler = async (req, res) => {
  const dossierId = getId(req);

  const dossier = await prisma.dossier.findUnique({
    include: {
      commentaires: {
        include: {
          user: true,
        },
      },
      commission: true,
      demandeur: true,
      enfants: {
        include: {
          piecesDossier: true,
        },
      },
      piecesDossier: true,
      societeProduction: true,
      user: true,
    },
    where: { id: dossierId },
  });

  res.status(200).json(superjson.stringify(dossier));
};

const update: NextApiHandler = async (req, res) => {
  if (typeof req.body !== "string") {
    res.status(400).end();
    return;
  }

  const parsed = JSON.parse(req.body);
  if (!parsed) {
    res.status(400).end();
    return;
  }

  const updates: { statut?: StatutDossier; userId?: number; cdc?: number } = {};
  const dossierId = getId(req);

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
    const DS_SECRET = process.env.DEMARCHES_SIMPLIFIEES_API_KEY;
    if (updates.statut === "INSTRUCTION") {
      const query = `mutation dossierPasserEnInstruction($input: DossierPasserEnInstructionInput!) {
        dossierPasserEnInstruction(input: $input) {
          dossier {
            id
          }
          errors {
            message
          }
        }
      }`;
      try {
        await fetch("https://www.demarches-simplifiees.fr/api/v2/graphql", {
          body: JSON.stringify({
            operationName: "dossierPasserEnInstruction",
            query,
            variables: {
              input: {
                dossierId: dossier.externalId,
                instructeurId: "SW5zdHJ1Y3RldXItNDkxMzk=",
              },
            },
          }),
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${String(DS_SECRET)}`,
            "Content-Type": "application/json",
          },
          method: "POST",
        })
          .then(async (r) => r.json())
          .then((data: Response) => {
            return data;
          });
      } catch (e: unknown) {
        console.log(e);
      }
    } else if (updates.statut === "ACCEPTE") {
      const query = `mutation dossierAccepter($input: DossierAccepterInput!) {
        dossierAccepter(input: $input) {
          dossier {
            id
          }
          errors {
            message
          }
        }
      }`;
      try {
        await fetch("https://www.demarches-simplifiees.fr/api/v2/graphql", {
          body: JSON.stringify({
            operationName: "dossierAccepter",
            query,
            variables: {
              input: {
                dossierId: dossier.externalId,
                instructeurId: "SW5zdHJ1Y3RldXItNDkxMzk=",
                motivation: "J’accepte ce dossier",
              },
            },
          }),
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${String(DS_SECRET)}`,
            "Content-Type": "application/json",
          },
          method: "POST",
        })
          .then(async (r) => r.json())
          .then((data: Response) => {
            return data;
          });
      } catch (e: unknown) {
        console.log(e);
      }
    } else if (updates.statut === "REFUSE") {
      const query = `mutation dossierRefuser($input: DossierRefuserInput!) {
        dossierRefuser(input: $input) {
          dossier {
            id
          }
          errors {
            message
          }
        }
      }`;
      try {
        await fetch("https://www.demarches-simplifiees.fr/api/v2/graphql", {
          body: JSON.stringify({
            operationName: "dossierRefuser",
            query,
            variables: {
              input: {
                dossierId: dossier.externalId,
                instructeurId: "SW5zdHJ1Y3RldXItNDkxMzk=",
                motivation: "J’accepte ce dossier",
              },
            },
          }),
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${String(DS_SECRET)}`,
            "Content-Type": "application/json",
          },
          method: "POST",
        })
          .then(async (r) => r.json())
          .then((data: Response) => {
            return data;
          });
      } catch (e: unknown) {
        console.log(e);
      }
    }
  }

  if (typeof parsed.userId === "number" || parsed.userId === null) {
    updates.userId = parsed.userId;
  }

  if (typeof parsed.cdc === "number" || parsed.cdc === null) {
    updates.cdc = parsed.cdc;
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

export default withSentry(handler);
