import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import {
  LayoutDashboard,
  Package,
  Tag,
  ShoppingCart,
  ClipboardList,
  Settings,
} from 'lucide-react'
import { SideBar, type NavLink } from '@retail/ui'
import { getCurrentUserFn } from '#/util/authentication'
import type { userData } from '#/util/session'

export const Route = createFileRoute('/_app')({
  beforeLoad: async () => {
    const user = await getCurrentUserFn()
    console.log('user', user)
    if (!user) {
      throw redirect({ to: '/login' })
    }
    return { user }
  },
  component: AppLayout,
})

const navLinks: NavLink[] = [
  { label: 'Dashboard', icon: LayoutDashboard, link: 'dashboard' },
  { label: 'Products', icon: Package, link: 'products' },
  { label: 'Categories', icon: Tag, link: 'categories' },
  { label: 'POS', icon: ShoppingCart, link: 'pos' },
  { label: 'Orders', icon: ClipboardList, link: 'orders' },
  { label: 'Settings', icon: Settings, link: 'settings' },
]

function AppLayout() {
  const { user } = Route.useRouteContext() as { user: userData }

  console.log('user in app layout', user)
  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar links={navLinks} user={user} />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
