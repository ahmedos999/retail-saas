import { CueCard } from '@retail/ui'
import { Box, Tag, DollarSign } from 'lucide-react'

export const CueList = () => {
  return (
    <div className="flex gap-4 w-full">
      <CueCard
        title="Total Products"
        value="1248"
        percentage="12.2%"
        icon={<Box size={24} className="text-red-800" />}
        bgColor="bg-red-200"
      />
      <CueCard
        title="Out of Stock"
        value="8"
        percentage="8.5%"
        icon={<Box size={24} className="text-green-800" />}
        bgColor="bg-green-200"
      />
      <CueCard
        title="Total Value"
        value="24570"
        percentage="5.2%"
        icon={<DollarSign size={24} className="text-blue-800" />}
        bgColor="bg-blue-200"
      />
      <CueCard
        title="Low Stock items"
        value="23"
        percentage="2.1%"
        icon={<Tag size={24} className="text-yellow-800" />}
        bgColor="bg-yellow-200"
      />
    </div>
  )
}
