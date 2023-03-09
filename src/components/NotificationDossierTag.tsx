import type { Commentaire, Dossier } from "@prisma/client";
import React, { useState } from "react";
import { BiComment } from "react-icons/bi";
import { RiAlertFill, RiInformationFill } from "react-icons/ri";

import styles from "./Tag.module.scss";

interface Props {
  dossier: Dossier;
  commentsInfo: {
    dossierId: number;
    commentsChildren: number;
    commentsProject: number;
  };
}

const NotificationDossierTag: React.FC<Props> = ({ dossier, commentsInfo }) => {
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  console.log("commentsInfo !!: ", commentsInfo);

  return (
    <div
      className={`${styles.tag} ${
        dossier.statusNotification === "MIS_A_JOUR"
          ? `${styles.tagRed}`
          : dossier.statusNotification === "NOUVEAU"
          ? `${styles.tagBlue}`
          : ""
      }`}
    >
      {dossier.statusNotification === "MIS_A_JOUR" ? (
        <div
          onMouseEnter={() => {
            setShowInfoModal(true);
          }}
          onMouseLeave={() => {
            setShowInfoModal(false);
          }}
          className={styles.tagCursor}
        >
          <RiAlertFill /> MAJ
        </div>
      ) : dossier.statusNotification === "NOUVEAU" ? (
        <div>
          <RiInformationFill /> NOUVEAU
        </div>
      ) : (
        ""
      )}
      {showInfoModal && (
        <div className={styles.modalWrapper}>
          <div className={styles.blocNotif}>
            <div className={styles.titleNotif}>Projet</div>
            <div>
              Une ou plusieurs modifications ont étés apportées au projet
            </div>
          </div>
          {commentsInfo.dossierId && (
            <div className={styles.blocNotif}>
              <div className={styles.titleNotif}>Commentaires </div>
              {commentsInfo.commentsProject > 0 && (
                <div>
                  {commentsInfo.commentsProject}{" "}
                  {commentsInfo.commentsProject > 1
                    ? "nouveaux commentaires"
                    : "nouveau commentaire"}{" "}
                  sur le projet
                </div>
              )}
              {commentsInfo.commentsChildren > 0 && (
                <div>
                  {commentsInfo.commentsChildren}{" "}
                  {commentsInfo.commentsChildren > 1
                    ? "nouveaux commentaires"
                    : "nouveau commentaire"}{" "}
                  sur un enfant
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDossierTag;
