import Image from "next/image";
import React from "react";
import logoRefused from "src/images/refused.svg";

import styles from "./CountPieces.module.scss";

interface Props {
  piecesJustif: string[] | undefined;
}

const CountPieces: React.FC<Props> = ({ piecesJustif }) => {
  const count =
    piecesJustif !== undefined
      ? piecesJustif.filter((piece) => piece === "REFUSE").length
      : 0;

  return (
    <div className={styles.countPieces}>
      {count > 0 && (
        <div className={styles.cardRefused}>
          <Image src={logoRefused} alt="Supprimer" width={20} height={20} />
          {`${count} REFUSÉ${count > 1 ? "S" : ""}`}
        </div>
      )}
    </div>
  );
};

export default CountPieces;
