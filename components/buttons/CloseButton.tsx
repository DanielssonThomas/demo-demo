import PrimaryButton from "./PrimaryButton";

const CloseButton = ({
  className,
  onClick,
}: {
  className?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return <PrimaryButton className={className} buttonText="Close" onClick={onClick} />;
};

export default CloseButton;
