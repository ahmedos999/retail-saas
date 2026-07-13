import { CartItem } from '@retail/ui'

type CartProps = {
  items: {
    img: string
    name: string
    description: string
    price: number
    quantity: number
  }[]
}

export const Cart = ({ items }: CartProps) => {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item, index) => (
        <CartItem
          key={index}
          img={item.img}
          name={item.name}
          description={item.description}
          price={item.price}
          quantity={item.quantity}
          onClose={() => {}}
        />
      ))}
    </div>
  )
}
