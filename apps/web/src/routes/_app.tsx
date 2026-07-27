import { Outlet, createFileRoute } from '@tanstack/react-router'
import {
  LayoutDashboard,
  Package,
  Tag,
  ShoppingCart,
  ClipboardList,
  Settings,
} from 'lucide-react'
import { SideBar, type NavLink } from '@retail/ui'

export const Route = createFileRoute('/_app')({
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
  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar links={navLinks} />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
