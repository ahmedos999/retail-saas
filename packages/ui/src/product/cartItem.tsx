import { Minus, Plus } from "lucide-react";
import { useState } from "react";

type CartItemProps = {
  img: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  onClose: () => void;
};

export const CartItem = ({
  img,
  name,
  description,
  price,
  quantity,
  onClose,
}: CartItemProps) => {
  const [localQuantity, setLocalQuantity] = useState(quantity);
  return (
    <div className="flex justify-between gap-4 p-4 border-b border-gray-200">
      <img src={img} alt={name} className="w-16 h-16 rounded-md self-center" />
      {/* quantity */}
      <div className="flex flex-col gap-2 justify-between">
        <h4 className="font-bold text-sm">{name}</h4>
        <p className="text-gray-400 text-xs">{description}</p>
        <div className="flex items-center gap-2 border border-gray-300 rounded-md  w-fit">
          <button
            className="border rounded-md p-1 border-gray-500"
            onClick={() => setLocalQuantity(localQuantity - 1)}
          >
            <Minus size={18} />
          </button>
          <div className="text-sm mx-2">{localQuantity}</div>
          <button
            className="border rounded-md p-1 border-gray-500"
            onClick={() => setLocalQuantity(localQuantity + 1)}
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* prices */}
      <div className="flex flex-col gap-2 justify-between text-sm">
        <p>${price.toFixed(2)}</p>
        <p className="font-bold">${(price * localQuantity).toFixed(2)}</p>
      </div>

      {/* close */}

      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none self-start"
      >
        &times;
      </button>
    </div>
  );
};
