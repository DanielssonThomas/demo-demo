import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

const LogOutButton = () => {
  const signOut = async () => {
    "use server";
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return (
    <form action={signOut}>
      <button>Logout</button>
    </form>
  );
};

export default LogOutButton;
