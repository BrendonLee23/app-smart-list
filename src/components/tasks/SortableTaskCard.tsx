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
          className="-ml-1 flex shrink-0 cursor-grab items-center justify-center rounded p-1 text-muted-foreground hover:text-foreground active:cursor-grabbing md:p-0.5"
          style={{ touchAction: 'none' }}
          aria-label="Arrastar tarefa"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-7 w-7 md:h-5 md:w-5" />
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
