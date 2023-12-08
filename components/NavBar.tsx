import Link from "next/link";
import LogOutButton from "./buttons/logoutButton";

const NavBar = () => {
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
