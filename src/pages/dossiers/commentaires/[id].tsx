import { Icon, Title } from "@dataesr/react-dsfr";
import { useRouter } from "next/router";
import React from "react";
import { FaHome } from "react-icons/fa";
import Commentaires from "src/components/Commentaires";
import IconLoader from "src/components/IconLoader";
import Layout from "src/components/Layout";
import { useDossier } from "src/lib/api";

const Page: React.FC = () => {
  const router = useRouter();

  const dossierId =
    typeof router.query.id == "string" ? Number(router.query.id) : null;
  const { dossier, ...swrDossier } = useDossier(dossierId);

  const isLoading = swrDossier.isLoading;
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
        { href: "/dossiers", icon: <FaHome />, label: "Dossiers" },
        {
          href: "/dossiers/" /* + dossier?.id*/,
          label: /* dossier?.nom ?? */ "Dossier",
        },
        { label: "Commentaires" },
      ]}
    >
      {isLoading && <IconLoader />}
      {isError && <Icon name="ri-error" />}
      {!isLoading && !isError && dossierId && (
        <Commentaires dossierId={dossierId} />
      )}
    </Layout>
  );
};

Page.auth = true;

export default Page;
