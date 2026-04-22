import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTask } from '@/services/tasks.service'
import toast from 'react-hot-toast'

export function useDeleteTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      toast.success('Tarefa excluída com sucesso!')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}
