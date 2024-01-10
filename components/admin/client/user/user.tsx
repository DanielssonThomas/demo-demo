import LoadingAnim from "@/components/global/LoadingAnim";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import Input from "@/components/global/FormComponents/Input";
import { useRouter, usePathname } from "next/navigation";

import { useEffect, useState } from "react";

export const User = ({ id }: { id: number }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [name, setName] = useState<string | null>(null);
  const [verified, setVerified] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const getUser = async () => {
    const data = await fetch("/api/post/get-user", {
      method: "POST",
      body: JSON.stringify({ id: id }),
    });
    const res = await data.json();

    setName(res.data.name);
    setVerified(res.data.verified);
    setRole(res.data.role);
    setLoading(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  const updateUser = async (e: FormData) => {
    const data = await fetch("/api/post/update-user", {
      method: "POST",
      body: e,
    });
    const res = await data.json();

    router.push(pathname + `?` + "e=" + res.error);
    getUser();
  };

  if (loading) {
    return <LoadingAnim width="25vw" />;
  }

  return (
    <form action={updateUser} className="w-full p-2 text-black dark:text-white">
      <input type="hidden" name="id" value={id} />
      <section className="flex flex-col gap-4 p-2 text-sm relative border-[1px] border-solid border-black dark:border-white rounded-md h-[25vh]">
        <Input
          type="text"
          headline="Name"
          name="name"
          value={name ?? ""}
          wrapperClass="flex-col"
          onChange={(e) => setName(e.target.value)}
        />
        <div className="w-full flex flex-col">
          <label htmlFor="name" className="font-bold">
            Role:
          </label>
          <select
            name="role"
            className="border-[1px] border-solid border-black dark:border-white dark:text-white rounded-sm bg-light-bg dark:bg-dark-bg"
          >
            <option value={role === "client" ? "client" : "demonstrator"}>
              {role === "client" ? "client" : "demonstrator"}
            </option>
            <option value={role === "client" ? "demonstrator" : "client"}>
              {role === "client" ? "demonstrator" : "client"}
            </option>
          </select>
        </div>
        <div className="flex gap-4">
          <label htmlFor="verified" className="font-bold">
            Verified:
          </label>
          <input
            type="checkbox"
            name="verified"
            checked={verified ?? false}
            onChange={() => setVerified(!verified)}
          />
        </div>
        <PrimaryButton
          type="green"
          buttonText="save changes"
          className="absolute right-2 bottom-2 bg-[#dbdbdb] border-[1px] border-black border-solid rounded-md px-4 py-2 text-white"
          onClick={() => console.log("clicked")}
        />
      </section>
    </form>
  );
};
