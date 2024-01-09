"use client";
import Controller from "@/components/admin/controller";
import LoadingAnim from "@/components/global/LoadingAnim";
import UserDetails from "@/components/admin/User-details";
import { useEffect, useState } from "react";

const Users = ({ params: { slug } }: { params: { slug: string[] } }) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [users, setUsers] = useState<User[] | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const getUsers = async () => {
    const data = await fetch("/api/get/users", {
      method: "GET",
    });
    const res = await data.json();

    setUsers(res.data);
  };

  const getUser = async () => {
    if (users === null) await getUsers();

    if (slug !== undefined && slug[0] !== null) {
      const parsedUserId = parseInt(slug[0]);
      setUserId(parsedUserId);
    }
  };

  useEffect(() => {
    getUser();
  }, [slug, users]);

  useEffect(() => {
    if (userId !== null && users !== null) {
      const foundUser = users.find(({ id }) => id === userId);
      setUser(foundUser ?? null);
    }
  }, [userId, users]);

  if (users === null) {
    return (
      <div className="w-screen h-screen">
        <LoadingAnim />
      </div>
    );
  }

  return (
    <section className="mt-6 w-full min-h-screen bg-light-bg dark:bg-dark-bg">
      <Controller type="users" data={users} />
      {user !== null ? (
        <UserDetails
          id={user?.id}
          name={user?.name ?? "-"}
          role={user?.role ?? "-"}
          verified={user?.verified}
        />
      ) : (
        <></>
      )}
    </section>
  );
};

export default Users;
