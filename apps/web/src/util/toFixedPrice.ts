export function toFixedPrice(value: string | number): string {
  const numberValue = typeof value === 'string' ? parseFloat(value) : value
  return numberValue.toFixed(1) + '- AED'
}
