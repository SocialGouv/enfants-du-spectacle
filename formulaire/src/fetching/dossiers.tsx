import { Dossier, Enfant, SocieteProduction, User } from "@prisma/client";

type DossierData = Dossier & {
    user: User,
    enfants: Enfant[]
    societeProduction?: SocieteProduction;
}

const getDossiers = async () => {
    const url = "/api/dossier"
    const fetching = await fetch(url.split(",").join(""), {
        method: "GET",
    }).then(async (r) => {
        if (!r.ok) {
            throw Error(`got status ${r.status}`);
        }
        return r.json();
    });
    return fetching as DossierData[]
};

const getDossier = async (id: string) => {
    const url = `/api/dossier/${id}`
    const fetching = await fetch(url.split(",").join(""), {
        method: "GET",
    }).then(async (r) => {
        if (!r.ok) {
            throw Error(`got status ${r.status}`);
        }
        return r.json();
    });
    return fetching as DossierData

}

const createDossierEds = async (dossier: Omit<Dossier, "id">) => {
    const url = "/api/dossier";
    const fetching = await fetch(url, {
        body: JSON.stringify(dossier),
        method: "POST",
    }).then(async (r) => {
        if (!r.ok) {
        throw Error(`got status ${r.status}`);
        }
        return r.json();
    });
    return fetching as Dossier;
};

const updateDossier = async (dossier: Dossier) => {
    const fetching = await fetch(`/api/dossier`, {
        body: JSON.stringify(dossier),
        method: "PUT",
    }).then(async (r) => {
        if (!r.ok) {
        throw Error(`got status ${r.status}`);
        }
        return r.json();
    });
    return fetching as Dossier;
};

const deleteDossier = async (id: number) => {
    const fetching = fetch(`/api/dossier/${id}`, {
        body: JSON.stringify(id),
        method: "DELETE",
        })
    .then(async (r) => {
        if (!r.ok) {
        throw Error(`got status ${r.status}`);
        }
        return r.json();
    });
    return fetching
};

export type { DossierData }

export { getDossier, getDossiers, createDossierEds, updateDossier, deleteDossier }