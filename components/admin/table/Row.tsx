type RowProps = {
  name: string;
  role: string;
  type: "Event" | "User";
  verified: boolean;
};

const Row = ({ name, role, type, verified }: RowProps) => {
  return (
    <tr className="border-[1px] border-solid rounded-sm border-black transition-all duration-200 hover:scale-[1.01] cursor-pointer">
      <td className="text-center">{name}</td>
      <td className="text-center">{role}</td>
      <td className="text-center">{type}</td>
      <td className="text-center">{verified ? "true" : "false"}</td>
    </tr>
  );
};

export default Row;
