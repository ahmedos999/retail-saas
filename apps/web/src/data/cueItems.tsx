import { Box, Tag, DollarSign } from 'lucide-react'
import type { CueItem } from '#/components/CueList'

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
