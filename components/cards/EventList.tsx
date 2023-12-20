"use client";

import ClientEventCard from "./ClientEventCard";
import DemonstratorEventCard from "./DemonstratorEventCard";
import {useState, useEffect, use} from "react";

const EventList = () => {
  const [allEventsInfo, setAllEventsInfo] = useState<TableClientEvent[] | null>(null);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    getUserInfo();
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

  const getUserInfo = async () => {
    try {
      const data = await fetch("/api/post/get-user-info", {
        method: "POST",
      });
      const res = await data.json();

      setUserRole(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Client</th>
          <th>Location</th>
          <th>Address</th>
          <th>Product</th>
          <th>Date</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {userRole == "admin" &&
          allEventsInfo?.map((event) => (
            <ClientEventCard
              client={event.client}
              location={event.Location.name}
              address={event.Location.address}
              product={event.product_name}
              date={event.date}
              time={event.start_time}
              key={event.id}
            />
          ))}
        {userRole == "admin" &&
          allEventsInfo?.map((event) => (
            <DemonstratorEventCard
              client={event.client}
              location={event.Location.name}
              address={event.Location.address}
              product={event.product_name}
              date={event.date}
              time={event.start_time}
              active={event.active}
              key={event.id}
            />
          ))}
      </tbody>
    </table>
  );
};

export default EventList;
