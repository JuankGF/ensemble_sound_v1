import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { api } from "~/utils/api";
import "~/styles/globals.css";
import Layout from "./Layout";
import Head from "next/head";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
      <Layout>
        <Component {...pageProps} />
        <ToastContainer position="bottom-right" />
      </Layout>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
