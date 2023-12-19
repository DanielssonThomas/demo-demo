const EventCard = ({
  classname,
  client,
  location,
  date,
  time,
}: {
  classname?: string | null;
  client: string | null;
  location: string | null;
  address: string | null;
  date: string | null;
  time: string | null;
}) => {
  return (
    <div>
      <p>{client}</p>
      <p>{location}</p>
      <p>{date}</p>
      <p>{time}</p>
    </div>
  );
};

export default EventCard;
