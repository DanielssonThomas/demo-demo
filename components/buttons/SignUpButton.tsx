import PrimaryButton from "./PrimaryButton";

const SignupButton = ({
  className,
  onClick,
}: {
  className?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <PrimaryButton
      type="green"
      className={className}
      buttonText="Sign up for event"
      onClick={onClick}
    />
  );
};

export default SignupButton;
