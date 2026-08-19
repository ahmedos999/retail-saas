import { CategoryCard } from '@retail/ui'
import type { LucideIcon } from 'lucide-react'

export interface CategoryCardItem {
  id: string
  title: string
  description?: string
  numberOfProducts: number
  revenue: string
  lowStock: number
  bgColor?: string
  icon?: LucideIcon
}

interface CategoryCardListProps {
  categories: CategoryCardItem[]
}

export const CategoryCardList = ({ categories }: CategoryCardListProps) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-4">
      {categories.map((category) => {
        const Icon = category.icon
        return (
          <CategoryCard
            key={category.title}
            title={category.title}
            description={category.description}
            numberOfProducts={category.numberOfProducts}
            revenue={category.revenue}
            lowStock={category.lowStock}
            bgColor={category.bgColor}
            icon={
              Icon ? (
                <Icon size={32} style={{ color: category.bgColor }} />
              ) : undefined
            }
          />
        )
      })}
    </div>
  )
}
