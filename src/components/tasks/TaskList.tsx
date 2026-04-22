'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { TaskCard } from './TaskCard'
import { useTasks } from '@/hooks/useTasks'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { ErrorState } from '@/components/shared/ErrorState'
import { EmptyState } from '@/components/shared/EmptyState'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0 },
  },
}

export function TaskList() {
  const { data: tasks, isLoading, isError } = useTasks()

  if (isLoading) return <LoadingSpinner />
  if (isError) return <ErrorState />
  if (!tasks || tasks.length === 0) return <EmptyState />

  return (
    <motion.div
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
