"use client";

import EventCard from "./EventCard";
import {useState, useEffect, use} from "react";

const EventList = () => {
  useEffect(() => {
    getAllEvents();
  }, []);

  const getAllEvents = async () => {
    const data = await fetch("/api/post/get-events", {
      method: "POST",
    });
    const res = await data.json();
  };

  return (
    <div>
      <EventCard />
    </div>
  );
};

export default EventList;
