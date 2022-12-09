import { Dossier } from "@prisma/client";
import { useRouter } from "next/router";
import React from "react";
import { createDossierEds } from "../../fetching/dossiers";
import { ButtonLink } from "../../uiComponents/button";
import styles from "./ActionBar.module.scss";

const ActionBar: React.FC = ({}) => {
    const router = useRouter()

    const createDossier = async () => {
        let res = await createDossierEds({} as Dossier);
        router.push(`/dossier/${res.id}`)
    }

    return (
        <div className={styles.containerActionBar}>
            <div className={styles.tabs}>
                <ButtonLink onClick={() => router.push(`/`)}>En cours</ButtonLink>
                <ButtonLink light={true} onClick={() => router.push(`/`)}>Terminés</ButtonLink>
            </div>
            <div className={styles.button}>
                <ButtonLink onClick={() => createDossier()}>Créer un nouveau dossier</ButtonLink>
            </div>
        </div>
    );
};

export default ActionBar;