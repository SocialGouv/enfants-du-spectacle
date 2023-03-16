import Image from "next/image";
import React from "react";
import logoRefused from "src/images/refused.svg";

import styles from "./CountPieces.module.scss";

interface Props {
  piecesJustif: string[] | undefined;
  countCommentsNotification?: number;
}

const CountPieces: React.FC<Props> = ({
  piecesJustif,
  countCommentsNotification,
}) => {
  const countPiecesRefused =
    piecesJustif !== undefined
      ? piecesJustif.filter((piece) => piece === "REFUSE").length
      : 0;
  const countNewPiece =
    piecesJustif !== undefined
      ? piecesJustif.filter((piece) => piece !== "REFUSE" && piece !== "VALIDE")
          .length
      : 0;

  const [showInfoModal, setShowInfoModal] = React.useState<boolean>(false);

  return (
    <div className={styles.countPieces}>
      {(countPiecesRefused > 0 ||
        countNewPiece > 0 ||
        (!!countCommentsNotification && countCommentsNotification > 0)) && (
        <div
          onMouseEnter={() => {
            setShowInfoModal(true);
          }}
          onMouseLeave={() => {
            setShowInfoModal(false);
          }}
          className={styles.cardRefused}
        >
          <Image src={logoRefused} alt="Supprimer" width={20} height={20} />
          Informations
        </div>
      )}
      {showInfoModal && (
        <div className={styles.modalWrapper}>
          {(countPiecesRefused > 0 || countNewPiece > 0) && (
            <div
              className={`${styles.blocNotif} ${
                countPiecesRefused > 0 ||
                (countNewPiece > 0 &&
                  !!countCommentsNotification &&
                  countCommentsNotification > 0)
                  ? styles.bloc
                  : ""
              }`}
            >
              <div className={styles.titleNotif}>Pièces justificatives</div>
              {countPiecesRefused > 0 && (
                <div>
                  <span className={styles.count}>
                    {"• "}
                    {countPiecesRefused}
                  </span>{" "}
                  {`${
                    countPiecesRefused > 1 ? "pièces refusées" : "pièce refusée"
                  }`}{" "}
                </div>
              )}
              {countNewPiece > 0 && (
                <div>
                  <span className={styles.count}>
                    {"• "}
                    {countNewPiece}
                  </span>{" "}
                  {`${
                    countNewPiece > 1
                      ? "nouvelles pièces ajoutées"
                      : "nouvelle pièce ajoutée"
                  }`}{" "}
                </div>
              )}
            </div>
          )}
          {!!countCommentsNotification && countCommentsNotification > 0 && (
            <div className={styles.blocNotif}>
              <div className={styles.titleNotif}>Commentaires</div>
              <div>
                <span className={styles.count}>
                  {"• "}
                  {countCommentsNotification}
                </span>{" "}
                {countCommentsNotification > 1
                  ? "nouveaux commentaires"
                  : "nouveau commentaire"}{" "}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CountPieces;
