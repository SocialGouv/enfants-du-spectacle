import { Container } from "@dataesr/react-dsfr";
import Image from "next/image";
import * as React from "react";
import styles from "src/components/home/Intro.module.scss";
import logoEds from "src/images/logo.png";

const Intro: React.FC = () => {
  return (
    <section className={styles.introSection}>
      <Container>
        <div className={styles.introGrid}>
          <div className={styles.leftColumn}>
            <ul>
              <li>Votre société est francilienne</li>
              <li>
                Vous réalisez un spectacle avec un enfant de moins de 16 ans
              </li>
              <li>Déposez votre demande d&apos;autorisation administrative</li>
            </ul>
            <p>
              L&apos;emploi d&apos;un enfant de moins de 16 ans dans le secteur
              du spectacle vivant et enregistré nécessite l&apos;accord
              préalable de l&apos;autorité administrative. Une procédure en
              ligne vous permet de déposer votre demande.
            </p>
            <a
              href="https://formulaire-enfants-du-spectacle.fabrique.social.gouv.fr/"
              className="postButton"
            >
              <span>Commencez votre démarche en ligne</span>
            </a>
          </div>
          <div className={styles.rightColumn}>
            <Image src={logoEds} alt="Enfants du Spectacle" />
          </div>
        </div>
      </Container>
      <Container>
        <div style={{ width: "100%", backgroundColor: "#f5f5fe", borderLeft: "4px solid #000091", padding: "1.5rem", marginTop: "2rem" }}>
            <p style={{ fontWeight: "bold", marginBottom: "0.5rem", marginTop: 0 }}>Nouveauté :</p>
            <p style={{ marginBottom: "0.5rem" }}>
              A partir du 5 janvier 2026, un nouveau service sera disponible sur la plateforme Démarche Numérique.
            </p>
            <p style={{ marginBottom: 0 }}>
              Le lien sera disponible sur le site internet DRIEETS à partir du 5 janvier 2026 : A toutes fins utiles, voici le lien vers le site de la DRIEETS dédié aux enfants du spectacle et l&apos;information qui y est indiquée :{" "}
              <a 
                href="https://idf.drieets.gouv.fr/Enfants-du-spectacle-le-service-passe-au-numerique" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: "#000091", textDecorationSkipInk: "auto" }}
              >
                Enfants du spectacle : le service passe au numérique - Direction régionale interdépartementale de l&apos;économie, de l&apos;emploi, du travail et des solidarités (DREETS)
              </a>
            </p>
        </div>
      </Container>
    </section>
  );
};

export default Intro;
