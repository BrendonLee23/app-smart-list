'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useTasksContext } from '@/context/TasksContext'
import { useDeleteTask } from '@/hooks/useDeleteTask'

export function DeleteConfirmDialog() {
  const { selectedTask, isDeleteOpen, closeDeleteDialog } = useTasksContext()
  const deleteTask = useDeleteTask()

  async function handleConfirm() {
    if (!selectedTask) return
    await deleteTask.mutateAsync(selectedTask.id)
    closeDeleteDialog()
  }

  return (
    <Dialog open={isDeleteOpen} onOpenChange={(open) => !open && closeDeleteDialog()}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Excluir tarefa</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir a tarefa{' '}
            <span className="font-semibold">&quot;{selectedTask?.title}&quot;</span>? Esta ação não
            pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={closeDeleteDialog}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleConfirm} disabled={deleteTask.isPending}>
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
