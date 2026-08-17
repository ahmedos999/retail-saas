const AUTH_KEY = 'retail_auth'

export interface AuthUser {
  id: string
  email: string
  fullName: string
}

export interface AuthData {
  user: AuthUser
  token: string
}

// loaded once from localStorage on module init; all subsequent reads are in-memory
let _auth: AuthData | null = (() => {
  try {
    const stored = localStorage.getItem(AUTH_KEY)
    return stored ? (JSON.parse(stored) as AuthData) : null
  } catch {
    return null
  }
})()

export function getAuthData(): AuthData | null {
  return _auth
}

export function saveAuthData(data: AuthData): void {
  _auth = data
  localStorage.setItem(AUTH_KEY, JSON.stringify(data))
}

export function clearAuthData(): void {
  _auth = null
  localStorage.removeItem(AUTH_KEY)
}

export function isAuthenticated(): boolean {
  return _auth !== null
}
