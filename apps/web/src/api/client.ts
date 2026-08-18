const API_URL = 'http://localhost:3000'

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
  options: RequestInit,
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  })
  if (!res.ok) {
    throw new apiError(res.statusText, res.status)
  }
  return res.json()
}
