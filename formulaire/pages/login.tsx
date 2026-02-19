import {
  Callout,
  CalloutText,
  CalloutTitle,
  Container,
  Title,
} from "@dataesr/react-dsfr";
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
          {/* <Title as="h2">Connexion</Title> */}
          {loading && (
            <div style={{ padding: "2rem" }}>
              <IconLoader />
            </div>
          )}
          {/* {!loading && !session && <ConnexionForm />} */}
            {/* <CalloutTitle as="h3">Interface demandeurs</CalloutTitle>
            <CalloutText>
              Ce site est destiné aux personnes souhaitant déposer un dossier de
              demande d'autorisations pour des mineurs de moins de 16 ans dans
              le secteur du spectacle.
            </CalloutText> */}
            <div style={{ marginTop: "1.5rem", padding: "1rem", backgroundColor: "#ffe9e6", borderLeft: "4px solid #ce0500" }}>
              <p style={{ fontWeight: "bold", marginBottom: "0.5rem", color: "#ce0500" }}>Nouveauté :</p>
              <p style={{ marginBottom: "0.5rem" }}>
                Depuis le 5 janvier 2026, un nouveau service est disponible sur la plateforme Démarche Numérique.
              </p>
              <p style={{ marginBottom: "0.5rem" }}>
                Le service pour déposer vos dossiers est désormais acccessible via le lien suivant :{" "}
                <a href="https://demarche.numerique.gouv.fr/commencer/enfants-du-spectacle-2026" target="_blank" rel="noopener noreferrer">
                  Enfants du Spectacle : Dépôt de dossier
                </a>
              </p>
              <p>
                À toutes fins utiles, voici le lien vers le site de la DRIEETS dédié aux enfants du spectacle et l'information qui y est indiquée :{" "}
                <a href="https://idf.drieets.gouv.fr/Enfants-du-spectacle-le-service-passe-au-numerique" target="_blank" rel="noopener noreferrer">
                  Enfants du spectacle : le service passe au numérique - Direction régionale interdépartementale de l'économie, de l'emploi, du travail et des solidarités (DREETS)
                </a>
              </p>
            </div>
            <div style={{ marginTop: "2rem" }}>
              <Link href="https://beta.gouv.fr/startups/enfants-du-spectacle.html">
                Plus d'informations sur le service ↗
              </Link>
            </div>
        </div>
      </Container>
    </Layout>
  );
};

export default Home;
