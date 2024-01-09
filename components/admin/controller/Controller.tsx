"use client";
import Table from "../table";
import Filter from "../filter";
import { useEffect, useState } from "react";

type UsersControllerProps = {
  type: "users";
  data: User[] | null;
};

type EventsControllerProps = {
  type: "events";
  data: TableClientEvent[] | null;
};

type ControllerProps = UsersControllerProps | EventsControllerProps;

export const Controller = ({ type, data }: ControllerProps) => {
  const [showVerified, setShowVerified] = useState<boolean | null>(null);

  const [sortDate, setSortDate] = useState<"latest" | "oldest">("latest");

  return (
    <div className="text-black m-8 flex flex-col gap-6">
      <Filter
        type={type}
        setShowVerified={setShowVerified}
        setSortDate={setSortDate}
      />
      {type === "events" ? (
        <Table
          show="events"
          Events={data}
          showVerified={showVerified}
          sortBy={sortDate}
        />
      ) : (
        <Table show="users" Users={data} showVerified={showVerified} />
      )}
    </div>
  );
};
