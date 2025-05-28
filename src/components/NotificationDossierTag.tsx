import type { Dossier } from "@prisma/client";
import React, { useState } from "react";
import { RiAlertFill, RiInformationFill } from "react-icons/ri";
import type { CommissionNotifications } from "src/lib/notifications";

import styles from "./Tag.module.scss";

interface Props {
  dossier: Dossier;
  commentsInfo: CommissionNotifications | null;
}

const NotificationDossierTag: React.FC<Props> = ({ dossier, commentsInfo }) => {
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const hasNotifications =
    commentsInfo &&
    (commentsInfo.notificationsChildren > 0 ||
      commentsInfo.notificationsProject > 0 ||
      commentsInfo.newPiecesDossier > 0 ||
      commentsInfo.newPiecesEnfant > 0 ||
      dossier.statusNotification === "MIS_A_JOUR") &&
    dossier.source === "FORM_EDS";

  return (
    <div>
      {dossier.statusNotification === "NOUVEAU" ? (
        <div className={`${styles.tag} ${styles.tagRed}`}>
          <RiInformationFill style={{ marginRight: "4px" }} /> NOUVEAU
        </div>
      ) : dossier.statusNotification === "MIS_A_JOUR" || hasNotifications ? (
        <div
          className={`${styles.tag} ${styles.tagCursor} ${styles.tagBlue}`}
          onMouseEnter={() => {
            if (dossier.source === "FORM_EDS" && hasNotifications)
              setShowInfoModal(true);
          }}
          onMouseLeave={() => {
            setShowInfoModal(false);
          }}
        >
          <RiAlertFill style={{ marginRight: "4px" }} /> MAJ
        </div>
      ) : (
        ""
      )}
      {showInfoModal && hasNotifications && (
        <div className={styles.modalWrapper}>
          {dossier.statusNotification === "MIS_A_JOUR" && (
            <div className={styles.blocNotif}>
              <div className={styles.titleNotif}>Projet</div>
              <div>
                Une ou plusieurs modifications ont étés apportées au projet
              </div>
            </div>
          )}
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
                  ? "nouveaux commentaires sur un ou plusieurs enfants"
                  : "nouveau commentaire sur un enfant"}{" "}
              </div>
            )}
          </div>
          {(commentsInfo.newPiecesDossier > 0 ||
            commentsInfo.newPiecesEnfant > 0) && (
            <div className={styles.blocNotif}>
              <div className={styles.titleNotif}>Pièces justificatives</div>
              {commentsInfo.newPiecesDossier > 0 && (
                <div>
                  <span className={styles.count}>
                    {commentsInfo.newPiecesDossier}
                  </span>{" "}
                  {commentsInfo.newPiecesDossier > 1
                    ? "nouvelles pièces justificatives"
                    : "nouvelle pièce justificative"}{" "}
                  sur le projet
                </div>
              )}
              {commentsInfo.newPiecesEnfant > 0 && (
                <div>
                  <span className={styles.count}>
                    {commentsInfo.newPiecesEnfant}
                  </span>{" "}
                  {commentsInfo.newPiecesEnfant > 1
                    ? "nouvelles pièces justificatives sur un ou plusieurs enfants"
                    : "nouvelle pièce justificative sur un enfant"}{" "}
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
