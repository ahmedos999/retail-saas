import { AxiosError, create } from 'axios'

const API_URL = 'http://127.0.0.1:3000'

type ValidationErrorResponse = {
  error?: string
  details?: Array<{
    message?: string
  }>
}

export const apiClient = create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ValidationErrorResponse>) => {
    const data = error.response?.data
    const validationMessages = data?.details
      ?.map((detail) => detail.message)
      .filter((message): message is string => Boolean(message))

    if (validationMessages?.length) {
      return Promise.reject(new Error(validationMessages.join(', ')))
    }

    return Promise.reject(new Error(data?.error ?? error.message))
  },
)
