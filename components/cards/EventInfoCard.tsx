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
      <p>{client}</p>
      <p>{location}</p>
      <p>{address}</p>
      <p>{date}</p>
      <p>{startTime}</p>
      <p>{endTime}</p>
      <p>{demonstrator}</p>
      <p>{product}</p>
      <p>{suplier}</p>
      <p>{productStock}</p>
      <p>{unitsUsed}</p>
    </div>
  );
};

export default EventInfoCard;
