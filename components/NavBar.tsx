"use client";

import Link from "next/link";
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import LogOutButton from "./buttons/LogoutButton";
import PrimaryLink from "./links/PrimaryLink";

const NavBar = () => {
  const [userRole, setUserRole] = useState();
  const pathname = usePathname();

  const getUserInfo = async () => {
    const data = await fetch("/api/post/get-user-info", {
      method: "POST",
    });

    const res = await data.json();

    setUserRole(res.data.role);

    return;
  };
  // demonstrator/events
  useEffect(() => {
    getUserInfo();
  }, [pathname]);

  return userRole ? (
    <nav className="p-6 flex gap-6 align-center">
      <PrimaryLink href={"/dashboard"} linkText="Home" />
      {userRole == "client" && (
        <PrimaryLink href={"/client/create-event"} linkText="Create event" />
      )}
      {userRole == "demonstrator" ||
        (userRole == "admin" && <PrimaryLink href={"/demonstrator/events"} linkText="My events" />)}
      {userRole == "admin" && <PrimaryLink href={"/admin"} linkText="Admin page" />}
      <LogOutButton className={"ml-auto"} />
    </nav>
  ) : (
    <></>
  );
};

export default NavBar;
