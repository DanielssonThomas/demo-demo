import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type CreateLocation = {
  client_id: number;
  setPopUpActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CreateLocation = ({
  client_id,
  setPopUpActive,
}: CreateLocation) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const createLocation = async (e: FormData) => {
    const data = await fetch("/api/post/create-location", {
      method: "POST",
      body: e,
    });
    const res = await data.json();
    setPopUpActive(false);
    if (res.error === null) router.refresh();
    setErrorMessage(res.message);
  };

  return (
    <div className="absolute">
      <div
        className="fixed w-[100vw] h-[100vh] top-0 left-0 bg-white opacity-50 z-20"
        onClick={() => setPopUpActive(false)}
      />
      <section className="fixed top-[33.5vh] right-[37.5vw] left-[37.5vw] bottom-0 w-1/4 h-1/3 border-[1px] border-solid border-black rounded-md bg-[#EDEDED] text-black p-4 z-40">
        <div className="flex flex-col justify-center items-center gap-4">
          <h2 className="text-2xl">Create location for client</h2>
          <form
            action={createLocation}
            className="flex flex-col w-full items-center gap-4"
          >
            <div>
              <input type="hidden" name="client_id" value={client_id} />
              <h3>Name:</h3>
              <input
                type="text"
                name="name"
                className="px-2 py-1 border-[1px] border-solid border-black rounded-sm bg-[#EDEDED]"
                required
              />
            </div>
            <div>
              <h3>Address:</h3>
              <input
                type="text"
                name="address"
                className="px-2 py-1 border-[1px] border-solid border-black rounded-sm bg-[#EDEDED]"
                required
              />
            </div>
            <button className="bg-[#dbdbdb] border-[1px] border-black border-solid rounded-md px-4 py-2">
              Create location
            </button>
          </form>
        </div>
        {errorMessage === null ? (
          <></>
        ) : (
          <p className="text-red-500 text-center absolute -bottom-8 w-[10vw] left-[7vw]">
            Error on upload: {errorMessage}
          </p>
        )}
      </section>
    </div>
  );
};
