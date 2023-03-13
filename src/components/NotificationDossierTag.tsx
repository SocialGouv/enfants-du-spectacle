import type { Dossier } from "@prisma/client";
import React, { useState } from "react";
import { RiAlertFill, RiInformationFill } from "react-icons/ri";
import type { CommentaireNotifications } from "src/lib/types";

import styles from "./Tag.module.scss";

interface Props {
  dossier: Dossier;
  commentsInfo: CommentaireNotifications;
}

const NotificationDossierTag: React.FC<Props> = ({ dossier, commentsInfo }) => {
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);

  return (
    <div
      onMouseEnter={() => {
        if (dossier.statusNotification === "MIS_A_JOUR") setShowInfoModal(true);
      }}
      onMouseLeave={() => {
        setShowInfoModal(false);
      }}
      className={`${styles.tag} ${
        dossier.statusNotification === "MIS_A_JOUR"
          ? `${styles.tagBlue}`
          : dossier.statusNotification === "NOUVEAU"
          ? `${styles.tagRed}`
          : ""
      }`}
    >
      {dossier.statusNotification === "MIS_A_JOUR" ? (
        <div className={styles.tagCursor}>
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
          <>
            <div className={styles.blocNotif}>
              {commentsInfo.notificationsChildren > 0 &&
                commentsInfo.notificationsProject > 0 && (
                  <>
                    <div className={styles.separator} />
                    <div className={styles.titleNotif}>Commentaires</div>
                  </>
                )}
              {commentsInfo.notificationsProject > 0 && (
                <div>
                  <span className={styles.count}>
                    {commentsInfo.notificationsProject}
                  </span>{" "}
                  {commentsInfo.notificationsProject > 1
                    ? "nouveaux commentaires"
                    : "nouveau commentaire"}{" "}
                  sur le projet
                </div>
              )}
              {commentsInfo.notificationsChildren > 0 && (
                <div>
                  <span className={styles.count}>
                    {commentsInfo.notificationsChildren}
                  </span>{" "}
                  {commentsInfo.notificationsChildren > 1
                    ? "nouveaux commentaires"
                    : "nouveau commentaire"}{" "}
                  sur un ou plusieurs enfants
                </div>
              )}
            </div>
          </>
        </div>
      )}
    </div>
  );
};

export default NotificationDossierTag;
