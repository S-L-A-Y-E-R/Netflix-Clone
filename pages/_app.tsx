import type { AppProps } from "next/app";
import ToasterProvider from "@/providers/toaster-provider";

import "../styles/globals.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <ToasterProvider />
      <Component {...pageProps} />
    </>
  );
}
