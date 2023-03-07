import type { Commentaire, Dossier } from "@prisma/client";
import React, { useState } from "react";
import { BiComment } from "react-icons/bi";
import { RiAlertFill, RiInformationFill } from "react-icons/ri";

import styles from "./Tag.module.scss";

interface Props {
  dossier: Dossier;
  comments?: Commentaire[];
}

const NotificationDossierTag: React.FC<Props> = ({ dossier, comments }) => {
  // const commentProject = comments?.filter(
  //   (com) => com.enfantId === null
  // ).length;

  // const commentChild = comments?.filter((com) => com.enfantId !== null).length;

  console.log("COMMENTS NOTIF: ", comments);
  console.log("DOSSIER : ", dossier);

  const [showNotificationModal, setShowNotificationModal] =
    useState<boolean>(false);

  return (
    <div>
      <div
        className={`${styles.tag} ${
          dossier.statusNotification === "MIS_A_JOUR" ||
          dossier.statusNotification === "NOUVEAU"
            ? `${styles.tagWrapper}`
            : ""
        }  ${
          dossier.statusNotification === "MIS_A_JOUR"
            ? `${styles.tagRed}`
            : dossier.statusNotification === "NOUVEAU"
            ? `${styles.tagBlue}`
            : ""
        }`}
      >
        {dossier.statusNotification === "MIS_A_JOUR" ? (
          <div>
            <RiAlertFill /> MAJ
          </div>
        ) : dossier.statusNotification === "NOUVEAU" ? (
          <div>
            <RiInformationFill /> NOUVEAU
          </div>
        ) : (
          ""
        )}
      </div>
      {dossier.commentNotification.length > 0 && (
        <>
          <div
            className={`${styles.tag} ${styles.tagPurple}`}
            onMouseEnter={() => {
              setShowNotificationModal(true);
            }}
            onMouseLeave={() => {
              setShowNotificationModal(false);
            }}
          >
            <div className={styles.commentTag}>
              <BiComment style={{ marginRight: "5px" }} /> COMMENTAIRES
            </div>
          </div>
          {showNotificationModal && (
            <div className={styles.notifModal}>
              {dossier.commentNotification.includes("COMMENTAIRE_PROJET") && (
                <div>Un nouveau commentaire lié au projet</div>
              )}
              {dossier.commentNotification.includes("COMMENTAIRE_ENFANT") && (
                <div>Un nouveau commentaire lié à un enfant</div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NotificationDossierTag;
