import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateTask } from '@/services/tasks.service'
import { UpdateTaskDTO } from '@/types/task.types'
import toast from 'react-hot-toast'

export function useUpdateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateTaskDTO }) =>
      updateTask(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      toast.success('Tarefa atualizada com sucesso!')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}
