import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import Input from "@/components/global/FormComponents/Input";

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
  const [formStartDate, setFormStartDate] = useState<string | null>(null);
  const [formEndDate, setFormEndDate] = useState<string>("");
  const [formDate, setFormDate] = useState<string | null>(null);
  const [formComment, setFormComment] = useState<string>("");
  const [formDemonstrator, setFormDemonstrator] = useState<string>("");
  const [formDemonstrators, setFormDemonstrators] = useState<User[] | null>(
    null
  );
  const [formTravelCost, setFormTravelCost] = useState<number>(0);
  const [formProductStock, setFormProductStock] = useState<number>(0);
  const [formUnitsUsed, setFormUnitsUsed] = useState<number>(0);
  const [formSupplier, setFormSupplier] = useState<string>("");
  const [formVerified, setFormVerified] = useState<boolean>(false);
  const [formProductName, setFormProductName] = useState<string>("");

  const router = useRouter();
  const pathname = usePathname();

  const getDemonstrators = async () => {
    const data = await fetch("/api/get/demonstrators", {
      method: "GET",
    });
    const res = await data.json();
    if (res.error === null) router.push(pathname + "?e=" + res.error);
    setFormDemonstrators(res.data);
    setErrorMessage(res.message);
  };

  const createEvent = async (e: FormData) => {
    const data = await fetch("/api/post/create-event", {
      method: "POST",
      body: e,
    });
    const res = await data.json();
    setPopUpActive(false);
    if (res.error === null) router.push(pathname + "?e=" + res.error);
    setErrorMessage(res.message);
  };

  useEffect(() => {
    const address = locations?.find(
      (location) => location.id === formLocationId
    )?.address;
    setFormAddress(address);
    if (formDemonstrators === null) getDemonstrators();
  }, [formLocationId]);

  return (
    <div className="absolute">
      <div
        className="fixed w-[100vw] h-[100vh] top-0 left-0 bg-white dark:bg-black opacity-50 z-20"
        onClick={() => setPopUpActive(false)}
      />
      <section className="fixed top-[16.5vh] right-[25vw] left-[10vw] md:left-[25vw] bottom-0 w-3/4 md:w-1/2 h-3/4 border-[1px] border-solid border-black rounded-md bg-light-bg dark:bg-dark-bg text-black dark:text-white p-4 z-40 text-sm">
        <div className="flex flex-col justify-center items-center gap-4">
          <h2 className="text-2xl">Create event for client</h2>
          <form action={createEvent} className="flex flex-col w-full gap-4">
            <input type="hidden" name="client_id" value={client_id} />
            <input type="hidden" name="client_name" value={client_name ?? ""} />
            <div className="flex gap-4">
              <label htmlFor="location" className="font-bold">
                Locations:
              </label>
              <select
                name="location_id"
                className="border-[1px] border-solid border-black dark:border-white dark:text-white rounded-sm bg-light-bg dark:bg-dark-bg"
                onChange={(e) => setFormLocationId(parseInt(e.target.value))}
              >
                {locations?.map((loc) => (
                  <option value={loc.id ?? ""}>{loc.name}</option>
                ))}
              </select>
            </div>
            <div className="w-[25vw]">
              <Input
                type="readOnly"
                headline="Address"
                value={formAddress ?? ""}
              />
            </div>

            <section className="flex flex-wrap gap-2 max-h-18">
              <Input
                type="date"
                headline="Date"
                name="date"
                value={formDate ?? ""}
                onChange={(e) => setFormDate(e.target.value)}
              />
              <Input
                type="time"
                headline="Start time"
                name="time"
                value={formStartDate ?? ""}
                onChange={(e) => setFormStartDate(e.target.value)}
              />
              <Input
                type="time"
                headline="End time"
                name="time"
                value={formEndDate}
                onChange={(e) => setFormEndDate(e.target.value)}
              />
            </section>

            <div className="flex flex-col gap-2 w-[25vw]">
              <div className="flex gap-4">
                <label htmlFor="demonstrator_id" className="font-bold">
                  Demonstrator:
                </label>
                <select
                  name="demonstrator_id"
                  className="border-[1px] border-solid border-black dark:border-white dark:text-white rounded-sm bg-light-bg dark:bg-dark-bg"
                  onChange={(e) => setFormDemonstrator(e.target.value)}
                >
                  <option value={"null"}>None</option>
                  {formDemonstrators?.map((demonstrator) => (
                    <option value={demonstrator.id ?? ""}>
                      {demonstrator.name}
                    </option>
                  ))}
                </select>
              </div>
              <Input
                type="text"
                headline="Comment"
                name="comment"
                value={formComment}
                onChange={(e) => setFormComment(e.target.value)}
              />
              <Input
                type="number"
                headline="Travel cost"
                name="travel_cost"
                value={formTravelCost}
                onChange={(e) => setFormTravelCost(parseInt(e.target.value))}
                min={0}
              />
              <Input
                type="checkbox"
                headline="Verified"
                name="verified"
                isChecked={formVerified}
                onClick={(e) => setFormVerified(!formVerified)}
              />
              <Input
                type="text"
                headline="Product Name"
                name="product_name"
                value={formProductName}
                onChange={(e) => setFormProductName(e.target.value)}
              />
              <Input
                type="text"
                headline="Supplier"
                name="supplier"
                value={formSupplier}
                onChange={(e) => setFormSupplier(e.target.value)}
              />
              <Input
                type="number"
                headline="Product stock"
                name="product_stock"
                value={formProductStock}
                onChange={(e) => setFormProductStock(parseInt(e.target.value))}
                min={0}
              />
              <Input
                type="number"
                headline="Units used"
                name="units_used"
                value={formUnitsUsed}
                onChange={(e) => setFormUnitsUsed(parseInt(e.target.value))}
                min={0}
              />
            </div>
            <div className="absolute right-4 bottom-4">
              <PrimaryButton type="green" buttonText="Create event" />
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};
