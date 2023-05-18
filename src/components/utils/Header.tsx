import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faBarsStaggered,
} from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

import NavMenu from "./NavMenu";

export default function Header() {
  const { data: sessionData, status } = useSession();

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined = undefined;
    let scroll = 0;
    window.onscroll = () => {
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => {
        const header = document.getElementById("app-header");
        if (
          scroll >= window.scrollY &&
          (window.scrollY > 10 || window.scrollY === 0)
        ) {
          header?.classList.remove("-top-48");
          header?.classList.add("sticky", "top-0");
        } else {
          header?.classList.remove("sticky", "top-0");
          header?.classList.add("-top-48");
        }

        scroll = window.scrollY;
      }, 10);
    };
  }, []);

  return (
    <header
      id="app-header"
      className="w-100 navbar -top-48 z-50 bg-base-100 shadow-sm transition-all duration-700 ease-in-out"
    >
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn-ghost btn lg:hidden">
            <FontAwesomeIcon
              icon={faBarsStaggered}
              className="h-4 w-4 text-sm text-slate-900"
            />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <NavMenu />
          </ul>
        </div>
        <Link
          href="/"
          className="rounded-sm text-xl normal-case hover:bg-slate-100/75"
        >
          <Image
            src="/logo.png"
            alt="logo"
            className="app-logo"
            width={140}
            height={100}
          ></Image>
        </Link>
      </div>
      <div className="w-100 navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <NavMenu />
        </ul>
      </div>
      <div className="navbar-end">
        {/* <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn-ghost btn-circle btn">
            <div className="indicator">
              <FontAwesomeIcon
                icon={faBell}
                className="h-4 w-4 text-sm text-slate-900"
              />
              <span className="badge badge-sm indicator-item">8</span>
            </div>
          </label>
          <div
            tabIndex={0}
            className="card dropdown-content card-compact mt-3 w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold">8 Notifications</span>
            </div>
          </div>
        </div> */}
        <div className="dropdown dropdown-end">
          {status === "authenticated" ? (
            <>
              <label
                tabIndex={0}
                className="avatar m-0 w-10 cursor-pointer rounded-full p-0 ring-secondary hover:ring-2"
              >
                <div className="w-10 rounded-full">
                  <Image
                    loader={(p) => `${p.src}`}
                    alt="avatar"
                    src={
                      sessionData?.user.image ??
                      `https://api.dicebear.com/5.x/fun-emoji/svg?seed=${
                        sessionData?.user.name ?? "avatar"
                      }`
                    }
                    width={100}
                    height={100}
                    className="shadow-sm"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
              >
                {/* <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li> */}
                <li>
                  <a
                    className="w-full justify-between"
                    onClick={() => void signOut()}
                  >
                    Logout{" "}
                    <span className="">
                      <FontAwesomeIcon
                        icon={faArrowRightFromBracket}
                        className="h-4 w-4"
                      />
                    </span>
                  </a>
                </li>
              </ul>
            </>
          ) : (
            <a onClick={() => void signIn()} className="btn-ghost btn-sm btn">
              Login
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
