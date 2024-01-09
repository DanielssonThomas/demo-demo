import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import Input from "@/components/global/FormComponents/Input";

type CreateLocation = {
  client_id: number;
  setPopUpActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CreateLocation = ({
  client_id,
  setPopUpActive,
}: CreateLocation) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [clientName, setClientName] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();
  const getClientName = async () => {
    const data = await fetch("/api/post/get-user", {
      method: "POST",
      body: JSON.stringify({ id: client_id }),
    });
    const res = await data.json();
    setClientName(res.data.name);
  };

  const createLocation = async (e: FormData) => {
    const data = await fetch("/api/post/create-location", {
      method: "POST",
      body: e,
    });
    const res = await data.json();
    setPopUpActive(false);
    if (res.error === null) router.push(pathname + "?e=" + res.error);
    setErrorMessage(res.message);
  };

  useEffect(() => {
    getClientName();
  }, []);

  return (
    <div className="absolute">
      <div
        className="fixed w-[100vw] h-[100vh] top-0 left-0 bg-white dark:bg-black opacity-50 z-20"
        onClick={() => setPopUpActive(false)}
      />
      <section className="fixed top-[25vh] right-[37.5vw] left-[37.5vw] bottom-0 w-1/4 h-2/5 border-[1px] border-solid border-black rounded-md bg-light-bg dark:bg-dark-bg text-black dark:text-white p-4 z-40">
        <div className="flex flex-col justify-center items-center gap-4">
          <form
            action={createLocation}
            className="flex flex-col w-full justify-between items-center gap-4 h-[16rem]"
          >
            <h2 className="text-2xl">Create location for client</h2>
            <input type="hidden" name="client_name" value={clientName} />
            <div className="flex flex-col gap-4">
              <input type="hidden" name="client_id" value={client_id} />
              <Input type="text" headline="Name" name="name" value="" />
              <Input type="text" headline="Address" name="address" value="" />
            </div>
            <PrimaryButton type="green" buttonText="Create location" />
          </form>
        </div>
        {errorMessage === null ? (
          <></>
        ) : (
          <p className="text-red-500 text-center absolute -bottom-8 w-[10vw] left-[7vw]">
            Error on upload: {errorMessage}
          </p>
        )}
      </section>
    </div>
  );
};
