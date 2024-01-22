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
  };

  const getDemonstrator = async (demonstratorId: number) => {
    try {
      const data = await fetch("/api/post/get-demonstrator-info", {
        method: "POST",
        body: JSON.stringify({id: demonstratorId}),
      });
      const res = await data.json();

      if (res.data == null) {
        setEventDemonstrator("");
      } else {
        setEventDemonstrator(res.data.name);
      }
    } catch (error) {
      console.log(error);
    }
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
      getDemonstrator(Number(event.demonstrator_id));
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
    <section className="mt-6 w-full min-h-screen bg-light-bg dark:bg-dark-bg">
      <div className="text-black m-8 flex flex-col gap-6">
        <table className="w-full text-black dark:text-light-text">
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
                startTime={
                  event.start_time == null ? event.start_time : event.start_time.slice(0, 5)
                }
                endTime={event.end_time == null ? event.end_time : event.end_time.slice(0, 5)}
                demonstrator={event.demonstrator_id == null ? false : true}
                key={event.id}
                onClick={getClickedEvent}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className={`absolute ${eventInfoStyling}`}>
        <div className="fixed w-[100vw] h-[100vh] top-0 left-0 bg-white dark:bg-black opacity-50 z-20"></div>
        <section className="fixed top-[12.5vh] right-[25vw] left-[25vw] bottom-0 w-1/2 h-3/4 border-[1px] border-solid border-black rounded-md bg-bg-light text-black dark:text-white p-4 z-40 bg-light-bg dark:bg-dark-bg">
          {eventInfo?.id != null && (
            <EventInfoCard
              className={""}
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
              demonstrator={eventDemonstrator}
              product={eventInfo.product_name}
            />
          )}

          <div className="flex flex-row align-center justify-around">
            {eventInfo?.demonstrator_id == null && userInfo.role == "demonstrator" && (
              <SignupButton onClick={SignUpDemonstrator} className="" />
            )}

            <CloseButton
              onClick={() => {
                setEventInfo(null);
                setEventInfoStyling("hidden");
              }}
            />
          </div>
        </section>
      </div>
    </section>
  );
};

export default EventList;
