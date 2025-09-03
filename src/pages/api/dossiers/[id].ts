import type { Dossier, StatutDossier } from "@prisma/client";
import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler, NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import type { TransitionEvent } from "src/lib/statutDossierStateMachine";
import { factory as statutDossierStateMachineFactory } from "src/lib/statutDossierStateMachine";
import { Prisma } from "@prisma/client";

import client from "src/lib/prismaClient"
import { generateToken } from "src/lib/utils";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (
    !session ||
    (session.dbUser.role !== "ADMIN" &&
      session.dbUser.role !== "INSTRUCTEUR" &&
      session.dbUser.role !== "MEMBRE" &&
      session.dbUser.role !== "MEDECIN")
  ) {
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
  } else if (req.method == "DELETE") {
    await remove(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

function getId(req: NextApiRequest): number {
  return Number(req.query.id as string);
}

const get: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  const dossierId = getId(req);
  const isAdmin = session?.dbUser.role === "ADMIN"
  const where: Prisma.DossierWhereInput = {
    id: dossierId,
    ...(isAdmin ? {} : { archived: { not: true } }),
  };

  const dossier = await client.dossier.findUnique({
    include: {
      commentaires: {
        include: {
          user: true,
        },
      },
      commission: true,
      demandeur: {
        include : {
          societeProduction: true
        }
      },
      enfants: {
        where: session?.dbUser.role !== "MEDECIN" ?
        {}
        :
        {
          typeConsultation: {
            equals: "THALIE"
          }
        },
        include: {
          piecesDossier: true,
          remuneration: true, // Include remunerations for each enfant
        },
      },
      piecesDossier: true,
      societeProduction: true,
      instructeur: true, // Updated from 'user' to 'instructeur'
      medecin: true,
      // Cast to any to bypass type checking during schema transition
    } as any,
    where
  });

  
      res.status(200).json({
        ...dossier,
        docs: {
          dossier: {
            id: dossier?.id,
            piecesDossier: dossier?.piecesDossier?.map((piece: any) => {
              return generateToken(
                piece.id,
                dossier.id,
                piece.type,
                piece.link,
                piece.statut,
                piece.createdAt
              );
            }) || [],
          },
          enfants: dossier?.enfants.map((enfant: any) => {
            return {
              id: enfant.id,
              piecesDossier: enfant.piecesDossier?.map((piece: any) => {
                return generateToken(
                  piece.id,
                  dossier.id,
                  piece.type,
                  piece.link,
                  piece.statut,
                  piece.createdAt
                );
              }) || [],
            };
          }) || [],
        },
      });
};

const remove: NextApiHandler = async (req, res) => {
  const dossierId = getId(req);
  try {
    await client.dossier.delete({
      where: { id: dossierId },
    });
    res.status(200).json({ message: "Dossier supprimé" });
  } catch (e: unknown) {
    console.log(e);
    res.status(200).json({ message: "Dossier non trouvé" });
  }
};

const update: NextApiHandler = async (req, res) => {
  // Parsez le body de manière sécurisée
  let parsed;
  try {

    // Essayez de parser selon le type
    parsed = typeof req.body === 'string' 
      ? JSON.parse(req.body) 
      : req.body;

    if (!parsed) {
      res.status(400).json({ error: 'Invalid request body' });
      return;
    }
  } catch (error) {
    console.error('Erreur de parsing:', error);
    res.status(400).json({ error: 'Cannot parse request body' });
    return;
  }

  const updates: {
    statut?: StatutDossier;
    instructeurId?: number;
    medecinId?: number,
    cdc?: number;
    commissionId?: number;
    statusNotification?: string | null;
  } = {};
  const dossierId = getId(req);

  if (typeof parsed.transitionEvent === "string") {
    const transition = parsed.transitionEvent;

    const dossier: Dossier | null = await client.dossier.findUnique({
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

    (stateMachine as any)[transition]();
    updates.statut = stateMachine.state;
    const DS_SECRET = process.env.DEMARCHES_SIMPLIFIEES_API_KEY;
    if (dossier.source === "FORM_EDS") {
      const url = `${process.env.API_URL_SDP}/inc/dossiers`;
      const fetching = await fetch(url, {
        body: JSON.stringify({ dossier: dossier, statut: updates.statut }),
        method: "PUT",
      }).then(async (r) => {
        if (!r.ok) {
          return { error: "Something went wrong" };
        }
        return r.json();
      });
    }
  }

  if (typeof parsed.instructeurId === "number" || parsed.instructeurId === null) {
    updates.instructeurId = parsed.instructeurId;
  }
  
  // For backward compatibility
  if (typeof parsed.userId === "number" || parsed.userId === null) {
    updates.instructeurId = parsed.userId;
  }

  if (typeof parsed.medecinId === "number" || parsed.medecinId === null) {
    updates.medecinId = parsed.medecinId;
  }

  if (typeof parsed.commissionId === "number" || parsed.commissionId === null) {
    updates.commissionId = parsed.commissionId;
  }

  if (typeof parsed.cdc === "number" || parsed.cdc === null) {
    updates.cdc = parsed.cdc;
  }

  if (
    typeof parsed.statusNotification === null ||
    parsed.statusNotification === null
  ) {
    updates.statusNotification = parsed.statusNotification;
  }

  console.log("updates : ", updates);

  const updatedDossier = await client.dossier.update({
    data: updates as any, // Cast to any to bypass type checking during schema transition
    include: {
      commission: true,
      demandeur: true,
      enfants: true,
      societeProduction: true,
      instructeur: true,
      medecin: true,
      // Cast to any to bypass type checking during schema transition
    } as any,
    where: { id: dossierId },
  });

  res.status(200).json(updatedDossier);
};

export default withSentry(handler);
