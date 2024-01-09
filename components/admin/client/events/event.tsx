import { FormEvent, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { DeleteEvent } from "../delete-event";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import Input from "@/components/global/FormComponents/Input";

type EventProps = {
  id: number;
  Location: { name: string; address: string };
  date: string;
  start_time: string | null;
  end_time: string | null;
  comment: string | null;
  active: boolean | null;
  verified: boolean | null;
  product_name: string | null;
  demonstrator_id: number | null;
  product_stock: number;
  supplier: string | null;
  travels_cost: number | null;
  units_used: number | null;
  locations: DBLocation[] | null;
  deleteEventActive: boolean;
  setDeleteEventActive: React.Dispatch<React.SetStateAction<boolean>>;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Event = ({
  id,
  Location,
  date,
  start_time,
  end_time,
  comment,
  active,
  verified,
  product_name,
  demonstrator_id,
  product_stock,
  supplier,
  travels_cost,
  units_used,
  locations,
  deleteEventActive,
  setDeleteEventActive,
  setRefresh,
}: EventProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [formAddress, setFormAddress] = useState<string | null>(
    Location.address
  );
  const [startTime, setStartTime] = useState<string | null>(start_time);
  const [endTime, setEndTime] = useState<string | null>(end_time);
  const [formVerified, setFormVerified] = useState<boolean | null>(verified);
  const [formActive, setFormActive] = useState<boolean | null>(active);

  const [selectedFormLocationId, setSelectedFormLocationId] = useState<
    number | null
  >(null);

  const [formLocations, setFormLocations] = useState<DBLocation[] | null>(
    locations
  );
  const [formComment, setFormComment] = useState<string | null>(comment);
  useEffect(() => {
    const newFormLocations = formLocations;
    if (!loaded) {
      const targetIndex = newFormLocations?.findIndex(
        (location) => location.address === Location.address
      );

      const movedObject = newFormLocations?.splice(targetIndex ?? 0, 1)[0];

      if (movedObject !== undefined) newFormLocations?.unshift(movedObject);

      setFormLocations(newFormLocations);
      setLoaded(true);
    }
    const newAddress = locations?.find(
      (location) => location.id === selectedFormLocationId
    );
    if (newAddress !== undefined) setFormAddress(newAddress.address);
  }, [selectedFormLocationId]);

  const updateEvent = async (e: FormData) => {
    const data = await fetch("/api/post/update-event", {
      method: "POST",
      body: e,
    });
    const res = await data.json();
    router.push(pathname + `?` + "e=" + res.error);
    setRefresh(true);
  };

  return (
    <form
      action={(e) => updateEvent(e)}
      className="m-2 p-4 text-sm relative border-[1px] border-solid border-black dark:border-white rounded-md"
    >
      {deleteEventActive && (
        <DeleteEvent
          key={id}
          id={id}
          setDeleteEventActive={setDeleteEventActive}
        />
      )}
      <button
        onClick={(e: any) => {
          e.preventDefault();
          setDeleteEventActive(!deleteEventActive);
        }}
        className="absolute top-1 right-2 text-xl text-red-500"
      >
        X
      </button>
      <input type="hidden" name="id" value={id} />
      <div>
        <label htmlFor="location" className="font-bold">
          Locations:
        </label>
        <select
          name="location_id"
          value={selectedFormLocationId ?? 0}
          className="border-[1px] border-solid border-black dark:border-white dark:text-white rounded-sm bg-light-bg dark:bg-dark-bg"
          onChange={(e) => {
            setSelectedFormLocationId(parseInt(e.target.value));
          }}
        >
          {formLocations?.map((loc) => (
            <option key={loc.id} value={loc.id ?? ""}>
              {loc.name}
            </option>
          ))}
        </select>
      </div>
      <div className="w-[20vw]">
        <Input type="readOnly" headline="Address" value={formAddress} />
      </div>
      <section className="flex gap-2 ">
        <div className="flex flex-col justify-center items-center w-[15vw]">
          <Input type="date" headline="Date" name="date" value={date ?? ""} />
        </div>
        <div className="flex flex-col justify-center items-center w-[15vw]">
          <Input
            type="time"
            headline="Start time"
            name="start_time"
            value={startTime ?? ""}
            onChange={(e) => {
              setStartTime(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col justify-center items-center w-[15vw]">
          <Input
            type="time"
            headline="End time"
            name="end_time"
            value={endTime ?? ""}
            onChange={(e) => {
              setEndTime(e.target.value);
            }}
          />
        </div>
      </section>
      <div className="w-[12vw]">
        <Input type="readOnly" headline="Product name" value={product_name} />
        <Input type="readOnly" headline="Supplier" value={supplier} />
      </div>
      <section className="flex gap-2 w-[18vw]">
        <Input type="readOnly" headline="Stock" value={product_stock} />
        <Input
          type="number"
          headline="Units used"
          name="units_used"
          value={units_used ?? 0}
          min={0}
          max={product_stock}
        />
      </section>
      <Input
        type="textarea"
        headline="Comment"
        name="comment"
        value={comment === "" ? "No comment" : ""}
        onChange={(e) => setFormComment(e.target.value)}
      />
      <div className="w-[12vw]">
        <Input
          type="readOnly"
          headline="Travel cost"
          value={travels_cost === null ? "Not entered" : travels_cost}
        />
      </div>
      <div className="w-[5vw]">
        <Input
          type="checkbox"
          headline="Verified"
          isChecked={formVerified ?? false}
          name="verified"
          onClick={() => setFormVerified(!formVerified)}
        />
        <Input
          type="checkbox"
          headline="Active"
          isChecked={formActive ?? false}
          name="active"
          onClick={() => setFormActive(!formVerified)}
        />
      </div>
      <PrimaryButton
        type="green"
        key={id}
        buttonText="save changes"
        className="absolute right-2 bottom-2 bg-[#dbdbdb] border-[1px] border-black border-solid rounded-md px-4 py-2 text-white"
        onClick={() => console.log("clicked")}
      />
    </form>
  );
};
