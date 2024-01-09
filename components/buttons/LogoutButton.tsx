"use client";

import {useRouter} from "next/navigation";
import SecondaryButton from "./SecondaryButton";


const LogOutButton = ({ className }: { className?: string }) => {
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

  return <SecondaryButton className={className} buttonText="Logout" onClick={logout} />;

};

export default LogOutButton;
