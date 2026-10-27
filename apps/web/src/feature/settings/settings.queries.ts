import { queryOptions } from '@tanstack/react-query'
import { getSettings } from './settings.api'

export const settingsKeys = {
  all: ['settings'] as const,
  detail: (storeId: string) =>
    [...settingsKeys.all, 'detail', storeId] as const,
}

export const settingsQueryOptions = (storeId: string) =>
  queryOptions({
    queryKey: settingsKeys.detail(storeId),
    queryFn: () => getSettings(storeId),

    staleTime: 1000 * 60 * 5, // 5 minutes
  })
