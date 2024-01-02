const SignupButton = ({
  className,
  onClick,
}: {
  className?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return <button onClick={onClick}>Sign up for event</button>;
};

export default SignupButton;
