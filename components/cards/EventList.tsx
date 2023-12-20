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
    <table className="w-full text-black">
      <thead>
        <tr>
          <th>Client</th>
          <th>Location</th>
          <th>Address</th>
          <th>Date</th>
          <th>Time</th>
          <th>Demonstrator</th>
        </tr>
      </thead>
      <tbody>
        {userRole == "client" ||
          (userRole == "admin" &&
            allEventsInfo?.map((event) => (
              <ClientEventCard
                className="h-[3rem] border-[1px] border-solid rounded-sm border-black transition-all duration-300 hover:scale-[1.02] hover:p-4 cursor-pointer"
                client={event.client}
                location={event.Location.name}
                address={event.Location.address}
                supplier={event.supplier}
                date={event.date}
                startTime={event.start_time}
                endTime={event.end_time}
                demonstrator={event.demonstrator}
                key={event.id}
              />
            )))}
        {userRole == "demonstrator" &&
          allEventsInfo?.map((event) => (
            <DemonstratorEventCard
              className="h-[3rem] border-[1px] border-solid rounded-sm border-black transition-all duration-300 hover:scale-[1.02] hover:p-4 cursor-pointer"
              client={event.client}
              location={event.Location.name}
              address={event.Location.address}
              date={event.date}
              startTime={event.start_time}
              endTime={event.end_time}
              active={event.active}
              key={event.id}
            />
          ))}
      </tbody>
    </table>
  );
};

export default EventList;
