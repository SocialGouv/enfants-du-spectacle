const getUserByEmail = async (email: string) => {
  const url = `/api/users/${email}`;
  const fetching = await fetch(url.split(",").join(""), {
    method: "GET",
  }).then(async (r) => {
    if (!r.ok) {
      throw Error(`got status ${r.status}`);
    }
    return r.json();
  });
  return fetching as number;
};

export { getUserByEmail };
