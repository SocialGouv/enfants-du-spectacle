import { PieceDossier } from "@prisma/client";
import { TokenizedLink } from "src/lib/types";

export type createdPieceEnfantRes = {
    pieceDossier: PieceDossier,
    tokenizedLink: TokenizedLink
}

const createPiece = async (piece: Omit<PieceDossier, "id">) => {
    const url = "/api/piece/dossier";
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

const deletePiece = async (id: number) => {
    const fetching = fetch(`/api/piece/dossier/${id}`, {
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


export { createPiece, deletePiece }