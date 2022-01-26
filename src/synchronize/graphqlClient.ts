import { createClient } from "@urql/core";
import fetch from "isomorphic-unfetch";

export const graphqlClient = createClient({
  fetch,
  fetchOptions: () => {
    return {
      headers: { authorization: `Bearer ${process.env.DS_API_TOKEN}` },
    };
  },
  url: "https://www.demarches-simplifiees.fr/api/v2/graphql",
});
