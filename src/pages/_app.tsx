import "src/styles/globals.scss";
import "remixicon/fonts/remixicon.css";
import "nprogress/nprogress.css";

import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { SessionProvider } from "next-auth/react";
import type { ReactElement } from "react";
import React from "react";

const TopProgressBar = dynamic(
  async () => {
    return import("src/components/TopProgressBar");
  },
  { ssr: false }
);

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <SessionProvider session={pageProps.session}>
      <TopProgressBar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
export default MyApp;
