import Input from "../global/FormComponents/Input";
import {useState} from "react";
import PrimaryButton from "../buttons/PrimaryButton";

const DemonstratorEventInfoCard = ({
  className,
  client,
  location,
  address,
  date,
  startTime,
  endTime,
  demonstrator,
  product,
  stock,
  suplier,
  comment,
  travelCost,
  unitsUsed,
  action,
  onClick,
  onChange,
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
  stock: number | null;
  suplier: string | null;
  comment: string | null;
  travelCost: number | null;
  unitsUsed: number | null;
  action: Function;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  const [productStock, setProductStock] = useState<number | null>(stock);

  return (
    <div className={`p-6 ${className}`}>
      <form className="text-sm">
        <div className="flex flex-row gap-2">
          <p>Client: </p>
          <p>{client}</p>
        </div>
        <div className="flex flex-row gap-2">
          <p>Location: </p>
          <p>{location}</p>
        </div>
        <div className="flex flex-row gap-2">
          <p>Address: </p>
          <p>{address}</p>
        </div>
        <div className="flex flex-row gap-2">
          <p>Date: </p>
          <p>{date}</p>
        </div>
        <div className="flex flex-row gap-2">
          <p>Start time: </p>
          <p>{startTime}</p>
        </div>
        <div className="flex flex-row gap-2">
          <p>End time: </p>
          <p>{endTime}</p>
        </div>
        <div className="flex flex-row gap-2">
          <p>Product: </p>
          <p>{product}</p>
        </div>
        <div className="flex flex-row gap-2">
          <p>Supplier: </p>
          <p>{suplier}</p>
        </div>
        <label>
          <Input
            type="number"
            name="travel-cost"
            headline="Travel cost"
            value={travelCost != null ? travelCost : 0}
          />
        </label>
        <label>
          <Input type="number" name="stock" headline="Stock" value={stock != null ? stock : 0} />
        </label>
        <label>
          <Input
            type="number"
            name="units-used"
            headline="Units used"
            value={unitsUsed != null ? unitsUsed : 0}
          />
        </label>
        <label>
          <Input
            type="textarea"
            name="comment"
            headline="Comment"
            value={comment != null ? comment : "no comment yet"}
          />
        </label>
        <PrimaryButton type="green" buttonText="Save Changes" onClick={onClick} />
      </form>
    </div>
  );
};

export default DemonstratorEventInfoCard;
