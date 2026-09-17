import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { QueryClient } from '@tanstack/react-query'
import { ErrorFallback } from '@retail/ui'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const queryClient = new QueryClient()

  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 30_000,
    defaultErrorComponent: ({ error, reset }) => (
      <ErrorFallback error={error} reset={reset} />
    ),
    context: { queryClient },
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
