import { Callout, CalloutText, CalloutTitle, Title } from "@dataesr/react-dsfr";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import ConnexionForm from "src/components/ConnexionForm";
import Layout from "src/components/Layout";

const Home: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const loading = status === "loading";

  useEffect(() => {
    if (!loading && session)
      router.push("/dossiers").catch((e) => {
        throw e;
      });
  }, [session, loading]);

  return (
    <Layout windowTitle="">
      <div className="card">
        <Title as="h2">Connexion</Title>
        {!loading && !session && <ConnexionForm />}
        <Callout>
          <CalloutTitle as="h3">Interface agents</CalloutTitle>
          <CalloutText>
            Ce site est destiné aux agents de la DRIEETS dʼÎle-de-France en
            charge des dossiers de demande d’emploi d’enfants du spectacle
            uniquement
          </CalloutText>
          <div style={{ marginTop: "2rem" }}>
            <Link href="https://beta.gouv.fr/startups/enfants-du-spectacle.html">
              Plus dʼinformations sur le service ↗
            </Link>
          </div>
        </Callout>
      </div>
    </Layout>
  );
};

export default Home;
