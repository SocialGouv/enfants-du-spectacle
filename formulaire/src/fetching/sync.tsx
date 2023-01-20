import { Demandeur, SocieteProduction } from "@prisma/client";
import { DemandeurData } from "src/lib/types";
import { DossierData, EnfantData } from "./dossiers";

const sendDossier = async (dossier: DossierData, demandeur: Demandeur & {societeFound?: SocieteProduction}, enfants: EnfantData[]) => {
    const url = "/api/sync/dossiers";
    const fetching = await fetch(url, {
        body: JSON.stringify({dossier: dossier, demandeur: demandeur, enfants: enfants}),
        method: "POST",
    }).then(async (r) => {
        if (!r.ok) {
        throw Error(`got status ${r.status}`);
        }
        return r.json();
    });
    return fetching;
};

export {
    sendDossier
}