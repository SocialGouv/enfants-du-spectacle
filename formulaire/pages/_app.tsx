// @ts-nocheck
import "../src/styles/global.scss";
import type { AppProps } from "next/app";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import type { ReactElement } from "react";
import React from "react";
import IconLoader from "../src/components/IconLoader";
import { init } from "@socialgouv/matomo-next";

const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL;
const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_FORMULAIRE_ID;

const HJID_FORMULAIRE = process.env.NEXT_PUBLIC_FORMULAIRE_HJID;
const HJSV_FORMULAIRE = process.env.NEXT_PUBLIC_FORMULAIRE_HJSV;

function App({ Component, pageProps }: AppProps): ReactElement {
  React.useEffect(() => {
    if (
      MATOMO_SITE_ID &&
      MATOMO_URL &&
      process.env.PGDATABASE &&
      process.env.PGDATABASE === "PROD"
    ) {
      init({ siteId: MATOMO_SITE_ID, url: MATOMO_URL });
      if (HJID_FORMULAIRE && HJSV_FORMULAIRE)
        hotjar.initialize(parseInt(HJID_FORMULAIRE), parseInt(HJSV_FORMULAIRE));
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

type Props = {
  children: React.ReactNode;
};

// from https://next-auth.js.org/getting-started/client#custom-client-session-handling
const Auth: React.FC<Props> = ({ children }) => {
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
