import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createOrder } from './order.api'
import { orderKeys } from './order.queries'

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
