const PrimaryButton = ({
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
      className={`bg-indigo-500 px-4 py-2 rounded-full text-white ${className}`}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

export default PrimaryButton;
