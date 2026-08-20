import {
  Box,
  Tag,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Users,
  PackageCheck,
  Clock,
  CheckCircle,
  XCircle,
} from 'lucide-react'
import type { CueItem } from '#/components/CueList'
import type { ListViewItem, SalesDataPoint } from '@retail/ui'

export const productCueItems: CueItem[] = [
  {
    title: 'Total Products',
    value: '1248',
    percentage: '12.2%',
    icon: <Box size={24} className="text-red-800" />,
    bgColor: 'bg-red-200',
  },
  {
    title: 'Total Value',
    value: '24570',
    percentage: '5.2%',
    icon: <DollarSign size={24} className="text-blue-800" />,
    bgColor: 'bg-blue-200',
  },
  {
    title: 'Out of Stock',
    value: '8',
    percentage: '8.5%',
    icon: <Box size={24} className="text-green-800" />,
    bgColor: 'bg-green-200',
  },
  {
    title: 'Low Stock Items',
    value: '23',
    percentage: '2.1%',
    icon: <Tag size={24} className="text-yellow-800" />,
    bgColor: 'bg-yellow-200',
  },
]

export const categoryCueItems: CueItem[] = [
  {
    title: 'Total Categories',
    value: '24',
    percentage: '4.3%',
    icon: <Tag size={24} className="text-purple-800" />,
    bgColor: 'bg-purple-200',
  },
  {
    title: 'Active Categories',
    value: '18',
    percentage: '2.1%',
    icon: <Tag size={24} className="text-green-800" />,
    bgColor: 'bg-green-200',
  },
  {
    title: 'Total Products',
    value: '1248',
    percentage: '12.2%',
    icon: <Box size={24} className="text-blue-800" />,
    bgColor: 'bg-blue-200',
  },
  {
    title: 'Avg. Products / Category',
    value: '52',
    percentage: '1.8%',
    icon: <DollarSign size={24} className="text-yellow-800" />,
    bgColor: 'bg-yellow-200',
  },
]

export const dashboardListItems: ListViewItem[] = [
  {
    product: 'Air Max 90',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&q=80',
    sold: 284,
    revenue: '$36,920',
  },
  {
    product: 'Slim Fit T-Shirt',
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80&q=80',
    sold: 193,
    revenue: '$9,650',
  },
  {
    product: 'Wireless Headphones',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&q=80',
    sold: 147,
    revenue: '$29,400',
  },
  {
    product: 'Running Shorts',
    image:
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=80&q=80',
    sold: 112,
    revenue: '$5,600',
  },
  {
    product: 'Leather Wallet',
    image:
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=80&q=80',
    sold: 98,
    revenue: '$7,840',
  },
]

export const dashboardCueItems: CueItem[] = [
  {
    title: 'Total Revenue',
    value: '$84,320',
    percentage: '8.4%',
    icon: <TrendingUp size={24} className="text-emerald-800" />,
    bgColor: 'bg-emerald-200',
  },
  {
    title: 'Total Orders',
    value: '3,210',
    percentage: '5.7%',
    icon: <ShoppingCart size={24} className="text-blue-800" />,
    bgColor: 'bg-blue-200',
  },
  {
    title: 'Total Customers',
    value: '1,540',
    percentage: '3.2%',
    icon: <Users size={24} className="text-violet-800" />,
    bgColor: 'bg-violet-200',
  },
  {
    title: 'Orders Fulfilled',
    value: '2,894',
    percentage: '6.1%',
    icon: <PackageCheck size={24} className="text-orange-800" />,
    bgColor: 'bg-orange-200',
  },
]

export const ordersCueItems: CueItem[] = [
  {
    title: 'Total Orders',
    value: '3,210',
    percentage: '5.7%',
    icon: <ShoppingCart size={24} className="text-blue-800" />,
    bgColor: 'bg-blue-200',
  },
  {
    title: 'Pending',
    value: '148',
    percentage: '2.3%',
    icon: <Clock size={24} className="text-yellow-800" />,
    bgColor: 'bg-yellow-200',
  },
  {
    title: 'Completed',
    value: '2,894',
    percentage: '6.1%',
    icon: <CheckCircle size={24} className="text-green-800" />,
    bgColor: 'bg-green-200',
  },
  {
    title: 'Cancelled',
    value: '168',
    percentage: '1.4%',
    icon: <XCircle size={24} className="text-red-800" />,
    bgColor: 'bg-red-200',
  },
]

export const salesChartData: SalesDataPoint[] = [
  { date: 'Jul 1', sales: 4200 },
  { date: 'Jul 3', sales: 3800 },
  { date: 'Jul 5', sales: 5100 },
  { date: 'Jul 7', sales: 4700 },
  { date: 'Jul 9', sales: 6300 },
  { date: 'Jul 11', sales: 5800 },
  { date: 'Jul 13', sales: 7200 },
  { date: 'Jul 15', sales: 6900 },
  { date: 'Jul 17', sales: 8400 },
  { date: 'Jul 19', sales: 7600 },
  { date: 'Jul 20', sales: 9100 },
]

export const recentOrdersData = [
  {
    OrderNumber: 'ORD12345',
    Customer: 'John Doe',
    status: 'Pending' as const,
    price: 100,
  },
  {
    OrderNumber: 'ORD12346',
    Customer: 'Jane Smith',
    status: 'Completed' as const,
    price: 150,
  },
  {
    OrderNumber: 'ORD12347',
    Customer: 'Alice Johnson',
    status: 'Cancelled' as const,
    price: 200,
  },
]

export const lowStockData = [
  {
    product: 'Air Max 90',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&q=80',
    stock: 3,
  },
  {
    product: 'Slim Fit T-Shirt',
    image:
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=80&q=80',
    stock: 6,
  },
  {
    product: 'Wireless Headphones',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&q=80',
    stock: 2,
  },
]
