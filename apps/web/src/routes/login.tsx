import { AuthLayout, Button, FormField } from '@retail/ui'
import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'
import { Eye, EyeOff } from 'lucide-react'
import { useActionState, useState } from 'react'
import { getCurrentUserFn, loginFn } from '#/util/authentication'

export const Route = createFileRoute('/login')({
  beforeLoad: async () => {
    const user = await getCurrentUserFn()
    if (user) throw redirect({ to: '/dashboard' })
  },
  component: LoginPage,
})

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const [error, action, isPending] = useActionState(
    async (_prev: string | null, formData: FormData) => {
      const result = await loginFn({
        data: {
          email: formData.get('email') as string,
          password: formData.get('password') as string,
        },
      })

      if (result?.error) {
        console.error('Login failed UI failed:', result.error)
        return result.error
      }

      if (result?.success) {
        console.log('Login successful, redirecting to dashboard...')
        router.navigate({ to: '/dashboard' })
      }

      return null
    },
    null,
  )

  return (
    <AuthLayout>
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-1 text-sm text-gray-500">
            Sign in to your RetailOS account
          </p>
        </div>

        <form className="flex flex-col gap-4" action={action}>
          <FormField
            id="email"
            name="email"
            label="Email address"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <a
                href="#"
                className="text-xs text-secondary hover:underline font-medium"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                autoComplete="current-password"
                required
                className="w-full text-gray-900 border border-gray-300 rounded-md px-3 py-2 pr-10 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button
            variant="primary"
            type="submit"
            className="w-full mt-2"
            disabled={isPending}
          >
            {isPending ? 'Signing in…' : 'Sign In'}
          </Button>
        </form>
      </div>
    </AuthLayout>
  )
}
