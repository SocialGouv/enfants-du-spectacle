import { Icon, Title } from "@dataesr/react-dsfr";
import { useRouter } from "next/router";
import React from "react";
import { FaHome } from "react-icons/fa";
import Dossier from "src/components/Dossier";
import IconLoader from "src/components/IconLoader";
import Layout from "src/components/Layout";
import { useDataDS, useDossier } from "src/lib/api";

const Page: React.FC = () => {
  const router = useRouter();

  const dossierId =
    typeof router.query.id == "string" ? Number(router.query.id) : null;
  const { dossier, ...swrDossier } = useDossier(dossierId);
  const { dataDS, ...swrDataDS } = useDataDS(true);
  console.log(dataDS);

  const isLoading = swrDossier.isLoading;
  const isError =
    !isLoading &&
    (swrDossier.isError || !dossierId || !dossier || swrDataDS.isError);

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
        { href: "/dossiers", icon: <FaHome />, label: "Dossiers" },
        { label: dossier?.nom ?? "Dossier" },
      ]}
    >
      {isLoading && <IconLoader />}
      {isError && <Icon name="ri-error" />}
      {!isLoading && !isError && dossierId && <Dossier dossierId={dossierId} />}
    </Layout>
  );
};

Page.auth = true;

export default Page;
