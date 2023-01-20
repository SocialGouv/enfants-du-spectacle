import type { Commission } from "@prisma/client";

const getUpcomingCommissionsByDepartement = async (departement: string) => {
  const url = `/api/commissions/upcoming?departement=${departement}`;
  const fetching = await fetch(url, {
    method: "GET",
  }).then(async (r) => {
    if (!r.ok) {
      throw Error(`got status ${r.status}`);
    }
    return r.json();
  });
  return fetching as Commission[];
};

export { getUpcomingCommissionsByDepartement };
