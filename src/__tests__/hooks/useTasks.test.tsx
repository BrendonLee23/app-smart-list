import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useTasks } from '@/hooks/useTasks'
import * as tasksService from '@/services/tasks.service'
import { Task } from '@/types/task.types'

jest.mock('@/services/tasks.service')

const mockGetTasks = tasksService.getTasks as jest.MockedFunction<typeof tasksService.getTasks>

const mockTasks: Task[] = [
  {
    id: 'uuid-1',
    title: 'Tarefa 1',
    description: null,
    status: 'PENDING',
    createdAt: '2026-04-21T00:00:00.000Z',
    updatedAt: '2026-04-21T00:00:00.000Z',
  },
]

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }
  return Wrapper
}

describe('useTasks', () => {
  it('should return tasks on success', async () => {
    mockGetTasks.mockResolvedValue(mockTasks)

    const { result } = renderHook(() => useTasks(), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toEqual(mockTasks)
  })

  it('should return isLoading true initially', () => {
    mockGetTasks.mockImplementation(() => new Promise(() => {}))

    const { result } = renderHook(() => useTasks(), { wrapper: createWrapper() })

    expect(result.current.isLoading).toBe(true)
  })

  it('should return isError true on failure', async () => {
    mockGetTasks.mockRejectedValue(new Error('Erro ao buscar tarefas'))

    const { result } = renderHook(() => useTasks(), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.isError).toBe(true))
  })
})
