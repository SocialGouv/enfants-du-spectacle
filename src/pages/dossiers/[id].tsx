import { Icon, Title } from "@dataesr/react-dsfr";
import { useRouter } from "next/router";
import React from "react";
import Dossier from "src/components/Dossier";
import Layout from "src/components/Layout";
import { useDossier } from "src/lib/api";
import useProtectedPage from "src/lib/useProtectedPage";

const Page: React.FC = () => {
  const { session, loading } = useProtectedPage();
  const router = useRouter();

  const dossierId =
    typeof router.query.id == "string" ? Number(router.query.id) : null;
  const { dossier, isLoading, isError } = useDossier(dossierId);

  if (isLoading || loading || !session) return <Icon name="ri-loader-line" />;
  if (isError || !dossierId || !dossier) return <Icon name="ri-error" />;

  const title = (
    <>
      <Title as="h1">{dossier.nom}</Title>
    </>
  );
  return (
    <Layout headerMiddle={title} windowTitle={dossier.nom}>
      <Dossier dossierId={dossierId} />
    </Layout>
  );
};

export default Page;
