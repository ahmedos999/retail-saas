// categories.mutations.ts

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createCategory, deleteCategory } from './categories.api'

import { categoriesKeys } from './categories.queries'

export function useCreateCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createCategory,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoriesKeys.lists(),
      })
    },
  })
}

export function useDeleteCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteCategory,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoriesKeys.lists(),
      })
    },
  })
}
