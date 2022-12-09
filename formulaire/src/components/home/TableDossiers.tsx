import { Card, CardDescription, CardTitle } from "@dataesr/react-dsfr";
import { useRouter } from "next/router";
import React from "react";
import { DossierData, getDossier, getDossiers } from "../../fetching/dossiers";
import { frenchDateText } from "../../lib/helpers";
import { ButtonLink } from "../../uiComponents/button";
import styles from "./TableDossiers.module.scss";

const TableDossiers: React.FC = ({}) => {
    const router = useRouter()
    const [dossiers, setDossiers] = React.useState<DossierData[]>([])

    const fetchDossiers = async () => {
        console.log('fetching dossiers ...')
        let res = await getDossiers()
        setDossiers(res)
    }

    React.useEffect(() => {
        fetchDossiers()
    }, [])

    return (
        <div className={styles.containerDossiers}>
            <Card>
                <CardTitle>
                    <span className={styles.titleTable}>Dossiers en cours</span>
                </CardTitle>
                <CardDescription>
                    <div className={styles.headRow}>
                        <div className={styles.itemHead}>
                            N° Dossier
                        </div>
                        <div className={styles.itemHead}>
                            Demandeur
                        </div>
                        <div className={styles.itemHead}>
                            Statut
                        </div>
                        <div className={styles.itemHead}>
                            Mis à jour
                        </div>
                        <div className={styles.itemHead}>
                            Actions
                        </div>
                        <div className={styles.itemHead}>
                            Pièces justificatives
                        </div>
                    </div>
                    {dossiers.map((dossier) => (
                        <div className={styles.rowDossier} key={dossier.id}>
                            <div className={styles.itemDossier}>
                                {dossier.id}
                            </div>
                            <div className={styles.itemDossier}>
                                {dossier.user.email}
                            </div>
                            <div className={styles.itemDossier}>
                                {dossier.statut}
                            </div>
                            <div className={styles.itemDossier}>
                                {frenchDateText(dossier.dateDerniereModification)}
                            </div>
                            <div className={styles.itemDossier}>
                                <ButtonLink onClick={() => {router.push(`/dossier/${dossier.id}`)}}>Éditer</ButtonLink>
                            </div>
                            <div className={styles.itemDossier}>
                                Pièces justificatives
                            </div>
                        </div>
                    ))}

                </CardDescription>
            </Card>
        </div>
    );
};

export default TableDossiers;