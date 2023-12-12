import { useEffect, useState } from "react";
import { Event } from "./event";

type EventsProps = { id: number };

export const Events = ({ id }: EventsProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [events, setEvents] = useState<TableClientEvent[] | null>(null);
  const [locations, setLocations] = useState<DBLocation[] | null>(null);

  const getEvents = async () => {
    const data = await fetch("/api/post/get-event", {
      method: "POST",
      body: JSON.stringify({ client_id: id }),
    });
    const res = await data.json();

    setEvents(res.data);
    setLoading(false);
  };

  const getLocations = async () => {
    const data = await fetch("/api/post/get-client-locations", {
      method: "POST",
      body: JSON.stringify({ id: id }),
    });
    const res = await data.json();

    setLocations(res.data);
    setLoading(false);
  };

  useEffect(() => {
    getEvents();
    getLocations();
  }, []);

  if (loading && events === null) {
    return (
      <div className="flex flex-col justify-center items-center w-[50vw] h-screen">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] text-black dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[50vw]">
      {events?.map((event) => (
        <Event
          id={event.id}
          Location={event.Location}
          active={event.active}
          comment={event.comment}
          date={event.date ?? ""}
          demonstrator={event.demonstrator}
          start_time={event.start_time}
          end_time={event.end_time}
          product_name={event.product_name}
          product_stock={event.product_stock ?? 0}
          units_used={event.units_used}
          supplier={event.supplier}
          travels_cost={event.travels_cost}
          verified={event.verified}
          locations={locations}
        />
      ))}
    </div>
  );
};
