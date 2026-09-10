import { create } from 'axios'

const API_URL = 'http://127.0.0.1:3000'

export const apiClient = create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
