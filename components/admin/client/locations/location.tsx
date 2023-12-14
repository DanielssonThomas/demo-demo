import { useState } from "react";
import { useRouter } from "next/navigation";
import { DeleteLocation } from "../delete-location";

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
  const updateLocation = async (e: FormData) => {
    const data = await fetch("/api/post/update-location", {
      method: "POST",
      body: e,
    });
    const res = await data.json();
    if (res.message === null) router.refresh();
    setErrorMessage(res.message);
  };

  return (
    <form
      action={(e: FormData) => updateLocation(e)}
      className="flex flex-col gap-2 m-2 p-4 text-black border-[1px] border-solid border-black rounded-md relative h-[25vh]"
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
      {errorMessage === "" ? (
        <></>
      ) : (
        <p className="text-red-500">Error: {errorMessage}</p>
      )}
      <div className="flex flex-col">
        <input type="hidden" name="id" value={id} />
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
      <div className="flex flex-col">
        <label htmlFor="address" className="font-bold">
          Address:
        </label>
        <input
          type="text"
          name="address"
          className="px-2 py-1 border-[1px] border-solid border-black rounded-sm bg-[#EDEDED]"
          value={address ?? ""}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <button className="absolute right-2 bottom-2 bg-[#dbdbdb] border-[1px] border-black border-solid rounded-md px-4 py-2">
        save changes
      </button>
    </form>
  );
};
