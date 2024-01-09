import { useRouter, usePathname } from "next/navigation";
import TD from "../../tableDataCell/Td";

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
      className="h-[3rem] border-[1px] border-solid rounded-sm border-black dark:border-white transition-all duration-300 hover:scale-[1.02] hover:p-4 cursor-pointer"
      onClick={() => router.push(pathname + `/${id}`)}
    >
      <TD type="default" text={client} />
      <TD type="default" text={location} />
      <TD type="default" text={address} />
      <TD type="default" text={date} />
      <TD type="default" text={product_name} />
      <TD
        type="boolean"
        boolean={verified ?? false}
        text={verified ? "yes" : "no"}
      />
    </tr>
  );
};
