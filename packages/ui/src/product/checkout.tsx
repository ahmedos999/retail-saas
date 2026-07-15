interface CheckoutProps {
  subtotal: number;
  discount: number;
  taxRate: number;
  ClearCart: () => void;
  Checkout: () => void;
}

export const Checkout = ({
  subtotal,
  discount,
  taxRate,
  ClearCart,
  Checkout,
}: CheckoutProps) => {
  return (
    <div className="text-sm">
      <div className="flex gap-2">
        <input
          placeholder="Add Discount code"
          className=" p-2 border border-gray-300 rounded-md flex-1 placeholder-gray-500 text-sm"
        />
        <button className=" border border-gray-300 rounded-md text-gray-500 text-sm px-4 py-2">
          Apply
        </button>
      </div>
      <div className="flex justify-between mt-4">
        <span className="text-gray-500">Subtotal</span>
        <span className="">${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mt-4">
        <span className="text-gray-500">Discount</span>
        <span className="">-${discount.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mt-4">
        <span className="text-gray-500">
          Tax({(taxRate * 100).toFixed(0)}%)
        </span>
        <span className="">${(subtotal * taxRate).toFixed(2)}</span>
      </div>
      <div className="flex justify-between bg-secondary-light text-black mt-4 p-4 -mx-4">
        <span className=" font-bold text-lg text-black">Total</span>
        <span className="font-bold text-lg">
          ${(subtotal - discount + subtotal * taxRate).toFixed(2)}
        </span>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={ClearCart}
          className="border  rounded-md  px-4 py-2 flex-1 bg-secondary-light text-secondary border-secondary"
        >
          Clear Cart
        </button>
        <button
          onClick={Checkout}
          className=" rounded-md text-white px-4 py-2 flex-1 bg-secondary"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};
