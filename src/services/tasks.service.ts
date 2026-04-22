import api from '@/utils/api'
import { Task, CreateTaskDTO, UpdateTaskDTO } from '@/types/task.types'

interface ApiResponse<T> {
  status: number
  success: boolean
  data: T
}

export async function getTasks(): Promise<Task[]> {
  const { data } = await api.get<ApiResponse<Task[]>>('/tasks')
  return data.data
}

export async function getTaskById(id: string): Promise<Task> {
  const { data } = await api.get<ApiResponse<Task>>(`/tasks/${id}`)
  return data.data
}

export async function createTask(payload: CreateTaskDTO): Promise<Task> {
  const { data } = await api.post<ApiResponse<Task>>('/tasks', payload)
  return data.data
}

export async function updateTask(id: string, payload: UpdateTaskDTO): Promise<Task> {
  const { data } = await api.put<ApiResponse<Task>>(`/tasks/${id}`, payload)
  return data.data
}

export async function deleteTask(id: string): Promise<void> {
  await api.delete(`/tasks/${id}`)
}
