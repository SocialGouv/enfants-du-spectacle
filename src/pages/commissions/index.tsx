import { Title } from "@dataesr/react-dsfr";
import type { GetServerSideProps } from "next";
import Link from "next/link";
import { getSession, useSession } from "next-auth/react";
import React from "react";
import Layout from "src/components/Layout";
import { frenchDateText, frenchDepartementName } from "src/lib/helpers";
import styles from "src/styles/commissions.module.scss";

import type { Commission, Projet } from ".prisma/client";
import { PrismaClient } from ".prisma/client";

type CommissionWithCounts = Commission & {
  projets: (Projet & {
    _count: {
      enfants: number;
    } | null;
  })[];
};

interface RowProps {
  commission: CommissionWithCounts;
}

const CommissionRow: React.FC<RowProps> = ({ commission }) => {
  const projetsCount = commission.projets.length;
  const enfantsCount = commission.projets
    .map((p) => p._count?.enfants ?? 0)
    .reduce((i, b) => i + b, 0);
  return (
    <div className={`${styles.row} card`}>
      <div>
        <span role="img" aria-label="hammer">
          🔨
        </span>{" "}
        <b>{frenchDateText(commission.date)}</b> -{" "}
        {frenchDepartementName(commission.departement)}
      </div>
      <div>
        <b>{projetsCount}</b> dossiers
      </div>
      <div>
        <b>{enfantsCount}</b> enfants
      </div>
      <div>
        <Link href={`/commissions/${commission.id}`}>
          <a
            href={`/commissions/${commission.id}`}
            className={styles.seeProjects}
          >
            Voir le détail des projets
          </a>
        </Link>
      </div>
    </div>
  );
};

interface Props {
  commissions: CommissionWithCounts[];
}

const Page: React.FC<Props> = ({ commissions }) => {
  const { data: session } = useSession();

  if (!session) {
    return <Layout windowTitle="Accès refusé">Veuillez vous connecter</Layout>;
  }

  return (
    <Layout
      windowTitle="Commissions passées"
      headerMiddle={<Title as="h1">Commissions passées</Title>}
    >
      {commissions.map((commission) => (
        <CommissionRow key={commission.id} commission={commission} />
      ))}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    const prisma = new PrismaClient();
    const commissions = await prisma.commission.findMany({
      include: {
        projets: {
          include: {
            _count: { select: { enfants: true } },
          },
        },
      },
      orderBy: { date: "desc" },
      where: { date: { lt: new Date() }, projets: { some: {} } },
    });
    return { props: { commissions, session } };
  }
  return { props: { session } };
};

export default Page;
