import { Demandeur, Dossier } from "@prisma/client";
import { useRouter } from "next/router";
import React from "react";
import { FiAlertCircle } from "react-icons/fi";
import { createDemandeur } from "src/fetching/demandeur";
import { statusGroup } from "src/lib/types";
import { createDossierEds } from "../../fetching/dossiers";
import { ButtonLink } from "../../uiComponents/button";
import styles from "./ActionBar.module.scss";

interface Props {
  counts?: Record<statusGroup, number>;
  action: (status: statusGroup) => void;
}

const ActionBar: React.FC<Props> = ({ action, counts }) => {
  const [status, setStatus] = React.useState<statusGroup>("enCours");
  const router = useRouter();

  const createDossier = async () => {
    let resDemanndeur = await createDemandeur({} as Demandeur);
    let resDossier = await createDossierEds({
      demandeurId: resDemanndeur.id,
      dateCreation: new Date(),
      nom: "",
    } as Dossier);
    router.push(`/dossier/${resDossier.id}`);
  };

  return (
    <div className={styles.containerActionBar}>
      <div className={styles.tabs}>
        <ButtonLink
          light={!(status === "enCours")}
          onClick={() => {
            setStatus("enCours"), action("enCours");
          }}
        >
          <div
            className={`${styles.buttonStatus} ${
              status !== "enCours" ? `${styles.inactiveStatus}` : ""
            }`}
          >
            <div className={styles.countNumber}>{counts?.enCours}</div>
            En cours
          </div>
        </ButtonLink>
        <ButtonLink
          light={!(status === "termines")}
          onClick={() => {
            setStatus("termines"), action("termines");
          }}
        >
          <div
            className={`${styles.buttonStatus} ${
              status !== "termines" ? `${styles.inactiveStatus}` : ""
            }`}
          >
            <div className={styles.countNumber}>{counts?.termines}</div>
            Terminés
          </div>
        </ButtonLink>
      </div>
      {process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT === "preproduction" && (
        <div className={styles.warningMessageWrapper}>
          <div className={styles.iconWrapper}>
            <FiAlertCircle className={styles.alertIcon} size={24} />
          </div>
          <div>
            Vous êtes actuellement sur un formulaire de test. Cliquez sur le
            lien suivant pour accéder au formulaire officiel :{" "}
            <a
              href="https://formulaire-enfants-du-spectacle.fabrique.social.gouv.fr/"
              target={"blank"}
              className={styles.formLink}
            >
              Formulaire officiel
            </a>
          </div>
        </div>
      )}
      <div className={styles.warningMessageWrapper}>
        <div className={styles.iconWrapper}>
          <FiAlertCircle className={styles.alertIcon} size={24} />
        </div>
        <div>
          <strong>Nouveauté :</strong>
          <p style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
            À partir du 5 janvier 2026, un nouveau service sera disponible sur la plateforme Démarche Numérique.
          </p>
          <p>
            Le lien sera disponible sur le site internet DRIEETS à partir du 5 janvier 2026 : À toutes fins utiles, voici le lien vers le site de la DRIEETS dédié aux enfants du spectacle et l'information qui y est indiquée :{" "}
            <a
              href="https://idf.drieets.gouv.fr/Enfants-du-spectacle-le-service-passe-au-numerique"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.formLink}
            >
              Enfants du spectacle : le service passe au numérique - Direction régionale interdépartementale de l'économie, de l'emploi, du travail et des solidarités (DREETS)
            </a>
          </p>
        </div>
      </div>
      <div className={styles.button}>
        <ButtonLink onClick={() => createDossier()}>
          Créer un nouveau dossier
        </ButtonLink>
        
        <a
          href="./documents-publics"
          target="blank"
        >
          <ButtonLink light={true} onClick={() => {}}>
            Documents importants
          </ButtonLink>
        </a>

        <ButtonLink light={true} onClick={() => router.push(`/faq`)}>
          FAQ
        </ButtonLink>
      </div>
    </div>
  );
};

export default ActionBar;
