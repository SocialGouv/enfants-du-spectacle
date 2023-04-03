import { Dossier } from "@prisma/client";
import IconLoader from "../IconLoader";
import React from "react";
import {
  DossierData,
  getDossier,
  updateDossier,
} from "../../fetching/dossiers";
import { ButtonLink } from "../../uiComponents/button";
import styles from "./ShareDossierModal.module.scss";
import { Button } from "@dataesr/react-dsfr";
import { getUserByEmail } from "src/fetching/users";

interface Props {
  dossier: DossierData;
  showDialogue: Boolean;
  setShowDialogue: (showDialogue: boolean) => void;
  setUpdateCollaboratorList: (updateCollaboratorList: number[]) => void;
}

const ShareDossierModal: React.FC<Props> = ({
  dossier,
  showDialogue,
  setShowDialogue,
  setUpdateCollaboratorList,
}) => {
  const [showLoader, setShowLoader] = React.useState<boolean>(false);
  const [emailExists, setEmailExists] = React.useState<boolean>(false);
  const [resetMessage, setResetMessage] = React.useState<boolean>(false);
  const [collaboratorEmail, setCollaboratorEmail] = React.useState<string>("");

  const shareDossier = async (dossier: DossierData) => {
    setShowLoader(true);
    setEmailExists(false);

    const res = await getDossier(dossier.id.toString());
    const currentDossier = res.dossier;

    let userId = await getUserByEmail(collaboratorEmail, dossier);

    if (userId) {
      if (!currentDossier.collaboratorIds.includes(userId)) {
        updateDossier({
          ...currentDossier,
          collaboratorIds: [...currentDossier.collaboratorIds, userId],
        } as Dossier);
        setResetMessage(true);
        setUpdateCollaboratorList(currentDossier.collaboratorIds);
      } else {
        setEmailExists(true);
        setShowLoader(false);
      }
    }
    setShowLoader(false);
  };

  const checkEmail = () => {
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (collaboratorEmail && re.test(collaboratorEmail)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      {showDialogue && (
        <div className={styles.confirmDialogueWrapper}>
          <div className={styles.confirmDialogue}>
            <div className={styles.titleModal}>
              <div>Partager le dossier</div>
              <span className={styles.dossierName}>{dossier.nom}</span>
              <div>avec un collaborateur</div>
            </div>
            <div
              style={{
                display: "flex",
                position: "relative",
                width: "100%",
                alignItems: "center",
              }}
            >
              <input
                value={collaboratorEmail}
                onChange={(e) => {
                  setCollaboratorEmail(e.target.value);
                }}
                type="email"
                id="email"
                name="email"
                placeholder="email du collaborateur"
                className="inputText"
              />
              {showLoader && (
                <div className={styles.loaderEmailCheck}>
                  <IconLoader />
                </div>
              )}
            </div>
            {emailExists && (
              <div className={styles.warningMessage}>
                Le dossier est déjà partagé avec ce collaborateur
              </div>
            )}
            {resetMessage && !emailExists && (
              <div className={styles.successMessage}>
                Le dossier a bien été partagé avec le collaborateur
              </div>
            )}
            <div className={styles.btnList}>
              <Button
                disabled={!checkEmail()}
                onClick={() => {
                  setCollaboratorEmail("");
                  shareDossier(dossier);
                }}
              >
                Partager le dossier
              </Button>
              <ButtonLink
                onClick={() => {
                  setShowDialogue(false);
                  setEmailExists(false);
                  setResetMessage(false);
                }}
              >
                Fermer
              </ButtonLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShareDossierModal;
