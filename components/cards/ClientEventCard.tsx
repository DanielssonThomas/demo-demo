const ClientEventCard = ({
  className,
  client,
  location,
  address,
  date,
  startTime,
  endTime,
  demonstrator,
}: {
  className?: string | null;
  client: string | null;
  location: string | null;
  address: string | null;
  supplier: string | null;
  date: string | null;
  startTime: string | null;
  endTime: string | null;
  demonstrator: string | null;
}) => {
  return (
    <tr className={`${className}`}>
      <th>{client}</th>
      <th>{location}</th>
      <th>{address}</th>
      <th>{date}</th>
      <th>{`${startTime} - ${endTime}`}</th>
      <th>{demonstrator}</th>
    </tr>
  );
};

export default ClientEventCard;
