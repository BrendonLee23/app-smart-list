'use client'

import { createContext, useContext, useState } from 'react'
import { Task } from '@/types/task.types'

interface TasksContextValue {
  selectedTask: Task | null
  isFormOpen: boolean
  isDeleteOpen: boolean
  openCreateForm: () => void
  openEditForm: (task: Task) => void
  closeForm: () => void
  openDeleteDialog: (task: Task) => void
  closeDeleteDialog: () => void
}

const TasksContext = createContext<TasksContextValue | null>(null)

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  function openCreateForm() {
    setSelectedTask(null)
    setIsFormOpen(true)
  }

  function openEditForm(task: Task) {
    setSelectedTask(task)
    setIsFormOpen(true)
  }

  function closeForm() {
    setIsFormOpen(false)
    setSelectedTask(null)
  }

  function openDeleteDialog(task: Task) {
    setSelectedTask(task)
    setIsDeleteOpen(true)
  }

  function closeDeleteDialog() {
    setIsDeleteOpen(false)
    setSelectedTask(null)
  }

  return (
    <TasksContext.Provider
      value={{
        selectedTask,
        isFormOpen,
        isDeleteOpen,
        openCreateForm,
        openEditForm,
        closeForm,
        openDeleteDialog,
        closeDeleteDialog,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}

export function useTasksContext() {
  const ctx = useContext(TasksContext)
  if (!ctx) throw new Error('useTasksContext must be used within TasksProvider')
  return ctx
}
