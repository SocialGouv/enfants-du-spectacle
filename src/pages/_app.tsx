import "src/styles/globals.scss";
import "remixicon/fonts/remixicon.css";

import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import type { ReactElement } from "react";
import React from "react";

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
export default MyApp;
