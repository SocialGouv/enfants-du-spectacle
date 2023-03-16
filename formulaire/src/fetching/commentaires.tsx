import { Comments } from "@prisma/client";

const createComment = async (
  comment: Omit<Comments, "id" | "userId" | "externalUserId" | "seen">
) => {
  const url = "/api/comments";
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

const updateCommentairesNotifications = (commentaireIds: string[]) => {
  const url = `/api/comments${
    commentaireIds.length > 0 ? "?" : ""
  }${commentaireIds.map((id, index) => {
    return `${index !== 0 ? "&" : ""}commentIds=${id}`;
  })}`
    .split(",")
    .join("");
  window
    .fetch(url, {
      method: "PUT",
    })
    .then((r) => {
      if (!r.ok) {
        throw Error(`got status ${r.status}`);
      }
      return r;
    })
    .catch((e) => {
      throw e;
    });
};

const getComments = async (dossierId: number) => {
  const url = `/api/comments?dossierId=${dossierId}`;
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

export { createComment, getComments, updateCommentairesNotifications };
