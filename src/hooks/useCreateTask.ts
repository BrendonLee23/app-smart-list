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
      const isLimitError = error.message.toLowerCase().includes('limite')
      toast.error(
        isLimitError
          ? 'Limite de 10 tarefas atingido. Exclua tarefas existentes para liberar espaço.'
          : error.message,
        { duration: isLimitError ? 6000 : 4000 },
      )
    },
  })
}
