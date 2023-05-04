import styles from "./index.module.scss";
import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { HeroSection } from "~/components/utils";
import { ServiceSection } from "~/components/services";
import { TestimonialsSection } from "~/components/testimonials";
import About from "~/components/About";
import { EquipmentsSection } from "~/components/equipments";
import { EventsSection } from "~/components/events";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ensemble Sound</title>
      </Head>
      <main className={styles.main}>
        <HeroSection />
        <ServiceSection />
        <TestimonialsSection />
        <About />
        <EquipmentsSection />
        <EventsSection />
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
