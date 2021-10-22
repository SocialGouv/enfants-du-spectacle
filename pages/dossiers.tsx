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
      {commissions.map((commission: Commission) => (
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
  const props: { commissions: Commission[]; session: typeof session } = {
    commissions: [],
    session,
  };
  if (session) {
    const prisma = new PrismaClient();
    props.commissions = await prisma.commission.findMany({ take: 3 });
  }
  return { props };
};
