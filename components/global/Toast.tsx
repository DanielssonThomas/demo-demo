"use client";
import { useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Toast = () => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const [trigger, setTrigger] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const getStatus = () => {
    const errorString = searchParams.get("e");

    if (errorString !== null) {
      const error = errorString === "true" ? true : false;
      setIsError(error);
      setTrigger(true);
      setTimeout(() => {
        setTrigger(false);
        router.replace(`${pathName}`, undefined);
      }, 3000);
    }
  };

  useEffect(() => {
    getStatus();
  }, [searchParams]);

  return (
    <div className="fixed">
      <div
        className={`fixed transition-all duration-300 ${
          trigger ? "top-4" : "-top-[5vh]"
        } ${
          isError ? "bg-red-500" : "bg-green-500"
        } h-[5vh] w-[20vw] rounded-md left-[40vw]`}
      >
        <h2 className="flex flex-col justify-center items-center h-[5vh]">
          {isError ? "Error" : "Success"}
        </h2>
        <p
          className="absolute flex justify-center items-center top-1 right-1 rounded-full p-2 cursor-pointer w-[8px] h-[8px] text-[15px] text-white"
          onClick={() => setTrigger(!trigger)}
        >
          X
        </p>
      </div>
    </div>
  );
};

export default Toast;
