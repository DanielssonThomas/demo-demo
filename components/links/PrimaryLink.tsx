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
    <Link className={`${className}`} href={href}>
      <div className="bg-red-400 px-4 py-2 border-2 border-solid border-gray-200 rounded-full inline-block">
        <p>{linkText}</p>
      </div>
    </Link>
  );
};

export default PrimaryLink;
