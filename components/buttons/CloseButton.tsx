const CloseButton = ({
  className,
  onClick,
}: {
  className?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return <button onClick={onClick}>Close</button>;
};

export default CloseButton;
