import { apiClient } from '#/api/client'
import { API_ROUTES } from '#/api/routes'
import type { SettingsResponse, UpdateSettingsPayload } from './settings.types'

export async function getSettings(storeId: string) {
  const response = await apiClient.get<SettingsResponse>(
    `${API_ROUTES.settings.get}`,
    {
      params: { storeId },
    },
  )
  return response.data
}

export async function updateSettings(
  storeId: string,
  payload: UpdateSettingsPayload,
) {
  const response = await apiClient.put<SettingsResponse>(
    `${API_ROUTES.settings.update}`,
    payload,
    {
      params: { storeId },
    },
  )
  return response.data
}
