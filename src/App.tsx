import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'



const router = createRouter({ routeTree })
const queryClient = new QueryClient()

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
