import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

type Props = { linkClassName?: string };

export default function NavMenu({ linkClassName }: Props) {
  const router = useRouter();
  const [activeRoute, setActiveRoute] = useState("/");

  const isActive = (route: string) => {
    return activeRoute === route;
  };

  useEffect(() => {
    const onHashChangeStart = (url: string) => {
      setActiveRoute(url);
    };

    router.events.on("hashChangeStart", onHashChangeStart);

    return () => {
      router.events.off("hashChangeStart", onHashChangeStart);
    };
  }, [router.events]);

  const linkDefaultClass =
    "btm-nav-xs transition-all duration-500 hover:bg-slate-100/75 focus:bg-slate-100";
  return (
    <>
      <li>
        <Link
          className={`${linkDefaultClass} ${linkClassName ?? ""} ${
            isActive("/") ? "btn-link bg-slate-100 text-secondary" : ""
          }`}
          href={"/"}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          className={`${linkDefaultClass} ${linkClassName ?? ""} ${
            isActive("/#about") ? "bg-slate-200 text-secondary" : ""
          }`}
          href="/#about"
        >
          About
        </Link>
      </li>
      <li>
        <Link
          className={`${linkDefaultClass} ${linkClassName ?? ""} ${
            isActive("/#services") ? "bg-slate-200 text-secondary" : ""
          }`}
          href={"/#services"}
        >
          Services
        </Link>
      </li>
      <li>
        <Link
          className={`${linkDefaultClass} ${linkClassName ?? ""} ${
            isActive("/#equipments") ? "bg-slate-200 text-secondary" : ""
          }`}
          href={"/#equipments"}
        >
          Equipments
        </Link>
      </li>
      <li>
        <Link
          className={`${linkDefaultClass} ${linkClassName ?? ""} ${
            isActive("/#events") ? "bg-slate-200 text-secondary" : ""
          }`}
          href={"/#events"}
        >
          Next Events
        </Link>
      </li>
      <li>
        <Link
          className={`${linkDefaultClass} ${linkClassName ?? ""} ${
            isActive("/book_online") ? "bg-slate-200 text-secondary" : ""
          }`}
          href={"/book_online"}
        >
          Book Online
        </Link>
      </li>
    </>
  );
}
