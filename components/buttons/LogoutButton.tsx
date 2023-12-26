"use client";

import {useRouter} from "next/navigation";

const LogOutButton = () => {
  const router = useRouter();
  const logout = async () => {
    try {
      await fetch("/api/post/logout-user", {
        method: "POST",
      });
    } catch (error) {
      console.log(error);
      return;
    }

    router.push("/login");
  };

  return <button onClick={logout}>Logout</button>;
};

export default LogOutButton;
