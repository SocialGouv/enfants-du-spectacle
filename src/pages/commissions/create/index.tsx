import { Icon, Title } from "@dataesr/react-dsfr";
import type { Commission, Dossier } from "@prisma/client";
import Link from "next/link";
import React from "react";
import AddCommission from "src/components/AddCommission";
import IconLoader from "src/components/IconLoader";
import Layout from "src/components/Layout";
import { useCommissions } from "src/lib/api";
import { frenchDateText, frenchDepartementName } from "src/lib/helpers";
import { createCommission, removeCommission } from "src/lib/queries";
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
  deleteCommission: (id: number) => void;
}

const CommissionRow: React.FC<RowProps> = ({
  commission,
  deleteCommission,
}) => {
  const dossiersCount = commission.dossiers.length;
  /*const enfantsCount = commission.dossiers
    .map((p) => p._count?.enfants ?? 0)
    .reduce((i, b) => i + b, 0);*/

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
        limite dépôt : <b>{frenchDateText(commission.dateLimiteDepot)}</b>
      </div>
      <div>
        <Link href={`/commissions/create`}>
          <a
            href={`/commissions/create`}
            className={styles.seeDossiers}
            onClick={() => {
              deleteCommission(commission.id);
            }}
          >
            Supprimer la commission
          </a>
        </Link>
      </div>
    </div>
  );
};

const Page: React.FC = () => {
  const { commissions, ...swrCommissions } = useCommissions(
    "upcoming",
    "all",
    false
  );
  const isLoading = swrCommissions.isLoading;
  const isError = !isLoading && (swrCommissions.isError || !commissions);

  const deleteCommission = (id: number) => {
    removeCommission(id);
  };

  const addCommission = (e: React.FormEvent, formData: Commission) => {
    e.preventDefault();
    const commission: Commission = {
      date: new Date(formData.date),
      dateLimiteDepot: new Date(formData.dateLimiteDepot),
      departement: formData.departement,
    };
    createCommission(commission);
    console.log("commission : ", commission);
  };

  return (
    <Layout
      windowTitle="Commissions"
      headerMiddle={<Title as="h1">Commissions</Title>}
      breadcrumbs={[
        { href: "/", label: "Accueil" },
        { label: "Liste commissions" },
      ]}
    >
      {isLoading && <IconLoader />}
      {isError && <Icon name="ri-error" />}
      {!isLoading && !isError && commissions && (
        <>
          <AddCommission saveCommission={addCommission} />
          {commissions.map((commission) => (
            <CommissionRow
              key={commission.id}
              commission={commission}
              deleteCommission={deleteCommission}
            />
          ))}
        </>
      )}
    </Layout>
  );
};

Page.auth = true;

export default Page;
