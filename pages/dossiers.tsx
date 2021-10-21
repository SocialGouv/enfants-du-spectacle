import { getSession, useSession } from "next-auth/react";
import React from "react";

import Layout from "../components/layout";

export default function Page(): React.ReactElement {
  const { data: session } = useSession();

  if (!session) {
    return <Layout>Veuillez vous connecter</Layout>;
  }

  return (
    <Layout>
      <h1>Dossiers</h1>
    </Layout>
  );
}

export async function getServerSideProps(context): any {
  return {
    props: {
      session: await getSession(context),
    },
  };
}
