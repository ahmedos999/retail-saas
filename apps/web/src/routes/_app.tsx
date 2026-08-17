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
import { getAuthData, isAuthenticated } from '#/util/auth'

export const Route = createFileRoute('/_app')({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: '/login' })
    }
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
  const user = getAuthData()!.user
  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar links={navLinks} user={user} />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
