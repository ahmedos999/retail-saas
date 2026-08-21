import { createServerFn } from '@tanstack/react-start'
import { useAppSession } from './session'

export const loginFn = createServerFn({ method: 'POST' })
  .validator((data: { email: string; password: string }) => data)
  .handler(async ({ data }) => {
    const res = await fetch('http://127.0.0.1:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: data.email, password: data.password }),
    })

    const userData = await res.json()

    if (!res.ok) {
      console.error('Login failed:', userData)
      return { error: userData.message ?? 'Invalid credentials' }
    }

    const session = await useAppSession()
    await session.update({
      user: userData.user,
      token: userData.token,
    })

    return {
      success: true,
    }
  })

export const logoutFn = createServerFn({ method: 'POST' }).handler(async () => {
  const session = await useAppSession()
  await session.clear()
})

export const getCurrentUserFn = createServerFn({ method: 'GET' }).handler(
  async () => {
    const session = await useAppSession()

    if (!session.data.user) return null
    return session.data.user
  },
)
