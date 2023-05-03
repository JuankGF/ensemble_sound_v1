import React from "react";
import SocialMedias from "./SocialMedias";
import Link from "next/link";
import { useWindowSize } from "~/hooks/useWindowSize";
import Image from "next/image";

export default function Footer() {
  const { isMobile } = useWindowSize();

  if (isMobile)
    return (
      <footer className="footer mt-5 grid grid-cols-3 items-center bg-secondary-content/10 p-4 text-primary">
        <div className="col-span-2 grid-flow-col items-center">
          <Image src="/logo192.png" width={100} height={100} alt="logo" />
          <p>Copyright © EnsembleSound 2023 - All right reserved.</p>
        </div>
        <div className="col-span-1 grid-flow-col gap-4 justify-self-end md:place-self-center">
          <SocialMedias />
        </div>
      </footer>
    );
  return (
    <footer className="footer mt-6 gap-y-4 rounded bg-secondary-content/10 p-6 text-base-content">
      <div>
        <Image src="/logo512.png" width={100} height={100} alt="logo" />
        <p>
          Copyright © 2023 - <br />
          All right reserved by Ensemble Sound.
        </p>
      </div>
      <div>
        <span className="footer-title">Links</span>
        <a className="link-hover link" href="#about">
          About us
        </a>
        <Link className="link-hover link" href="/book_online">
          Contact us
        </Link>
        <a className="link-hover link" href="#events">
          Next Events
        </a>
        <a className="link-hover link" href="#equipments">
          Equipments
        </a>
      </div>
      <div>
        <span className="footer-title">Info</span>
        <p className="text-muted text-sm">
          Address:{" "}
          <small className="select-all">901 SW 15th TER, Cape Coral FL</small>
        </p>
        <p className="text-muted text-sm">
          Phone:{" "}
          <small className="select-all">
            <a href="tel:1305-609-6067" className="link-hover link">
              +1 305 609 6067
            </a>
          </small>
        </p>
        <p className="text-muted text-sm">
          Email:{" "}
          <small className="select-all">
            <a href="mailto:eddyensemble@gmail.com" className="link-hover link">
              eddyensemble@gmail.com
            </a>
          </small>
        </p>
      </div>
      <div>
        <span className="footer-title">Socials</span>
        <div className="grid grid-flow-col gap-4">
          <SocialMedias />
        </div>
      </div>
    </footer>
  );
}
