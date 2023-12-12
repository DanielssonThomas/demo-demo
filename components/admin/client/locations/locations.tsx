import { useEffect, useState } from "react";
import { Location } from "./location";

export const Locations = ({ id }: { id: number }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [locations, setLocations] = useState<DBLocation[] | null>(null);

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
  }, []);

  if (loading && locations === null) {
    return (
      <div className="flex flex-col justiy-center items-center w-full h-[100vh]">
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
    <div className="w-[25vw] border-x-[1px] border-solid border-black">
      {locations?.map((location) => (
        <Location
          clientName={location.client_name ?? ""}
          clientAddress={location.address ?? ""}
          client_id={location.client_id ?? 0}
        />
      ))}
    </div>
  );
};
