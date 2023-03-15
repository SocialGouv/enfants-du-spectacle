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
  const hasNotifications =
    (commentsInfo?.notificationsChildren !== 0 ||
      commentsInfo?.notificationsProject !== 0) &&
    dossier.source === "FORM_EDS";
  return (
    <div>
      {dossier.statusNotification === "MIS_A_JOUR" || hasNotifications ? (
        <div
          className={`${styles.tag} ${styles.tagCursor} ${styles.tagBlue}`}
          onMouseEnter={() => {
            if (
              dossier.source === "FORM_EDS" &&
              (dossier.statusNotification === "MIS_A_JOUR" || hasNotifications)
            )
              setShowInfoModal(true);
          }}
          onMouseLeave={() => {
            setShowInfoModal(false);
          }}
        >
          <RiAlertFill /> MAJ
        </div>
      ) : dossier.statusNotification === "NOUVEAU" ? (
        <div className={`${styles.tag} ${styles.tagRed}`}>
          <RiInformationFill /> NOUVEAU
        </div>
      ) : (
        ""
      )}
      {showInfoModal && (
        <div className={styles.modalWrapper}>
          {dossier.statusNotification === "MIS_A_JOUR" && (
            <div className={styles.blocNotif}>
              <div className={styles.titleNotif}>Projet</div>
              <div>
                Une ou plusieurs modifications ont étés apportées au projet
              </div>
            </div>
          )}
          <>
            <div className={styles.blocNotif}>
              {(commentsInfo.notificationsChildren > 0 ||
                commentsInfo.notificationsProject > 0) && (
                <>
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
