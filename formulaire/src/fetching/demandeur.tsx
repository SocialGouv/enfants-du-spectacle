import { Demandeur } from "@prisma/client";

const getDemandeur = async (id: string) => {
    const url = `/api/demandeur/${id}`
    const fetching = await fetch(url.split(",").join(""), {
        method: "GET",
    }).then(async (r) => {
        if (!r.ok) {
            throw Error(`got status ${r.status}`);
        }
        return r.json();
    });
    return fetching as Demandeur
}

const createDemandeur = async (demandeur: Omit<Demandeur, "id">) => {
    const url = "/api/demandeur";
    const fetching = await fetch(url, {
        body: JSON.stringify(demandeur),
        method: "POST",
    }).then(async (r) => {
        if (!r.ok) {
        throw Error(`got status ${r.status}`);
        }
        return r.json();
    });
    return fetching as Demandeur;
};

const updateDemandeur = async (demandeur: Demandeur) => {
    const fetching = await fetch(`/api/demandeur`, {
        body: JSON.stringify(demandeur),
        method: "PUT",
    }).then(async (r) => {
        if (!r.ok) {
        throw Error(`got status ${r.status}`);
        }
        return r.json();
    });
    return fetching as Demandeur;
};

export { getDemandeur, createDemandeur, updateDemandeur }