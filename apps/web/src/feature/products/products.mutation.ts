// products.mutations.ts

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createProduct, deleteProduct } from './products.api'

import { productsKeys } from './products.queries'

export function useCreateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productsKeys.lists(),
      })
    },
  })
}

export function useDeleteProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productsKeys.lists(),
      })
    },
  })
}
