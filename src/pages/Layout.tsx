import React from "react";
import { Footer, Header as Navbar } from "~/components/utils";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
