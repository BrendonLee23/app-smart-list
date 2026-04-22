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
      <TaskRow task={task} dragHandle={dragHandle} />
    </div>
  )
}
