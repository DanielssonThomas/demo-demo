"use client";

import Link from "next/link";
import {useEffect, useState} from "react";
import LogOutButton from "./buttons/LogoutButton";
import {usePathname} from "next/navigation";

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

  useEffect(() => {
    getUserInfo();
  }, [pathname]);

  return userRole ? (
    <nav>
      <Link href={"/dashboard"}>
        <p>Home</p>
      </Link>
      {userRole == "client" && (
        <Link href={"/client/create-event"}>
          <p>Create event</p>
        </Link>
      )}
      {userRole == "demonstrator" && (
        <Link href={"/"}>
          <p>My events</p>
        </Link>
      )}
      {userRole == "admin" && (
        <Link href={"/admin"}>
          <p>Admin page</p>
        </Link>
      )}
      <LogOutButton />
    </nav>
  ) : (
    <></>
  );
};

export default NavBar;
