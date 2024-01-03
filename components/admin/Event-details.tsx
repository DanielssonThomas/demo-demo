import Link from "next/link";
import { useRouter, usePathname, redirect } from "next/navigation";
import { useState, useEffect } from "react";

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
  const pathname = usePathname();
  const [locations, setLocations] = useState<DBLocation[] | null>(null);
  const [formAddress, setFormAddress] = useState<string | null>(address);

  const [startTime, setStartTime] = useState<string | null>(start_time);
  const [endTime, setEndTime] = useState<string | null>(end_time);
  const [formVerified, setFormVerified] = useState<boolean | null>(verified);
  const [formActive, setFormActive] = useState<boolean | null>(active);

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
    redirect("/admin/events");
  };

  return (
    <div className="absolute">
      <div
        className="fixed w-[100vw] h-[100vh] top-0 left-0 bg-white opacity-50 z-20"
        onClick={() => router.back()}
      />
      <section className="fixed top-[12.5vh] right-[25vw] left-[25vw] bottom-0 w-1/2 h-3/4 border-[1px] border-solid border-black rounded-md bg-[#EDEDED] text-black p-4 z-40">
        <div className="text-center">
          <h2 className="text-xl underline">CLIENT</h2>
        </div>
        <form action={(e) => updateEvent(e)}>
          <input type="hidden" name="id" value={id} />
          <div className="flex gap-2">
            <h3 className="font-bold">Clients:</h3>
            <Link href={`/admin/client/${client_id}`} className="underline">
              {client}
            </Link>
          </div>
          <div>
            <label htmlFor="location" className="font-bold">
              Locations:
            </label>
            <select
              name="location_id"
              className="bg-[#EDEDED] border-[1px] border-solid border-black rounded-sm"
              onChange={(e) => {
                setFormAddress(e.target.value);
              }}
            >
              {locations?.map((loc) => (
                <option value={loc.id ?? ""}>{loc.name}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <h3 className="font-bold">Address:</h3>
            <p>{formAddress}</p>
          </div>
          <section className="flex gap-2 ">
            <div className="flex gap-2">
              <h3 className="font-bold">Date:</h3>
              <input
                name="date"
                type="date"
                value={date}
                className="bg-[#EDEDED] border-[1px] border-solid border-black rounded-sm"
              />
            </div>
            <div className="flex gap-2">
              <h3 className="font-bold">Start time:</h3>
              <input
                name="start_time"
                type="time"
                value={startTime ?? ""}
                className="bg-[#EDEDED] border-[1px] border-solid border-black rounded-sm"
                onChange={(e) => {
                  setStartTime(e.target.value);
                }}
              />
            </div>
            <div className="flex gap-2">
              <h3 className="font-bold">End time:</h3>
              <input
                name="end_time"
                type="time"
                value={endTime ?? ""}
                className="bg-[#EDEDED] border-[1px] border-solid border-black rounded-sm"
                onChange={(e) => {
                  setEndTime(e.target.value);
                }}
              />
            </div>
          </section>
          <div className="flex gap-2">
            <h3 className="font-bold">Product name:</h3>
            <p>{product_name}</p>
          </div>
          <div className="flex gap-2">
            <h3 className="font-bold">Supplier:</h3>
            <p>{supplier}</p>
          </div>
          <section className="flex gap-2">
            <div className="flex gap-2">
              <h3 className="font-bold">Stock:</h3>
              <p>{product_stock}</p>
            </div>
            <div className="flex gap-2">
              <h3 className="font-bold">units used:</h3>
              <input
                type="number"
                name="units_used"
                min={0}
                max={product_stock}
                value={units_used ?? 0}
                className="bg-[#EDEDED] border-[1px] border-solid border-black rounded-sm pl-2"
              />
            </div>
          </section>
          <div className="flex flex-col gap-2">
            <h3 className="font-bold">Comment:</h3>
            <textarea
              name="comment"
              placeholder={comment === "" ? "No comment" : ""}
            >
              {comment}
            </textarea>
          </div>
          <div className="flex gap-2">
            <h3 className="font-bold">Travel cost:</h3>
            <p>{travels_cost === null ? "Not entered" : travels_cost}</p>
          </div>
          <div className="flex gap-2">
            <h3 className="font-bold">Verified:</h3>
            <input
              type="checkbox"
              name="verified"
              id=""
              checked={formVerified ?? false}
              onClick={() => setFormVerified(!formVerified)}
            />
          </div>
          <div className="flex gap-2">
            <h3 className="font-bold">Active:</h3>
            <input
              type="checkbox"
              name="active"
              id=""
              checked={formActive ?? false}
              onClick={() => setFormActive(!formActive)}
            />
          </div>
          <button className="absolute right-8 bottom-8 bg-[#dbdbdb] border-[1px] border-black border-solid rounded-md px-4 py-2">
            Save changes
          </button>
        </form>
      </section>
    </div>
  );
};

export default EventDetails;
