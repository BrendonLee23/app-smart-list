'use client'

import { useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { Pencil, Trash2 } from 'lucide-react'
import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
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

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
}

interface TaskCardProps {
  task: Task
  dragHandle?: React.ReactNode
}

function DescriptionCell({ description }: { description: string }) {
  const [open, setOpen] = useState(false)

  const truncated = <p className="line-clamp-3 text-sm text-muted-foreground">{description}</p>

  return (
    <>
      {/* Desktop: tooltip on hover */}
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="hidden cursor-default md:block">{truncated}</div>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          className="max-w-xs whitespace-pre-wrap wrap-break-word text-xs"
        >
          {description}
        </TooltipContent>
      </Tooltip>

      {/* Mobile: popover on tap */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button className="block w-full text-left md:hidden" onClick={() => setOpen(true)}>
            {truncated}
          </button>
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          className="max-w-xs whitespace-pre-wrap wrap-break-word text-xs"
        >
          {description}
        </PopoverContent>
      </Popover>
    </>
  )
}

export function TaskCard({ task, dragHandle }: TaskCardProps) {
  const { openEditForm, openDeleteDialog } = useTasksContext()

  return (
    <motion.div
      layout
      variants={cardVariants}
      exit={{ opacity: 0, y: -10, scale: 0.97, transition: { duration: 0.2 } }}
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
    >
      <Card className="flex h-full flex-col transition-shadow hover:shadow-md">
        <CardHeader className="flex flex-row items-start justify-between gap-2 pb-2">
          <div className="flex min-w-0 flex-1 items-center gap-1">
            {dragHandle}
            <CardTitle className="text-base leading-snug">{task.title}</CardTitle>
          </div>
          <Badge variant={statusVariant[task.status]}>{statusLabel[task.status]}</Badge>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-3">
          <div className="flex-1">
            {task.description && <DescriptionCell description={task.description} />}
          </div>
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
