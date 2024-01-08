const EventInfoCard = ({
  className,
  client,
  location,
  address,
  date,
  startTime,
  endTime,
  demonstrator,
  product,
  suplier,
}: {
  className?: string | null;
  client: string | null;
  location: string | null;
  address: string | null;
  date: string | null;
  startTime: string | null;
  endTime: string | null;
  demonstrator: string | null;
  product: string | null;
  suplier: string | null;
}) => {
  return (
    <div className={`p-6 ${className}`}>
      <p>
        <b>Client:</b> {client}
      </p>
      <p>
        <b>Location:</b> {location}
      </p>
      <p>
        <b>Address:</b> {address}
      </p>
      <p>
        <b>Date:</b> {date}
      </p>
      <p>
        <b>Starts:</b> {startTime}
      </p>
      <p>
        <b>Ends:</b> {endTime}
      </p>
      <p>
        <b>Demonstrator:</b> {demonstrator}
      </p>
      <p>
        <b>Product:</b> {product}
      </p>
      <p>
        <b>Supplier:</b> {suplier}
      </p>
    </div>
  );
};

export default EventInfoCard;
