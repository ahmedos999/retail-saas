type ProductItemProps = {
  name: string;
  price: number;
  imageUrl: string;
  stock: number;
};

export const ProductItem = ({
  name,
  price,
  imageUrl,
  stock,
}: ProductItemProps) => {
  return (
    <div className="p-4  rounded-lg box-shadow w-full grid gap-1">
      <img src={imageUrl} alt={name} className="h-32 mb-4 mx-auto" />
      <h2>{name}</h2>
      <div className="flex justify-between items-center ">
        <p className="text-gray-600 text-sm">Stock: {stock}</p>
        {stock === 0 && (
          <div className="bg-red-300 p-1 rounded-md text-red-600 text-xs">
            out of stock
          </div>
        )}
        {stock > 0 && stock < 5 && (
          <div className="bg-yellow-300 p-1 rounded-md text-yellow-600 text-xs">
            low stock
          </div>
        )}
      </div>
      <p className=" font-bold">${price.toFixed(2)}</p>
    </div>
  );
};
