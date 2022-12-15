import { Dossier } from "@prisma/client";
import { useRouter } from "next/router";
import React from "react";
import { statusGroup } from "src/lib/types";
import { createDossierEds } from "../../fetching/dossiers";
import { ButtonLink } from "../../uiComponents/button";
import styles from "./ActionBar.module.scss";

interface Props {
    counts?: Record<statusGroup, number>,
    action: (status: statusGroup) => void
}

const ActionBar: React.FC<Props> = ({ action, counts }) => {
    const [status, setStatus] = React.useState<statusGroup>('enCours')
    const router = useRouter()

    console.log('counts : ', counts)

    const createDossier = async () => {
        let res = await createDossierEds({} as Dossier);
        router.push(`/dossier/${res.id}`)
    }

    return (
        <div className={styles.containerActionBar}>
            <div className={styles.tabs}>
                <ButtonLink light={!(status === 'enCours')} onClick={() => {setStatus('enCours'), action('enCours')}}>
                    <div className={`${styles.buttonStatus} ${status !== 'enCours' ? `${styles.inactiveStatus}` : ''}`}>
                        <div className={styles.countNumber}>{counts?.enCours}</div>
                        En cours
                    </div>
                </ButtonLink>
                <ButtonLink light={!(status === 'termines')} onClick={() => {setStatus('termines'), action('termines')}}>
                    <div className={`${styles.buttonStatus} ${status !== 'termines' ? `${styles.inactiveStatus}` : ''}`}>
                        <div className={styles.countNumber}>{counts?.termines}</div>
                        Terminés
                    </div>
                </ButtonLink>
            </div>
            <div className={styles.button}>
                <ButtonLink onClick={() => createDossier()}>Créer un nouveau dossier</ButtonLink>
            </div>
        </div>
    );
};

export default ActionBar;