import { PieceDossierEnfant } from "@prisma/client";

const createPieceEnfant = async (piece: Omit<PieceDossierEnfant, "id">) => {
    const url = "/api/piece/enfant";
    const fetching = await fetch(url, {
        body: JSON.stringify(piece),
        method: "POST",
    }).then(async (r) => {
        if (!r.ok) {
        throw Error(`got status ${r.status}`);
        }
        return r.json();
    });
    return fetching as PieceDossierEnfant;
};

const deletePieceEnfant = async (id: number) => {
    const fetching = fetch(`/api/piece/enfant/${id}`, {
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


export { createPieceEnfant, deletePieceEnfant }