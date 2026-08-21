const API_URL = 'http://127.0.0.1:3000'

type ApiClientOptions = RequestInit & {
  query?: Record<string, string | number | boolean | undefined>
}

export class apiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message)
  }
}

export async function apiClient<T>(
  path: string,
  options: ApiClientOptions = {},
): Promise<T> {
  const { query, ...fetchOptions } = options

  const url = new URL(path, API_URL)

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.set(key, String(value))
      }
    })
  }

  const res = await fetch(url, {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...(fetchOptions.headers || {}),
    },
  })
  if (!res.ok) {
    throw new apiError(res.statusText, res.status)
  }
  return res.json()
}
