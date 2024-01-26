"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LogOutButton from "./buttons/LogoutButton";
import PrimaryLink from "./links/PrimaryLink";
import SetTheme from "./SetTheme";
import PrimaryButton from "./buttons/PrimaryButton";

const NavBar = () => {
  const [userRole, setUserRole] = useState();
  const pathname = usePathname();

  const getUserInfo = async () => {
    const data = await fetch("/api/post/get-user-info", {
      method: "POST",
    });

    const res = await data.json();

    if (res.data == null) {
      setUserRole(res.data);
    } else {
      setUserRole(res.data.role);
    }

    return;
  };

  useEffect(() => {
    getUserInfo();
  }, [pathname]);

  return userRole ? (
    <nav className="px-6 py-4 flex gap-6 align-center border-solid border-black dark:border-white border-b-[0.1px]">
      <PrimaryLink type="default" href={"/dashboard"} linkText="Home" />
      {userRole == "client" && (
        <PrimaryLink
          type="default"
          href={"/client/create-event"}
          linkText="Create event"
        />
      )}
      {userRole == "demonstrator" && (
        <PrimaryLink
          type="default"
          href={"/demonstrator/events"}
          linkText="My events"
        />
      )}
      {userRole == "admin" && (
        <PrimaryLink type="default" href={"/admin"} linkText="Admin page" />
      )}
      <form action={SetTheme}>
        <PrimaryButton type="default" buttonText="Switch theme" />
      </form>
      <LogOutButton className={"ml-auto"} />
    </nav>
  ) : (
    <></>
  );
};

export default NavBar;
