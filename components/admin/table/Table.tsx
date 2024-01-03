import { EventsTable } from "./versions/Events";
import { UsersTable } from "./versions/Users";

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
    return (
      <EventsTable
        events={TableProps.Events}
        showVerified={TableProps.showVerified}
        sortBy="latest"
      />
    );
  }

  if (TableProps.show === "users") {
    return (
      <UsersTable
        Users={TableProps.Users}
        showVerified={TableProps.showVerified}
      />
    );
  }
};
