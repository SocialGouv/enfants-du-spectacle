import { Title } from "@dataesr/react-dsfr";
import type { Commission, Dossier } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import type { GetServerSideProps } from "next";
import Link from "next/link";
import { getSession, useSession } from "next-auth/react";
import React from "react";
import Layout from "src/components/Layout";
import authMiddleware from "src/lib/authMiddleware";
import { frenchDateText, frenchDepartementName } from "src/lib/helpers";
import styles from "src/styles/commissions.module.scss";

type CommissionWithCounts = Commission & {
  dossiers: (Dossier & {
    _count: {
      enfants: number;
    } | null;
  })[];
};

interface RowProps {
  commission: CommissionWithCounts;
}

const CommissionRow: React.FC<RowProps> = ({ commission }) => {
  const dossiersCount = commission.dossiers.length;
  const enfantsCount = commission.dossiers
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
        <b>{dossiersCount}</b> dossiers
      </div>
      <div>
        <b>{enfantsCount}</b> enfants
      </div>
      <div>
        <Link href={`/commissions/${commission.id}`}>
          <a
            href={`/commissions/${commission.id}`}
            className={styles.seeDossiers}
          >
            Voir le détail des dossiers
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

  if (!session) throw Error("no session on protected page");

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
  const redirectTo = authMiddleware(session);
  if (redirectTo) return redirectTo;

  const prisma = new PrismaClient();
  const commissions = await prisma.commission.findMany({
    include: {
      dossiers: {
        include: {
          _count: { select: { enfants: true } },
        },
      },
    },
    orderBy: { date: "desc" },
    where: { date: { lt: new Date() }, dossiers: { some: {} } },
  });
  return { props: { commissions, session } };
};

export default Page;
