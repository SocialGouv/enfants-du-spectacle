import type { Commission } from "@prisma/client";

export type Comments = {
    id: number,
    text: string,
    source: 'INSTRUCTEUR' | 'SOCIETE_PROD',
    dossierId: number,
    enfantId: null | number,
    date: Date
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

const createComment = async (comment: Omit<Comments, 'id'>) => {
  const url = `/api/sync/out/commentaires`;
  const fetching = await fetch(url, {
    method: "POST",
    body: JSON.stringify(comment)
  }).then(async (r) => {
    if (!r.ok) {
      throw Error(`got status ${r.status}`);
    }
    return r.json();
  });
  return fetching as Comments;
}

export { getCommentsByDossier, createComment };
