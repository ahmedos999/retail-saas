import { create } from 'zustand'
import type { CartLine } from '#/components/Cart'

type CartState = {
  items: CartLine[]
  addToCart: (product: {
    id: string
    name: string
    price: string
    imageUrl?: string | null
  }) => void
  updateQuantity: (id: string, quantity: number) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addToCart: (product) =>
    set((state) => {
      const existing = state.items.find((item) => item.id === product.id)
      return {
        items: existing
          ? state.items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            )
          : [
              ...state.items,
              {
                id: product.id,
                img: '/product1.png',
                name: product.name,
                description: '',
                price: Number(product.price),
                quantity: 1,
              },
            ],
      }
    }),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      items:
        quantity <= 0
          ? state.items.filter((item) => item.id !== id)
          : state.items.map((item) =>
              item.id === id ? { ...item, quantity } : item,
            ),
    })),
  removeFromCart: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  clearCart: () => set({ items: [] }),
}))
