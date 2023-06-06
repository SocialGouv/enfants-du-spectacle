import type { Remuneration } from "../types";

const getRemunerationsByEnfantsIds = async (externalIds: string[]) => {
  const url = `/api/sync/out/remunerations${
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
  return fetching as Remuneration[];
};

export { getRemunerationsByEnfantsIds };
