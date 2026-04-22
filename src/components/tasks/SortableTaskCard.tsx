'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import { TaskCard } from './TaskCard'
import { Task } from '@/types/task.types'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

interface SortableTaskCardProps {
  task: Task
  isDragging?: boolean
}

export function SortableTaskCard({ task, isDragging = false }: SortableTaskCardProps) {
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
      <TaskCard task={task} dragHandle={dragHandle} />
    </div>
  )
}
