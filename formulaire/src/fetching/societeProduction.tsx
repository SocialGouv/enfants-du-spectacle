import { SocieteProduction } from "@prisma/client";

const getSocieteProd = async (siret_ID: string) => {
    const fetching = await fetch(`/api/societe?siret=${siret_ID}`, {
        method: "GET",
    }).then(async (r) => {
        if (!r.ok) {
        throw Error(`got status ${r.status}`);
        }
        return r.json();
    });
    return fetching as SocieteProduction;
};

const updateSociete = async (societe: SocieteProduction) => {
    const url = "/api/societe";
    const fetching = await fetch(url, {
        body: JSON.stringify(societe),
        method: "PUT",
    }).then(async (r) => {
        if (!r.ok) {
        throw Error(`got status ${r.status}`);
        }
        return r.json();
    });
    return fetching as SocieteProduction;
};

const createSociete = async (societe: Omit<SocieteProduction, "id">) => {
    const url = "/api/societe";
    const fetching = await fetch(url, {
        body: JSON.stringify(societe),
        method: "POST",
    }).then(async (r) => {
        if (!r.ok) {
        throw Error(`got status ${r.status}`);
        }
        return r.json();
    });
    return fetching as SocieteProduction;
};

export { getSocieteProd, createSociete, updateSociete }