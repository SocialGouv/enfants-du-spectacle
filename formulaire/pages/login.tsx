import { Callout, CalloutText, CalloutTitle, Container, Title } from "@dataesr/react-dsfr";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import ConnexionForm from "../src/components/ConnexionForm";
import IconLoader from "../src/components/IconLoader";
import Layout from "../src/components/Layout";

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
      <Container>
        <div className="card">
          <Title as="h2">Connexion</Title>
          {loading && (
            <div style={{ padding: "2rem" }}>
              <IconLoader />
            </div>
          )}
          {!loading && !session && <ConnexionForm />}
          <Callout>
            <CalloutTitle as="h3">Interface agents</CalloutTitle>
            <CalloutText>
              Interface demandeur, ce site est destiné aux personnes souhaitant déposer un dossier concernant les enfants du spectacle.
            </CalloutText>
            <div style={{ marginTop: "2rem" }}>
              <Link href="https://beta.gouv.fr/startups/enfants-du-spectacle.html">
                Plus dʼinformations sur le service ↗
              </Link>
            </div>
          </Callout>
        </div>
      </Container>
    </Layout>
  );
};

export default Home;