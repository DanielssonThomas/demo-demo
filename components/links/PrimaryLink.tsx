import Link from "next/link";

const PrimaryLink = ({
  className,
  linkText,
  href,
}: {
  className?: string;
  linkText: string;
  href: string;
}) => {
  return (
    <Link className={`text-white ${className}`} href={href}>
      <div className="bg-indigo-500 px-4 py-2 rounded-full inline-block shadow-md">
        <p>{linkText}</p>
      </div>
    </Link>
  );
};

export default PrimaryLink;
