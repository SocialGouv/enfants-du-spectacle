import React from "react";
import styles from "./DossierForm.module.scss";
import { Card, CardDescription, CardTitle, Select } from "@dataesr/react-dsfr";
import { JustificatifDossier } from "@prisma/client";
import { CATEGORIES } from "../../lib/helpers";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import fr from "date-fns/locale/fr";
import moment from 'moment';
import InputFile from "../uiComponents/InputFile";
import { createPiece, deletePiece } from "src/fetching/pieces";
import { uploadDoc } from "src/fetching/docs";
import useStateContext from "src/context/StateContext";

interface Props {
    allowChanges: Boolean
}

const ProjectForm: React.FC<Props> = ({ allowChanges }) => {
    const contextDossier = {...useStateContext()}

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const data = new FormData()
        if(e.target.files) {
            data.append(e.target.name, e.target.files[0])
            let upload = await uploadDoc(data, contextDossier.dossier.id)
            let res = await createPiece(
                {
                    nom: e.target.files[0].name,
                    dossierId: contextDossier.dossier.id,
                    type: e.target.id as JustificatifDossier, 
                    externalId: '', 
                    link: upload.filePath,
                    statut: null
                }
            )
            contextDossier.processInput('dossier', 'piecesDossier', [...contextDossier.dossier.piecesDossier, res])
        }
    }

    const handleDelete = async (id: string) => {
        let res = await deletePiece(parseInt(id))
        contextDossier.processInput('dossier', 'piecesDossier', contextDossier.dossier.piecesDossier.filter(doc => {return doc.id !== parseInt(id)}))
    }

    React.useEffect(() => {
      registerLocale("fr", fr);
      setDefaultLocale("fr");
    });

    return (
        <div className={styles.projectForm}>
            <Card>
                <CardTitle>
                    <span className={styles.titleCard}>Informations liées au projet</span>
                </CardTitle>
                <CardDescription>
                    <div className={styles.byTwoForm}>

                        <div className={styles.blocForm}>
                            <label htmlFor="nom" className="mb-2 italic">
                                Titre du projet *
                            </label>
                            <input
                                onChange={(e: React.FormEvent<HTMLInputElement>) => {contextDossier.processInput('dossier', 'nom', (e.target as HTMLInputElement).value)}}
                                value={contextDossier.dossier.nom || ''}
                                disabled={!allowChanges}
                                type="text"
                                id="nom"
                                name="nom"
                                className="inputText"
                            />
                        </div>

                        <div className={styles.blocForm}>
                            <label htmlFor="categorie" className="mb-2 italic">
                                Catégorie *
                            </label>
                            <div className="selectDpt">
                            <Select
                                id="categorie"
                                selected={contextDossier.dossier.categorie ? contextDossier.dossier.categorie : ""}
                                options={[
                                { label: contextDossier.dossier.categorie ? "" : "Choisir", value: "" },
                                ].concat(
                                CATEGORIES.map((u) => ({
                                    label: u,
                                    value: u,
                                }))
                                )}
                                onChange={(e: React.FormEvent<HTMLInputElement>) => {contextDossier.processInput('dossier', 'categorie', (e.target as HTMLInputElement).value)}}
                            />
                            </div>
                        </div>

                    </div>

                    <div className={styles.blocForm}>

                        <label htmlFor="presentation" className="mb-2 italic">
                            Présentation globale du projet *
                        </label>
                        <div className={styles.smallText}>Veuillez fournir une brève description du projet (ex: synopsis pour un film, liste des épisodes pour une série...). </div>
                        <div className="Form--field">
                        <textarea
                            onChange={(e: React.FormEvent<HTMLTextAreaElement>) => {contextDossier.processInput('dossier', 'presentation', (e.target as HTMLTextAreaElement).value)}}
                            disabled={!allowChanges}
                            id="presentation"
                            value={contextDossier.dossier.presentation || ''}
                            className={styles.areaText}
                        />
                        </div>

                    </div>

                    <div className={styles.blocForm}>

                        <InputFile id={'SCENARIO'} 
                            docs={contextDossier.dossier.piecesDossier} 
                            label={'Scenario ou script *'} 
                            allowChanges={!allowChanges}
                            handleFile={handleFile}
                            handleDelete={handleDelete}
                            text={`Veuillez accompagner le document d'une note mentionnant les numéros de page sur lesquelles sont décrites les scènes ou intervient l'enfant.`}
                        />

                    </div>

                    <div className={styles.blocForm}>

                        <InputFile id={'MESURES_SECURITE'} 
                            docs={contextDossier.dossier.piecesDossier} 
                            label={'Note précisant les mesures de sécurité *'} 
                            allowChanges={!allowChanges}
                            handleFile={handleFile}
                            handleDelete={handleDelete}
                            text={`Veuillez fournir un document présentant de manière précise et détaillée, la façon dont sont réalisées les scène susceptibles d'exposer l'enfant à un risque, ainsi que les mesures prises pour l'éviter.`}
                        />

                    </div>

                    <div className={styles.halfForm}>

                        <div className={styles.blocForm}>
                            <label htmlFor="date" className="mb-2 italic">
                                Date de commencement du projet *
                            </label>
                            <div className={styles.datePickerWrapper}>
                            <DatePicker
                                dateFormat="dd/MM/yyyy"
                                selected={contextDossier.dossier.dateDebut ? moment(contextDossier.dossier.dateDebut).toDate() : contextDossier.dossier.dateDebut}
                                className="inputText"
                                showMonthDropdown
                                showYearDropdown
                                disabled={!allowChanges}
                                dropdownMode="select"
                                onChange={(date: Date) => {contextDossier.processInput('dossier', 'dateDebut', date)}}
                            />
                            </div>
                        </div>

                    </div>

                    <div className={styles.halfForm}>

                        <div className={styles.blocForm}>
                            <label htmlFor="date" className="mb-2 italic">
                                Date de fin du projet *
                            </label>
                            <div className={styles.datePickerWrapper}>
                            <DatePicker
                                dateFormat="dd/MM/yyyy"
                                selected={contextDossier.dossier.dateFin ? moment(contextDossier.dossier.dateFin).toDate() : contextDossier.dossier.dateFin}
                                className="inputText"
                                showMonthDropdown
                                showYearDropdown
                                disabled={!allowChanges}
                                dropdownMode="select"
                                onChange={(date: Date) => {contextDossier.processInput('dossier', 'dateFin', date)}}
                            />
                            </div>
                        </div>

                    </div>

                    <div className={styles.blocForm}>

                        <InputFile id={'INFOS_COMPLEMENTAIRES'} 
                            docs={contextDossier.dossier.piecesDossier} 
                            label={`Éléments d'information complémentaires`} 
                            allowChanges={!allowChanges}
                            handleFile={handleFile}
                            handleDelete={handleDelete}
                            text={`Veuillez fournir, le cas échéant, tous éléments que vous jugez utiles à la compréhension du dossier (précisions sur les particularités du projet et sur les conditions spécifiques de tournage, de répétition ou de représentation imposées aux enfants, justification de la nécessité de ces conditions, etc)`}
                        />

                    </div>


                </CardDescription>
            </Card>
            
        </div>
    );
};

export default ProjectForm;