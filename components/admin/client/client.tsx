"use client";
import User from "./user";
import Locations from "./locations";
import Events from "./events";

type ClientProps = {
  id: number;
};

export const Client = ({ id }: ClientProps) => {
  return (
    <div className="flex flex-col p-4 bg-light-bg dark:bg-dark-bg text-black dark:text-white min-h-screen">
      <div className="flex flex-col justify-center items-center xl:items-start min-h-screen xl:flex-row">
        <section className="w-full sm:w-[60vw] md:w-[50vw] xl:w-[25vw]">
          <h2 className="text-center">Client</h2>
          <User id={id} />
        </section>
        <section className="w-full sm:w-[60vw] md:w-[50vw] xl:w-[25vw] h-full">
          <h2 className="text-center">Locations</h2>
          <Locations id={id} />
        </section>
        <section className="w-full sm:w-[60vw] md:w-[50vw] xl:w-[50vw]">
          <h2 className="text-center">Events</h2>
          <Events id={id} />
        </section>
      </div>
    </div>
  );
};
