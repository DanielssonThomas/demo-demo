import { useRouter, usePathname } from "next/navigation";
import { UserRow } from "./versions/User";
import { EventRow } from "./versions/Event";

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

type RowProps = EventRowProps | UserRowProps;

const Row = (RowData: RowProps) => {
  if (RowData.type === "User") {
    return (
      <UserRow
        id={RowData.id}
        name={RowData.name}
        role={RowData.role}
        verified={RowData.verified}
      />
    );
  }

  if (RowData.type === "Event") {
    return (
      <EventRow
        id={RowData.id}
        client={RowData.client}
        date={RowData.date}
        address={RowData.address}
        location={RowData.location}
        product_name={RowData.product_name}
        verified={RowData.verified}
      />
    );
  }
};

export default Row;
