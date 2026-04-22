export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'DONE'

export interface Task {
  id: string
  title: string
  description?: string | null
  status: TaskStatus
  createdAt: string
  updatedAt: string
}

export interface CreateTaskDTO {
  title: string
  description?: string
  status?: TaskStatus
}

export interface UpdateTaskDTO {
  title?: string
  description?: string
  status?: TaskStatus
}
