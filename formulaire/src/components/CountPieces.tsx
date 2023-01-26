
import React from "react";
import { DossierData } from "src/fetching/dossiers";
import styles from "./CountPieces.module.scss";

interface Props {
    dossier: DossierData
}

const CountPieces: React.FC<Props>  = ({dossier}) => {
    let refusedDossier = dossier.piecesDossier?.filter((piece) => {return piece.statut === 'REFUSE'}).length
    let refusedEnfants = dossier.enfants.map(enfant => enfant.piecesDossier.filter(piece => piece.statut === 'REFUSE')).filter(enfant => enfant.length > 0).length

    console.log(refusedDossier + refusedEnfants)
    const [count, setCount] = React.useState<number>(refusedDossier + refusedEnfants)

    return (
        <div className={styles.countPieces}>
            {count > 0 &&
                <div className={styles.cardRefused}>{`${count} REFUSÉ${count > 1 ? 'S' : ''}`}</div>
            }
        </div>
    );
};

export default CountPieces;