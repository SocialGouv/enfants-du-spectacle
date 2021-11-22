import { Title } from "@dataesr/react-dsfr";
import type { User } from "@prisma/client";
import type { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Dossier from "src/components/Dossier";
import Layout from "src/components/Layout";
import authMiddleware from "src/lib/authMiddleware";
import { prisma } from "src/lib/prismaClient";
import { updateDossier } from "src/lib/queries";
import type { DossierData } from "src/lib/types";

interface Props {
  dossier: DossierData;
  allUsers: User[];
}

const Page: React.FC<Props> = (props) => {
  const { data: session } = useSession();

  const { allUsers } = props;
  const [dossier, setDossier] = useState(props.dossier);
  const [assignedUserId, setAssignedUserId] = useState(dossier.userId);

  useEffect(() => {
    setAssignedUserId(dossier.userId);
  }, [dossier.userId]);

  if (!session) throw Error("no session on protected page");

  function updateDossierAndReload(updates: {
    transitionEvent?: string;
    userId?: number;
  }): void {
    updateDossier(dossier, updates, (p) => {
      setDossier(p);
    });
  }

  const onChangeStatut = (transitionEvent: string) => {
    updateDossierAndReload({ transitionEvent });
  };

  const onAssignUserId = (userId: number | null) => {
    updateDossier(dossier, { userId }, (p) => {
      setDossier(p);
    });
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
        allUsers={allUsers}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const redirectTo = authMiddleware(session);
  if (redirectTo) return redirectTo;

  if (!context.params || !context.params.id) {
    throw Error("nono");
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
