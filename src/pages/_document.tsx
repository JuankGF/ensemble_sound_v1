<html data-theme="cupcake"></html>;
import { Html, Main, NextScript, Head } from "next/document";
import React from "react";

export default function Document() {
  return (
    <Html data-theme="mytheme">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
