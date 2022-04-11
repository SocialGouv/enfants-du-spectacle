import { Container } from "@dataesr/react-dsfr";
import * as React from "react";
import styles from "src/components/home/About.module.scss";

const About: React.FC = () => {
  return (
    <section className={styles.aboutSection}>
      <Container>
        <div className={styles.introGrid}>
          <h2>De quoi s&apos;agit-il ?</h2>
          <p>
            {" "}
            L’emploi d’un enfant de moins de 16 ans dans le secteur du spectacle
            vivant et enregistré nécessite{" "}
            <b>l’accord préalable de l’autorité administrative.</b>{" "}
          </p>
          <p>
            {" "}
            Une procédure spécifique, mise en place dans le{" "}
            <b>but de protéger les enfants de tout abus,</b> requiert de
            l’employeur le dépôt d’une demande accompagnée de pièces
            justificatives.{" "}
          </p>
          <p>
            {" "}
            La demande d’autorisation, une fois déposée, est examinée par un
            service d’instruction, avant d’être soumise à l’avis conforme d’une
            commission regroupant des représentants de différents ministères,
            sur la base duquel l’autorité administrative prendra sa décision.
          </p>
          <p>
            {" "}
            <b className={styles.redBold}>
              En Ile-de-France, ce type de demandes emprunte désormais la voie
              du dépôt numérique, pour tout dossier jusqu&apos;à 30 enfants.
            </b>
          </p>
        </div>
      </Container>
    </section>
  );
};

export default About;
