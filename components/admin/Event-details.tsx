import { useRouter } from "next/navigation";

type EventDetailsProps = {
  id: number;
  location: string;
  address: string;
  client: string;
  date: string;
  product_name: string;
  supplier: string;
  product_stock: number;
  units_used: number | null;
};

const EventDetails = ({
  id,
  location,
  address,
  client,
  date,
  product_name,
  supplier,
  product_stock,
  units_used,
}: EventDetailsProps) => {
  const router = useRouter();
  const verifyEvent = async () => {
    const data = await fetch("/api/post/verify-event", {
      method: "POST",
      body: JSON.stringify({ id: id }),
    });
    const res = await data.json();
    router.back();
  };
  return (
    <div className="absolute">
      <div
        className="fixed w-[100vw] h-[100vh] top-0 left-0 bg-white opacity-50 z-20"
        onClick={() => router.back()}
      />
      <section className="fixed top-[25vh] right-[12.5vw] left-[12.5vw] bottom-0 w-3/4 h-2/4 border-solid border-black rounded-md bg-[#EDEDED] text-black p-4 z-40">
        <section className="flex flex-col justify-center items-center gap-4">
          <div className="text-center">
            <h2 className="text-xl underline">EVENT</h2>
          </div>
          <ul className="w-3/4">
            <div className="flex gap-4">
              <li className="font-bold w-1/2">Client:</li>
              <p className="w-full">{client}</p>
            </div>
            <div className="flex gap-4">
              <li className="font-bold w-1/2">Supplier:</li>
              <p className="w-full">{supplier}</p>
            </div>
            <div className="flex gap-4">
              <li className="font-bold w-1/2">Location:</li>
              <p className="w-full">{location}</p>
            </div>
            <div className="flex gap-4">
              <li className="font-bold w-1/2">Address:</li>
              <p className="w-full">{address}</p>
            </div>
            <div className="flex gap-4">
              <li className="font-bold w-1/2">Date:</li>
              <p className="w-full">{date}</p>
            </div>
            <div className="flex gap-4">
              <li className="font-bold w-1/2">Product Name:</li>
              <p className="w-full">{product_name}</p>
            </div>
            <div className="flex gap-4">
              <li className="font-bold w-1/2">Stock:</li>
              <p className="w-full">{product_stock}</p>
            </div>
            <div className="flex gap-4">
              <li className="font-bold w-1/2">Units used:</li>
              <p className="w-full">{units_used}</p>
            </div>
          </ul>
          <button className="hover:underline" onClick={verifyEvent}>
            Verify event
          </button>
        </section>
      </section>
    </div>
  );
};

export default EventDetails;
