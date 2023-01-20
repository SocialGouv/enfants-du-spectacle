import { SocieteProduction } from "@prisma/client";
import React from "react";
import { getSocieteInfos, ResSirene } from "src/fetching/sirene";
import { createSociete, getSocieteProd } from "src/fetching/societeProduction";
import { useDebouncedCallback } from "src/lib/helpers";
import styles from "./SocieteProd.module.scss";

interface Props {
    societeProdId: string | null,
    passSociete: (societeProd: SocieteProduction) => void
}

const SocieteProd: React.FC<Props> = ({ societeProdId, passSociete }) => {
    const [siret, setSiret] = React.useState<string>('')
    const [resSirene, setResSirene] = React.useState<ResSirene>()
    const [societeProd, setSocieteProd] = React.useState<SocieteProduction>()

    const handleSiret = (e: React.FormEvent<HTMLInputElement>) => {
        setSiret(e.target.value)
    }

    const processSiret = useDebouncedCallback(async () => {
        let res = await getSocieteInfos(siret)
        setResSirene(res)
        if(res.header.message === 'ok') {
            const foundSociete = await getSocieteProd(siret);
            if(!foundSociete) {
                const createdSociete = await createSociete({
                    nom: res.etablissement.uniteLegale.denominationUniteLegale,
                    siret: res.etablissement.siret,
                    siren: res.etablissement.siren,
                    departement: res.etablissement.adresseEtablissement.codePostalEtablissement.slice(0, 2),
                    naf: res.etablissement.uniteLegale.activitePrincipaleUniteLegale.replace('.', ''),
                    raisonSociale: res.etablissement.uniteLegale.denominationUniteLegale,
                    adresse: res.etablissement.adresseEtablissement.numeroVoieEtablissement + ' ' + res.etablissement.adresseEtablissement.typeVoieEtablissement + ' ' + res.etablissement.adresseEtablissement.libelleVoieEtablissement,
                    adresseCodePostal: res.etablissement.adresseEtablissement.codePostalEtablissement,
                    adresseCodeCommune: res.etablissement.adresseEtablissement.libelleCommuneEtablissement,
                    formeJuridique: res.etablissement.uniteLegale.categorieJuridiqueUniteLegale
                })
                setSocieteProd(createdSociete)
                passSociete(createdSociete)
            } else {
                setSocieteProd(foundSociete)
                passSociete(foundSociete)
            }
        }
    }, 1000);

    const fetchSociete = async () => {
        if(societeProdId) {
            setSiret(societeProdId)
        }
    }

    React.useEffect(() => {
        if(societeProdId) {
            fetchSociete()
        }
    }, [])

    React.useEffect(() => {
        if(siret !== '') {
            processSiret()
        }
    }, [siret])

    return (
        <div className={styles.societeProd}>

            <div className={styles.blocForm}>
                <label htmlFor="nom" className="mb-2 italic">
                    Société Production (SIRET) *
                </label>
                <input
                    onChange={handleSiret}
                    value={siret}
                    type="text"
                    id="nom"
                    name="nom"
                    className="inputText"
                />
            </div>

            {resSirene && !resSirene.etablissements &&
                <span>{resSirene.header.message !== 'ok' ? resSirene.header.message :  resSirene.etablissement.uniteLegale.denominationUniteLegale}</span>
            }
            
        </div>
    );
};

export default SocieteProd;