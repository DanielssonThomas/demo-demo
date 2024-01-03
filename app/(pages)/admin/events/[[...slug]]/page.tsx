"use client";
import Controller from "@/components/admin/controller";
import LoadingAnim from "@/components/global/LoadingAnim";
import EventDetails from "@/components/admin/Event-details";
import { useEffect, useState } from "react";

const Events = ({ params: { slug } }: { params: { slug: string[] } }) => {
  const [eventId, setEventId] = useState<number | null>(null);
  const [events, setEvents] = useState<TableClientEvent[] | null>(null);
  const [event, setEvent] = useState<TableClientEvent | null>(null);

  const getEvents = async () => {
    const data = await fetch("/api/get/events", {
      method: "GET",
    });
    const res = await data.json();

    setEvents(res.data);
  };

  const getEvent = async () => {
    if (events === null) await getEvents();

    if (slug !== undefined && slug[0] !== null) {
      const parsedUserId = parseInt(slug[0]);
      setEventId(parsedUserId);
    }
  };

  useEffect(() => {
    getEvent();
  }, [slug, events]);

  useEffect(() => {
    if (eventId !== null && events !== null) {
      const foundEvent = events.find(({ id }) => id === eventId);
      setEvent(foundEvent ?? null);
    }
  }, [eventId, events]);

  if (events === null) {
    return (
      <div className="w-screen h-screen">
        <LoadingAnim />
      </div>
    );
  }

  return (
    <section className="w-full min-h-screen bg-[#EDEDED]">
      <Controller type="events" data={events} />
      {event !== null ? (
        <EventDetails
          id={event.id}
          client={event?.client ?? "-"}
          date={event?.date ?? "-"}
          location={event?.Location.name ?? "-"}
          address={event?.Location.address ?? "-"}
          product_name={event?.product_name ?? "-"}
          product_stock={event?.product_stock ?? 0}
          supplier={event?.supplier ?? "-"}
          units_used={event?.units_used ?? 0}
          start_time={event.start_time}
          end_time={event.end_time}
          comment={event.comment ?? ""}
          travels_cost={event.travels_cost}
          verified={event.verified}
          active={event.active}
          client_id={event.client_id ?? 0}
        />
      ) : (
        <></>
      )}
    </section>
  );
};

export default Events;
