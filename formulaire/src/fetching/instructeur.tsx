import { User } from "@prisma/client";

const getAgentByDossierId = async (id: string) => {
  const url = `/api/sync/out/dossiers/${id}`;
  const fetching = await fetch(url.split(",").join(""), {
    method: "GET",
  }).then(async (r) => {
    if (!r.ok) {
      throw Error(`got status ${r.status}`);
    }
    return r.json();
  });
  return fetching as {
    instructeur: User;
    commissionDate: Date;
  };
};
export { getAgentByDossierId };
