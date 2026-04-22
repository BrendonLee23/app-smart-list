'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import { TaskRow } from './TaskRow'
import { Task } from '@/types/task.types'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

interface SortableTaskRowProps {
  task: Task
  isDragging?: boolean
}

export function SortableTaskRow({ task, isDragging = false }: SortableTaskRowProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  }

  const dragHandle = (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className="shrink-0 cursor-grab text-muted-foreground hover:text-foreground active:cursor-grabbing"
          aria-label="Arrastar tarefa"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" className="text-xs">
        Arraste para reordenar
      </TooltipContent>
    </Tooltip>
  )

  return (
    <div ref={setNodeRef} style={style}>
      <TaskRow task={task} dragHandle={dragHandle} />
    </div>
  )
}
