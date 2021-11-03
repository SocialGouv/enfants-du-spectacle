import { Title } from "@dataesr/react-dsfr";
import type { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import React from "react";
import CommissionBloc from "src/components/Commission";
import Layout from "src/components/Layout";
import type { CommissionData } from "src/lib/types";

import { PrismaClient } from ".prisma/client";

interface Props {
  commission: CommissionData;
}

const Page: React.FC<Props> = ({ commission }) => {
  const { data: session } = useSession();

  if (!session) {
    return <Layout>Veuillez vous connecter</Layout>;
  }

  return (
    <Layout headerMiddle={<Title as="h1">Commission </Title>}>
      <CommissionBloc commission={commission} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    if (!context.params || !context.params.id) {
      throw Error("nono");
    }
    const id = Number(context.params.id);
    const prisma = new PrismaClient();
    const commission = await prisma.commission.findUnique({
      include: {
        projets: {
          include: {
            _count: { select: { enfants: true } },
            societeProduction: true,
            user: true,
          },
          orderBy: { id: "desc" },
        },
      },
      where: { id },
    });
    return { props: { commission, session } };
  }
  return { props: { session } };
};

export default Page;
