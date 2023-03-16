import { STATUT_PIECE } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { CommentaireNotifications } from "src/lib/types";
import styles from "./CountPieces.module.scss";

interface Props {
  piecesJustif: (STATUT_PIECE | null)[];
  commentsNotifications?: CommentaireNotifications;
}

const CountPieces: React.FC<Props> = ({
  piecesJustif,
  commentsNotifications,
}) => {
  const [countPiecesRefused, setCount] = React.useState<number>(
    piecesJustif.filter((piece) => piece === "REFUSE").length
  );
  const hasNotifications =
    !!commentsNotifications &&
    (commentsNotifications.notificationsChildren > 0 ||
      commentsNotifications.notificationsProject > 0);
  const [showInfoModal, setShowInfoModal] = React.useState<boolean>(false);

  return (
    <div className={styles.countPieces}>
      {(countPiecesRefused > 0 || hasNotifications) && (
        <div
          onMouseEnter={() => {
            setShowInfoModal(true);
          }}
          onMouseLeave={() => {
            setShowInfoModal(false);
          }}
          className={styles.cardRefused}
        >
          <Image
            src={`/images/refused.svg`}
            alt="Supprimer"
            width={20}
            height={20}
          />
          Informations
        </div>
      )}
      {showInfoModal && (
        <div className={styles.modalWrapper}>
          {countPiecesRefused > 0 && (
            <div
              className={`${styles.blocNotif} ${
                countPiecesRefused > 0 || hasNotifications ? styles.bloc : ""
              }`}
            >
              <div className={styles.titleNotif}>Pièces justificatives</div>
              {countPiecesRefused > 0 && (
                <div>
                  <span className={styles.count}>
                    {"• "}
                    {countPiecesRefused}
                  </span>
                  {countPiecesRefused > 1
                    ? " pièces refusées"
                    : " pièce refusée"}
                </div>
              )}
            </div>
          )}
          {hasNotifications && (
            <div className={styles.blocNotif}>
              <div className={styles.titleNotif}>Commentaires</div>
              {commentsNotifications.notificationsProject > 0 && (
                <div className={styles.bloc}>
                  <span className={styles.count}>
                    {"• "}
                    {commentsNotifications.notificationsProject}
                  </span>{" "}
                  {commentsNotifications.notificationsProject > 1
                    ? "nouveaux commentaires"
                    : "nouveau commentaire"}
                  {" projet"}
                </div>
              )}
              {commentsNotifications.notificationsChildren > 0 && (
                <div className={styles.bloc}>
                  <span className={styles.count}>
                    {"• "}
                    {commentsNotifications.notificationsChildren}
                  </span>{" "}
                  {commentsNotifications.notificationsChildren > 1
                    ? "nouveaux commentaires"
                    : "nouveau commentaire"}
                  {" enfant"}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CountPieces;
