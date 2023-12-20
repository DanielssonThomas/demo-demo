const ClientEventCard = ({
  classname,
  client,
  location,
  address,
  product,
  date,
  time,
}: {
  classname?: string | null;
  client: string | null;
  location: string | null;
  address: string | null;
  product: string | null;
  date: string | null;
  time: string | null;
}) => {
  return (
    <tr>
      <th>{client}</th>
      <th>{location}</th>
      <th>{address}</th>
      <th>{product}</th>
      <th>{date}</th>
      <th>{time}</th>
      <td>
        <button>Edit Event</button>
      </td>
    </tr>
  );
};

export default ClientEventCard;
