import { useRouter, usePathname } from "next/navigation";

type RowProps = EventRowProps | UserRowProps;

type EventRowProps = {
  type: "Event";
  client: string;
  location: string;
  address: string;
  date: string;
  product_name: string;
  verified: boolean;
  id: number;
};

type UserRowProps = {
  type: "User";
  name: string;
  role: string;
  verified: boolean;
  id: number;
};

const Row = (RowData: RowProps) => {
  const router = useRouter();
  const pathname = usePathname();
  return RowData.type === "User" ? (
    <tr
      className="h-[3rem] border-[1px] border-solid rounded-sm border-black transition-all duration-300 hover:scale-[1.02] hover:p-4 
    cursor-pointer"
      onClick={() =>
        router.push(pathname + "?" + "type=user" + "&" + `id=${RowData.id}`)
      }
    >
      <td className="text-center">{RowData.name}</td>
      <td className="text-center">{RowData.role}</td>
      <td className="text-center">{RowData.verified ? "true" : "false"}</td>
    </tr>
  ) : (
    <tr
      className="h-[3rem] border-[1px] border-solid rounded-sm border-black transition-all duration-300 hover:scale-[1.02] hover:p-4 cursor-pointer"
      onClick={() =>
        router.push(pathname + "?" + "type=event" + "&" + `id=${RowData.id}`)
      }
    >
      <td className="text-center">{RowData.client}</td>
      <td className="text-center">{RowData.location}</td>
      <td className="text-center">{RowData.address}</td>
      <td className="text-center">{RowData.date}</td>
      <td className="text-center">{RowData.product_name}</td>
      <td className="text-center">{RowData.verified ? "true" : "false"}</td>
    </tr>
  );
};

export default Row;
