
import { Demandeur, Enfant, SocieteProduction } from "@prisma/client";
import React from "react";
import { DossierData, EnfantData, getDossier, updateDossier } from "../../fetching/dossiers";
import { ButtonLink } from "../../uiComponents/button";
import styles from "./DossierForm.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/router";
import DemandeurForm from "./DemandeurForm";
import ProjectForm from "./ProjectForm";
import EnfantList from "./EnfantList";
import { updateDemandeur } from "src/fetching/demandeur";
import { CHECKS, useDebouncedCallback } from "src/lib/helpers";
import Image from "next/image";
import { sendDossier } from "src/fetching/sync";

interface Props {
    dossier: DossierData
}

const DossierForm: React.FC<Props> = ({ dossier }) => {
    const router = useRouter()

    const [toDisplay, setTodisplay] = React.useState<'Demandeur' | 'Projet' | 'Enfants'>('Demandeur')
    const [dossierTmp, setDossier] = React.useState<DossierData>(dossier)
    const [demandeurTmp, setDemandeur] = React.useState<Demandeur & {societeFound?: SocieteProduction}>({...dossier.Demandeur})
    const [enfantsTmp, setEnfants] = React.useState<EnfantData[]>(dossier.enfants)
    const [messageError, setMessageError] = React.useState<string>('')
    const [messageSuccess, setMessageSuccess] = React.useState<string>('')
    const [initialRender, setInitialRender] = React.useState<Boolean>(true)

    const receiveDataDossier = (received: DossierData) => {
        setDossier(received)
    }

    const receiveDataDemandeur = (received: Demandeur & {societeFound?: SocieteProduction}) => {
        setDemandeur(received)
    }

    const receiveDataEnfants = (received: EnfantData[]) => {
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

    const processChecks: () => Promise<boolean> = async () => {
        let verif = true;
        setMessageError('')

        CHECKS.map((entity) => {
            switch (entity.entity){
                case 'Demandeur': 
                    entity.mandatory_fields.map((field) => {
                        if(!demandeurTmp[field.code as keyof Demandeur] || demandeurTmp[field.code as keyof Demandeur] === '') {
                            setTodisplay(entity.entity as 'Demandeur' | 'Projet' | 'Enfants')
                            setMessageError(`Le champ '${field.label}' est necessaire sur l'onglet Demandeur`)
                            verif = false
                        }
                    })
                    if(!demandeurTmp.societeFound) {
                        setTodisplay(entity.entity as 'Demandeur' | 'Projet' | 'Enfants')
                        setMessageError(`Le champ 'Société Production (SIRET)' est necessaire sur l'onglet Demandeur`)
                        verif = false
                    }
                    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(demandeurTmp.email ?? '')) {
                        setTodisplay(entity.entity as 'Demandeur' | 'Projet' | 'Enfants')
                        setMessageError(`Le champ 'Email' est incorrect sur l'onglet Demandeur`)
                        verif = false
                    }
                    break;
                case 'Projet': 
                    entity.mandatory_fields.map((field) => {
                        if(!dossierTmp[field.code as keyof DossierData] || dossierTmp[field.code as keyof DossierData] === '') {
                            setTodisplay(entity.entity as 'Demandeur' | 'Projet' | 'Enfants')
                            setMessageError(`Le champ '${field.label}' est necessaire sur l'onglet Projet`)
                            verif = false
                        }
                    })
                    entity.mandatory_files?.map((file) => {
                        if(dossierTmp.piecesDossier.filter(piece => piece.type === file.code).length === 0) {
                            setTodisplay(entity.entity as 'Demandeur' | 'Projet' | 'Enfants')
                            setMessageError(`Le document '${file.label}' est necessaire sur l'onglet Projet`)
                            verif = false
                        }
                    })
                    break;
                case 'Enfants': 
                    enfantsTmp.map((enfant) => {
                        entity.mandatory_fields.map((field) => {
                            if(!enfant[field.code as keyof Enfant] || enfant[field.code as keyof Enfant] === '') {
                                setTodisplay(entity.entity as 'Demandeur' | 'Projet' | 'Enfants')
                                setMessageError(`Le champ '${field.label}' est necessaire pour l'enfant ${enfant.nom} ${enfant.prenom}`)
                                verif = false
                            }
                        })
                        entity.mandatory_files?.map((file) => {
                            if(enfant.piecesDossier.filter(piece => piece.type === file.code).length === 0) {
                                setTodisplay(entity.entity as 'Demandeur' | 'Projet' | 'Enfants')
                                setMessageError(`Le document '${file.label}' est necessaire pour l'enfant ${enfant.nom} ${enfant.prenom}`)
                                verif = false
                            }
                        })
                    })
                    break;
                default: 
                    return false;

            }
        })
        return verif;
    }

    const handleDepotDossier = async () => {
        
        if(await processChecks()) {
            let checkStatusDB = await getDossier(router.query.id as string)
            if(checkStatusDB.statut === "BROUILLON") {
                setDossier({
                    ...dossierTmp,
                    statut: 'CONSTRUCTION'
                })
            }
            setMessageSuccess('Votre dossier est en cours d\'envoi aux services d\'instructions')
            await sendDossier(dossierTmp, demandeurTmp, enfantsTmp)
            setTimeout(() => {
                router.push(`/`)
            }, 1000)
        }
    }

    React.useEffect(() => {
        if(initialRender){
            setInitialRender(false);
        } else{
            saveDemandeur()
        }
    }, [demandeurTmp])

    React.useEffect(() => {
        if(initialRender){
            setInitialRender(false);
        } else{
            saveDossier()
        }
    }, [dossierTmp])

    return (
        <div className={styles.dossierForm}>

            <div className={styles.menuDossier} id='menu-dossier'>
                <ButtonLink light={toDisplay !== 'Demandeur'} onClick={() => setTodisplay('Demandeur')}>Demandeur</ButtonLink>
                <ButtonLink light={toDisplay !== 'Projet'} onClick={() => setTodisplay('Projet')}>Projet</ButtonLink>
                <ButtonLink light={toDisplay !== 'Enfants'} onClick={() => setTodisplay('Enfants')}>Enfants</ButtonLink>
            </div>

            <div className={styles.infosRow}>
                <div className={styles.infoImage}>
                    <Image
                        src={`/images/info.svg`}
                        alt="Supprimer"
                        width={20}
                        height={20}
                    />
                </div>
                <div className={styles.infoText}>
                    <p>Les champs suivis d’un astérisque ( * ) sont obligatoires. Votre dossier est enregistré automatiquement après chaque modification. Vous pouvez à tout moment fermer la fenêtre et reprendre plus tard là où vous en étiez.</p>
                </div>
            </div>

            {messageError !== '' &&
                <div className={styles.messageError}>{messageError}</div>
            }

            {messageSuccess !== '' &&
                <div className={styles.messageSuccess}>{messageSuccess}</div>
            }

            <div className={styles.divForm}>
                {toDisplay === 'Demandeur' &&
                    <DemandeurForm demandeur={demandeurTmp} passData={receiveDataDemandeur} allowChanges={dossier.statut === 'BROUILLON' || dossier.statut === 'CONSTRUCTION'}></DemandeurForm>
                }


                {toDisplay === 'Projet' &&
                    <ProjectForm dossier={dossierTmp} passData={receiveDataDossier} allowChanges={dossier.statut === 'BROUILLON' || dossier.statut === 'CONSTRUCTION'}></ProjectForm>
                }


                {toDisplay === 'Enfants' &&
                    <>
                        <EnfantList dossier={dossierTmp} enfants={enfantsTmp} passData={receiveDataEnfants} allowChanges={dossier.statut === 'BROUILLON' || dossier.statut === 'CONSTRUCTION'}></EnfantList>
                    </>
                }

                {(dossier.statut === 'BROUILLON' || dossier.statut === 'CONSTRUCTION') &&
                    <div className={styles.saveBar}>
                        <div className={styles.textSaveBar}>
                            <p>
                                Votre dossier est automatiquement enregistré. <br />
                                En cliquant sur le bouton Déposer, vous transmettrez le dossier aux services d'instruction.
                            </p>
                        </div>
                        <div className={styles.buttonSaveBar}>
                            <ButtonLink href={`#menu-dossier`} onClick={async () => {
                                handleDepotDossier()
                            }}>Déposer</ButtonLink>
                        </div>
                    </div>
                }


            </div>
            
        </div>
    );
};

export default DossierForm;