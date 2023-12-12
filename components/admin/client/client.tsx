"use client";
import User from "./user";
import Locations from "./locations";
import Events from "./events";

type ClientProps = {
  id: number;
};

export const Client = ({ id }: ClientProps) => {
  return (
    <div className="flex flex-col p-4 bg-[#EDEDED] text-black min-h-screen">
      <div className="flex w-full h-[5vh]">
        <h2 className="text-center w-[25vw]">Client</h2>
        <h2 className="text-center w-[25vw]">Locations</h2>
        <h2 className="text-center w-[50vw]">Events</h2>
      </div>
      <div className="flex min-h-screen">
        <User id={id} />
        <Locations id={id} />
        <Events id={id} />
      </div>
    </div>
  );
};
