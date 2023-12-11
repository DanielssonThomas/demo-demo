import Link from "next/link";
import LogOutButton from "./buttons/LogoutButton";
import {createClient} from "@/utils/supabase/server";
import {cookies} from "next/headers";

const NavBar = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const session = (await supabase.auth.getSession()).data.session;

  if (!session) {
    return <p>No session</p>;
  }

  console.log(session.user.id);

  return (
    <nav>
      <h1>This is the nav bar</h1>
      <Link href={"/dashboard"}>
        <p>Home</p>
      </Link>
      <Link href={"/client/create-event"}>
        <p>Create event</p>
      </Link>
      <Link href={"/admin"}>
        <p>Admin page</p>
      </Link>
      <LogOutButton />
    </nav>
  );
};

export default NavBar;
