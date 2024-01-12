import React from "react";
import TD from "../admin/tableDataCell/Td";

const DemonstratorEventListItem = ({
  className,
  id,
  client,
  location,
  date,
  startTime,
  endTime,
  demonstrator,
  onClick,
}: {
  className?: string | null;
  id: string;
  client: string;
  location: string;
  supplier: string | null;
  date: string;
  startTime: string | null;
  endTime: string | null;
  demonstrator: boolean | null;
  onClick: React.MouseEventHandler<HTMLTableRowElement>;
}) => {
  return (
    <tr
      className={`h-[3rem] border-[1px] border-solid rounded-sm border-black dark:border-white transition-all duration-300 hover:scale-[1.02] hover:p-4 cursor-pointer ${className}`}
      onClick={onClick}
      id={id}
    >
      <TD type="default" text={client} />
      <TD type="default" text={location} />
      <TD type="default" text={date} />
      <TD type="default" text={`${startTime} - ${endTime}`} />
      {/* <TD type="default" text={`${demonstrator}`} /> */}
      {/* <TD type="boolean" boolean={demonstrator ?? false} text={demonstrator ? "yes" : "no"} /> */}
    </tr>
  );
};

export default DemonstratorEventListItem;
