// settings.mutation.ts

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateSettings } from './settings.api'

import { settingsKeys } from './settings.queries'
import type { UpdateSettingsPayload } from './settings.types'

export function useUpdateSettings() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      storeId,
      payload,
    }: {
      storeId: string
      payload: UpdateSettingsPayload
    }) => updateSettings(storeId, payload),

    onSuccess: (data, { storeId }) => {
      // PUT returns the same shape as GET, so refresh the cache directly
      queryClient.setQueryData(settingsKeys.detail(storeId), data)
    },
  })
}
