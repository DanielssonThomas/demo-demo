"use client";

import Link from "next/link";
import {useEffect, useState} from "react";

const NavBar = () => {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const data = await fetch("/api/post/get-user-info", {
        method: "POST",
      });
      const res = await data.json();

      setUserRole(res.data);
    } catch (error) {
      console.log(error);
    }
  };

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
      {userRole == "admin" && (
        <Link href={"/admin"}>
          <p>Admin page</p>
        </Link>
      )}
    </nav>
  ) : (
    <></>
  );
};

export default NavBar;
