import Link from "next/link";

const SecondaryLink = ({
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
      <div className="bg-red-500 px-4 py-2 border-2 border-solid border-gray-200 rounded-full inline-block">
        <p>{linkText}</p>
      </div>
    </Link>
  );
};

export default SecondaryLink;
