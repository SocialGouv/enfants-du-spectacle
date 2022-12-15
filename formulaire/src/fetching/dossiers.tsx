import { Dossier, Enfant, SocieteProduction, User } from "@prisma/client";
import { statusGroup } from "src/lib/types";

type DossierData = Dossier & {
    user: User,
    enfants: Enfant[]
    societeProduction?: SocieteProduction;
}

type ResDossier = {
    dossiers: DossierData[]
    countCurrent: number,
    countEnCours: number,
    countTermines: number
}

const getDossiers = async (page: number, status: statusGroup, search: string, termToOrder: keyof Dossier, order: 'asc' | 'desc') => {
    const url = `/api/dossier?page=${page}&status=${status}&search=${search}&termToOrder=${termToOrder}&order=${order}`
    const fetching = await fetch(url.split(",").join(""), {
        method: "GET",
    }).then(async (r) => {
        if (!r.ok) {
            throw Error(`got status ${r.status}`);
        }
        return r.json();
    });
    return fetching as ResDossier
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

export type { DossierData, ResDossier }

export { getDossier, getDossiers, createDossierEds, updateDossier, deleteDossier }