const DemonstratorEventCard = ({
  classname,
  client,
  location,
  address,
  product,
  date,
  time,
  active,
}: {
  classname?: string | null;
  client: string | null;
  location: string | null;
  address: string | null;
  product: string | null;
  date: string | null;
  time: string | null;
  active: boolean | null;
}) => {
  return (
    <tr>
      <th>{client}</th>
      <th>{location}</th>
      <th>{address}</th>
      <th>{product}</th>
      <th>{date}</th>
      <th>{time}</th>
      {active == null && (
        <td>
          <button>Signup for event</button>
        </td>
      )}
    </tr>
  );
};

export default DemonstratorEventCard;
