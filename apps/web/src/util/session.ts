import { useSession } from '@tanstack/react-start/server'

export type userData = {
  id: string
  email: string
  fullName: string
  role: 'Owner' | 'Manager' | 'Cashier'
  storeId: string
}

export type SessionData = {
  token: string
  user: userData
}

export function useAppSession() {
  return useSession<SessionData>({
    name: 'app-session',
    password: process.env.SESSION_SECRET ?? 'retail-saas-dev-secret-key-32ch!!',
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      httpOnly: true,
    },
  })
}
