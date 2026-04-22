import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTask } from '@/services/tasks.service'
import { CreateTaskDTO } from '@/types/task.types'
import toast from 'react-hot-toast'

export function useCreateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateTaskDTO) => createTask(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      toast.success('Tarefa criada com sucesso!')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}
