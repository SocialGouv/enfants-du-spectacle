import { PieceDossierEnfant } from "@prisma/client";
import { TokenizedLink } from "src/lib/types";

export type createdPieceEnfantRes = {
    pieceDossier: PieceDossierEnfant,
    tokenizedLink: TokenizedLink
}

const createPieceEnfant = async (piece: Omit<PieceDossierEnfant, "id"> & {dossierId: number}) => {
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
    return fetching as createdPieceEnfantRes;
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