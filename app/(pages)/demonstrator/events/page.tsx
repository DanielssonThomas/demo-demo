"use client";

import {useState, useEffect} from "react";
import EventListItem from "@/components/cards/EventListItem";
import DemonstratorEventInfoCard from "@/components/cards/DemonstratorEventInfoCard";
import CloseButton from "@/components/buttons/CloseButton";
import UnregisterButton from "@/components/buttons/UnregisterButton";

const Events = () => {
  const [allEventsInfo, setAllEventsInfo] = useState<TableClientEvent[] | null>(null);
  const [eventInfo, setEventInfo] = useState<TableClientEvent | null>(null);
  const [eventInfoStyling, setEventInfoStyling] = useState("hidden");

  return (
    <div>
      this is the demonstrator events page
      {/* <DemonstratorEventInfoCard /> */}
    </div>
  );
};

export default Events;
