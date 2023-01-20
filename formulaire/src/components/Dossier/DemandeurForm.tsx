import React from "react";
import styles from "./DossierForm.module.scss";
import { Card, CardDescription, CardTitle, Select } from "@dataesr/react-dsfr";
import { Demandeur, SocieteProduction } from "@prisma/client";
import { CONVENTIONS } from "src/lib/helpers";
import SocieteProd from "./SocieteProd";

interface Props {
    demandeur: Demandeur & {societeFound?: SocieteProduction}
    allowChanges: Boolean
    passData: (demandeur: Demandeur & {societeFound?: SocieteProduction}) => void;
}

const DemandeurForm: React.FC<Props> = ({demandeur, passData, allowChanges}) => {
    const [demandeurTmp, setDemandeur] = React.useState<Demandeur & {societeFound?: SocieteProduction}>(demandeur)
    const [siret, setSiret] = React.useState<String>('')

    const handleFormDemandeur = (e: React.FormEvent<HTMLInputElement>): void => {
        setDemandeur({
        ...demandeurTmp,
        [e.target.id]: e.currentTarget.value,
      });
    };

    const handleSocieteProd = (societeProd: SocieteProduction) => {
        setDemandeur({
            ...demandeurTmp,
            societeProductionId: societeProd.id,
            societeFound: societeProd
        })
    }

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
                                Prénom *
                            </label>
                            <input
                                onChange={handleFormDemandeur}
                                value={demandeurTmp.prenom || ''}
                                disabled={!allowChanges}
                                type="text"
                                id="prenom"
                                name="prenom"
                                className="inputText"
                            />
                        </div>

                        <div className={styles.blocForm}>
                            <label htmlFor="nom" className="mb-2 italic">
                                Nom *
                            </label>
                            <input
                                onChange={handleFormDemandeur}
                                value={demandeurTmp.nom || ''}
                                disabled={!allowChanges}
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
                                disabled={!allowChanges}
                                type="text"
                                id="fonction"
                                name="fonction"
                                className="inputText"
                            />
                        </div>

                        <div className={styles.blocForm}>
                            <label htmlFor="email" className="mb-2 italic">
                                Mail *
                            </label>
                            <input
                                onChange={handleFormDemandeur}
                                value={demandeurTmp.email || ''}
                                disabled={!allowChanges}
                                type="email"
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
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
                                disabled={!allowChanges}
                                type="text"
                                id="phone"
                                name="phone"
                                className="inputText"
                            />
                        </div>
                    </div>

                        <div className={styles.blocForm}>
                            <label htmlFor="conventionCollectiveCode" className="mb-2 italic">
                                Convention collective applicable *
                            </label>
                            <div className="selectDpt">
                            <Select
                                id="conventionCollectiveCode"
                                selected={demandeurTmp.conventionCollectiveCode ? demandeurTmp.conventionCollectiveCode : ""}
                                options={[
                                    { label: demandeurTmp.conventionCollectiveCode ? "" : "Choisir", value: "" },
                                    ].concat(
                                    CONVENTIONS.map((u) => ({
                                        label: `${u.label} - ${u.code}`,
                                        value: u.code,
                                    }))
                                )}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    handleFormDemandeur(event);
                                }}
                            />
                            </div>
                        </div>

                        <SocieteProd passSociete={handleSocieteProd} societeProdId={demandeurTmp.societeProductionId}></SocieteProd>

                </CardDescription>
            </Card>
            
        </div>
    );
};

export default DemandeurForm;