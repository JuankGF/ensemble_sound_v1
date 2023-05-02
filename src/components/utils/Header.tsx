import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";

import NavMenu from "./NavMenu";

export default function Header() {
  const { data, status } = useSession();

  return (
    <div className="w-100 navbar relative bg-base-100">
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
        <Link href="/" className="btn-ghost btn text-xl normal-case">
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
        <div className="dropdown dropdown-end">
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
        </div>
        <div className="dropdown dropdown-end">
          {status === "authenticated" ? (
            <>
              <label
                tabIndex={0}
                className="btn-ghost btn-circle avatar btn m-0 w-10 p-0"
              >
                <div className="rounded-full">
                  <Image
                    loader={(p) => `${p.src}`}
                    alt="avatar"
                    src={`https://api.dicebear.com/5.x/fun-emoji/svg?seed=${
                      data?.user.name ?? "avatar"
                    }`}
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
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </>
          ) : (
            <Link href="/login" className="btn-ghost btn-sm btn">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
