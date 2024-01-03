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
      className={`bg-blue-500 px-4 py-2 border-2 border-solid border-gray-200 rounded-full ${className}`}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

export default PrimaryButton;
