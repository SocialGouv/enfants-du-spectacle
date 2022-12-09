
import { Card, CardDescription, CardTitle, Select } from "@dataesr/react-dsfr";
import { Dossier, Enfant, User } from "@prisma/client";
import React from "react";
import { DossierData, updateDossier } from "../../fetching/dossiers";
import { CATEGORIES, TYPE_EMPLOI } from "../../lib/helpers";
import { ButtonLink } from "../../uiComponents/button";
import styles from "./DossierForm.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/router";
import DemandeurForm from "./DemandeurForm";
import ProjectForm from "./ProjectForm";
import EnfantForm from "./EnfantForm";
import EnfantList from "./EnfantList";

interface Props {
    dossier: DossierData
}

const DossierForm: React.FC<Props> = ({ dossier }) => {
    const router = useRouter()

    const [toDisplay, setTodisplay] = React.useState<'Demandeur' | 'Projet' | 'Enfants'>('Demandeur')
    const [dossierTmp, setDossier] = React.useState<Dossier>(dossier)

    const saveDossier = async () => {
        let res = await updateDossier(dossierTmp)
        console.log('res : ', res)
        router.push('/')
    }

    const receiveData = (received: Dossier) => {
        setDossier(received)
    }

    return (
        <div className={styles.dossierForm}>

            <div className={styles.menuDossier}>
                <ButtonLink light={toDisplay !== 'Demandeur'} onClick={() => setTodisplay('Demandeur')}>Demandeur</ButtonLink>
                <ButtonLink light={toDisplay !== 'Projet'} onClick={() => setTodisplay('Projet')}>Projet</ButtonLink>
                <ButtonLink light={toDisplay !== 'Enfants'} onClick={() => setTodisplay('Enfants')}>Enfants</ButtonLink>
            </div>

            <div className={styles.divForm}>
                {toDisplay === 'Demandeur' &&
                    <DemandeurForm dossier={dossier}></DemandeurForm>
                }


                {toDisplay === 'Projet' &&
                    <ProjectForm dossier={dossier} passData={receiveData}></ProjectForm>
                }


                {toDisplay === 'Enfants' &&
                    <>
                        <EnfantList dossier={dossier}></EnfantList>
                    </>
                }

                <div className={styles.saveBar}>
                    <ButtonLink onClick={() => {saveDossier()}}>Déposer le dossier</ButtonLink>
                </div>


            </div>
            
        </div>
    );
};

export default DossierForm;