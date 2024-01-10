"use client";

import {useState, useEffect} from "react";
import EventListItem from "./EventListItem";
import EventInfoCard from "./EventInfoCard";
import CloseButton from "../buttons/CloseButton";
import SignupButton from "../buttons/SignUpButton";

const EventList = () => {
  const [allEventsInfo, setAllEventsInfo] = useState<TableClientEvent[] | null>(null);
  const [eventInfo, setEventInfo] = useState<TableClientEvent | null>(null);
  const [eventInfoStyling, setEventInfoStyling] = useState("hidden");
  const [eventDemonstrators, setEventDemonstrators] = useState({
    eventId: "",
    demonstrator_id: "",
    demonstrator_name: "",
  });
  const [eventDemonstrator, setEventDemonstrator] = useState("");
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

    /* setSignInFormValue((signInFormValueSate) => ({
      ...signInFormValueSate,
      [name]: value,
    })); */
  };

  const getEventDemonstrator = async (demonstratorId: number | null) => {
    if (demonstratorId == null) {
      console.log("no demonstrator");
      return "";
    }
    const bodyData = {id: demonstratorId};

    const data = await fetch("/api/post/get-user", {
      method: "POST",
      body: JSON.stringify(bodyData),
    });
    const res = await data.json();

    console.log(res);

    return res.id;
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
    if (eventInfo?.demonstrator_id != null) {
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
    } catch (error) {
      console.log(error);
    }

    getAllEvents();
    setEventInfoStyling("hidden");
    setEventInfo(null);

    return;
  };

  return (
    <div className="w-full relative flex justify-center">
      <table className="w-full text-black dark:text-light-text absolute z-0">
        <thead>
          <tr>
            <th>Client</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
            <th>Demonstrator</th>
          </tr>
        </thead>
        <tbody>
          {allEventsInfo?.map((event) => (
            <EventListItem
              id={`${event.id}`}
              client={event.client ?? "-"}
              location={event.Location.name ?? "-"}
              supplier={event.supplier ?? "-"}
              date={event.date ?? "-"}
              startTime={event.start_time == null ? event.start_time : event.start_time.slice(0, 5)}
              endTime={event.end_time == null ? event.end_time : event.end_time.slice(0, 5)}
              demonstrator={event.demonstrator_id == null ? false : true}
              key={event.id}
              onClick={getClickedEvent}
            />
          ))}
        </tbody>
      </table>
      <div
        className={`bg-[#EDEDED] absolute z-10 border-[1px] transition-all duration-300 rounded shadow-md ${eventInfoStyling}`}
      >
        <div>
          {eventInfo?.id != null && (
            <EventInfoCard
              className={"flex flex-col gap-2"}
              client={eventInfo.client}
              location={eventInfo.Location.name}
              address={eventInfo.Location.address}
              suplier={eventInfo.supplier}
              date={eventInfo.date}
              startTime={
                eventInfo.start_time == null
                  ? eventInfo.start_time
                  : eventInfo.start_time.slice(0, 5)
              }
              endTime={
                eventInfo.end_time == null ? eventInfo.end_time : eventInfo.end_time.slice(0, 5)
              }
              demonstrator={eventInfo.demonstrator_id == null ? "false" : "true"}
              product={eventInfo.product_name}
            />
          )}

          <div className="flex pb-6 justify-around align-center">
            {/* the real one, other is used for testing 
        {eventInfo?.demonstrator == null && userInfo.role == "demonstrator" && (
          <SignupButton onClick={SignUpDemonstrator} />
        )} */}
            {eventInfo?.demonstrator_id == null && userInfo.role == "admin" && (
              <SignupButton onClick={SignUpDemonstrator} className="" />
            )}

            <CloseButton
              onClick={() => {
                setEventInfo(null);
                setEventInfoStyling("hidden");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventList;
