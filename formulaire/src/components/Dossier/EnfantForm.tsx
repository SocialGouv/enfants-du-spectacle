import React, { KeyboardEventHandler } from "react";
import styles from "./DossierForm.module.scss";
import { Select } from "@dataesr/react-dsfr";
import { Enfant, JustificatifEnfant, PieceDossierEnfant } from "@prisma/client";
import { TYPE_EMPLOI, useDebouncedCallback } from "../../lib/helpers";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import { EnfantWithDosier, updateEnfant } from "src/fetching/enfant";
import _ from "lodash";
import fr from "date-fns/locale/fr";
import moment from 'moment';
import InputFile from "../uiComponents/InputFile";
import { EnfantData } from "src/fetching/dossiers";
import { createPieceEnfant, deletePieceEnfant } from "src/fetching/pieceEnfant";
import InputAutocomplete from "../uiComponents/InputAutocomplete";
import { uploadDoc } from "src/fetching/docs";
import Link from "next/link";

interface Props {
    enfant: EnfantData;
    allowChanges: Boolean;
    refresh: (enfant: Enfant) => void
}

const EnfantForm: React.FC<Props> = ({enfant, allowChanges, refresh}) => {
    const [enfantTmp, setEnfant] = React.useState<EnfantData>(enfant)
    const [dataPassed, setDataPassed] = React.useState<Record<'nom' | 'prenom', string>>()
    const [initialRender, setInitialRender] = React.useState<Boolean>(true)
    const [initialDataPassed, setInitialDataPassed] = React.useState<Boolean>(true)

    const handleFormEnfant = (e: React.FormEvent<HTMLInputElement>): void => {
      setEnfant({
        ...enfantTmp,
        [e.target.id]: e.currentTarget.value,
      });
    };

    const handleAutocomplete = (str: string, field: 'nom' | 'prenom') : void => {
        setDataPassed({[field]: str} as Record<'nom' | 'prenom', string>)
    };

    React.useEffect(() => {
        if(!initialDataPassed) {
            setEnfant({
                ...enfantTmp,
                [dataPassed?.nom ? 'nom' : 'prenom'] : dataPassed?.nom ? dataPassed?.nom : dataPassed?.prenom
            })
        } else {
            setInitialDataPassed(false)
        }
    }, [dataPassed])



    const handleSelect = (enfant: EnfantWithDosier) => {
        setEnfant({
            ...enfantTmp,
            nom: enfant.nom,
            prenom: enfant.prenom,
            dateNaissance: enfant.dateNaissance,
            piecesDossier: enfant.piecesDossier
        })
        enfant.piecesDossier.map(async (pieceDossier) => {
            pieceDossier.enfantId = enfantTmp.id
            delete pieceDossier.id
            await createPieceEnfant(pieceDossier)
        })
    }

    const handleDateEnfant = ( wichDate: string, date: Date): void => {
        setEnfant({
            ...enfantTmp,
            [wichDate]: date,
        });
    };

    const handleFocus = (event:React.FocusEvent<HTMLInputElement, Element>) => {
        event.target.select();
    }

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const data = new FormData()
        data.append(e.target.name, e.target.files[0])
        let upload = await uploadDoc(data, enfantTmp.dossierId)
        let res = await createPieceEnfant(
            {
                nom: e.target.files[0].name,
                enfantId: enfantTmp.id,
                type: e.target.id as JustificatifEnfant, 
                externalId: '', 
                link: upload.filePath
            }
        )
        setEnfant({
            ...enfantTmp,
            piecesDossier: enfantTmp.piecesDossier ? [...enfantTmp.piecesDossier, res] : [res]
        })
    }

    const handleDelete = async (id: string) => {
        let res = await deletePieceEnfant(parseInt(id))
        setEnfant({
            ...enfantTmp,
            piecesDossier: enfantTmp.piecesDossier.filter(doc => {return doc.id !== parseInt(id)})
        })
    }

    const saveEnfant = useDebouncedCallback(() => {
        updateEnfant(enfantTmp)
        refresh(enfantTmp)
    }, 1000);

    React.useEffect(() => {
        let total = 0
        if(enfantTmp.nombreCachets && enfantTmp.montantCachet)
            total = enfantTmp.montantCachet * enfantTmp.nombreCachets
        if(enfantTmp.remunerationsAdditionnelles)
            total += parseFloat(enfantTmp.remunerationsAdditionnelles)
        setEnfant({
            ...enfantTmp,
            remunerationTotale: total
        })
    }, [enfantTmp.montantCachet, enfantTmp.nombreCachets, enfantTmp.remunerationsAdditionnelles])

    React.useEffect(() => {
        if(initialRender){
            setInitialRender(false);
        } else{
            saveEnfant()
        }
    }, [enfantTmp])

    React.useEffect(() => {
      registerLocale("fr", fr);
      setDefaultLocale("fr");
    });

    return (
        <div className={styles.enfantForm}>
                <div className={styles.byThreeForm}>

                    <div className={styles.blocForm}>
                        <InputAutocomplete label={'Prénom(s) *'} field={'prenom'} enfant={enfantTmp} passData={handleAutocomplete} passEnfant={handleSelect}></InputAutocomplete>
                    </div>

                    <div className={styles.blocForm}>
                        <InputAutocomplete label={'Nom *'} field={'nom'} enfant={enfantTmp} passData={handleAutocomplete} passEnfant={handleSelect}></InputAutocomplete>
                    </div>

                    <div className={styles.blocForm}>
                        <label htmlFor="date" className="mb-2 italic">
                            Né(e) le *
                        </label>
                        <div className={styles.datePickerWrapper}>
                        <DatePicker
                            dateFormat="dd/MM/yyyy"
                            selected={enfantTmp?.dateNaissance ? moment(enfantTmp?.dateNaissance).toDate() : enfantTmp?.dateNaissance}
                            className="inputText"
                            showMonthDropdown
                            showYearDropdown
                            disabled={!allowChanges}
                            dropdownMode="select"
                            onChange={(date: Date) => {
                                handleDateEnfant("dateNaissance", date);
                            }}
                        />
                        </div>
                    </div>

                    <div className={styles.blocForm}>
                        <label htmlFor="typeEmploi" className="mb-2 italic">
                            Type d&apos;emploi *
                        </label>
                        <div className="selectDpt">
                        <Select
                            id="typeEmploi"
                            selected={enfantTmp?.typeEmploi ? enfantTmp.typeEmploi : ''}
                            options={[
                            { label: enfantTmp?.typeEmploi ? "" : "Choisir", value: "" },
                            ].concat(
                            TYPE_EMPLOI.map((u) => ({
                                label: u,
                                value: u,
                            }))
                            )}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                handleFormEnfant(event);
                            }}
                        />
                        </div>
                    </div>

                    <div className={styles.blocForm}>
                        <label htmlFor="nomPersonnage" className="mb-2 italic">
                            Nom du personnage incarné par l&apos;enfant
                        </label>
                        <input
                            onChange={handleFormEnfant}
                            value={enfantTmp?.nomPersonnage || ''}
                            disabled={!allowChanges}
                            type="text"
                            id="nomPersonnage"
                            name="nomPersonnage"
                            className="inputText"
                        />
                    </div>

                    <div className={styles.blocForm}>
                        <label htmlFor="nombreJours" className="mb-2 italic">
                            Nombre de jours de travail *
                        </label>
                        <input
                            onChange={handleFormEnfant}
                            value={enfantTmp?.nombreJours || 0}
                            disabled={!allowChanges}
                            type="number"
                            min="0"
                            id="nombreJours"
                            name="nombreJours"
                            className="inputText"
                            onFocus={(e: React.FocusEvent<HTMLInputElement, Element>) => handleFocus(e)}
                        />
                    </div>

                </div>


                <div className={styles.blocForm}>
                    <label htmlFor="periodeTravail" className="mb-2 italic">
                        Période de travail *
                    </label>
                    <p className={styles.smallText}>
                        Veuillez indiquer la période (maximale de trois mois) aucours de laquelle l&apos;enfant va intervenir (exemple: l&apos;enfant travaillera à l&apos;intérieur d&apos;une période comprise entre le 15 mars 2022 et le 15 juin 2022)
                    </p>
                    <input
                        onChange={handleFormEnfant}
                        value={enfantTmp?.periodeTravail || ''}
                        disabled={!allowChanges}
                        type="text"
                        id="periodeTravail"
                        name="periodeTravail"
                        className="inputText"
                    />
                </div>

                <div className={styles.blocForm}>

                    <label htmlFor="contexteTravail" className="mb-2 italic">
                        Temps et lieu de travail *
                    </label>
                    <p className={styles.smallText}>
                        Veuillez indiquer de façon prévisionnelle, la durée quotidienne de travail, les temps de pause, les dates et horaires de travail, le(s) lieu(x) de travail. Veuillez, en outre, le cas échéant, indiquer les emplois précédemment occupés par l&apos;enfant.
                    </p>

                    <div className="Form--field">
                    <textarea
                        onChange={handleFormEnfant}
                        disabled={!allowChanges}
                        type="textarea"
                        id="contexteTravail"
                        value={enfantTmp?.contexteTravail || ''}
                        className={styles.areaText}
                    />
                    </div>

                </div>
                    <br />
                    <br />

                <div className={styles.byThreeForm}>

                    <div className={styles.blocForm}>
                        <label htmlFor="montantCachet" className="mb-2 italic">
                            Montant du cachet *
                        </label>
                        <input
                            onChange={handleFormEnfant}
                            value={enfantTmp?.montantCachet}
                            disabled={!allowChanges}
                            type="number"
                            min="0"
                            step="0.01"
                            lang="en-US"
                            id="montantCachet"
                            name="montantCachet"
                            className="inputText"
                            onFocus={(e: React.FocusEvent<HTMLInputElement, Element>) => handleFocus(e)}
                        />
                    </div>


                    <div className={styles.blocForm}>
                        <label htmlFor="nombreCachets" className="mb-2 italic">
                            Nombre de cachets *
                        </label>
                        <input
                            onChange={handleFormEnfant}
                            value={enfantTmp?.nombreCachets || 0}
                            disabled={!allowChanges}
                            type="number"
                            min="0"
                            id="nombreCachets"
                            name="nombreCachets"
                            className="inputText"
                            onFocus={(e: React.FocusEvent<HTMLInputElement, Element>) => handleFocus(e)}
                        />
                    </div>


                    <div className={styles.blocForm}>
                        <label htmlFor="nombreLignes" className="mb-2 italic">
                            Nombre de lignes
                        </label>
                        <input
                            onChange={handleFormEnfant}
                            value={enfantTmp?.nombreLignes || 0}
                            disabled={!allowChanges}
                            type="number"
                            min="0"
                            id="nombreLignes"
                            name="nombreLignes"
                            className="inputText"
                            onFocus={(e: React.FocusEvent<HTMLInputElement, Element>) => handleFocus(e)}
                        />
                    </div>
                </div>


                <div className={styles.blocForm}>
                    <label htmlFor="remunerationsAdditionnelles" className="mb-2 italic">
                        Rémunérations additionnelles
                    </label>
                    <p className={styles.smallText}>
                        Veuillez indiquer le montant, le nombre et la nature des éventuelles rémunérations additionnelles.
                    </p>
                    <input
                        onChange={handleFormEnfant}
                        value={enfantTmp?.remunerationsAdditionnelles || ''}
                        disabled={!allowChanges}
                        type="number"
                        min="0"
                        id="remunerationsAdditionnelles"
                        name="remunerationsAdditionnelles"
                        className="inputText"
                    />
                </div>

                <div className={styles.halfForm}>

                    <div className={styles.blocForm}>
                        <label htmlFor="remunerationTotale" className="mb-2 italic">
                            Rémunération totale *
                        </label>
                        <input
                            onChange={handleFormEnfant}
                            value={enfantTmp?.remunerationTotale}
                            disabled={!allowChanges}
                            type="number"
                            min="0"
                            id="remunerationTotale"
                            name="remunerationTotale"
                            className="inputText"
                            onFocus={(e: React.FocusEvent<HTMLInputElement, Element>) => handleFocus(e)}
                        />
                    </div>

                </div>

                <div className={styles.blocForm}>

                    <InputFile id={'LIVRET_FAMILLE'} 
                        docs={enfantTmp.piecesDossier || []} 
                        allowChanges={!allowChanges}
                        label={`Livret de Famille *`} 
                        handleFile={handleFile}
                        handleDelete={handleDelete}
                        text={`Ce document doit être à jour`}
                    />

                </div>

                <div className={styles.blocForm}>

                    <InputFile id={'AUTORISATION_PARENTALE'} 
                        docs={enfantTmp.piecesDossier || []} 
                        allowChanges={!allowChanges}
                        label={`Autorisation parentale *`} 
                        handleFile={handleFile}
                        handleDelete={handleDelete}
                        text={`En cas d'absence parentale pendant le temps de travail, les temps de repos et de trajet, le demandeur devra vérifier la moralité de la personne employée pour assurer la surveillance de l'enfant.`}
                    />

                </div>

                <div className={styles.blocForm}>

                    <InputFile id={'SITUATION_PARTICULIERE'} 
                        docs={enfantTmp.piecesDossier || []} 
                        allowChanges={!allowChanges}
                        label={`Situation particulière relative à l'autorité parentale`} 
                        handleFile={handleFile}
                        handleDelete={handleDelete}
                        text={`Veuillez fournir, le cas échéant, tout document justifiant d'une situation particulière relative à l'exercice de l'autorité parentale (retrait d'autorité parentale, tutelle, etc)`}
                    />

                </div>

                <div className={styles.blocForm}>

                    <InputFile id={'CONTRAT'} 
                        docs={enfantTmp.piecesDossier || []} 
                        allowChanges={!allowChanges}
                        label={`Projet de contrat de travail *`} 
                        handleFile={handleFile}
                        handleDelete={handleDelete}
                        text={`Veuillez fournir un document présentant de manière précise et détaillée, la façon dont sont réalisées les scène susceptibles d'exposer l'enfant à un risque, ainsi que les mesures prises pour l'éviter.`}
                    />

                </div>

                <div className={styles.blocForm}>

                    <InputFile id={'CERTIFICAT_SCOLARITE'} 
                        docs={enfantTmp.piecesDossier || []} 
                        allowChanges={!allowChanges}
                        label={`Certificat de scolarité ou avis pédagogique`} 
                        handleFile={handleFile}
                        handleDelete={handleDelete}
                        text={`L'avis pédagogique est requis à partir de 4 jours d'absence scolaire.`}
                    />
                    <div className={styles.smallText}>Informations disponibles sur le site de <Link href="https://www.ac-paris.fr/" target={"_blank"}>l'Académie de Paris</Link></div>

                </div>

                <div className={styles.blocForm}>

                    <InputFile id={'AVIS_MEDICAL'} 
                        docs={enfantTmp.piecesDossier || []} 
                        allowChanges={!allowChanges}
                        label={`Avis médical d'aptitude`} 
                        handleFile={handleFile}
                        handleDelete={handleDelete}
                        text={`Un avis d'un médecin du travail de Thalie Santé (à minima, veuillez fournir un document justifiant d'une prise de rendez-vous). Pour les figurants et les silhouettes, un avis d'un médecin généraliste (enfant à partir de 3 ans) ou d'un pédiatre (enfant de moins de 3 ans) est accepté.`}
                    />

                </div>
            
        </div>
    );
};

export default EnfantForm;