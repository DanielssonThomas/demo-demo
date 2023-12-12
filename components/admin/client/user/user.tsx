import { useEffect, useState } from "react";

export const User = ({ id }: { id: number }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [name, setName] = useState<string | null>(null);
  const [verified, setVerified] = useState<boolean | null>(null);
  const [role, setRole] = useState<string | null>(null);

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

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center w-[25vw] h-screen">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] text-black dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <form className="flex flex-col items-center justify-center w-[25vw]">
      <section className="flex flex-col gap-4 p-2 text-sm relative border-[1px] border-solid border-black rounded-md h-[25vh]">
        <div className="w-full flex flex-col">
          <label htmlFor="name" className="font-bold">
            Name:
          </label>
          <input
            type="text"
            name="name"
            className="px-2 py-1 border-[1px] border-solid border-black rounded-sm bg-[#EDEDED]"
            value={name ?? ""}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="w-full flex flex-col">
          <label htmlFor="name" className="font-bold">
            Role:
          </label>
          <select
            name="role"
            className="px-2 py-1 border-[1px] border-solid border-black rounded-sm bg-[#EDEDED]"
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
            onClick={() => setVerified(!verified)}
          />
        </div>
        <button className="absolute right-2 bottom-2">save changes</button>
      </section>
    </form>
  );
};
