import { AuthLayout, Button, FormField } from '@retail/ui'
import { Link, createFileRoute } from '@tanstack/react-router'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <AuthLayout>
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-1 text-sm text-gray-500">
            Sign in to your RetailOS account
          </p>
        </div>

        <form className="flex flex-col gap-4">
          <FormField
            id="email"
            label="Email address"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
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
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition"
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

          <Button variant="primary" type="submit" className="w-full mt-2">
            Sign In
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-secondary font-medium hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}
