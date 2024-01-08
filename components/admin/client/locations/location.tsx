import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { DeleteLocation } from "../delete-location";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import Input from "@/components/global/FormComponents/Input";

type LocationProps = {
  id: number;
  locationName: string;
  clientAddress: string;
  client_id: number;
  deleteLocationActive: boolean;
  setDeleteLocationActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Location = ({
  id,
  locationName,
  clientAddress,
  client_id,
  deleteLocationActive,
  setDeleteLocationActive,
}: LocationProps) => {
  const [name, setName] = useState<string | null>(locationName);
  const [address, setAddress] = useState<string | null>(clientAddress);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const router = useRouter();
  const pathname = usePathname();
  const updateLocation = async (e: FormData) => {
    const data = await fetch("/api/post/update-location", {
      method: "POST",
      body: e,
    });
    const res = await data.json();
    if (res.message === null) router.refresh();
    router.push(pathname + `?` + "e=" + res.error);
    setErrorMessage(res.message);
  };

  return (
    <form
      action={(e: FormData) => updateLocation(e)}
      className="flex flex-col gap-2 m-2 p-4 text-black border-[1px] border-solid border-black dark:border-white rounded-md relative h-[25vh]"
    >
      {deleteLocationActive && (
        <DeleteLocation
          id={id}
          setDeleteLocationActive={setDeleteLocationActive}
        />
      )}

      <button
        onClick={(e: any) => {
          e.preventDefault();
          setDeleteLocationActive(!deleteLocationActive);
        }}
        className="absolute top-1 right-2 text-xl text-red-500"
      >
        X
      </button>
      <input type="hidden" name="id" value={id} />
      <Input
        type="text"
        headline="Name"
        name="name"
        value={name ?? ""}
        onChange={(e) => setName(e.target.value)}
        wrapperClass="flex-col"
      />
      <Input
        type="text"
        headline="Address"
        name="address"
        value={address ?? ""}
        onChange={(e) => setAddress(e.target.value)}
        wrapperClass="flex-col"
      />
      <PrimaryButton
        type="green"
        buttonText="save changes"
        className="absolute right-2 bottom-2 bg-[#dbdbdb] border-[1px] border-black border-solid rounded-md px-4 py-2 text-white"
        onClick={() => console.log("clicked")}
      />
    </form>
  );
};
