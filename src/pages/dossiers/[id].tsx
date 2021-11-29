import { Icon, Title } from "@dataesr/react-dsfr";
import { useRouter } from "next/router";
import React from "react";
import Dossier from "src/components/Dossier";
import IconLoader from "src/components/IconLoader";
import Layout from "src/components/Layout";
import { useDossier } from "src/lib/api";
import useProtectedPage from "src/lib/useProtectedPage";

const Page: React.FC = () => {
  const { session, loading } = useProtectedPage();
  const router = useRouter();

  const dossierId =
    typeof router.query.id == "string" ? Number(router.query.id) : null;
  const { dossier, ...swrDossier } = useDossier(dossierId);

  const isLoading = swrDossier.isLoading || loading || !session;
  const isError = !isLoading && (swrDossier.isError || !dossierId || !dossier);

  const title = (
    <>
      <Title as="h1">{dossier?.nom ?? <IconLoader />}</Title>
    </>
  );

  return (
    <Layout
      windowTitle={dossier?.nom ?? "Dossier"}
      headerMiddle={title}
      breadcrumbs={[
        { href: "/dossiers", label: "Dossiers" },
        { label: dossier?.nom ?? "Dossier" },
      ]}
    >
      {isLoading && <IconLoader />}
      {isError && <Icon name="ri-error" />}
      {!isLoading && !isError && dossierId && <Dossier dossierId={dossierId} />}
    </Layout>
  );
};

export default Page;
