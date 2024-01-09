import { useEffect, useState } from "react";
import { Location } from "./location";
import { CreateLocation } from "../create-location";
import LoadingAnim from "@/components/global/LoadingAnim";

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
    return <LoadingAnim width={"25vw"} />;
  }

  return (
    <div className="w-[25vw] border-x-[1px] border-solid border-black dark:border-white h-screen overflow-scroll">
      {createLocationActive && (
        <CreateLocation
          client_id={id}
          setPopUpActive={setCreateLocationActive}
        />
      )}
      {locations?.map((location) => (
        <Location
          key={location.id}
          id={location.id}
          locationName={location.name ?? ""}
          clientAddress={location.address ?? ""}
          client_id={location.client_id ?? 0}
          deleteLocationActive={deleteLocationActive}
          setDeleteLocationActive={setDeleteLocationActive}
        />
      ))}
      <section
        className="flex flex-col justify-center items-center relative m-2 p-4 text-black border-[1px] border-solid border-black dark:border-white rounded-md h-[15vh] cursor-pointer"
        onClick={() => setCreateLocationActive(!createLocationActive)}
      >
        <div className="absolute w-[3rem] h-[1px] bg-black dark:bg-white" />
        <div className="absolute w-[1px] h-[3rem] bg-black dark:bg-white" />
      </section>
    </div>
  );
};
