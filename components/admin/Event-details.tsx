type EventDetailsProps = {
  location: string;
  client: string;
  date: string;
  product_name: string;
  supplier: string;
  product_stock: number;
  units_used: number | null;
};

const EventDetails = ({
  location,
  client,
  date,
  product_name,
  supplier,
  product_stock,
  units_used,
}: EventDetailsProps) => {
  return (
    <div className="absolute">
      <div className="fixed w-screen h-screen bg-[#EDEDED] opacity-25" />
      <section className="fixed top-[16.5vh] right-[12.5vw] left-[12.5vw] bottom-0 w-3/4 h-3/4 border-solid border-black rounded-md bg-[#EDEDED] text-black p-4"></section>
    </div>
  );
};

export default EventDetails;
