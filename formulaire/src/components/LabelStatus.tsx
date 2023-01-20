
import { StatutDossier } from "@prisma/client";
import styles from "./LabelStatus.module.scss";
import React from "react";

interface Props {
    status: StatutDossier;
    wihteBackground?: Boolean;
}

const LabelStatus: React.FC<Props> = ({ status, wihteBackground }) => {


    switch(status) {
        case 'BROUILLON':
            return (
                <div className={`${styles.labelStatus} ${styles.blue} ${wihteBackground ? `${styles.white}` : ''}`}>
                    {status}
                </div>
            );
        case 'CONSTRUCTION':
        case 'INSTRUCTION':
            return (
                <div className={`${styles.labelStatus} ${styles.yellow} ${wihteBackground ? `${styles.white}` : ''}`}>
                    {`EN ${status}`}
                </div>
            );
        case 'PRET':
        case 'AVIS_FAVORABLE': 
        case 'AVIS_FAVORABLE_SOUS_RESERVE':
            return (
                <div className={`${styles.labelStatus} ${styles.green} ${wihteBackground ? `${styles.white}` : ''}`}>
                    {status.replaceAll('_', ' ')}
                </div>
            );
        case 'ACCEPTE':
            return (
                <div className={`${styles.labelStatus} ${styles.accepted} ${wihteBackground ? `${styles.white}` : ''}`}>
                    {status}
                </div>
            );
        case 'REFUSE':
            return (
                <div className={`${styles.labelStatus} ${styles.refused} ${wihteBackground ? `${styles.white}` : ''}`}>
                    {status}
                </div>
            );
        default: 
            return (
                <div className={`${styles.labelStatus} ${styles.default} ${wihteBackground ? `${styles.white}` : ''}`}>
                    {status.replaceAll('_', ' ')}
                </div>
            );
    }
};

export default LabelStatus;