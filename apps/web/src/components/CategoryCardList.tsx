import { CategoryCard } from '@retail/ui'
import type { ReactNode } from 'react'

export interface CategoryCardItem {
  title: string
  description?: string
  numberOfProducts: number
  revenue: string
  lowStock: number
  bgColor?: string
  icon?: ReactNode
}

interface CategoryCardListProps {
  categories: CategoryCardItem[]
}

export const CategoryCardList = ({ categories }: CategoryCardListProps) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-4">
      {categories.map((category) => (
        <CategoryCard
          key={category.title}
          title={category.title}
          description={category.description}
          numberOfProducts={category.numberOfProducts}
          revenue={category.revenue}
          lowStock={category.lowStock}
          bgColor={category.bgColor}
          icon={category.icon}
        />
      ))}
    </div>
  )
}
