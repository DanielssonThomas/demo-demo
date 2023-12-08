import Row from "./Row";

type EventTableProps = {
  show: "events";
  Events: TableClientEvent[] | null;
  showVerified: boolean | null;
};

type UserTableProps = {
  show: "users";
  Users: User[] | null;
  showVerified: boolean | null;
};

type TableProps = EventTableProps | UserTableProps;

export const Table = (TableProps: TableProps) => {
  if (TableProps.show === "events") {
    const Events = TableProps.Events;
    const renderEvents =
      TableProps.showVerified !== null
        ? Events?.filter(
            (event) => event.verified === TableProps.showVerified
          ).map((event) => (
            <Row
              type="Event"
              client={event.client ?? "-"}
              location={event.Location?.name ?? "-"}
              address={event.Location?.address ?? "-"}
              date={event.date ?? "-"}
              product_name={event.product_name ?? "-"}
              verified={event.verified ?? false}
            />
          ))
        : Events?.map((event) => (
            <Row
              type="Event"
              client={event.client ?? "-"}
              location={event.Location?.name ?? "-"}
              address={event.Location?.address ?? "-"}
              date={event.date ?? "-"}
              product_name={event.product_name ?? "-"}
              verified={event.verified ?? false}
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
  }
  const Users = TableProps.Users;
  const renderUsers =
    TableProps.showVerified !== null
      ? Users?.filter((user) => user.verified === TableProps.showVerified).map(
          (user) => (
            <Row
              name={user.name ?? "-"}
              role={user.role ?? "-"}
              type="User"
              verified={user.verified ? user.verified : false}
            />
          )
        )
      : Users?.map((user) => (
          <Row
            name={user.name ?? "-"}
            role={user.role ?? "-"}
            type="User"
            verified={user.verified ? user.verified : false}
          />
        ));

  return (
    <table className="w-full text-black">
      <tr>
        <th>Name</th>
        <th>Role</th>
        <th>Verified</th>
      </tr>
      {renderUsers}
    </table>
  );
};
