"use client";
import { useState, useEffect } from "react";
import Controller from "@/components/admin/controller";

const Admin = () => {
  const [events, setEvents] = useState<TableClientEvent[] | null>(null);
  const [users, setUsers] = useState<User[] | null>(null);

  const getEvents = async () => {
    const data = await fetch("/api/get/events", {
      method: "GET",
    });
    const res = await data.json();
    setEvents(res.data);
  };

  const getUsers = async () => {
    const data = await fetch("/api/get/users", {
      method: "GET",
    });
    const res = await data.json();
    setUsers(res.data);
  };

  useEffect(() => {
    getEvents();
    getUsers();
  }, []);

  return events ? (
    <div className="w-full h-screen bg-[#EDEDED]">
      <Controller Events={events} Users={users} />
    </div>
  ) : (
    <></>
  );
};
export default Admin;
