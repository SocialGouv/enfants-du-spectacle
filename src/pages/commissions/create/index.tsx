import { Icon, Title } from "@dataesr/react-dsfr";
import React from "react";
import Commissions from "src/components/CommissionsCreate";
import IconLoader from "src/components/IconLoader";
import Layout from "src/components/Layout";
import { useCommissions } from "src/lib/api";

const Page: React.FC = () => {
  const { commissions, ...swrCommissions } = useCommissions(
    "upcoming",
    "all",
    false
  );
  const isLoading = swrCommissions.isLoading;
  const isError = !isLoading && (swrCommissions.isError || !commissions);

  return (
    <Layout
      windowTitle="Commissions"
      headerMiddle={<Title as="h1">Commissions</Title>}
      breadcrumbs={[
        { href: "/dossiers", label: "Accueil" },
        { label: "Liste commissions" },
      ]}
    >
      {isLoading && <IconLoader />}
      {isError && <Icon name="ri-error" />}
      {!isLoading && !isError && commissions && (
        <>
          <Commissions commissions={commissions} />
        </>
      )}
    </Layout>
  );
};

Page.auth = true;

export default Page;
