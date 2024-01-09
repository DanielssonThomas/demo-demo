import { useState, useEffect } from "react";
import Row from "../../row/Row";

type EventsTableProps = {
  events: TableClientEvent[] | null;
  showVerified: boolean | null;
  sortBy: "oldest" | "latest";
};

export const EventsTable = ({
  events,
  showVerified,
  sortBy,
}: EventsTableProps) => {
  const [sortedEvents, setSortedEvents] = useState<TableClientEvent[] | null>(
    null
  );

  useEffect(() => {
    if (events !== null) {
      const sorted = [...events];
      sorted.sort((a, b) => {
        const dateA = a.date ? new Date(a.date) : new Date(0);
        const dateB = b.date ? new Date(b.date) : new Date(0);

        if (sortBy === "latest") {
          return dateB.getTime() - dateA.getTime();
        } else if (sortBy === "oldest") {
          return dateA.getTime() - dateB.getTime();
        }

        return 0;
      });

      setSortedEvents(sorted);
    }
  }, [events, sortBy]);

  const renderEvents =
    showVerified !== null
      ? sortedEvents
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
      : sortedEvents?.map((event) => (
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
    <table className="w-full text-black dark:text-light-text">
      <thead>
        <tr>
          <th>Client</th>
          <th>Location</th>
          <th>Address</th>
          <th>Date</th>
          <th>Product Name</th>
          <th>verified</th>
        </tr>
      </thead>
      <tbody>{renderEvents}</tbody>
    </table>
  );
};
