'use client'

import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TaskList } from '@/components/tasks/TaskList'
import { TaskForm } from '@/components/tasks/TaskForm'
import { DeleteConfirmDialog } from '@/components/tasks/DeleteConfirmDialog'
import { useTasksContext } from '@/context/TasksContext'
import { ThemeToggle } from '@/components/shared/ThemeToggle'
import { FullscreenToggle } from '@/components/shared/FullscreenToggle'

export function TasksPageClient() {
  const { openCreateForm } = useTasksContext()

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="mb-8 flex items-center justify-between gap-2"
      >
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-bold tracking-tight sm:text-3xl">Smart List</h1>
          <p className="mt-1 text-sm text-muted-foreground">Gerencie suas tarefas</p>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <ThemeToggle />
          <FullscreenToggle />
          <Button onClick={openCreateForm} className="ml-1 sm:ml-2">
            <Plus className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Nova tarefa</span>
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut', delay: 0.15 }}
      >
        <TaskList />
      </motion.div>

      <TaskForm />
      <DeleteConfirmDialog />
    </main>
  )
}
