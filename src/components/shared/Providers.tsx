'use client'

import { useState } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { HydrationBoundary, DehydratedState } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { makeQueryClient } from '@/lib/queryClient'
import { TasksProvider } from '@/context/TasksContext'

interface ProvidersProps {
  children: React.ReactNode
  dehydratedState?: DehydratedState
}

export function Providers({ children, dehydratedState }: ProvidersProps) {
  const [queryClient] = useState(() => makeQueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <TasksProvider>
          {children}
          <Toaster position="top-right" />
        </TasksProvider>
      </HydrationBoundary>
    </QueryClientProvider>
  )
}
