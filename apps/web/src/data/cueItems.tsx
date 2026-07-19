import {
  Box,
  Tag,
  DollarSign,
  Cpu,
  Shirt,
  UtensilsCrossed,
  Dumbbell,
  BookOpen,
  Sparkles,
  Baby,
  ShoppingCart,
  TrendingUp,
  Users,
  PackageCheck,
} from 'lucide-react'
import type { CueItem } from '#/components/CueList'
import type { CategoryCardItem } from '#/components/CategoryCardList'
import type { ListViewItem } from '@retail/ui'

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

export const categoryCardItems: CategoryCardItem[] = [
  {
    title: 'Electronics',
    description: 'Gadgets and devices',
    numberOfProducts: 120,
    revenue: '$50,000',
    lowStock: 5,
    bgColor: 'bg-blue-100',
    icon: <Cpu size={32} className="text-blue-700" />,
  },
  {
    title: 'Clothing',
    description: 'Apparel and accessories',
    numberOfProducts: 85,
    revenue: '$32,000',
    lowStock: 12,
    bgColor: 'bg-pink-100',
    icon: <Shirt size={32} className="text-pink-700" />,
  },
  {
    title: 'Home & Kitchen',
    description: 'Furniture and appliances',
    numberOfProducts: 60,
    revenue: '$21,500',
    lowStock: 3,
    bgColor: 'bg-orange-100',
    icon: <UtensilsCrossed size={32} className="text-orange-700" />,
  },
  {
    title: 'Sports & Outdoors',
    description: 'Fitness and outdoor gear',
    numberOfProducts: 45,
    revenue: '$18,200',
    lowStock: 8,
    bgColor: 'bg-green-100',
    icon: <Dumbbell size={32} className="text-green-700" />,
  },
  {
    title: 'Books & Stationery',
    description: 'Books, pens and supplies',
    numberOfProducts: 200,
    revenue: '$9,800',
    lowStock: 20,
    bgColor: 'bg-yellow-100',
    icon: <BookOpen size={32} className="text-yellow-700" />,
  },
  {
    title: 'Beauty & Care',
    description: 'Skincare and cosmetics',
    numberOfProducts: 95,
    revenue: '$27,600',
    lowStock: 7,
    bgColor: 'bg-purple-100',
    icon: <Sparkles size={32} className="text-purple-700" />,
  },
  {
    title: 'Baby & Kids',
    description: 'Toys, clothing and essentials',
    numberOfProducts: 70,
    revenue: '$15,400',
    lowStock: 4,
    bgColor: 'bg-teal-100',
    icon: <Baby size={32} className="text-teal-700" />,
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
