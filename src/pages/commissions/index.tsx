import { Icon, Title } from "@dataesr/react-dsfr";
import type { Commission, Dossier } from "@prisma/client";
import Link from "next/link";
import React from "react";
import Layout from "src/components/Layout";
import { useCommissions } from "src/lib/api";
import { frenchDateText, frenchDepartementName } from "src/lib/helpers";
import useProtectedPage from "src/lib/useProtectedPage";
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

const Page: React.FC = () => {
  const { loading: loadingSession } = useProtectedPage();
  const { commissions, isLoading, isError } = useCommissions("past");

  if (isLoading || loadingSession) return <Icon name="ri-loader-line" />;
  if (isError || !commissions) return <Icon name="ri-error" />;

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

export default Page;
