import { createFileRoute } from '@tanstack/react-router'

import { categoriesQueryOptions } from '#/feature/categories/categories.queries'

export const Route = createFileRoute('/_app/categories/')({
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(
      categoriesQueryOptions({ storeId: context.user.storeId }),
    )
  },
  // component: RouteComponent,
})
