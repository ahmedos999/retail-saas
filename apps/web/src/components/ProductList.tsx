import { ProductItem } from '@retail/ui'

type ProductListProps = {
  products: {
    name: string

    price: number
    imageUrl: string
    stock: number
  }[]
}

export const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
      {products.map((product, index) => (
        <ProductItem
          key={index}
          name={product.name}

          price={product.price}
          imageUrl={product.imageUrl}
          stock={product.stock}
        />
      ))}
    </div>
  )
}
