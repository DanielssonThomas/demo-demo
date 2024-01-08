import React from "react";

const EventListItem = ({
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
  client: string | null;
  location: string | null;
  supplier: string | null;
  date: string | null;
  startTime: string | null;
  endTime: string | null;
  demonstrator: string | null;
  onClick: React.MouseEventHandler<HTMLTableRowElement>;
}) => {
  return (
    <tr className={`${className}`} onClick={onClick} id={id}>
      <th>{client}</th>
      <th>{location}</th>
      <th>{date}</th>
      <th>{`${startTime} - ${endTime}`}</th>
      <th>{demonstrator}</th>
    </tr>
  );
};

export default EventListItem;
