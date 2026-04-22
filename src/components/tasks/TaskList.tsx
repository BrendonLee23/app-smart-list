'use client'

import { AnimatePresence } from 'framer-motion'
import { TaskCard } from './TaskCard'
import { useTasks } from '@/hooks/useTasks'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { ErrorState } from '@/components/shared/ErrorState'
import { EmptyState } from '@/components/shared/EmptyState'

export function TaskList() {
  const { data: tasks, isLoading, isError } = useTasks()

  if (isLoading) return <LoadingSpinner />
  if (isError) return <ErrorState />
  if (!tasks || tasks.length === 0) return <EmptyState />

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </AnimatePresence>
    </div>
  )
}
