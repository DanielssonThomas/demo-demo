import { useEffect, useState } from "react";
import { Location } from "./location";
import { CreateLocation } from "../create-location";

export const Locations = ({ id }: { id: number }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [locations, setLocations] = useState<DBLocation[] | null>(null);

  const [createLocationActive, setCreateLocationActive] =
    useState<boolean>(false);
  const [deleteLocationActive, setDeleteLocationActive] =
    useState<boolean>(false);

  const getLocations = async () => {
    const data = await fetch("/api/post/get-client-locations", {
      method: "POST",
      body: JSON.stringify({ id: id }),
    });
    const res = await data.json();

    setLocations(res.data);
    setLoading(false);
  };

  useEffect(() => {
    getLocations();
  }, [createLocationActive, deleteLocationActive]);

  if (loading && locations === null) {
    return (
      <div className="flex flex-col justify-center items-center w-[25vw] h-[100vh] border-x-[1px] border-solid border-black">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] text-black dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[25vw] border-x-[1px] border-solid border-black h-screen overflow-scroll">
      {createLocationActive && (
        <CreateLocation
          client_id={id}
          setPopUpActive={setCreateLocationActive}
        />
      )}
      {locations?.map((location) => (
        <Location
          id={location.id}
          locationName={location.name ?? ""}
          clientAddress={location.address ?? ""}
          client_id={location.client_id ?? 0}
          deleteLocationActive={deleteLocationActive}
          setDeleteLocationActive={setDeleteLocationActive}
        />
      ))}
      <section
        className="flex flex-col justify-center items-center relative m-2 p-4 text-black border-[1px] border-solid border-black rounded-md h-[15vh] cursor-pointer"
        onClick={() => setCreateLocationActive(!createLocationActive)}
      >
        <div className="absolute w-[3rem] h-[1px] bg-black" />
        <div className="absolute w-[1px] h-[3rem] bg-black" />
      </section>
    </div>
  );
};
