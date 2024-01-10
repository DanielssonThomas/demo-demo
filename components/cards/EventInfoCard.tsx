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
      <div>
        <p>Client:</p>
        <p>{client}</p>
      </div>
      <div>
        <p>Location:</p>
        <p>{location}</p>
      </div>
      <div>
        <p>Address:</p>
        <p>{address}</p>
      </div>
      <div>
        <p>Date:</p>
        <p>{date}</p>
      </div>
      <div>
        <p>Starts:</p>
        <p>{startTime}</p>
      </div>
      <div>
        <p>Ends:</p>
        <p>{endTime}</p>
      </div>
      <div>
        <p>Demonstrator:</p>
        <p>{demonstrator}</p>
      </div>
      <div>
        <p>Product:</p>
        <p>{product}</p>
      </div>
      <div>
        <p>Supplier:</p>
        <p>{suplier}</p>
      </div>
    </div>
  );
};

export default EventInfoCard;
