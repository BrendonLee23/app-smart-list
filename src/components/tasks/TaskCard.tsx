'use client'

import { motion } from 'framer-motion'
import { Pencil, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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

interface TaskCardProps {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  const { openEditForm, openDeleteDialog } = useTasksContext()

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-start justify-between gap-2 pb-2">
          <CardTitle className="text-base leading-snug">{task.title}</CardTitle>
          <Badge variant={statusVariant[task.status]}>{statusLabel[task.status]}</Badge>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {task.description && (
            <p className="text-sm text-muted-foreground line-clamp-3">{task.description}</p>
          )}
          <div className="flex justify-end gap-2">
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
        </CardContent>
      </Card>
    </motion.div>
  )
}
