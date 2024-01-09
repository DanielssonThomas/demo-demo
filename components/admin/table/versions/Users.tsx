import Row from "../../row/Row";

type UsersTableProps = {
  Users: User[] | null;
  showVerified: boolean | null;
};

export const UsersTable = ({ Users, showVerified }: UsersTableProps) => {
  const renderUsers =
    showVerified !== null
      ? Users?.filter((user) => user.verified === showVerified).map((user) => (
          <Row
            name={user.name ?? "-"}
            role={user.role ?? "-"}
            type="User"
            verified={user.verified ? user.verified : false}
            id={user.id}
          />
        ))
      : Users?.map((user) => (
          <Row
            name={user.name ?? "-"}
            role={user.role ?? "-"}
            type="User"
            verified={user.verified ? user.verified : false}
            id={user.id}
          />
        ));

  return (
    <table className="w-full text-black dark:text-white">
      <tr>
        <th>Name</th>
        <th>Role</th>
        <th>Verified</th>
      </tr>
      {renderUsers}
    </table>
  );
};
