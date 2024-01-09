import SecondaryButton from "./SecondaryButton";

const CloseButton = ({
  className,
  onClick,
}: {
  className?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return <SecondaryButton className={className} buttonText="Close" onClick={onClick} />;

};

export default CloseButton;
