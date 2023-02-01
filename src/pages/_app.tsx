import "src/styles/globals.scss";
import "remixicon/fonts/remixicon.css";

import { init } from "@socialgouv/matomo-next";
import type { AppProps } from "next/app";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import type { ReactElement } from "react";
import React, { useEffect } from "react";
import { hotjar } from "react-hotjar";
import IconLoader from "src/components/IconLoader";

const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL;
const MATOMO_SITE_AGENT_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_AGENT_ID;

const HJID_AGENT = process.env.NEXT_PUBLIC_AGENT_HJID;
const HJSV_AGENT = process.env.NEXT_PUBLIC_AGENT_HJSV;

function App({ Component, pageProps }: AppProps): ReactElement {
  useEffect(() => {
    if (
      MATOMO_SITE_AGENT_ID &&
      MATOMO_URL &&
      process.env.PGDATABASE &&
      process.env.PGDATABASE === "PROD"
    ) {
      init({ siteId: MATOMO_SITE_AGENT_ID, url: MATOMO_URL });
      if (HJID_AGENT && HJSV_AGENT)
        hotjar.initialize(parseInt(HJID_AGENT), parseInt(HJSV_AGENT));
    }
  }, []);

  return (
    <SessionProvider session={pageProps.session}>
      {Component.auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
}

// from https://next-auth.js.org/getting-started/client#custom-client-session-handling
const Auth: React.FC = ({ children }) => {
  const { data: session, status } = useSession();
  const isUser = !!session?.user;
  React.useEffect(() => {
    if (status === "loading") return; // Display nothing while loading
    if (!isUser)
      signIn().catch((e) => {
        throw e;
      });
  }, [isUser, status]);

  if (isUser) {
    return <>{children}</>;
  }

  return (
    <div style={{ padding: "10rem", textAlign: "center" }}>
      <div style={{ fontSize: "4rem" }}>
        <IconLoader />
      </div>
      <div style={{ paddingTop: "3rem" }}>Chargement de la session…</div>
    </div>
  );
};

export default App;
