import {
  Comments,
  Demandeur,
  Dossier,
  Enfant,
  PieceDossier,
  PieceDossierEnfant,
  Remuneration,
  SocieteProduction,
  User,
} from "@prisma/client";
import { DemandeurData, statusGroup } from "src/lib/types";

type EnfantData = Enfant & {
  remuneration: Remuneration[];
  piecesDossier: PieceDossierEnfant[];
  comments?: Comments[]
};

type DossierData = Dossier & {
  user: User;
  enfants: EnfantData[];
  demandeur: DemandeurData;
  piecesDossier: PieceDossier[];
  societeProduction?: SocieteProduction;
};

type ResDocs = {
  dossier: {
    id: number;
    piecesDossier: (PieceDossier & { path: string })[];
  };
  enfants: [
    {
      id: number;
      piecesDossier: (PieceDossier & { path: string })[];
    }
  ];
};

type ResDossier = {
  dossier: DossierData;
  docs: ResDocs;
};

type ResDossiers = {
  dossiers: DossierData[];
  countCurrent: number;
  countEnCours: number;
  countTermines: number;
};

const getDossiers = async (
  page: number,
  status: statusGroup,
  search: string,
  termToOrder: keyof Dossier,
  order: "asc" | "desc"
) => {
  const url = `/api/dossier?page=${page}&status=${status}&search=${search}&termToOrder=${termToOrder}&order=${order}`;
  const fetching = await fetch(url.split(",").join(""), {
    method: "GET",
  }).then(async (r) => {
    if (!r.ok) {
      throw Error(`got status ${r.status}`);
    }
    return r.json();
  });
  return fetching as ResDossiers;
};

const getDossier = async (id: string) => {
  const url = `/api/dossier/${id}`;
  const fetching = await fetch(url.split(",").join(""), {
    method: "GET",
  }).then(async (r) => {
    if (!r.ok) {
      throw Error(`got status ${r.status}`);
    }
    return r.json();
  });
  return fetching as ResDossier;
};

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

const duplicateDossierEds = async (dossier: Dossier) => {
  const url = `/api/dossier/duplicate/${dossier.id}`;
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
  }).then(async (r) => {
    if (!r.ok) {
      throw Error(`got status ${r.status}`);
    }
    return r.json();
  });
  return fetching;
};

export type { EnfantData, DossierData, ResDossiers, ResDossier, ResDocs };

export {
  getDossier,
  getDossiers,
  createDossierEds,
  duplicateDossierEds,
  updateDossier,
  deleteDossier,
};
