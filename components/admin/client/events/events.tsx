import { useEffect, useState } from "react";
import { Event } from "./event";
import { CreateEvent } from "../create-event";
import LoadingAnim from "@/components/global/LoadingAnim";

type EventsProps = { id: number };

export const Events = ({ id }: EventsProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [events, setEvents] = useState<TableClientEvent[] | null>(null);
  const [locations, setLocations] = useState<DBLocation[] | null>(null);
  const [deleteEventActive, setDeleteEventActive] = useState<boolean>(false);
  const [createEventActive, setCreateEventActive] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

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
    if (refresh) setRefresh(false);
  }, [deleteEventActive, createEventActive, refresh]);

  if (loading && events === null) {
    return <LoadingAnim />;
  }

  return (
    <div className="w-full h-full xl:overflow-scroll">
      {createEventActive && (
        <CreateEvent
          client_id={id}
          client_name={events !== null ? events[0].client : ""}
          locations={locations}
          setPopUpActive={setCreateEventActive}
        />
      )}
      {events?.map((event) => (
        <Event
          key={event.id}
          id={event.id}
          Location={event.Location}
          active={event.active}
          comment={event.comment}
          date={event.date ?? ""}
          demonstrator_id={event.demonstrator_id}
          start_time={event.start_time}
          end_time={event.end_time}
          product_name={event.product_name}
          product_stock={event.product_stock ?? 0}
          units_used={event.units_used}
          supplier={event.supplier}
          travels_cost={event.travels_cost}
          verified={event.verified}
          locations={locations}
          deleteEventActive={deleteEventActive}
          setDeleteEventActive={setDeleteEventActive}
          setRefresh={setRefresh}
        />
      ))}
      <section
        className="flex flex-col justify-center items-center relative m-2 p-4 text-black border-[1px] border-solid border-black dark:border-white rounded-md h-[15vh] cursor-pointer"
        onClick={() => setCreateEventActive(!createEventActive)}
      >
        <div className="absolute w-[3rem] h-[1px] bg-black dark:bg-white" />
        <div className="absolute w-[1px] h-[3rem] bg-black dark:bg-white" />
      </section>
    </div>
  );
};
