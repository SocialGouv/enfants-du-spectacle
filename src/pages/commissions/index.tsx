import { Icon, Title } from "@dataesr/react-dsfr";
import type { Commission, Dossier } from "@prisma/client";
import Link from "next/link";
import React from "react";
import IconLoader from "src/components/IconLoader";
import Layout from "src/components/Layout";
import { useCommissions } from "src/lib/api";
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

const Page: React.FC = () => {
  const { commissions, ...swrCommissions } = useCommissions("past", "all");
  const isLoading = swrCommissions.isLoading;
  const isError = !isLoading && (swrCommissions.isError || !commissions);

  return (
    <Layout
      windowTitle="Commissions passées"
      headerMiddle={<Title as="h1">Commissions passées</Title>}
      breadcrumbs={[
        { href: "/dossiers", label: "Accueil" },
        { label: "Commissions passées" },
      ]}
    >
      {isLoading && <IconLoader />}
      {isError && <Icon name="ri-error" />}
      {!isLoading && !isError && commissions && (
        <>
          {commissions.map((commission) => (
            <CommissionRow key={commission.id} commission={commission} />
          ))}
        </>
      )}
    </Layout>
  );
};

Page.auth = true;

export default Page;
