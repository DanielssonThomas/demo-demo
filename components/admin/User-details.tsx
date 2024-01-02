import { useRouter } from "next/navigation";

type UserDetailsProps = {
  id: number | null | undefined;
  name: string;
  role: string;
  verified: boolean | null | undefined;
};

const UserDetails = ({ id, name, role, verified }: UserDetailsProps) => {
  const router = useRouter();
  const verifyUser = async () => {
    const data = await fetch("/api/post/verify-user", {
      method: "POST",
      body: JSON.stringify({ id: id }),
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
      <div className="fixed top-[37.5vh] right-[37.5vw] left-[37.5vw] bottom-0 w-1/4 h-1/4 border-solid border-black rounded-md bg-[#EDEDED] text-black p-4 z-40">
        <section className="flex flex-col justify-center items-center w-full gap-2">
          <h2 className="text-xl underline">USER</h2>
          <div className="flex gap-4">
            <h3 className="font-bold">Username:</h3>
            <p>{name}</p>
          </div>
          <div className="flex gap-4">
            <h3 className="font-bold">Role:</h3>
            <p>{role}</p>
          </div>
          <button className="hover:underline" onClick={verifyUser}>
            Verify user
          </button>
        </section>
      </div>
    </div>
  );
};

export default UserDetails;
