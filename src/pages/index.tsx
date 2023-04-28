import styles from "./index.module.scss";
import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { HeroSection } from "~/components/utils";
import { ServiceSection } from "~/components/services";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Ensemble Sound</title>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
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
      <main className={styles.main}>
        <HeroSection />
        <ServiceSection />
        <div className={styles.showcaseContainer}>
          <p className="text-center text-lg">
            {hello.data ? hello.data.greeting : "Loading tRPC query..."}
          </p>
          <AuthShowcase />
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className={styles.authContainer}>
      <p className="text-center">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="btn-primary btn text-white"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
