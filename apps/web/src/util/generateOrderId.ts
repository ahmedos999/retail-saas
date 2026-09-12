export function generateOrderId(): string {
  return `ORD-${crypto.randomUUID().slice(0, 8).toUpperCase()}`
}
