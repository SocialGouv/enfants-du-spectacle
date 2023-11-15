import { User } from "@prisma/client";

const getUsersById = async (ids: number[]) => {
  const url = `/api/users/id${ids.length > 0 ? "?" : ""}${ids.map(
    (id, index) => {
      return `${index !== 0 ? "&" : ""}id=${id}`;
    }
  )}`
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
  return fetching as User[];
};

export { getUsersById };
