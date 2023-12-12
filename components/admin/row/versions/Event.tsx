import { useRouter, usePathname } from "next/navigation";

type EventRowProps = {
  id: number;
  client: string;
  location: string;
  address: string;
  date: string;
  product_name: string;
  verified: boolean | null;
};

export const EventRow = ({
  id,
  client,
  location,
  address,
  date,
  product_name,
  verified,
}: EventRowProps) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <tr
      className="h-[3rem] border-[1px] border-solid rounded-sm border-black transition-all duration-300 hover:scale-[1.02] hover:p-4 cursor-pointer"
      onClick={() =>
        router.push(pathname + "?" + "type=event" + "&" + `id=${id}`)
      }
    >
      <td className="text-center">{client}</td>
      <td className="text-center">{location}</td>
      <td className="text-center">{address}</td>
      <td className="text-center">{date}</td>
      <td className="text-center">{product_name}</td>
      <td className="text-center">{verified ? "true" : "false"}</td>
    </tr>
  );
};
