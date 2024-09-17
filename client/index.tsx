import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ClerkProvider } from '@clerk/clerk-react'
import { RouterProvider } from 'react-router-dom'
import router from './routes'

const queryClient = new QueryClient()

// Import your publishable key
const PUBLISHABLE_KEY = 'pk_live_Y2xlcmsubGV0LWVtLWNvb2sucHVzaGVkLm56JA'

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ClerkProvider>,
  )
})
