import React from "react";
import styles from "./DossierForm.module.scss";
import { Card, CardDescription, CardTitle, Select } from "@dataesr/react-dsfr";
import { Dossier, JustificatifDossier } from "@prisma/client";
import { DossierData } from "src/fetching/dossiers";
import { CATEGORIES } from "../../lib/helpers";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import fr from "date-fns/locale/fr";
import moment from 'moment';
import InputFile from "../uiComponents/InputFile";
import { createPiece, deletePiece } from "src/fetching/pieces";

interface Props {
    dossier: DossierData
    passData: (dossier: Dossier) => void;
}

const ProjectForm: React.FC<Props> = ({dossier, passData}) => {
    const [dossierTmp, setDossier] = React.useState<DossierData>(dossier)

    const handleFormDossier = (e: React.FormEvent<HTMLInputElement>): void => {
        setDossier({
          ...dossierTmp,
          [e.target.id]: e.currentTarget.value,
        });
      };
      
    const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
        setDossier({
          ...dossierTmp,
          presentation: e.currentTarget.value,
        });
      };

    const handleDate = (wichDate: string, date: Date): void => {
        setDossier({
            ...dossierTmp,
            [wichDate]: date,
        });
    };

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        let res = await createPiece(
            {
                nom: e.target.files[0].name,
                dossierId: dossierTmp.id,
                type: e.target.id as JustificatifDossier, 
                externalId: '', 
                link: ''
            }
        )
        setDossier({
            ...dossierTmp,
            piecesDossier: [...dossierTmp.piecesDossier, res]
        })
    }

    const handleDelete = async (id: string) => {
        let res = await deletePiece(parseInt(id))
        console.log('res : ', res)
        setDossier({
            ...dossierTmp,
            piecesDossier: dossierTmp.piecesDossier.filter(doc => {return doc.id !== parseInt(id)})
        })
    }

    React.useEffect(() => {
        passData(dossierTmp)
    }, [dossierTmp, passData])

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
                                Titre du projet
                            </label>
                            <input
                                onChange={handleFormDossier}
                                value={dossierTmp.nom || ''}
                                type="text"
                                id="nom"
                                name="nom"
                                className="inputText"
                            />
                        </div>

                        <div className={styles.blocForm}>
                            <label htmlFor="categorie" className="mb-2 italic">
                                Catégorie
                            </label>
                            <div className="selectDpt">
                            <Select
                                id="categorie"
                                selected={dossierTmp.categorie ? dossierTmp.categorie : ""}
                                options={[
                                { label: dossier.categorie ? "" : "Choisir", value: "" },
                                ].concat(
                                CATEGORIES.map((u) => ({
                                    label: u,
                                    value: u,
                                }))
                                )}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    handleFormDossier(event);
                                }}
                            />
                            </div>
                        </div>

                    </div>

                    <div className={styles.blocForm}>

                        <label htmlFor="presentation" className="mb-2 italic">
                            Présentation globale du projet
                        </label>

                        <div className="Form--field">
                        <textarea
                            onChange={handleForm}
                            type="textarea"
                            id="presentation"
                            value={dossierTmp.presentation || ''}
                            className={styles.areaText}
                        />
                        </div>

                    </div>

                    <div className={styles.blocForm}>

                        <InputFile id={'SCENARIO'} 
                            docs={dossierTmp.piecesDossier} 
                            label={'Scenario ou script'} 
                            handleFile={handleFile}
                            handleDelete={handleDelete}
                            text={`Veuillez accompagner le document d'une note mentionnant les numéros de page sur lesquelles sont décrites les scènes ou intervient l'enfant.`}
                        />

                    </div>

                    <div className={styles.blocForm}>

                        <InputFile id={'MESURES_SECURITE'} 
                            docs={dossierTmp.piecesDossier} 
                            label={'Note précisant les mesures de sécurité'} 
                            handleFile={handleFile}
                            handleDelete={handleDelete}
                            text={`Veuillez fournir un document présentant de manière précise et détaillée, la façon dont sont réalisées les scène susceptibles d'exposer l'enfant à un risque, ainsi que les mesures prises pour l'éviter.`}
                        />

                    </div>

                    <div className={styles.halfForm}>

                        <div className={styles.blocForm}>
                            <label htmlFor="date" className="mb-2 italic">
                                Date de commencement du projet
                            </label>
                            <div className={styles.datePickerWrapper}>
                            <DatePicker
                                dateFormat="dd/MM/yyyy"
                                selected={dossierTmp.dateDebut ? moment(dossierTmp.dateDebut).toDate() : dossierTmp.dateDebut}
                                className="inputText"
                                onChange={(date: Date) => {
                                    handleDate("dateDebut", date);
                                }}
                            />
                            </div>
                        </div>

                    </div>

                    <div className={styles.halfForm}>

                        <div className={styles.blocForm}>
                            <label htmlFor="date" className="mb-2 italic">
                                Date de fin du projet
                            </label>
                            <div className={styles.datePickerWrapper}>
                            <DatePicker
                                dateFormat="dd/MM/yyyy"
                                selected={dossierTmp.dateFin ? moment(dossierTmp.dateFin).toDate() : dossierTmp.dateFin}
                                className="inputText"
                                onChange={(date: Date) => {
                                    handleDate("dateFin", date);
                                }}
                            />
                            </div>
                        </div>

                    </div>

                    <div className={styles.blocForm}>

                        <InputFile id={'INFOS_COMPLEMENTAIRES'} 
                            docs={dossierTmp.piecesDossier} 
                            label={`Éléments d'information complémentaires`} 
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