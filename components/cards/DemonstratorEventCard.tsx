const DemonstratorEventCard = ({
  className,
  client,
  location,
  address,
  date,
  startTime,
  endTime,
}: {
  className?: string | null;
  client: string | null;
  location: string | null;
  address: string | null;
  date: string | null;
  startTime: string | null;
  endTime: string | null;
  active: boolean | null;
}) => {
  return (
    <tr className={`${className}`}>
      <th>{client}</th>
      <th>{location}</th>
      <th>{address}</th>
      <th>{date}</th>
      <th>{`${startTime} - ${endTime}`}</th>
    </tr>
  );
};

export default DemonstratorEventCard;
