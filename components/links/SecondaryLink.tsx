import Link from "next/link";

const SecondaryLink = ({
  className,
  linkText,
  href,
  type,
}: {
  className?: string;
  linkText: string;
  href: string;
  type: "default" | "green" | "red" | "blue";
}) => {
  return (
    <Link className={`${className}`} href={href}>
      <div
        className={`${
          type === "default" ? "bg-dark-bg dark:bg-light-bg text-white dark:text-black" : ""
        } ${type === "green" ? "bg-btn-green text-white" : ""} ${
          type === "red" ? "bg-btn-red text-white" : ""
        } ${
          type === "blue" ? "bg-btn-blue text-white" : ""
        }} px-4 py-2 border-[0.5px] border-solid border-black dark:border-white rounded-md inline-block`}
      >
        <p>{linkText}</p>
      </div>
    </Link>
  );
};

export default SecondaryLink;
