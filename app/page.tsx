import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import {createClient} from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/SignUpUserSteps";
import Header from "@/components/Header";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export default async function Index() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: {session},
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}
