import Row from "./Row";

type TableProps = {
  Events: ClientEvent[] | null;
  Users: User[] | null;
  show: "all" | "users" | "events";
  showVerified: boolean | null;
};

export const Table = ({ Events, Users, show, showVerified }: TableProps) => {
  const renderEvents = Events?.map((event) => (
    <Row
      name={event.client ?? ""}
      role="client"
      type="Event"
      verified={event.verified ?? false}
    />
  ));

  const renderUsers = Users?.map((user) => (
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
        <th>name</th>
        <th>role</th>
        <th>type</th>
        <th>verified</th>
      </tr>
      {show === "all" || show === "events" ? renderEvents : <></>}
      {show === "all" || show === "users" ? renderUsers : <></>}
    </table>
  );
};
