import PrimaryLink from "./links/PrimaryLink";
import PrimaryButton from "./buttons/PrimaryButton";
import SetTheme from "./SetTheme";
import LogOutButton from "./buttons/LogoutButton";

type NavMenuProps = {
  userRole: string;
  showBurger: boolean;
  setShowBurger: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavMenu = ({ userRole, showBurger, setShowBurger }: NavMenuProps) => {
  return (
    <section className="px-6 py-4 flex flex-col gap-6 align-center border-solid border-black dark:border-white border-b-[0.1px]">
      <PrimaryLink type="default" href={"/dashboard"} linkText="Home" />
      {userRole == "client" && (
        <PrimaryLink
          type="default"
          href={"/client/create-event"}
          linkText="Create event"
        />
      )}
      {userRole == "demonstrator" ||
        (userRole == "admin" && (
          <PrimaryLink
            type="default"
            href={"/demonstrator/events"}
            linkText="My events"
          />
        ))}
      {userRole == "admin" && (
        <PrimaryLink type="default" href={"/admin"} linkText="Admin page" />
      )}
      <form action={SetTheme}>
        <PrimaryButton type="default" buttonText="Switch theme" />
      </form>
      <LogOutButton className={"ml-auto"} />
    </section>
  );
};

export default NavMenu;
