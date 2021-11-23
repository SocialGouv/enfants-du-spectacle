import { Title } from "@dataesr/react-dsfr";
import type { StatutDossier, User } from "@prisma/client";
import type { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Dossier from "src/components/Dossier";
import Layout from "src/components/Layout";
import authMiddleware from "src/lib/authMiddleware";
import getPrismaClient from "src/lib/prismaClient";
import { updateDossier } from "src/lib/queries";
import type { DossierData } from "src/lib/types";

interface Props {
  dossier: DossierData;
  allUsers: User[];
}

const Page: React.FC<Props> = ({ allUsers, dossier: initialDossier }) => {
  const { data: session } = useSession();

  const [updatable, setUpdatable] = useState(true);
  const [dossier, setDossier] = useState(initialDossier);
  const [assignedUserId, setAssignedUserId] = useState(dossier.userId);

  useEffect(() => {
    setAssignedUserId(dossier.userId);
  }, [dossier.userId]);

  if (!session) throw Error("no session on protected page");

  function updateDossierAndReload(updates: {
    transitionEvent?: string;
    userId?: number | null;
  }): void {
    setUpdatable(false);
    updateDossier(dossier, updates, (p) => {
      setDossier(p);
      setUpdatable(true);
    });
  }

  const onChangeStatut = (
    transitionEvent: string,
    transitionTo: StatutDossier
  ) => {
    setDossier({ ...dossier, statut: transitionTo });
    updateDossierAndReload({ transitionEvent });
  };

  const onAssignUserId = (userId: number | null) => {
    setDossier({ ...dossier, userId });
    updateDossierAndReload({ userId });
  };

  const title = (
    <>
      <Title as="h1">{dossier.nom}</Title>
    </>
  );
  return (
    <Layout headerMiddle={title} windowTitle={dossier.nom}>
      <Dossier
        assignedUserId={assignedUserId}
        dossier={dossier}
        onAssignUserId={onAssignUserId}
        onChangeStatut={onChangeStatut}
        updatable={updatable}
        allUsers={allUsers}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const prisma = getPrismaClient();
  const session = await getSession(context);
  const redirectTo = authMiddleware(session);
  if (redirectTo) return redirectTo;

  if (!context.params || !context.params.id) {
    throw Error("invalid context.params for Dossier");
  }
  const id = parseInt(context.params.id as string, 10);
  const dossier = await prisma.dossier.findUnique({
    include: {
      commission: true,
      demandeur: true,
      enfants: true,
      societeProduction: true,
      user: true,
    },
    where: { id },
  });
  const allUsers = await prisma.user.findMany();
  return { props: { allUsers, dossier, session } };
};

export default Page;
