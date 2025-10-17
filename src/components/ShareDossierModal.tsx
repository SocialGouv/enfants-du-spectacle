import { Dossier } from "@prisma/client";
import IconLoader from "./IconLoader";
import React from "react";
import { updateDossier } from "src/lib/queries";
import { Button } from "@dataesr/react-dsfr";
import { getUserByEmail } from "src/lib/fetching/users";
import type { DossierData } from "src/lib/types";
import styles from "./ShareDossierModal.module.scss";
import { mutate } from "swr";

interface Props {
  dossier: DossierData;
  showDialogue: boolean;
  setShowDialogue: (showDialogue: boolean) => void;
}

const ShareDossierModal: React.FC<Props> = ({
  dossier,
  showDialogue,
  setShowDialogue,
}) => {
  const [showLoader, setShowLoader] = React.useState<boolean>(false);
  const [emailExists, setEmailExists] = React.useState<boolean>(false);
  const [resetMessage, setResetMessage] = React.useState<boolean>(false);
  const [collaboratorEmail, setCollaboratorEmail] = React.useState<string>("");

  const shareDossier = async () => {
    setShowLoader(true);
    setEmailExists(false);

    try {
      const userId = await getUserByEmail(
        collaboratorEmail,
        dossier as Dossier
      );

      if (userId) {
        if (!dossier.collaboratorIds.includes(userId)) {
          updateDossier(
            dossier as Dossier,
            {
              collaboratorIds: [...dossier.collaboratorIds, userId],
            },
            (updatedDossier) => {
              setResetMessage(true);
              setShowLoader(false);
              // Actualiser les données SWR sans recharger la page
              mutate(`/api/dossiers/${dossier.id}`);
            }
          );
        } else {
          setEmailExists(true);
          setShowLoader(false);
        }
      } else {
        setShowLoader(false);
      }
    } catch (error) {
      console.error("Error sharing dossier:", error);
      setShowLoader(false);
    }
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
              <div>Donner accès au dossier</div>
              <span className={styles.dossierName}>{dossier.nom}</span>
              <div>à un nouveau demandeur</div>
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
                placeholder="email du demandeur"
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
                  shareDossier();
                }}
              >
                Partager le dossier
              </Button>
              <Button
                secondary
                onClick={() => {
                  setShowDialogue(false);
                  setEmailExists(false);
                  setResetMessage(false);
                }}
              >
                Fermer
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShareDossierModal;
