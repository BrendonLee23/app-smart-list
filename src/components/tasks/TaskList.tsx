'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core'
import {
  SortableContext,
  rectSortingStrategy,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { SortableTaskCard } from './SortableTaskCard'
import { SortableTaskRow } from './SortableTaskRow'
import { TaskCard } from './TaskCard'
import { TaskRow } from './TaskRow'
import { useTasks } from '@/hooks/useTasks'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { ErrorState } from '@/components/shared/ErrorState'
import { EmptyState } from '@/components/shared/EmptyState'
import { Task } from '@/types/task.types'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0 },
  },
}

export function TaskList({ viewMode = 'cards' }: { viewMode?: 'cards' | 'list' }) {
  const { data: tasks, isLoading, isError } = useTasks()
  const [orderedTasks, setOrderedTasks] = useState<Task[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const activeTask = orderedTasks.find((t) => t.id === activeId)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (tasks) setOrderedTasks(tasks)
  }, [tasks])

  const sensors = useSensors(useSensor(PointerSensor))

  if (isLoading) return <LoadingSpinner />
  if (isError) return <ErrorState />
  if (!tasks || tasks.length === 0) return <EmptyState />

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id))
    document.body.classList.add('is-dragging')
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null)
    document.body.classList.remove('is-dragging')
    const { active, over } = event
    if (!over || active.id === over.id) return
    setOrderedTasks((prev) => {
      const oldIndex = prev.findIndex((t) => t.id === active.id)
      const newIndex = prev.findIndex((t) => t.id === over.id)
      return arrayMove(prev, oldIndex, newIndex)
    })
  }

  const showDnd = orderedTasks.length > 1

  if (!showDnd) {
    if (viewMode === 'list') {
      return (
        <div className="flex flex-col gap-2">
          {orderedTasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </div>
      )
    }
    return (
      <motion.div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {orderedTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </AnimatePresence>
      </motion.div>
    )
  }

  if (viewMode === 'list') {
    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={orderedTasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-2">
            {orderedTasks.map((task) => (
              <SortableTaskRow key={task.id} task={task} isDragging={activeId === task.id} />
            ))}
          </div>
        </SortableContext>
        <DragOverlay dropAnimation={{ duration: 180, easing: 'ease' }}>
          {activeTask ? (
            <div className="rotate-1 scale-[1.02] shadow-xl">
              <TaskRow task={activeTask} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    )
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={orderedTasks.map((t) => t.id)} strategy={rectSortingStrategy}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {orderedTasks.map((task) => (
            <SortableTaskCard key={task.id} task={task} isDragging={activeId === task.id} />
          ))}
        </div>
      </SortableContext>
      <DragOverlay dropAnimation={{ duration: 180, easing: 'ease' }}>
        {activeTask ? (
          <div className="rotate-1 scale-105 shadow-2xl">
            <TaskCard task={activeTask} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
