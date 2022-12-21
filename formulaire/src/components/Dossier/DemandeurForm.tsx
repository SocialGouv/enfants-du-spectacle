import React from "react";
import styles from "./DossierForm.module.scss";
import { Card, CardDescription, CardTitle } from "@dataesr/react-dsfr";
import { Demandeur } from "@prisma/client";
import { DossierData } from "src/fetching/dossiers";

interface Props {
    demandeur: Demandeur
    passData: (demandeur: Demandeur) => void;
}

const DemandeurForm: React.FC<Props> = ({demandeur, passData}) => {
    const [demandeurTmp, setDemandeur] = React.useState<Demandeur>(demandeur)

    const handleFormDemandeur = (e: React.FormEvent<HTMLInputElement>): void => {
        setDemandeur({
        ...demandeurTmp,
        [e.target.id]: e.currentTarget.value,
      });
    };

    React.useEffect(() => {
        passData(demandeurTmp)
    }, [demandeurTmp, passData])

    return (
        <div className={styles.demandeurForm}>
            <Card>

                <CardTitle>
                    <span className={styles.titleCard}>Informations liées au demandeur</span>
                </CardTitle>
                <CardDescription>
                    <div className={styles.byThreeForm}>

                        <div className={styles.blocForm}>
                            <label htmlFor="prenom" className="mb-2 italic">
                                Prénom
                            </label>
                            <input
                                onChange={handleFormDemandeur}
                                value={demandeurTmp.prenom || ''}
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
                                onChange={handleFormDemandeur}
                                value={demandeurTmp.nom || ''}
                                type="text"
                                id="nom"
                                name="nom"
                                className="inputText"
                            />
                        </div>


                        <div className={styles.blocForm}>
                            <label htmlFor="fonction" className="mb-2 italic">
                                Fonction
                            </label>
                            <input
                                onChange={handleFormDemandeur}
                                value={demandeurTmp.fonction || ''}
                                type="text"
                                id="fonction"
                                name="fonction"
                                className="inputText"
                            />
                        </div>


                        <div className={styles.blocForm}>
                            <label htmlFor="email" className="mb-2 italic">
                                Mail
                            </label>
                            <input
                                onChange={handleFormDemandeur}
                                value={demandeurTmp.email || ''}
                                type="text"
                                id="email"
                                name="email"
                                className="inputText"
                            />
                        </div>


                        <div className={styles.blocForm}>
                            <label htmlFor="phone" className="mb-2 italic">
                                Téléphone
                            </label>
                            <input
                                onChange={handleFormDemandeur}
                                value={demandeurTmp.phone || ''}
                                type="text"
                                id="phone"
                                name="phone"
                                className="inputText"
                            />
                        </div>
                    </div>
                </CardDescription>
            </Card>
            
        </div>
    );
};

export default DemandeurForm;