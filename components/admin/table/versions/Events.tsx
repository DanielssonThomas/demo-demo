import Row from "../../row/Row";

type EventsTableProps = {
  events: TableClientEvent[] | null;
  showVerified: boolean | null;
};

export const EventsTable = ({ events, showVerified }: EventsTableProps) => {
  const renderEvents =
    showVerified !== null
      ? events
          ?.filter((event) => event.verified === showVerified)
          .map((event) => (
            <Row
              type="Event"
              client={event.client ?? "-"}
              location={event.Location?.name ?? "-"}
              address={event.Location?.address ?? "-"}
              date={event.date ?? "-"}
              product_name={event.product_name ?? "-"}
              verified={event.verified ?? false}
              id={event.id}
            />
          ))
      : events?.map((event) => (
          <Row
            type="Event"
            client={event.client ?? "-"}
            location={event.Location?.name ?? "-"}
            address={event.Location?.address ?? "-"}
            date={event.date ?? "-"}
            product_name={event.product_name ?? "-"}
            verified={event.verified ?? false}
            id={event.id}
          />
        ));

  return (
    <table className="w-full text-black">
      <tr>
        <th>Client</th>
        <th>Location</th>
        <th>Address</th>
        <th>Date</th>
        <th>Product Name</th>
        <th>verified</th>
      </tr>
      {renderEvents}
    </table>
  );
};
