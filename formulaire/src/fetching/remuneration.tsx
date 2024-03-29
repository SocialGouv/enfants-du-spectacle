import { Remuneration } from "@prisma/client";

const createRemuneration = async (remuneration: Omit<Remuneration, "id">) => {
  const url = "/api/remunerations";
  const fetching = await fetch(url, {
    body: JSON.stringify(remuneration),
    method: "POST",
  }).then(async (r) => {
    if (!r.ok) {
      throw Error(`got status ${r.status}`);
    }
    return r.json();
  });
  return fetching as Remuneration;
};

const deleteRemunerationsByEnfantId = async (enfantId: number) => {
  const fetching = fetch(`/api/remunerations/`, {
    body: JSON.stringify(enfantId),
    method: "DELETE",
  }).then(async (r) => {
    if (!r.ok) {
      throw Error(`got status ${r.status}`);
    }
    return r.json();
  });
  return fetching;
};

const deleteRemunerationById = async (remunerationId: number) => {
  const fetching = fetch(`/api/remunerations/${remunerationId}`, {
    body: JSON.stringify(remunerationId),
    method: "DELETE",
  }).then(async (r) => {
    if (!r.ok) {
      throw Error(`got status ${r.status}`);
    }
    return r.json();
  });
  return fetching;
};

export {
  createRemuneration,
  deleteRemunerationsByEnfantId,
  deleteRemunerationById,
};
