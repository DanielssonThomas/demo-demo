"use client";
import Table from "../table";
import Filter from "../filter";
import { useEffect, useState } from "react";

type ControllerProps = {
  Events: TableClientEvent[] | null;
  Users: User[] | null;
};

export const Controller = ({ Events, Users }: ControllerProps) => {
  const [show, setShow] = useState<"users" | "events">("events");

  const [showVerified, setShowVerified] = useState<boolean | null>(null);

  const [sortDate, setSortDate] = useState<"latest" | "oldest">("latest");

  return (
    <div className="text-black m-8">
      <Filter
        setShow={setShow}
        setShowVerified={setShowVerified}
        setSortDate={setSortDate}
      />
      {show === "events" ? (
        <Table show="events" Events={Events} showVerified={showVerified} />
      ) : (
        <Table show="users" Users={Users} showVerified={showVerified} />
      )}
    </div>
  );
};
