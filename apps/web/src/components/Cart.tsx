import { CartItem } from '@retail/ui'

export type CartLine = {
  id: string
  img: string
  name: string
  description: string
  price: number
  quantity: number
}

type CartProps = {
  items: CartLine[]
  onQuantityChange: (id: string, quantity: number) => void
  onRemove: (id: string) => void
}

export const Cart = ({ items, onQuantityChange, onRemove }: CartProps) => {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <CartItem
          key={item.id}
          img={item.img}
          name={item.name}
          description={item.description}
          price={item.price}
          quantity={item.quantity}
          onClose={() => onRemove(item.id)}
          onQuantityChange={(quantity) => onQuantityChange(item.id, quantity)}
        />
      ))}
    </div>
  )
}
