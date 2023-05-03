import Link from "next/link";

import { useRouteHash } from "~/hooks/useRouteHash";

type Props = { linkClassName?: string };

export default function NavMenu({ linkClassName }: Props) {
  const { isActiveRoute } = useRouteHash();

  const linkDefaultClass =
    "btm-nav-xs transition-all duration-500 hover:bg-slate-100/75 focus:bg-slate-100";
  return (
    <>
      <li>
        <Link
          className={`${linkDefaultClass} ${linkClassName ?? ""} ${
            isActiveRoute("/") ? "btn-link bg-slate-100 text-secondary" : ""
          }`}
          href={"/"}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          className={`${linkDefaultClass} ${linkClassName ?? ""} ${
            isActiveRoute("/#about") ? "bg-slate-200 text-secondary" : ""
          }`}
          href="/#about"
        >
          About us
        </Link>
      </li>
      <li>
        <Link
          className={`${linkDefaultClass} ${linkClassName ?? ""} ${
            isActiveRoute("/#services") ? "bg-slate-200 text-secondary" : ""
          }`}
          href={"/#services"}
        >
          Services
        </Link>
      </li>
      <li>
        <Link
          className={`${linkDefaultClass} ${linkClassName ?? ""} ${
            isActiveRoute("/#equipments") ? "bg-slate-200 text-secondary" : ""
          }`}
          href={"/#equipments"}
        >
          Equipments
        </Link>
      </li>
      <li>
        <Link
          className={`${linkDefaultClass} ${linkClassName ?? ""} ${
            isActiveRoute("/#events") ? "bg-slate-200 text-secondary" : ""
          }`}
          href={"/#events"}
        >
          Next Events
        </Link>
      </li>
      <li>
        <Link
          className={`${linkDefaultClass} ${linkClassName ?? ""} ${
            isActiveRoute("/book_online") ? "bg-slate-200 text-secondary" : ""
          }`}
          href={"/book_online"}
        >
          Book Online
        </Link>
      </li>
    </>
  );
}
