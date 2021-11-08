import { Title } from "@dataesr/react-dsfr";
import type { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Dossier from "src/components/Dossier";
import Layout from "src/components/Layout";
import authMiddleware from "src/lib/authMiddleware";
import { updateProjet } from "src/lib/queries";
import type { ProjetData } from "src/lib/types";

import type { User } from ".prisma/client";
import { PrismaClient } from ".prisma/client";

interface Props {
  projet: ProjetData;
  allUsers: User[];
}

const Page: React.FC<Props> = (props) => {
  const { data: session } = useSession();

  const { allUsers } = props;
  const [projet, setProjet] = useState(props.projet);
  const [assignedUserId, setAssignedUserId] = useState(projet.userId);

  useEffect(() => {
    setAssignedUserId(projet.userId);
  }, [projet.userId]);

  if (!session) throw Error("no session on protected page");

  function updateProjetAndReload(updates: {
    transitionEvent?: string;
    userId?: number;
  }): void {
    updateProjet(projet, updates, (p) => {
      setProjet(p);
    });
  }

  const onChangeStatut = (transitionEvent: string) => {
    updateProjetAndReload({ transitionEvent });
  };

  const onAssignUserId = (userId: number | null) => {
    updateProjet(projet, { userId }, (p) => {
      setProjet(p);
    });
  };

  const title = (
    <>
      <Title as="h1">{projet.nom}</Title>
    </>
  );
  return (
    <Layout headerMiddle={title} windowTitle={projet.nom}>
      <Dossier
        assignedUserId={assignedUserId}
        projet={projet}
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
  const prisma = new PrismaClient();
  const projet = await prisma.projet.findUnique({
    include: {
      commission: true,
      enfants: true,
      societeProduction: true,
      user: true,
    },
    where: { id },
  });
  const allUsers = await prisma.user.findMany();
  return { props: { allUsers, projet, session } };
};

export default Page;
