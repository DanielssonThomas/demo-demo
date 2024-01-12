const DemonstratorEventInfoCard = ({
  className,
  client,
  location,
  address,
  date,
  startTime,
  endTime,
  demonstrator,
  product,
  suplier,
}: {
  className?: string | null;
  client: string | null;
  location: string | null;
  address: string | null;
  date: string | null;
  startTime: string | null;
  endTime: string | null;
  demonstrator: string | null;
  product: string | null;
  suplier: string | null;
}) => {
  return <div className={`p-6 ${className}`}>Hello</div>;
};

export default DemonstratorEventInfoCard;
