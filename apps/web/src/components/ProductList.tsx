import type { Product } from '#/feature/products/products.types'
import { ProductItem } from '@retail/ui'

type ProductListProps = {
  products: Product[]
  onProductClick?: (product: Product) => void
}

export const ProductList = ({ products, onProductClick }: ProductListProps) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          name={product.name}
          price={product.price}
          imageUrl={'/product1.png'}
          stock={product.stock}
          onClick={() => onProductClick?.(product)}
        />
      ))}
    </div>
  )
}
