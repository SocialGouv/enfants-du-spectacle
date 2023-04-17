import { Dossier, Enfant, PieceDossierEnfant } from "@prisma/client";
import { ParsedObjectsResult } from "read-excel-file";

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
  return fetching as Enfant;
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

const importEnfants = async (
  enfants: Record<string, any>[],
  dossierId: string
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
  return fetching as Enfant;
};

export {
  createEnfant,
  updateEnfant,
  searchEnfants,
  deleteEnfant,
  importEnfants,
};
