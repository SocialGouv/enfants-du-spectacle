import React from "react";
import styles from "./DossierForm.module.scss";
import { Select } from "@dataesr/react-dsfr";
import { Enfant, JustificatifEnfant } from "@prisma/client";
import { TYPE_EMPLOI, useDebouncedCallback } from "../../lib/helpers";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import { updateEnfant } from "src/fetching/enfant";
import _ from "lodash";
import fr from "date-fns/locale/fr";
import moment from 'moment';
import InputFile from "../uiComponents/InputFile";
import { EnfantData } from "src/fetching/dossiers";
import { createPieceEnfant, deletePieceEnfant } from "src/fetching/pieceEnfant";

interface Props {
    enfant: EnfantData;
    refresh: (enfant: Enfant) => void
}

const EnfantForm: React.FC<Props> = ({enfant, refresh}) => {
    const [enfantTmp, setEnfant] = React.useState<EnfantData>(enfant)
    const [debouncedState, setDebouncedState] = React.useState<Enfant>();
    const [initialRender, setInitialRender] = React.useState<Boolean>(true)

    const handleFormEnfant = (e: React.FormEvent<HTMLInputElement>): void => {
      setEnfant({
        ...enfantTmp,
        [e.target.id]: e.currentTarget.value,
      });
    };

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
        let res = await createPieceEnfant(
            {
                nom: e.target.files[0].name,
                enfantId: enfantTmp.id,
                type: e.target.id as JustificatifEnfant, 
                externalId: '', 
                link: ''
            }
        )
        setEnfant({
            ...enfantTmp,
            piecesDossier: enfantTmp.piecesDossier ? [...enfantTmp.piecesDossier, res] : [res]
        })
    }

    const handleDelete = async (id: string) => {
        let res = await deletePieceEnfant(parseInt(id))
        console.log('res : ', res)
        setEnfant({
            ...enfantTmp,
            piecesDossier: enfantTmp.piecesDossier.filter(doc => {return doc.id !== parseInt(id)})
        })
    }

    const saveEnfant = useDebouncedCallback(() => {
        console.log('saving enfant ...')
        updateEnfant(enfantTmp)
        refresh(enfantTmp)
    }, 1000);

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
                            <label htmlFor="prenom" className="mb-2 italic">
                                Prénom(s)
                            </label>
                            <input
                                onChange={handleFormEnfant}
                                value={enfantTmp?.prenom || ''}
                                type="text"
                                id="prenom"
                                name="prenom"
                                className="inputText"
                                onFocus={(e: React.FocusEvent<HTMLInputElement, Element>) => handleFocus(e)}
                            />
                        </div>


                        <div className={styles.blocForm}>
                            <label htmlFor="nom" className="mb-2 italic">
                                Nom
                            </label>
                            <input
                                onChange={handleFormEnfant}
                                value={enfantTmp?.nom || ''}
                                type="text"
                                id="nom"
                                name="nom"
                                className="inputText"
                                onFocus={(e: React.FocusEvent<HTMLInputElement, Element>) => handleFocus(e)}
                            />
                        </div>

                        <div className={styles.blocForm}>
                            <label htmlFor="date" className="mb-2 italic">
                                Né(e) le
                            </label>
                            <div className={styles.datePickerWrapper}>
                            <DatePicker
                                dateFormat="dd/MM/yyyy"
                                selected={enfantTmp?.dateNaissance ? moment(enfantTmp?.dateNaissance).toDate() : enfantTmp?.dateNaissance}
                                className="inputText"
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                onChange={(date: Date) => {
                                    handleDateEnfant("dateNaissance", date);
                                }}
                            />
                            </div>
                        </div>

                        <div className={styles.blocForm}>
                            <label htmlFor="typeEmploi" className="mb-2 italic">
                                Type d&apos;emploi
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
                                type="text"
                                id="nomPersonnage"
                                name="nomPersonnage"
                                className="inputText"
                            />
                        </div>

                        <div className={styles.blocForm}>
                            <label htmlFor="nombreJours" className="mb-2 italic">
                                Nombre de jours de travail
                            </label>
                            <input
                                onChange={handleFormEnfant}
                                value={enfantTmp?.nombreJours || 0}
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
                            Période de travail
                        </label>
                        <p className={styles.smallText}>
                            Veuillez indiquer la période (maximale de trois mois) aucours de laquelle l&apos;enfant va intervenir (exemple: l&apos;enfant travaillera à l&apos;intérieur d&apos;une période comprise entre le 15 mars 2022 et le 15 juin 2022)
                        </p>
                        <input
                            onChange={handleFormEnfant}
                            value={enfantTmp?.periodeTravail || ''}
                            type="text"
                            id="periodeTravail"
                            name="periodeTravail"
                            className="inputText"
                        />
                    </div>

                    <div className={styles.blocForm}>

                        <label htmlFor="contexteTravail" className="mb-2 italic">
                            Temps et lieu de travail 
                        </label>
                        <p className={styles.smallText}>
                            Veuillez indiquer de façon prévisionnelle, la durée quotidienne de travail, les temps de pause, les dates et horaires de travail, le(s) lieu(x) de travail. Veuillez, en outre, le cas échéant, indiquer les emplois précédemment occupés par l&apos;enfant.
                        </p>

                        <div className="Form--field">
                        <textarea
                            onChange={handleFormEnfant}
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
                                Montant du cachet
                            </label>
                            <input
                                onChange={handleFormEnfant}
                                value={enfant?.montantCachet || 0}
                                type="number"
                                min="0"
                                id="montantCachet"
                                name="montantCachet"
                                className="inputText"
                                onFocus={(e: React.FocusEvent<HTMLInputElement, Element>) => handleFocus(e)}
                            />
                        </div>


                        <div className={styles.blocForm}>
                            <label htmlFor="nombreCachets" className="mb-2 italic">
                                Nombre de cachets
                            </label>
                            <input
                                onChange={handleFormEnfant}
                                value={enfant?.nombreCachets || 0}
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
                                value={enfant?.nombreLignes || 0}
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
                            value={enfant?.remunerationsAdditionnelles || ''}
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
                                Rémunération totale
                            </label>
                            <input
                                onChange={handleFormEnfant}
                                value={enfant?.remunerationTotale || ''}
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
                            label={`Livret de Famille`} 
                            handleFile={handleFile}
                            handleDelete={handleDelete}
                            text={`Ce document doit être à jour`}
                        />

                    </div>

                    <div className={styles.blocForm}>

                        <InputFile id={'AUTORISATION_PARENTALE'} 
                            docs={enfantTmp.piecesDossier || []} 
                            label={`Autorisation parentale`} 
                            handleFile={handleFile}
                            handleDelete={handleDelete}
                            text={`En cas d'absence parentale pendant le temps de travail, les temps de repos et de trajet, le demandeur devra vérifier la moralité de la personne employée pour assurer la surveillance de l'enfant.`}
                        />

                    </div>

                    <div className={styles.blocForm}>

                        <InputFile id={'SITUATION_PARTICULIERE'} 
                            docs={enfantTmp.piecesDossier || []} 
                            label={`Situation particulière relative à l'autorité parentale`} 
                            handleFile={handleFile}
                            handleDelete={handleDelete}
                            text={`Veuillez fournir, le cas échéant, tout document justifiant d'une situation particulière relative à l'exercice de l&apos;autorité parentale (retrait d'autorité parentale, tutelle, etc)`}
                        />

                    </div>

                    <div className={styles.blocForm}>

                        <InputFile id={'CONTRAT'} 
                            docs={enfantTmp.piecesDossier || []} 
                            label={`Projet de contrat de travail`} 
                            handleFile={handleFile}
                            handleDelete={handleDelete}
                            text={`Veuillez fournir un document présentant de manière précise et détaillée, la façon dont sont réalisées les scène susceptibles d'exposer l'enfant à un risque, ainsi que les mesures prises pour l'éviter.`}
                        />

                    </div>

                    <div className={styles.blocForm}>

                        <InputFile id={'CERTIFICAT_SCOLARITE'} 
                            docs={enfantTmp.piecesDossier || []} 
                            label={`Certificat de scolarité ou avis pédagogique`} 
                            handleFile={handleFile}
                            handleDelete={handleDelete}
                            text={`L'avis pédagogique est requis à partir de 4 jours d'absence scolaire.`}
                        />

                    </div>

                    <div className={styles.blocForm}>

                        <InputFile id={'AVIS_MEDICAL'} 
                            docs={enfantTmp.piecesDossier || []} 
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