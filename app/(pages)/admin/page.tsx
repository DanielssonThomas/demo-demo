"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Controller from "@/components/admin/controller";
import EventDetails from "@/components/admin/Event-details";
import UserDetails from "@/components/admin/User-details";

const Admin = ({
  searchParams,
}: {
  searchParams: { type: "user" | "event"; id: number };
}) => {
  const [events, setEvents] = useState<TableClientEvent[] | null>(null);
  const [event, setEvent] = useState<TableClientEvent | null>(null);
  const [users, setUsers] = useState<User[] | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  const getEvents = async () => {
    const data = await fetch("/api/get/events", {
      method: "GET",
    });
    const res = await data.json();
    setEvents(res.data);
  };

  const getEvent = async () => {
    const event = events?.find(({ id }) => id == searchParams.id);
    setEvent(event ?? null);
  };

  const getUsers = async () => {
    const data = await fetch("/api/get/users", {
      method: "GET",
    });
    const res = await data.json();
    setUsers(res.data);
  };

  const getUser = async () => {
    const user = users?.find(({ id }) => id == searchParams.id);
    setUser(user ?? null);
  };

  useEffect(() => {
    getEvents();
    getUsers();
  }, []);

  useEffect(() => {
    if (searchParams.type !== null) {
      if (searchParams.type === "event") getEvent();
      if (searchParams.type === "user") getUser();
    }
  }, [searchParams]);

  return events ? (
    <div className="w-full h-screen bg-[#EDEDED]">
      {searchParams.type === "event" && event !== null ? (
        <EventDetails
          id={event.id}
          client={event?.client ?? "-"}
          date={event?.date ?? "-"}
          location={event?.Location.name ?? "-"}
          address={event?.Location.address ?? "-"}
          product_name={event?.product_name ?? "-"}
          product_stock={event?.product_stock ?? 0}
          supplier={event?.supplier ?? "-"}
          units_used={event?.units_used ?? 0}
        />
      ) : (
        <></>
      )}

      {searchParams.type === "user" && user !== null ? (
        <UserDetails
          id={user.id}
          name={user?.name ?? "-"}
          role={user?.role ?? "-"}
          verified={user?.verified}
        />
      ) : (
        <></>
      )}

      <Controller Events={events} Users={users} />
    </div>
  ) : (
    <></>
  );
};
export default Admin;
