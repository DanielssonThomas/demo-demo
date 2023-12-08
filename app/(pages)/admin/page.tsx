"use client";
import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Table from "@/components/admin/table";

const Admin = () => {
  const [events, setEvents] = useState<ClientEvent[] | null>(null);
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
      <Table Events={events} Users={users} show="all" showVerified={null} />
    </div>
  ) : (
    <></>
  );
};
export default Admin;
