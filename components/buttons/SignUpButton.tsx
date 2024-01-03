import PrimaryButton from "./PrimaryButton";

const SignupButton = ({
  className,
  onClick,
}: {
  className?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  // return <button onClick={onClick}>Sign up for event</button>;
  return <PrimaryButton className="" buttonText="Sign up for event" onClick={onClick} />;
};

export default SignupButton;
