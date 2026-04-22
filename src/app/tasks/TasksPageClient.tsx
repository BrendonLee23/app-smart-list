'use client'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TaskList } from '@/components/tasks/TaskList'
import { TaskForm } from '@/components/tasks/TaskForm'
import { DeleteConfirmDialog } from '@/components/tasks/DeleteConfirmDialog'
import { useTasksContext } from '@/context/TasksContext'

export function TasksPageClient() {
  const { openCreateForm } = useTasksContext()

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Smart List</h1>
          <p className="mt-1 text-sm text-muted-foreground">Gerencie suas tarefas</p>
        </div>
        <Button onClick={openCreateForm}>
          <Plus className="mr-2 h-4 w-4" />
          Nova tarefa
        </Button>
      </div>

      <TaskList />
      <TaskForm />
      <DeleteConfirmDialog />
    </main>
  )
}
