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

// const updateRemuneration = async (enfant: Enfant) => {
//   const fetching = await fetch(`/api/enfants`, {
//     body: JSON.stringify(enfant),
//     method: "PUT",
//   }).then(async (r) => {
//     if (!r.ok) {
//       throw Error(`got status ${r.status}`);
//     }
//     return r.json();
//   });
//   return fetching as Enfant;
// };

export {
  createRemuneration,
  // updateRemuneration,
};
