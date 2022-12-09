import React from "react";
import styles from "./DossierForm.module.scss";
import { Card, CardDescription, CardTitle, Select } from "@dataesr/react-dsfr";
import { Dossier } from "@prisma/client";
import { DossierData } from "src/fetching/dossiers";
import { CATEGORIES } from "../../lib/helpers";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";

interface Props {
    dossier: DossierData
    passData: (dossier: Dossier) => void;
}

const ProjectForm: React.FC<Props> = ({dossier, passData}) => {
    const [dossierTmp, setDossier] = React.useState<Dossier>(dossier)

    const handleFormDossier = (e: React.FormEvent<HTMLInputElement>): void => {
        setDossier({
          ...dossierTmp,
          [e.target.id]: e.currentTarget.value,
        });
      };
      
    const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
        setDossier({
          ...dossierTmp,
          presentation: e.currentTarget.value.replace(/\n/g, "<br />"),
        });
      };

    const handleDate = (wichDate: string, date: Date): void => {
        setDossier({
            ...dossierTmp,
            [wichDate]: date,
        });
    };

    React.useEffect(() => {
        passData(dossierTmp)
    }, [dossierTmp])

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
                            value={dossierTmp.presentation}
                            className={styles.areaText}
                        />
                        </div>

                    </div>

                    <div className={styles.blocForm}>

                        <label htmlFor="scenario" className="mb-2 italic">
                            Scenario ou script
                        </label>

                        <p className={styles.smallText}>
                            Veuillez accompagner le document d&apos;une note mentionnant les numéros de page sur lesquelles sont décrites les scènes ou intervient l&apos;enfant.
                        </p>

                        <div className="Form--field">
                            <input type="file"
                                id="scenario" name="avatar"
                                accept="image/png, image/jpeg">
                            </input>
                        </div>

                    </div>

                    <div className={styles.blocForm}>

                        <label htmlFor="securite" className="mb-2 italic">
                            Note précisant les mesures de sécurité
                        </label>

                        <p className={styles.smallText}>
                            Veuillez fournir un document présentant de manière précise et détaillée, la façon dont sont réalisées les scène susceptibles d&apos;exposer l&apos;enfant à un risque, ainsi que les mesures prises pour l&apos;éviter.
                        </p>

                        <div className="Form--field">
                            <input type="file"
                                id="securite" name="avatar"
                                accept="image/png, image/jpeg">
                                    
                            </input>
                        </div>

                    </div>

                    <div className={styles.halfForm}>

                        <div className={styles.blocForm}>
                            <label htmlFor="date" className="mb-2 italic">
                                Date de commencement du projet
                            </label>
                            <div className={styles.datePickerWrapper}>
                            <DatePicker
                                dateFormat="dd/MM/yyyy"
                                selected={dossierTmp.dateDebut}
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
                                selected={dossierTmp.dateFin}
                                className="inputText"
                                onChange={(date: Date) => {
                                    handleDate("dateFin", date);
                                }}
                            />
                            </div>
                        </div>

                    </div>

                    <div className={styles.blocForm}>

                        <label htmlFor="complementaire" className="mb-2 italic">
                            Éléments d&apos;information complémentaires
                        </label>

                        <p className={styles.smallText}>
                            Veuillez fournir, le cas échéant, tous éléments que vous jugez utiles à la compréhension du dossier (précisions sur les particularités du projet et sur les conditions spécifiques de tournage, de répétition ou de représentation imposées aux enfants, justification de la nécessité de ces conditions, etc)
                        </p>

                        <div className="Form--field">
                            <input type="file"
                                id="complementaire" name="avatar"
                                accept="image/png, image/jpeg">
                                    
                            </input>
                        </div>

                    </div>


                </CardDescription>
            </Card>
            
        </div>
    );
};

export default ProjectForm;