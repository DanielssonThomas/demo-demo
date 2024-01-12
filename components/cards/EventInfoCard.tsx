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
      <div className="flex flex-row align-center gap-6">
        <p>Client:</p>
        <p>{client}</p>
      </div>
      <div className="flex flex-row align-center gap-6">
        <p>Location:</p>
        <p>{location}</p>
      </div>
      <div className="flex flex-row align-center gap-6">
        <p>Address:</p>
        <p>{address}</p>
      </div>
      <div className="flex flex-row align-center gap-6">
        <p>Date:</p>
        <p>{date}</p>
      </div>
      <div className="flex flex-row align-center gap-6">
        <p>Starts:</p>
        <p>{startTime}</p>
      </div>
      <div className="flex flex-row align-center gap-6">
        <p>Ends:</p>
        <p>{endTime}</p>
      </div>
      <div className="flex flex-row align-center gap-6">
        <p>Demonstrator:</p>
        <p>{demonstrator}</p>
      </div>
      <div className="flex flex-row align-center gap-6">
        <p>Product:</p>
        <p>{product}</p>
      </div>
      <div className="flex flex-row align-center gap-6">
        <p>Supplier:</p>
        <p>{suplier}</p>
      </div>
    </div>
  );
};

export default EventInfoCard;
