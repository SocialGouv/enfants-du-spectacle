import React from "react";
import styles from "./DossierForm.module.scss";
import { Card, CardDescription, CardTitle, Select } from "@dataesr/react-dsfr";
import { User } from "@prisma/client";
import { DossierData } from "src/fetching/dossiers";

interface Props {
    dossier: DossierData
}

const DemandeurForm: React.FC<Props> = ({dossier}) => {
    const [user, setUser] = React.useState<User>(dossier.user)

    const handleFormUser = (e: React.FormEvent<HTMLInputElement>): void => {
      setUser({
        ...user,
        [e.target.id]: e.currentTarget.value,
      });
    };

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
                                onChange={handleFormUser}
                                value={user.prenom || ''}
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
                                onChange={handleFormUser}
                                value={user.nom || ''}
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
                                onChange={handleFormUser}
                                value={user.fonction || ''}
                                type="text"
                                id="fonction"
                                name="fonction"
                                className="inputText"
                            />
                        </div>


                        <div className={styles.blocForm}>
                            <label htmlFor="mail" className="mb-2 italic">
                                Mail
                            </label>
                            <input
                                onChange={handleFormUser}
                                value={user.email || ''}
                                type="text"
                                id="mail"
                                name="mail"
                                className="inputText"
                            />
                        </div>


                        <div className={styles.blocForm}>
                            <label htmlFor="telephone" className="mb-2 italic">
                                Téléphone
                            </label>
                            <input
                                onChange={handleFormUser}
                                value={user.telephone || ''}
                                type="text"
                                id="telephone"
                                name="telephone"
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