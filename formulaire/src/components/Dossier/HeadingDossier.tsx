import { Container } from "@dataesr/react-dsfr";
import { useSession } from "next-auth/react";
import React from "react";
import { DossierData } from "../../fetching/dossiers";
import { frenchDateText } from "../../lib/helpers";
import LabelStatus from "../LabelStatus";
import CollaboratorsList from "./CollaboratorsList";
import styles from "./HeadingDossier.module.scss";

interface Props {
  dossier: DossierData;
  setShowDialogue?: (showDialogue: boolean) => void;
}

const HeadingDossier: React.FC<Props> = ({ dossier, setShowDialogue }) => {
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
            Dossier n° {dossier.id} créé le{" "}
            {frenchDateText(dossier.dateDerniereModification)}
          </h2>
          {dossier.commissionDate && (
            <div className={styles.commissionTitle}>
              Déposé pour la commission du{" "}
              {frenchDateText(dossier.commissionDate)}
            </div>
          )}
        </Container>
      )}
    </div>
  );
};

export default HeadingDossier;
