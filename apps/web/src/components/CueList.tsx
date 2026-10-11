import { CueCard } from '@retail/ui'
import type { ReactNode } from 'react'

export interface CueItem {
  title: string
  value: string | number
  percentage?: string
  icon?: ReactNode
  bgColor?: string
  toFixed?: number
}

interface CueListProps {
  items: CueItem[]
}

export const CueList = ({ items }: CueListProps) => {
  return (
    <div className="flex gap-4 w-full">
      {items.map((item) => (
        <CueCard
          key={item.title}
          title={item.title}
          value={item.value}
          percentage={item.percentage}
          icon={item.icon}
          bgColor={item.bgColor}
          toFixed={item.toFixed}
        />
      ))}
    </div>
  )
}
