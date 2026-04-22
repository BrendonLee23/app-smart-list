import { useQuery } from '@tanstack/react-query'
import { getTasks } from '@/services/tasks.service'

export function useTasks() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  })
}
