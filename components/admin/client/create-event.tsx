import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type CreateLocation = {
  client_id: number;
  client_name: string | null;
  locations: DBLocation[] | null;
  setPopUpActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CreateEvent = ({
  client_id,
  client_name,
  locations,
  setPopUpActive,
}: CreateLocation) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formLocationId, setFormLocationId] = useState<number | null>(null);
  const [formAddress, setFormAddress] = useState<string | null | undefined>(
    null
  );

  useEffect(() => {
    const address = locations?.find(
      (location) => location.id === formLocationId
    )?.address;
    setFormAddress(address);
  }, [formLocationId]);

  const router = useRouter();

  const createEvent = async (e: FormData) => {
    const data = await fetch("/api/post/create-event", {
      method: "POST",
      body: e,
    });
    const res = await data.json();
    setPopUpActive(false);
    if (res.error === null) router.refresh();
    setErrorMessage(res.message);
  };

  return (
    <div className="absolute">
      <div
        className="fixed w-[100vw] h-[100vh] top-0 left-0 bg-white opacity-50 z-20"
        onClick={() => setPopUpActive(false)}
      />
      <section className="fixed top-[16.5vh] right-[25vw] left-[25vw] bottom-0 w-1/2 h-3/4 border-[1px] border-solid border-black rounded-md bg-[#EDEDED] text-black p-4 z-40">
        <div className="flex flex-col justify-center items-center gap-4">
          <h2 className="text-2xl">Create event for client</h2>
          <form action={createEvent} className="flex flex-col w-full gap-4">
            <input type="hidden" name="client_id" value={client_id} />
            <input type="hidden" name="client_name" value={client_name ?? ""} />
            <div>
              <label htmlFor="location" className="font-bold">
                Locations:
              </label>
              <select
                name="location_id"
                className="bg-[#EDEDED] border-[1px] border-solid border-black rounded-sm"
                onChange={(e) => setFormLocationId(parseInt(e.target.value))}
              >
                {locations?.map((loc) => (
                  <option value={loc.id ?? ""}>{loc.name}</option>
                ))}
              </select>
            </div>
            <div className="flex">
              <h3 className="font-bold">Address:</h3>
              <p>{formAddress}</p>
            </div>
            <section className="flex gap-2 ">
              <div className="flex gap-2">
                <h3 className="font-bold">Date:</h3>
                <input
                  name="date"
                  type="date"
                  className="bg-[#EDEDED] border-[1px] border-solid border-black rounded-sm"
                />
              </div>
              <div className="flex gap-2">
                <h3 className="font-bold">Start time:</h3>
                <input
                  name="start_time"
                  type="time"
                  className="bg-[#EDEDED] border-[1px] border-solid border-black rounded-sm"
                />
              </div>
              <div className="flex gap-2">
                <h3 className="font-bold">End time:</h3>
                <input
                  name="end_time"
                  type="time"
                  className="bg-[#EDEDED] border-[1px] border-solid border-black rounded-sm"
                />
              </div>
            </section>
            <div className="flex gap-4">
              <label htmlFor="demonstrator" className="font-bold">
                Demonstrator:
              </label>
              <input
                type="text"
                name="demonstrator"
                className="px-2 border-[1px] border-solid border-black rounded-sm bg-[#EDEDED]"
              />
            </div>
            <div className="flex gap-4">
              <label htmlFor="comment" className="font-bold">
                Comment:
              </label>
              <input
                type="text"
                name="comment"
                className="px-2 border-[1px] border-solid border-black rounded-sm bg-[#EDEDED]"
              />
            </div>
            <div className="flex gap-4">
              <label htmlFor="travel_cost" className="font-bold">
                Travel cost:
              </label>
              <input
                type="number"
                name="travel_cost"
                className="px-2 border-[1px] border-solid border-black rounded-sm bg-[#EDEDED]"
              />
            </div>
            <div className="flex gap-4">
              <label htmlFor="verified" className="font-bold">
                Verified:
              </label>
              <input type="checkbox" name="verified" />
            </div>
            <div className="flex gap-4">
              <label htmlFor="product_name" className="font-bold">
                Product Name:
              </label>
              <input
                type="text"
                name="product_name"
                className="px-2 border-[1px] border-solid border-black rounded-sm bg-[#EDEDED]"
              />
            </div>
            <div className="flex gap-4">
              <label htmlFor="supplier" className="font-bold">
                Supplier:
              </label>
              <input
                type="text"
                name="supplier"
                className="px-2 border-[1px] border-solid border-black rounded-sm bg-[#EDEDED]"
              />
            </div>
            <div className="flex gap-4">
              <label htmlFor="product_stock" className="font-bold">
                Product stock:
              </label>
              <input
                type="number"
                name="product_stock"
                className="px-2 border-[1px] border-solid border-black rounded-sm bg-[#EDEDED]"
              />
            </div>
            <div className="flex gap-4">
              <label htmlFor="units_used" className="font-bold">
                Units used:
              </label>
              <input
                type="number"
                name="units_used"
                className="px-2 border-[1px] border-solid border-black rounded-sm bg-[#EDEDED]"
              />
            </div>
            <button className="bg-[#dbdbdb] border-[1px] border-black border-solid rounded-md px-4 py-2">
              Create event
            </button>
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
