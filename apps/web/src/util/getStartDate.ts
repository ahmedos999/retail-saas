export function getStartDate(dateRange: string): Date {
  const date = new Date()
  date.setHours(0, 0, 0, 0)

  switch (dateRange) {
    case 'Last 7 Days':
      date.setDate(date.getDate() - 7)
      break
    case 'Last 30 Days':
      date.setDate(date.getDate() - 30)
      break
    case 'This Month':
      date.setDate(1)
      break
  }

  return date
}
