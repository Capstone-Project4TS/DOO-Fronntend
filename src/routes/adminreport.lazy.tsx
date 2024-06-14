import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/adminreport')({
  component: () => <div>Hello /adminreport!</div>
})