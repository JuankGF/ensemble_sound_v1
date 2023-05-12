import { Html, Main, NextScript, Head } from "next/document";
import React from "react";

export default function Document() {
  return (
    <Html data-theme="mytheme">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#FFFFF" />
        <meta name="author" content="Ensemble Sound" />
        <meta
          name="description"
          content="Home web of Ensemble Sound audio and sound company."
        />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="og:title" content="Ensemble Sound" />
        <meta
          name="og:description"
          content="Home web of Ensemble Sound audio and sound company"
        />
        <meta name="og:image" content="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
