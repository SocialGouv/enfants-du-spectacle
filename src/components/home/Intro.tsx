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
    </section>
  );
};

export default Intro;
