import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/pos/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/pos/"!</div>
}
