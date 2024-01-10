import PrimaryButton from "./PrimaryButton";

const UnregisterButton = ({
  className,
  onClick,
}: {
  className?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <PrimaryButton
      type="red"
      className={className}
      buttonText="Unregister from event"
      onClick={onClick}
    />
  );
};

export default UnregisterButton;
