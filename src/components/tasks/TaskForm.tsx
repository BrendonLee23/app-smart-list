'use client'

import { useEffect } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  createTaskSchema,
  updateTaskSchema,
  CreateTaskInput,
  UpdateTaskInput,
} from '@/schemas/task.schema'
import { useTasksContext } from '@/context/TasksContext'
import { useCreateTask } from '@/hooks/useCreateTask'
import { useUpdateTask } from '@/hooks/useUpdateTask'

export function TaskForm() {
  const { selectedTask, isFormOpen, closeForm } = useTasksContext()
  const isEditing = !!selectedTask

  const createTask = useCreateTask()
  const updateTask = useUpdateTask()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateTaskInput>({
    resolver: zodResolver(
      isEditing ? updateTaskSchema : createTaskSchema,
    ) as Resolver<CreateTaskInput>,
  })

  useEffect(() => {
    if (isFormOpen && selectedTask) {
      reset({
        title: selectedTask.title,
        description: selectedTask.description ?? '',
        status: selectedTask.status,
      })
    } else if (isFormOpen && !selectedTask) {
      reset({ title: '', description: '', status: 'PENDING' })
    }
  }, [isFormOpen, selectedTask, reset])

  async function onSubmit(data: CreateTaskInput | UpdateTaskInput) {
    if (isEditing && selectedTask) {
      await updateTask.mutateAsync({ id: selectedTask.id, payload: data })
    } else {
      await createTask.mutateAsync(data as CreateTaskInput)
    }
    closeForm()
  }

  return (
    <Dialog open={isFormOpen} onOpenChange={(open) => !open && closeForm()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Editar tarefa' : 'Nova tarefa'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="title">Título</Label>
            <Input id="title" {...register('title')} placeholder="Digite o título" />
            {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Digite uma descrição (opcional)"
              rows={3}
              className="max-h-40 resize-none overflow-y-auto break-all"
            />
            {errors.description && (
              <p className="text-xs text-destructive">{errors.description.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="status">Status</Label>
            <Select
              defaultValue={selectedTask?.status ?? 'PENDING'}
              onValueChange={(value) =>
                setValue('status', value as 'PENDING' | 'IN_PROGRESS' | 'DONE')
              }
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">Pendente</SelectItem>
                <SelectItem value="IN_PROGRESS">Em andamento</SelectItem>
                <SelectItem value="DONE">Concluída</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={closeForm}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isEditing ? 'Salvar' : 'Criar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
