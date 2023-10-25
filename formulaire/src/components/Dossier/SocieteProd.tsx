import { SocieteProduction } from "@prisma/client";
import React from "react";
import useStateContext from "src/context/StateContext";
import { getSocieteInfos, ResSirene } from "src/fetching/sirene";
import { createSociete, getSocieteProd, updateSociete } from "src/fetching/societeProduction";
import { useDebouncedCallback } from "src/lib/helpers";
import styles from "./SocieteProd.module.scss";

interface Props {
}

const SocieteProd: React.FC<Props> = ({ }) => {
    const contextDossier = {...useStateContext()}
    const [resSirene, setResSirene] = React.useState<ResSirene>()

    React.useEffect(() => {
        if(contextDossier.societeProduction.siret && contextDossier.societeProduction.siret !== '') {
            processSiret()
        }
    }, [contextDossier.societeProduction.siret])

    const processSiret = useDebouncedCallback(async () => {
        let res = await getSocieteInfos(contextDossier.societeProduction.siret ?? '')
        console.log('res sirene : ', res)
        setResSirene(res)
    }, 1000);

    React.useEffect(() => {
        if(resSirene && resSirene.header.message === 'ok') {
            processSociete()
        }
    }, [resSirene])

    const processSociete = async () => {
        if(resSirene){
            const societeFound = await getSocieteProd(contextDossier.societeProduction.siret ?? '')
            let societeTmp: SocieteProduction = {
                id: societeFound ? societeFound.id : 0,
                nom: resSirene.etablissement.uniteLegale.denominationUniteLegale,
                siret: resSirene.etablissement.siret,
                siren: resSirene.etablissement.siren,
                departement: resSirene.etablissement.adresseEtablissement.codePostalEtablissement.slice(0, 2),
                naf: resSirene.etablissement.uniteLegale.activitePrincipaleUniteLegale.replace('.', ''),
                raisonSociale: resSirene.etablissement.uniteLegale.denominationUniteLegale,
                adresse: resSirene.etablissement.adresseEtablissement.numeroVoieEtablissement + ' ' + resSirene.etablissement.adresseEtablissement.typeVoieEtablissement + ' ' + resSirene.etablissement.adresseEtablissement.libelleVoieEtablissement,
                adresseCodePostal: resSirene.etablissement.adresseEtablissement.codePostalEtablissement,
                adresseCodeCommune: resSirene.etablissement.adresseEtablissement.libelleCommuneEtablissement,
                formeJuridique: resSirene.etablissement.uniteLegale.categorieJuridiqueUniteLegale
            }
            const societeProcessed = societeFound ? await updateSociete(societeTmp) : await createSociete(societeTmp)
            contextDossier.processEntity('societeProduction', societeProcessed)
            contextDossier.processInput('demandeur', 'societeProductionId', societeProcessed.id)
        }
    }

    return (
        <div className={styles.societeProd}>

            <div className={styles.blocForm}>
                <label htmlFor="nom" className="mb-2 italic">
                    Société Production (SIRET) *
                </label>
                <input
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {contextDossier.processInput('societeProduction', 'siret', (e.target as HTMLInputElement).value)}}
                    value={contextDossier.societeProduction.siret ?? ''}
                    type="text"
                    id="nom"
                    name="nom"
                    className="inputText"
                />
            </div>

            {resSirene && !resSirene.etablissements &&
                <span className={resSirene.header.message !== 'ok' ? styles.wrong : styles.valid}>{resSirene.header.message !== 'ok' ? resSirene.header.message :  resSirene.etablissement.uniteLegale.denominationUniteLegale}</span>
            }
            
        </div>
    );
};

export default SocieteProd;