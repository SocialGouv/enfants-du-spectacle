import { Demandeur, SocieteProduction } from "@prisma/client";
import { DemandeurData } from "src/lib/types";
import { DossierData, EnfantData } from "./dossiers";

const sendDossier = async (dossier: DossierData, demandeur: DemandeurData, societeProduction: SocieteProduction, enfants: EnfantData[]) => {
    // With consolidated database, we can directly update the database without syncing with an external API
    const url = "/api/dossier/complete";
    const fetching = await fetch(url, {
        body: JSON.stringify({dossier: dossier, demandeur: demandeur, societeProduction: societeProduction, enfants: enfants}),
        method: "POST",
    }).then(async (r) => {
        if (!r.ok) {
            return {error: 'Something went wrong'}
        }
        return r.json();
    });
    return fetching;
};

export {
    sendDossier
}
