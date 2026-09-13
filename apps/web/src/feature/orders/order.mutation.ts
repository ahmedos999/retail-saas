import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createOrder, updateOrder } from './order.api'
import { orderKeys } from './order.queries'
import type { Order } from './order.types'

export function useCreateOrderMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() })
    },
    onError: (error: any) => {
      console.error('Error creating order:', error)
    },
  })
}

export function useUpdateOrderMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      orderId,
      order,
    }: {
      orderId: string
      order: Partial<Order>
    }) => updateOrder(orderId, order),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() })
    },
    onError: (error: any) => {
      console.error('Error updating order:', error)
    },
  })
}
