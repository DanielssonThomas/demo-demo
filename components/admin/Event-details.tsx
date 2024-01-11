import Link from "next/link";
import Input from "../global/FormComponents/Input";
import { useRouter, redirect, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import PrimaryButton from "../buttons/PrimaryButton";

type EventDetailsProps = {
  id: number;
  location: string;
  address: string;
  client: string;
  client_id: number;
  date: string;
  comment: string;
  product_name: string;
  supplier: string;
  product_stock: number;
  units_used: number | null;
  start_time: string | null;
  end_time: string | null;
  travels_cost: number | null;
  verified: boolean | null;
  active: boolean | null;
};

const EventDetails = ({
  id,
  location,
  address,
  client,
  client_id,
  date,
  comment,
  product_name,
  supplier,
  product_stock,
  units_used,
  start_time,
  end_time,
  travels_cost,
  verified,
  active,
}: EventDetailsProps) => {
  const router = useRouter();
  const [locations, setLocations] = useState<DBLocation[] | null>(null);
  const [formAddress, setFormAddress] = useState<string | null>(address);

  const [startTime, setStartTime] = useState<string | null>(start_time);
  const [endTime, setEndTime] = useState<string | null>(end_time);
  const [formVerified, setFormVerified] = useState<boolean | null>(verified);
  const [formActive, setFormActive] = useState<boolean | null>(active);
  const [formComment, setFormComment] = useState<string | null>(comment);

  const getLocations = async () => {
    const LocationsData = await fetch("/api/get/locations", {
      method: "GET",
    });
    const LocationsDataRes = await LocationsData.json();
    const locationsSortByClient = LocationsDataRes.data.filter(
      (location: DBLocation) => location.client_name === client
    );

    setLocations(locationsSortByClient);
  };

  useEffect(() => {
    getLocations();
  }, []);

  const updateEvent = async (e: FormData) => {
    const data = await fetch("/api/post/update-event", {
      method: "POST",
      body: e,
    });
    const res = await data.json();
    redirect(`/admin/events?e=${res.error}`);
  };

  return (
    <div className="absolute">
      <div
        className="fixed w-[100vw] h-[100vh] top-0 left-0 bg-white dark:bg-black opacity-50 z-20"
        onClick={() => router.back()}
      />
      <section className="fixed top-[10vh] right-[12.5vw] left-[12.5vw] bottom-0 w-3/4 xl:w-1/2 xl:left-[25vw] h-[80vh] border-[1px] border-solid border-black rounded-md bg-bg-light text-black dark:text-white p-4 z-40 bg-light-bg dark:bg-dark-bg">
        <div className="text-center">
          <h2 className="text-xl underline">CLIENT</h2>
        </div>
        <form
          action={(e) => updateEvent(e)}
          className="flex flex-col justify-center items-center gap-6 w-full text-sm"
        >
          <section className="flex flex-col gap-1 w-3/4 h-1/2">
            <input type="hidden" name="id" value={id} />

            <div className="flex justify-between w-full">
              <h3 className="font-bold">Clients:</h3>
              <Link href={`/admin/client/${client_id}`} className="underline">
                {client}
              </Link>
            </div>

            <div className="flex justify-between w-full">
              <label htmlFor="location" className="font-bold">
                Locations:
              </label>
              <select
                name="location_id"
                className="border-[1px] border-solid border-black dark:border-white dark:text-white rounded-sm bg-light-bg dark:bg-dark-bg"
                onChange={(e) => {
                  setFormAddress(e.target.value);
                }}
              >
                {locations?.map((loc) => (
                  <option value={loc.id ?? ""}>{loc.name}</option>
                ))}
              </select>
            </div>

            <Input type="readOnly" headline="Address" value={formAddress} />

            <Input type="date" headline="Date" value={date} name="date" />

            <Input
              type="time"
              headline="Start time"
              value={startTime ?? ""}
              name="start_time"
              onChange={(e) => {
                setStartTime(e.target.value);
              }}
            />
            <Input
              type="time"
              headline="End time"
              value={endTime ?? ""}
              name="end_time"
              onChange={(e) => {
                setEndTime(e.target.value);
              }}
            />

            <Input
              type="readOnly"
              headline="Product name"
              value={product_name}
            />

            <Input type="readOnly" headline="Supplier" value={supplier} />

            <Input type="readOnly" headline="Stock" value={product_stock} />
            <Input
              type="number"
              headline="Units used"
              name="units_used"
              value={units_used ?? 0}
              min={0}
              max={product_stock}
            />

            <Input
              type="textarea"
              headline="Comment"
              name="comment"
              value={formComment ?? ""}
              onChange={(e) => setFormComment(e.target.value)}
            />

            <Input
              type="readOnly"
              headline="Travel cost"
              value={travels_cost === null ? "Not entered" : travels_cost}
            />

            <Input
              type="checkbox"
              headline="Verified"
              name="verified"
              isChecked={formVerified ?? false}
              onClick={() => setFormVerified(!formVerified)}
            />

            <Input
              type="checkbox"
              headline="Active"
              name="active"
              isChecked={formActive ?? false}
              onClick={() => setFormActive(!formActive)}
            />
          </section>
          <PrimaryButton
            type="green"
            buttonText="save changes"
            className="absolute right-8 bottom-6"
          />
        </form>
      </section>
    </div>
  );
};

export default EventDetails;
