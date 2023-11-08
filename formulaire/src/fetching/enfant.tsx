import { Dossier, Enfant, PieceDossierEnfant } from "@prisma/client";
import { EnfantData } from "./dossiers";

export type EnfantWithDosier = Enfant & {
  dossier: Dossier;
  piecesDossier: PieceDossierEnfant[];
};

const createEnfant = async (enfant: Omit<Enfant, "id">) => {
  const url = "/api/enfants";
  const fetching = await fetch(url, {
    body: JSON.stringify(enfant),
    method: "POST",
  }).then(async (r) => {
    if (!r.ok) {
      throw Error(`got status ${r.status}`);
    }
    return r.json();
  });
  return fetching as EnfantData;
};

const deleteEnfant = async (id: number) => {
  const fetching = fetch(`/api/enfants/${id}`, {
    body: JSON.stringify(id),
    method: "DELETE",
  }).then(async (r) => {
    if (!r.ok) {
      throw Error(`got status ${r.status}`);
    }
    return r.json();
  });
  return fetching;
};

const updateEnfant = async (enfant: Enfant) => {
  const fetching = await fetch(`/api/enfants`, {
    body: JSON.stringify(enfant),
    method: "PUT",
  }).then(async (r) => {
    if (!r.ok) {
      throw Error(`got status ${r.status}`);
    }
    return r.json();
  });
  return fetching as Enfant;
};

const searchEnfants = async (infosEnfant: Record<"nom" | "prenom", string>) => {
  const fetching = await fetch(
    `/api/enfants?nom=${infosEnfant.nom}&prenom=${infosEnfant.prenom}`,
    {
      method: "GET",
    }
  ).then(async (r) => {
    if (!r.ok) {
      throw Error(`got status ${r.status}`);
    }
    return r.json();
  });
  return fetching as EnfantWithDosier[];
};

const getEnfantsByDossierId = async (dossierId: number, page: number, numberByPage: number, termToOrder: keyof Enfant, order: 'asc' | 'desc') => {
  const fetching = await fetch(
    `/api/enfants/dossier/${dossierId}?page=${page}&numberByPage=${numberByPage}&termToOrder=${termToOrder}&order=${order}`,
    {
      method: "GET",
    }
  ).then(async (r) => {
    if (!r.ok) {
      throw Error(`got status ${r.status}`);
    }
    return r.json();
  });
  return {enfants: fetching.enfants as EnfantData[], count: fetching.count as number};
};

const importEnfants = async (
  enfants: Record<string, any>[],
  dossierId: number
) => {
  const url = "/api/enfants/import";
  const fetching = await fetch(url, {
    body: JSON.stringify({ enfants, dossierId }),
    method: "POST",
  }).then(async (r) => {
    if (!r.ok) {
      throw Error(`got status ${r.status}`);
    }
    return r.json();
  });
  return fetching as Enfant[];
};

export {
  createEnfant,
  updateEnfant,
  searchEnfants,
  getEnfantsByDossierId,
  deleteEnfant,
  importEnfants,
};
