import { useState } from "react";

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
  demonstrator: string | null;
  product_stock: number;
  supplier: string | null;
  travels_cost: number | null;
  units_used: number | null;
  locations: DBLocation[] | null;
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
  demonstrator,
  product_stock,
  supplier,
  travels_cost,
  units_used,
  locations,
}: EventProps) => {
  const [formAddress, setFormAddress] = useState<string | null>(
    Location.address
  );
  const [startTime, setStartTime] = useState<string | null>(start_time);
  const [endTime, setEndTime] = useState<string | null>(end_time);
  const [formVerified, setFormVerified] = useState<boolean | null>(verified);
  const [formActive, setFormActive] = useState<boolean | null>(active);

  const updateEvent = async (e: FormData) => {};

  return (
    <form
      action={(e) => updateEvent(e)}
      className="m-2 p-4 text-sm relative border-[1px] border-solid border-black rounded-md"
    >
      <input type="hidden" name="id" value={id} />
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
            value={date ?? ""}
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
      <button className="absolute right-4 bottom-4 bg-[#dbdbdb] border-[1px] border-black border-solid rounded-md px-4 py-2">
        Save changes
      </button>
    </form>
  );
};