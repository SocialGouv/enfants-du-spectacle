import { Container } from "@dataesr/react-dsfr";
import { useSession } from "next-auth/react";
import React from "react";
import { DossierData } from "../../fetching/dossiers";
import { frenchDateText } from "../../lib/helpers";
import LabelStatus from "../LabelStatus";
import CollaboratorsList from "./CollaboratorsList";
import styles from "./HeadingDossier.module.scss";
import { User } from "@prisma/client";

interface Props {
  dossier: DossierData;
  setShowDialogue?: (showDialogue: boolean) => void;
  agent?: User;
  commissionDate?: Date;
}

const HeadingDossier: React.FC<Props> = ({
  dossier,
  setShowDialogue,
  agent,
  commissionDate,
}) => {
  const { data: session } = useSession();

  return (
    <div className={styles.headingDossier}>
      {dossier && (
        <Container>
          <div className={styles.topRow}>
            <h4>Enfants du spectacle</h4>
            <div className={styles.rightSection}>
              <LabelStatus
                status={dossier.statut}
                wihteBackground={true}
              ></LabelStatus>
              {dossier.userId === session?.dbUser.id && (
                <CollaboratorsList
                  dossier={dossier}
                  setShowDialogue={
                    setShowDialogue as (showDialogue: boolean) => void
                  }
                />
              )}
            </div>
          </div>
          <h2>
            Dossier n° {dossier.id}
            {`${
              commissionDate
                ? ` pour la commission: ${frenchDateText(commissionDate)}`
                : ""
            }`}
          </h2>
          {dossier.dateCreation && (
            <div className={styles.commissionTitle}>
              Dossier créé le {frenchDateText(dossier.dateCreation)}
            </div>
          )}
          {dossier.dateDerniereModification && (
            <div className={styles.commissionTitle}>
              Dossier modifié le{" "}
              {frenchDateText(dossier.dateDerniereModification)}
            </div>
          )}
          {agent?.id && (
            <div style={{ marginTop: "10px" }}>
              <span className={styles.commissionTitle}>Suivi par </span>
              {agent.nom + " " + agent.prenom + " - " + agent.email}
            </div>
          )}
        </Container>
      )}
    </div>
  );
};

export default HeadingDossier;
