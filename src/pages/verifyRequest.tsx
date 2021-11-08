import { Title } from "@dataesr/react-dsfr";
import type { GetServerSideProps } from "next";
import Link from "next/link";
import { getCsrfToken } from "next-auth/react";
import React from "react";
import Layout from "src/components/Layout";

const Home: React.FC = () => {
  return (
    <Layout windowTitle="Vérifiez votre boîte mail">
      <div className="card">
        <Title as="h1">Vérifiez votre boîte mail</Title>
        <p>Nous vous avons envoyé un email contenant un lien de connexion.</p>

        {process.env.NODE_ENV == "development" && (
          <p>
            <Link href="http://localhost:1080" passHref={true}>
              <a
                href="http://localhost:1080"
                style={{
                  backgroundColor: "#FA2200",
                  borderRadius: "20px",
                  color: "white",
                  padding: ".5rem",
                }}
              >
                <span role="img" aria-label="gear">
                  ⚙️
                </span>{" "}
                Ouvrir maildev ↗
              </a>
            </Link>
          </p>
        )}
        <Link href="/">← Retour à la page de connexion</Link>
      </div>
    </Layout>
  );
};

// This is the recommended way for Next.js 9.3 or newer
export const getServerSideProps: GetServerSideProps = async (context) => {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
};

export default Home;
