import { Enfant } from "@prisma/client";


const passEnfant = async (enfant: Enfant) => {
  const url = `/api/sync/out/enfants`;
  const fetching = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(enfant)
  }).then(async (r) => {
    if (!r.ok) {
      throw Error(`got status ${r.status}`);
    }
    return r.json();
  });
  return fetching;
};

export { passEnfant };
