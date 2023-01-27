
import { STATUT_PIECE } from "@prisma/client";
import Image from "next/image";
import React from "react";
import styles from "./CountPieces.module.scss";


interface Props {
    piecesJustif: (STATUT_PIECE | null) []
}

const CountPieces: React.FC<Props>  = ({ piecesJustif}) => {

    const [count, setCount] = React.useState<number>(piecesJustif.filter(piece => piece === 'REFUSE').length)

    return (
        <div className={styles.countPieces}>
            {count > 0 &&
                <div className={styles.cardRefused}>
                    <Image
                        src={`/images/refused.svg`}
                        alt="Supprimer"
                        width={20}
                        height={20}
                    />
                    {`${count} REFUSÉ${count > 1 ? 'S' : ''}`}
                </div>
            }
        </div>
    );
};

export default CountPieces;