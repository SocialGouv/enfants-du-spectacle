
import { StatutDossier } from "@prisma/client";
import styles from "./LabelStatus.module.scss";
import React from "react";
import { factory as statutDossierStateMachineFactory } from "../lib/statutDossierStateMachine";

interface Props {
    status: StatutDossier;
    wihteBackground?: Boolean;
}

const LabelStatus: React.FC<Props> = ({ status, wihteBackground }) => {
    const stateMachine = statutDossierStateMachineFactory(status);
    const stateClassName = stateMachine.stateClassName();
    
    return (
        <div className={`${styles.labelStatus} ${stateClassName} ${wihteBackground ? `${styles.white}` : ''}`}>
            {status === 'CONSTRUCTION' || status === 'INSTRUCTION' ? `EN ${status}` : status.replaceAll('_', ' ')}
        </div>
    );
};

export default LabelStatus;
