// products.mutations.ts

import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Product } from './products.types'

import { createProduct, deleteProduct, updateProduct } from './products.api'

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
export function useUpdateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      productId,
      product,
    }: {
      productId: Product['id']
      product: Product
    }) => updateProduct(productId, product),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productsKeys.lists(),
      })
    },
  })
}
