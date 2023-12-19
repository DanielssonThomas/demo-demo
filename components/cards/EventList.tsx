"use client";

import EventCard from "./EventCard";
import {useState, useEffect, use} from "react";

const EventList = () => {
  const [eventInfo, setEventInfo] = useState([
    {
      client: "",
      location: "",
      date: "",
      time: "",
    },
  ]);
  const [allEventsInfo, setAllEventsInfo] = useState<TableClientEvent[] | null>(null);

  useEffect(() => {
    getAllEvents();
  }, []);

  const getAllEvents = async () => {
    const data = await fetch("/api/post/get-events", {
      method: "POST",
    });
    const res = await data.json();
    const info = await res.data;

    console.log(res.data);

    setAllEventsInfo(info);
  };

  return (
    <div>
      {allEventsInfo?.map((event) => (
        <EventCard
          client={event.client}
          location={event.Location.name}
          address={event.Location.address}
          date={event.date}
          time={event.start_time}
          key={event.id}
        />
      ))}
    </div>
  );
};

export default EventList;
