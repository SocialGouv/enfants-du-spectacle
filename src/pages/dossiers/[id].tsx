import { Icon, Title } from "@dataesr/react-dsfr";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import Dossier from "src/components/Dossier";
import Layout from "src/components/Layout";
import { useDossier } from "src/lib/api";

const Page: React.FC = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();
  const dossierId = parseInt(router.query.id as string, 10);
  const { dossier, isLoading, isError } = useDossier(dossierId);

  useEffect(() => {
    if (!loading && !session)
      router.push("/?signinRequired=true").catch((e) => {
        throw e;
      });
  }, [session, loading]);

  if (isLoading || loading) return <Icon name="ri-loader-line" />;
  if (isError || !dossier) return <Icon name="ri-error" />;

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
