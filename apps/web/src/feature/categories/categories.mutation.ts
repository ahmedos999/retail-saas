// categories.mutations.ts

import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  createCategory,
  deleteCategory,
  updateCategory,
} from './categories.api'

import { categoriesKeys } from './categories.queries'
import type { Category } from './categories.types'

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

export function useEditCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      categoryId,
      category,
    }: {
      categoryId: string
      category: Partial<Category>
    }) => updateCategory(categoryId, category),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoriesKeys.lists(),
      })
    },
  })
}
