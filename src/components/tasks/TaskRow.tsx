'use client'

import { Pencil, Trash2 } from 'lucide-react'
import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Task, TaskStatus } from '@/types/task.types'
import { useTasksContext } from '@/context/TasksContext'

const statusLabel: Record<TaskStatus, string> = {
  PENDING: 'Pendente',
  IN_PROGRESS: 'Em andamento',
  DONE: 'Concluída',
}

const statusVariant: Record<TaskStatus, 'default' | 'secondary' | 'outline'> = {
  PENDING: 'outline',
  IN_PROGRESS: 'secondary',
  DONE: 'default',
}

interface TaskRowProps {
  task: Task
  dragHandle?: React.ReactNode
}

export function TaskRow({ task, dragHandle }: TaskRowProps) {
  const { openEditForm, openDeleteDialog } = useTasksContext()

  return (
    <div className="flex items-center gap-3 rounded-lg border bg-card px-4 py-3 transition-shadow hover:shadow-sm">
      {dragHandle}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{task.title}</p>
        {task.description && (
          <p className="truncate text-xs text-muted-foreground">{task.description}</p>
        )}
      </div>
      <Badge variant={statusVariant[task.status]} className="shrink-0">
        {statusLabel[task.status]}
      </Badge>
      <div className="flex shrink-0 gap-1">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => openEditForm(task)}
          aria-label="Editar tarefa"
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="text-destructive hover:text-destructive"
          onClick={() => openDeleteDialog(task)}
          aria-label="Excluir tarefa"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
