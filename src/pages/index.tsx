import { Callout, CalloutText, CalloutTitle, Title } from "@dataesr/react-dsfr";
import type { GetServerSideProps } from "next";
import Link from "next/link";
import { getCsrfToken, getSession } from "next-auth/react";
import React from "react";
import ConnexionForm from "src/components/ConnexionForm";
import Layout from "src/components/Layout";

interface Props {
  csrfToken: string | undefined;
  signinRequired: boolean;
}

const Home: React.FC<Props> = ({ csrfToken, signinRequired }) => {
  return (
    <Layout windowTitle="">
      <div className="card">
        <Title as="h2">Connexion</Title>
        <ConnexionForm csrfToken={csrfToken} signinRequired={signinRequired} />
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/dossiers",
        permanent: false,
      },
    };
  }
  const csrfToken = await getCsrfToken(context);
  const signinRequired = context.query.signinRequired == "true";
  return {
    props: { csrfToken, signinRequired },
  };
};

export default Home;
