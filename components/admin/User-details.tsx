import { useRouter } from "next/navigation";
import Link from "next/link";

type UserDetailsProps = {
  id: number | null | undefined;
  name: string;
  role: string;
  verified: boolean | null | undefined;
};

const UserDetails = ({ id, name, role, verified }: UserDetailsProps) => {
  console.log("name, verified :>> ", name, verified);
  const router = useRouter();
  const verifyUser = async () => {
    const data = await fetch("/api/post/set-user-verification", {
      method: "POST",
      body: JSON.stringify({ id: id, verified: !verified }),
    });
    const res = await data.json();
    console.log(res);
    router.back();
  };
  return (
    <div className="absolute">
      <div
        className="fixed w-[100vw] h-[100vh] top-0 left-0 bg-white opacity-50 z-20"
        onClick={() => router.back()}
      />
      <div className="fixed top-[37.5vh] right-[37.5vw] left-[37.5vw] bottom-0 w-1/4 h-1/4 rounded-md bg-[#EDEDED] text-black p-4 z-40 border-[1px] border-solid border-black">
        <section className="flex flex-col justify-center items-center w-full gap-2">
          <h2 className="text-xl underline">USER</h2>
          <div>
            <div className="flex gap-2">
              <h3 className="font-bold">Username:</h3>
              <p>{name}</p>
            </div>
            <div className="flex gap-2">
              <h3 className="font-bold">Role:</h3>
              <p>{role}</p>
            </div>
          </div>
        </section>
        {role === "client" && (
          <Link
            href={`/admin/client/${id}`}
            className="absolute left-4 bottom-4 hover:underline"
          >
            Client page
          </Link>
        )}

        <button
          className="absolute right-4 bottom-4 hover:underline"
          onClick={verifyUser}
        >
          {verified ? "unverify" : "verify"} user
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
