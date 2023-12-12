import { useState } from "react";

type LocationProps = {
  clientName: string;
  clientAddress: string;
  client_id: number;
};

export const Location = ({
  clientName,
  clientAddress,
  client_id,
}: LocationProps) => {
  const [name, setName] = useState<string | null>(clientName);
  const [address, setAddress] = useState<string | null>(clientAddress);

  return (
    <form className="flex flex-col gap-2 m-2 p-4 text-black border-[1px] border-solid border-black rounded-md relative">
      <div className="flex flex-col">
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
      <div className="flex gap-2">
        <h2 className="font-bold">client id:</h2>
        <p>{client_id}</p>
      </div>
      <button className="absolute bottom-2 right-2">save changes</button>
    </form>
  );
};
