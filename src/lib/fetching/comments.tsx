import { CommentaireNotifications } from "../types";

export interface Comments {
  id: number;
  text: string;
  source: "INSTRUCTEUR" | "SOCIETE_PROD";
  dossierId: number;
  enfantId: number | null;
  date: Date;
  seen?: boolean;
}

const getCommentsByDossier = async (externalId: string) => {
  const url = `/api/sync/out/commentaires?externalId=${externalId}`;
  const fetching = await fetch(url, {
    method: "GET",
  }).then(async (r) => {
    if (!r.ok) {
      throw Error(`got status ${r.status}`);
    }
    return r.json();
  });
  return fetching as Comments[];
};

const getCommentsByDossierIds = async (externalIds: string[]) => {
  console.log("externalIds", externalIds);
  const url = `/api/sync/out/commentaires/dossiers${
    externalIds.length > 0 ? "?" : ""
  }${externalIds.map((id, index) => {
    return `${index !== 0 ? "&" : ""}externalId=${id}`;
  })}`
    .split(",")
    .join("");
  const fetching = await fetch(url, {
    method: "GET",
  }).then(async (r) => {
    if (!r.ok) {
      throw Error(`got status ${r.status}`);
    }
    return r.json();
  });
  return fetching as CommentaireNotifications[];
};

const createComment = async (comment: Omit<Comments, "id">) => {
  const url = `/api/sync/out/commentaires`;
  const fetching = await fetch(url, {
    body: JSON.stringify(comment),
    method: "POST",
  }).then(async (r) => {
    if (!r.ok) {
      throw Error(`got status ${r.status}`);
    }
    return r.json();
  });
  return fetching as Comments;
};

export { createComment, getCommentsByDossier, getCommentsByDossierIds };
