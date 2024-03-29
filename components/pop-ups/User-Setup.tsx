"use client";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PrimaryButton from "../buttons/PrimaryButton";

const UserSetup = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
  const registerUser = async (e: FormData) => {
    const data = await fetch("/auth/register-user", {
      method: "POST",
      body: e,
    });
    const res = await data.json();
    if (res.message === null) router.refresh();
    setErrorMessage(res.message);
  };

  return (
    <div className="absolute">
      <div className="fixed w-screen h-screen bg-[#EDEDED] opacity-25" />
      <section className="fixed top-[30vh] right-[12.5vw] left-[30vw] bottom-0 w-2/5 h-2/5 border-solid border-black rounded-md bg-[#EDEDED] text-black p-4">
        <form
          action={registerUser}
          className="flex flex-col gap-4 w-full h-full"
        >
          <h2 className="text-xl text-center">Almost done!</h2>
          <div>
            <h3 className="text-sm">Enter name:</h3>
            <input
              className="text-black w-full border-black border-solid border-[1px]"
              type="text"
              name="name"
              minLength={3}
              required
            />
          </div>
          <div>
            <h3 className="text-sm">Select role:</h3>
            <select
              className="w-full px-2 border-[1px] border-solid border-black rounded-sm bg-dark-bg dark:bg-light-bg"
              name="role"
            >
              <option value="client">Client</option>
              <option value="demonstrator">Demonstrator</option>
            </select>
          </div>
          <PrimaryButton type="default" buttonText="send" />
        </form>
      </section>
    </div>
  );
};

export default UserSetup;
