// @ts-nocheck
import "../src/styles/global.scss";
import type { AppProps } from "next/app";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import type { ReactElement } from "react";
import React from "react";
import IconLoader from "../src/components/IconLoader";
import { init } from "@socialgouv/matomo-next";
import { hotjar } from "react-hotjar";
import CookieConsent from "react-cookie-consent";

const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL;
const MATOMO_SITE_FORM_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_FORMULAIRE_ID;
const HJID_FORM = process.env.NEXT_PUBLIC_FORMULAIRE_HJID;
const HJSV_FORM = process.env.NEXT_PUBLIC_FORMULAIRE_HJSV;

function App({ Component, pageProps }: AppProps): ReactElement {
  const cookieStyle = {
    alignItems: "center",
    background: "rgb(74, 89, 99)",
    padding: "10px",
  };
  const acceptButtonStyle = {
    background: "green",
    color: "white",
    fontSize: "16px",
    padding: "10px",
  };

  const declineButtonStyle = {
    color: "white",
    fontSize: "16px",
    padding: "10px 15px",
  };

  const cookieContent = () => {
    return (
      <>
        <div>
          <b>Enfants du spectacle respecte votre confidentialité</b>
        </div>
        <div>
          En cliquant sur « Accepter», vous acceptez le stockage de cookies sur
          votre appareil pour améliorer la navigation sur le site et analyser
          son utilisation.
        </div>
      </>
    );
  };
  React.useEffect(() => {
    const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL;
    const MATOMO_SITE_FORM_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_FORMULAIRE_ID;
    if ( MATOMO_SITE_FORM_ID && MATOMO_URL ) {
      console.log("INITIALIZING MATOMO");
      console.log("MATOMO INFO", MATOMO_SITE_FORM_ID, MATOMO_URL);
      init({
        siteId: MATOMO_SITE_FORM_ID,
        url: MATOMO_URL,
      });
    }
    if (HJID_FORM && HJSV_FORM) {
      console.log("INITIALIZING HOTJAR");
      console.log("HOTJAR INFO", HJID_FORM, HJSV_FORM);
      hotjar.initialize(parseInt(HJID_FORM), parseInt(HJSV_FORM));
    }
  }, [process.env]);

  return (
    <SessionProvider session={pageProps.session}>
      <CookieConsent
        enableDeclineButton
        flipButtons
        location="bottom"
        buttonText="Accepter"
        declineButtonText="Refuser"
        cookieName="enfants-du-spectacle"
        style={cookieStyle}
        buttonStyle={acceptButtonStyle}
        declineButtonStyle={declineButtonStyle}
        expires={150}
      >
        {cookieContent()}
      </CookieConsent>
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
