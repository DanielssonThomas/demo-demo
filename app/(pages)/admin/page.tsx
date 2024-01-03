"use client";

import Link from "next/link";

const Admin = () => {
  return (
    <div className="w-full h-screen bg-[#170a0a]">
      <section className="flex flex-col justify-center items-center w-screen h-[60vh]">
        <div className="w-[25vw] h-[25vh] bg-[#EDEDED] text-black text-center">
          <h2 className="text-2xl">Select view:</h2>
          <div className="flex flex-col">
            <Link href={"/admin/events"}>Events</Link>
            <Link href={"/admin/users"}>Users</Link>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Admin;
