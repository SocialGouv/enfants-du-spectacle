import React from "react";
import styles from "./DossierForm.module.scss";
import { Select } from "@dataesr/react-dsfr";
import { Enfant } from "@prisma/client";
import { TYPE_EMPLOI } from "../../lib/helpers";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import { updateEnfant } from "src/fetching/enfant";
import _ from "lodash";

interface Props {
    enfant: Enfant;
    refresh: (enfant: Enfant) => void
}

const EnfantForm: React.FC<Props> = ({enfant, refresh}) => {
    const [enfantTmp, setEnfant] = React.useState<Enfant>(enfant)
    const [debouncedState, setDebouncedState] = React.useState<Enfant>();

    const handleFormEnfant = (e: React.FormEvent<HTMLInputElement>): void => {
      setEnfant({
        ...enfantTmp,
        [e.target.id]: e.currentTarget.value,
      });
      debounce(enfantTmp);
      updateEnfant(enfantTmp)
    };

    const handleDateEnfant = ( wichDate: string, date: Date): void => {
        setEnfant({
            ...enfantTmp,
            [wichDate]: date,
        });
        debounce(enfantTmp);
    };

    const debounce = React.useCallback(
      _.debounce(async (enfantUp: Enfant) => {
        setDebouncedState(enfantUp);	
            await updateEnfant(enfantUp)
            refresh(enfantUp)
      }, 1000),
      []
    );

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('field : ', e.target.id)
        console.log('input files : ', e.target.files)
        setEnfant({
            ...enfantTmp,
            [e.target.id]: e.target.files[0].name
        })
    }



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
                            />
                        </div>

                        <div className={styles.blocForm}>
                            <label htmlFor="date" className="mb-2 italic">
                                Né(e) le
                            </label>
                            <div className={styles.datePickerWrapper}>
                            <DatePicker
                                dateFormat="dd/MM/yyyy"
                                selected={enfantTmp?.dateNaissance}
                                className="inputText"
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
                                name="typeEmploi"
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
                                value={enfantTmp?.nombreJours || ''}
                                type="text"
                                id="nombreJours"
                                name="nombreJours"
                                className="inputText"
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
                            value={enfantTmp?.contexteTravail}
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
                                value={enfant?.montantCachet || ''}
                                type="text"
                                id="montantCachet"
                                name="montantCachet"
                                className="inputText"
                            />
                        </div>


                        <div className={styles.blocForm}>
                            <label htmlFor="nombreCachets" className="mb-2 italic">
                                Nombre de cachets
                            </label>
                            <input
                                onChange={handleFormEnfant}
                                value={enfant?.nombreCachets || ''}
                                type="text"
                                id="nombreCachets"
                                name="nombreCachets"
                                className="inputText"
                            />
                        </div>


                        <div className={styles.blocForm}>
                            <label htmlFor="nombreLignes" className="mb-2 italic">
                                Nombre de lignes
                            </label>
                            <input
                                onChange={handleFormEnfant}
                                value={enfant?.nombreLignes || ''}
                                type="text"
                                id="nombreLignes"
                                name="nombreLignes"
                                className="inputText"
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
                            type="text"
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
                                type="text"
                                id="remunerationTotale"
                                name="remunerationTotale"
                                className="inputText"
                            />
                        </div>

                    </div>

                    <div className={styles.blocForm}>

                        <label htmlFor="livret" className="mb-2 italic">
                            Livret de Famille
                        </label>

                        <p className={styles.smallText}>
                            Ce document doit être à jour
                        </p>

                        <div className="Form--field">
                            <input type="file"
                                id="livret" name="avatar"
                                accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps" onChange={handleFile}>
                                    
                            </input>
                        </div>
                        {enfantTmp.livret && enfantTmp.livret !== null &&
                            <div className={styles.fileUploaded}>
                                <span>{enfantTmp.livret}</span>
                            </div>
                        }

                    </div>

                    <div className={styles.blocForm}>

                        <label htmlFor="autorisation" className="mb-2 italic">
                            Autorisation parentale
                        </label>

                        <p className={styles.smallText}>
                            En cas d&apos;absence parentale pendant le temps de travail, les temps de repos et de trajet, le demandeur devra vérifier la moralité de la personne employée pour assurer la surveillance de l&apos;enfant.
                        </p>

                        <div className="Form--field">
                            <input type="file"
                                id="autorisation" name="avatar"
                                accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps" onChange={handleFile}>
                                    
                            </input>
                        </div>
                        {enfantTmp.autorisation && enfantTmp.autorisation !== null &&
                            <div className={styles.fileUploaded}>
                                <span>{enfantTmp.autorisation}</span>
                            </div>
                        }

                    </div>

                    <div className={styles.blocForm}>

                        <label htmlFor="situation" className="mb-2 italic">
                            Situation particulière relative à l&apos;autorité parentale
                        </label>

                        <p className={styles.smallText}>
                            Veuillez fournir, le cas échéant, tout document justifiant d&apos;une situation particulière relative à l&apos;exercice de l&apos;autorité parentale (retrait d&apos;autorité parentale, tutelle, etc)
                        </p>

                        <div className="Form--field">
                            <input type="file"
                                id="situation" name="avatar"
                                accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps" onChange={handleFile}>
                                    
                            </input>
                        </div>
                        {enfantTmp.situation && enfantTmp.situation !== null &&
                            <div className={styles.fileUploaded}>
                                <span>{enfantTmp.situation}</span>
                            </div>
                        }

                    </div>

                    <div className={styles.blocForm}>

                        <label htmlFor="contrat" className="mb-2 italic">
                            Projet de contrat de travail
                        </label>

                        <p className={styles.smallText}>
                            Veuillez fournir un document présentant de manière précise et détaillée, la façon dont sont réalisées les scène susceptibles d&apos;exposer l&apos;enfant à un risque, ainsi que les mesures prises pour l&apos;éviter.
                        </p>

                        <div className="Form--field">
                            <input type="file"
                                id="contrat" name="avatar"
                                accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps" onChange={handleFile}>
                                    
                            </input>
                        </div>
                        {enfantTmp.contrat && enfantTmp.contrat !== null &&
                            <div className={styles.fileUploaded}>
                                <span>{enfantTmp.contrat}</span>
                            </div>
                        }

                    </div>

                    <div className={styles.blocForm}>

                        <label htmlFor="certificat" className="mb-2 italic">
                            Certificat de scolarité ou avis pédagogique
                        </label>

                        <p className={styles.smallText}>
                            L&apos;avis pédagogique est requis à partir de 4 jours d&apos;absence scolaire.
                        </p>

                        <div className="Form--field">
                            <input type="file"
                                id="certificat" name="avatar"
                                accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps" onChange={handleFile}>
                                    
                            </input>
                        </div>
                        {enfantTmp.certificat && enfantTmp.certificat !== null &&
                            <div className={styles.fileUploaded}>
                                <span>{enfantTmp.certificat}</span>
                            </div>
                        }

                    </div>

                    <div className={styles.blocForm}>

                        <label htmlFor="avis" className="mb-2 italic">
                            Avis médical d&apos;aptitude
                        </label>

                        <p className={styles.smallText}>
                            Un avis d&apos;un médecin du travail de Thalie Santé (à minima, veuillez fournir un document justifiant d&apos;une prise de rendez-vous). Pour les figurants et les silhouettes, un avis d&apos;un médecin généraliste (enfant à partir de 3 ans) ou d&apos;un pédiatre (enfant de moins de 3 ans) est accepté.
                        </p>

                        <div className="Form--field">
                            <input type="file"
                                id="avis" name="avatar"
                                accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps" onChange={handleFile}>
                                    
                            </input>
                        </div>
                        {enfantTmp.avis && enfantTmp.avis !== null &&
                            <div className={styles.fileUploaded}>
                                <span>{enfantTmp.avis}</span>
                            </div>
                        }

                    </div>
            
        </div>
    );
};

export default EnfantForm;