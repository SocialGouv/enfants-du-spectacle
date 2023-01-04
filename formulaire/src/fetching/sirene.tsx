
type ResSirene = {
    header: {
        status: number
        message: string
    }
    etablissement: {
        siren: string,
        siret: string,
        uniteLegale: {
            categorieJuridiqueUniteLegale: string,
            denominationUniteLegale: string,
            sigleUniteLegale: string,
            activitePrincipaleUniteLegale: string
        }
        adresseEtablissement: {
            numeroVoieEtablissement: string,
            libelleVoieEtablissement: string,
            codePostalEtablissement: string,
            libelleCommuneEtablissement: string,
            typeVoieEtablissement: string
        }
    }
    etablissements?: []
}

const getSocieteInfos = async (siret: string) => {
    const fetching = await fetch(`/api/sirene?siret=${siret}`, {
        method: "GET",
    }).then(async (r) => {
        if (!r.ok) {
        throw Error(`got status ${r.status}`);
        }
        return r.json();
    });
    return fetching as ResSirene;
};

export type { ResSirene }

export { getSocieteInfos }