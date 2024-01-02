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
  productStock,
  unitsUsed,
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
  productStock: number | null;
  unitsUsed: number | null;
}) => {
  return (
    <div className={`${className}`}>
      <p>Client: {client}</p>
      <p>Location: {location}</p>
      <p>Address: {address}</p>
      <p>Date: {date}</p>
      <p>Starts: {startTime}</p>
      <p>Ends: {endTime}</p>
      <p>Demonstrator: {demonstrator}</p>
      <p>Product: {product}</p>
      <p>Supplier: {suplier}</p>
      <p>Stock: {productStock}</p>
      <p>Units used: {unitsUsed}</p>
    </div>
  );
};

export default EventInfoCard;
