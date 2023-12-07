import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import UserSetup from "@/components/pop-ups/User-Setup";

const Dashboard = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/");

  const { data } = await supabase
    .from("User")
    .select("id")
    .match({ user_id: user.id });
  console.log("data: ", data);

  return data?.length !== 0 ? (
    <>
      <h1>This is the home page</h1>
    </>
  ) : (
    <div className="w-full h-full bg-white">
      <UserSetup />
    </div>
  );
};

export default Dashboard;
