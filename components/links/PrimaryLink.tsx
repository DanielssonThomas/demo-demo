import Link from "next/link";

const PrimaryLink = ({
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
          type === "default"
            ? "bg-light-bg dark:bg-dark-bg text-black dark:text-white"
            : ""
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

export default PrimaryLink;
