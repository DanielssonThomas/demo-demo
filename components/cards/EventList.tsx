"use client";

import {useState, useEffect} from "react";
import EventListItem from "./EventListItem";
import EventInfoCard from "./EventInfoCard";
import CloseButton from "../buttons/CloseButton";
import SignupButton from "../buttons/SignUpButton";

const EventList = () => {
  const [allEventsInfo, setAllEventsInfo] = useState<TableClientEvent[] | null>(null);
  const [eventInfo, setEventInfo] = useState<TableClientEvent | null>(null);
  const [userRole, setUserRole] = useState("");
  const [eventInfoStyling, setEventInfoStyling] = useState("hidden");
  const [userInfo, setUserInfo] = useState({
    id: "",
    name: "",
    role: "",
  });

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

    setAllEventsInfo(info);
  };

  const getUserInfo = async () => {
    try {
      const data = await fetch("/api/post/get-user-info", {
        method: "POST",
      });
      const res = await data.json();

      setUserInfo({
        id: res.data.id,
        name: res.data.name,
        role: res.data.role,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getClickedEvent = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
    const event = allEventsInfo?.find(({id}) => id == Number(e.currentTarget.id));

    if (event != null) {
      setEventInfo(event);
      setEventInfoStyling("visible");
    }
  };

  const SignUpDemonstrator = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (eventInfo?.demonstrator != null) {
      console.log("already has demonstrator");
      return;
    } else {
      console.log("has no demonstrator");
    }

    const bodyData = {eventId: eventInfo?.id, userId: userInfo.id, userName: userInfo.name};

    try {
      const data = await fetch("/api/post/update-demonstrator", {
        method: "POST",
        body: JSON.stringify(bodyData),
      });
      const res = await data.json();

      console.log(res);
    } catch (error) {
      console.log(error);
    }

    getAllEvents();
    setEventInfoStyling("hidden");
    setEventInfo(null);

    return;
  };

  return (
    <div>
      <table className="w-full text-black absolute z-0">
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
          {allEventsInfo?.map((event) => (
            <EventListItem
              className="h-[3rem] border-[1px] border-solid rounded-sm border-black transition-all duration-300 hover:scale-[1.02] hover:p-4 cursor-pointer"
              id={`${event.id}`}
              client={event.client}
              location={event.Location.name}
              address={event.Location.address}
              supplier={event.supplier}
              date={event.date}
              startTime={event.start_time}
              endTime={event.end_time}
              demonstrator={event.demonstrator}
              key={event.id}
              onClick={getClickedEvent}
            />
          ))}
        </tbody>
      </table>
      <div className={`absolute z-10 bg-red-500 ${eventInfoStyling}`}>
        {eventInfo?.id != null && (
          <EventInfoCard
            className="border-[1px] border-solid rounded-sm border-black transition-all duration-300"
            client={eventInfo.client}
            location={eventInfo.Location.name}
            address={eventInfo.Location.address}
            suplier={eventInfo.supplier}
            date={eventInfo.date}
            startTime={eventInfo.start_time}
            endTime={eventInfo.end_time}
            demonstrator={eventInfo.demonstrator}
            product={eventInfo.product_name}
            productStock={eventInfo.product_stock}
            unitsUsed={eventInfo.units_used}
          />
        )}
        <CloseButton
          onClick={() => {
            setEventInfo(null);
            setEventInfoStyling("hidden");
          }}
        />
        {eventInfo?.demonstrator == null && <SignupButton onClick={SignUpDemonstrator} />}
      </div>
    </div>
  );
};

export default EventList;
