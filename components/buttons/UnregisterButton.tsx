import PrimaryButton from "./PrimaryButton";

const UnregisterButton = ({
  className,
  onClick,
}: {
  className?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <PrimaryButton className={className} buttonText="Unregister from event" onClick={onClick} />
  );
};

export default UnregisterButton;
