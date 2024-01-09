import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import UserSetup from "@/components/pop-ups/User-Setup";
import EventList from "@/components/cards/EventList";

const Dashboard = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data } = await supabase
    .from("User")
    .select("id")
    .match({ user_id: user.id });

  return data?.length !== 0 ? (
    <div className="w-full h-screen bg-[#EDEDED]">
      <EventList />
    </div>
  ) : (
    <div className="w-full h-full bg-white">
      <UserSetup />
    </div>
  );
};

export default Dashboard;
