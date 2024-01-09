const SecondaryButton = ({
  className,
  buttonText,
  onClick,
}: {
  className?: string;
  buttonText: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      className={`bg-red-500 px-4 py-2 rounded-full text-white shadow-md ${className}`}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

export default SecondaryButton;
