import Link from "next/link";

const NavBar = () => {
  return (
    <nav>
      <h1>This is the nav bar</h1>
      <Link href={"/dashboard"}>
        <p>Home</p>
      </Link>
    </nav>
  );
};

export default NavBar;
