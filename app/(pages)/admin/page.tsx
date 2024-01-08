"use client";

import Link from "next/link";
import PrimaryLink from "@/components/links/PrimaryLink";

const Admin = () => {
  return (
    <div className="w-full h-screen bg-light-bg dark:bg-dark-bg">
      <section className="flex flex-col justify-center items-center w-screen h-[60vh]">
        <div className="w-[25vw] h-[25vh] text-black dark:text-white text-center">
          <h2 className="text-2xl">Select view:</h2>
          <div className="flex justify-around items-center h-full text-white">
            <PrimaryLink type="blue" href="/admin/events" linkText="Events" />
            <PrimaryLink type="blue" href="/admin/users" linkText="Users" />
          </div>
        </div>
      </section>
    </div>
  );
};
export default Admin;
