import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession, useSession } from "next-auth/react";
import React from "react";

import CommissionBloc from "../components/CommissionBloc";
import Layout from "../components/Layout";
import type { Commission } from ".prisma/client";
import { PrismaClient } from ".prisma/client";

export default function Page({
  commissions,
}: InferGetServerSidePropsType<typeof getServerSideProps>): React.ReactElement {
  const { data: session } = useSession();

  if (!session) {
    return <Layout>Veuillez vous connecter</Layout>;
  }

  return (
    <Layout>
      <h1>Demandes</h1>
      {commissions.map((commission: typeof commissions[0]) => (
        <CommissionBloc
          key={commission.date.toString()}
          commission={commission}
        />
      ))}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    const prisma = new PrismaClient();
    const commissions = await prisma.commission.findMany({
      include: {
        projets: {
          include: {
            _count: { select: { enfants: true } },
            agent: true,
            societeProduction: true,
          },
        },
      },
      take: 3,
    });
    return { props: { commissions, session } };
  }
  return { props: { session } };
};
