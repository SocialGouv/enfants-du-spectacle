import type { CommentaireNotifications } from "../types";

export interface Comments {
  id: number;
  text: string;
  source: "INSTRUCTEUR" | "SOCIETE_PROD";
  dossierId: number;
  enfantId: number | null;
  date: Date;
  sender: string | null;
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

export { createComment, getCommentsByDossier };
