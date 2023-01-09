
import { Demandeur, Enfant } from "@prisma/client";
import React from "react";
import { DossierData, updateDossier } from "../../fetching/dossiers";
import { ButtonLink } from "../../uiComponents/button";
import styles from "./DossierForm.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/router";
import DemandeurForm from "./DemandeurForm";
import ProjectForm from "./ProjectForm";
import EnfantList from "./EnfantList";
import { updateDemandeur } from "src/fetching/demandeur";
import { useDebouncedCallback } from "src/lib/helpers";

interface Props {
    dossier: DossierData
}

const DossierForm: React.FC<Props> = ({ dossier }) => {
    const router = useRouter()

    const [toDisplay, setTodisplay] = React.useState<'Demandeur' | 'Projet' | 'Enfants'>('Demandeur')
    const [dossierTmp, setDossier] = React.useState<DossierData>(dossier)
    const [demandeurTmp, setDemandeur] = React.useState<Demandeur>(dossier.Demandeur)
    const [enfantsTmp, setEnfants] = React.useState<Enfant[]>(dossier.enfants)

    const receiveDataDossier = (received: DossierData) => {
        setDossier(received)
    }

    const receiveDataDemandeur = (received: Demandeur) => {
        setDemandeur(received)
    }

    const receiveDataEnfants = (received: Enfant[]) => {
        setEnfants(received)
    }

    const saveDossier = useDebouncedCallback(() => {
        console.log('saving dossier ...')
        updateDossier(dossierTmp)
    }, 1000);

    const saveDemandeur = useDebouncedCallback(() => {
        console.log('saving demandeur ...')
        updateDemandeur(demandeurTmp)
    }, 1000);

    React.useEffect(() => {
        saveDemandeur()
    }, [demandeurTmp])

    React.useEffect(() => {
        saveDossier()
    }, [dossierTmp])

    return (
        <div className={styles.dossierForm}>

            <div className={styles.menuDossier}>
                <ButtonLink light={toDisplay !== 'Demandeur'} onClick={() => setTodisplay('Demandeur')}>Demandeur</ButtonLink>
                <ButtonLink light={toDisplay !== 'Projet'} onClick={() => setTodisplay('Projet')}>Projet</ButtonLink>
                <ButtonLink light={toDisplay !== 'Enfants'} onClick={() => setTodisplay('Enfants')}>Enfants</ButtonLink>
            </div>

            <div className={styles.divForm}>
                {toDisplay === 'Demandeur' &&
                    <DemandeurForm demandeur={demandeurTmp} passData={receiveDataDemandeur}></DemandeurForm>
                }


                {toDisplay === 'Projet' &&
                    <ProjectForm dossier={dossierTmp} passData={receiveDataDossier}></ProjectForm>
                }


                {toDisplay === 'Enfants' &&
                    <>
                        <EnfantList dossier={dossierTmp} enfants={enfantsTmp} passData={receiveDataEnfants}></EnfantList>
                    </>
                }

                <div className={styles.saveBar}>
                    <ButtonLink onClick={async () => {
                        setDossier({
                            ...dossierTmp,
                            statut: 'CONSTRUCTION'
                        })
                        await updateDossier(dossierTmp); 
                        setTimeout(() => {
                            router.push(`/`)
                          }, 1000)
                    }}>Déposer le dossier</ButtonLink>
                </div>


            </div>
            
        </div>
    );
};

export default DossierForm;