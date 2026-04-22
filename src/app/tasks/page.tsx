import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { TasksPageClient } from './TasksPageClient'

async function prefetchTasks() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
    cache: 'no-store',
  })
  if (!response.ok) return []
  const json = await response.json()
  return json.data ?? []
}

export default async function TasksPage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['tasks'],
    queryFn: prefetchTasks,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TasksPageClient />
    </HydrationBoundary>
  )
}
