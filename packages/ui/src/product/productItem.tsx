type ProductItemProps = {
  name: string;
  price: string;
  imageUrl: string;
  stock: number;
  onClick?: () => void;
};

export const ProductItem = ({
  name,
  price,
  imageUrl,
  stock,
  onClick,
}: ProductItemProps) => {
  return (
    <div
      onClick={stock > 0 ? onClick : undefined}
      className={`p-4 rounded-lg box-shadow w-full grid gap-1 ${stock > 0 ? "cursor-pointer" : "cursor-not-allowed opacity-75"}`}
    >
      <img src={imageUrl} alt={name} className="h-32 mb-4 mx-auto" />
      <h2 className="text-sm line-clamp-1" title={name}>
        {name}
      </h2>
      <div className="flex justify-between items-center ">
        <p className="text-gray-600 text-sm">Stock: {stock}</p>
        {stock === 0 && (
          <div className="bg-red-300 p-1 rounded-full text-red-600 text-xs">
            out of stock
          </div>
        )}
        {stock > 0 && stock < 5 && (
          <div className="bg-yellow-300 p-1 rounded-full text-yellow-600 text-xs">
            low stock
          </div>
        )}
      </div>
      <p className=" font-bold">${price}</p>
    </div>
  );
};
