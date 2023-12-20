import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type DeleteLocation = {
  id: number;
  setDeleteLocationActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DeleteLocation = ({
  id,
  setDeleteLocationActive,
}: DeleteLocation) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const deleteLocation = async (id: number) => {
    const data = await fetch("/api/post/delete-location", {
      method: "POST",
      body: JSON.stringify({ id: id }),
    });
    const res = await data.json();
    setDeleteLocationActive(false);
    if (res.error !== null) setErrorMessage(res.error);
  };

  return (
    <div className="absolute">
      <div
        className="fixed w-[100vw] h-[100vh] top-0 left-0 bg-white opacity-50 z-20"
        onClick={() => setDeleteLocationActive(false)}
      />
      <section className="fixed top-[37.5vh] right-[37.5vw] left-[37.5vw] bottom-0 w-1/4 h-1/4 border-[1px] border-solid border-black rounded-md bg-[#EDEDED] text-black p-4 z-40">
        <div className="flex flex-col justify-center items-center gap-8">
          <h2 className="text-2xl">Delete location?</h2>
          <i>This will remove location permanentaly</i>
          <button
            onClick={(e: any) => {
              e.preventDefault();
              deleteLocation(id);
            }}
            className="bg-[#dbdbdb] border-[1px] border-black border-solid rounded-md px-4 py-2"
          >
            DELETE
          </button>
          {errorMessage === null ? (
            <></>
          ) : (
            <p className="text-red-500 text-center">Error on delete</p>
          )}
        </div>
      </section>
    </div>
  );
};