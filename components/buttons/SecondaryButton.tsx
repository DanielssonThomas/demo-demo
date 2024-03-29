const SecondaryButton = ({
  className,
  buttonText,
  onClick,
  type,
}: {
  className?: string;
  buttonText: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type: "default" | "green" | "red" | "blue";
}) => {
  return (
    <button
      className={`${
        type === "default" ? "bg-dark-bg dark:bg-light-bg text-white dark:text-black" : ""
      } ${type === "green" ? "bg-btn-green text-white" : ""} ${
        type === "red" ? "bg-btn-red text-white" : ""
      } ${
        type === "blue" ? "bg-btn-blue text-white" : ""
      } px-4 py-2 border-[0.5px] border-solid border-black dark:border-white rounded-md inline-block ${className}`}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

export default SecondaryButton;
