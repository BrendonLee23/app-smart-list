import { render, screen, fireEvent } from '@testing-library/react'
import { TooltipProvider } from '@/components/ui/tooltip'
import { TaskCard } from '@/components/tasks/TaskCard'
import { Task } from '@/types/task.types'

const mockOpenEditForm = jest.fn()
const mockOpenDeleteDialog = jest.fn()

jest.mock('@/context/TasksContext', () => ({
  useTasksContext: () => ({
    openEditForm: mockOpenEditForm,
    openDeleteDialog: mockOpenDeleteDialog,
  }),
}))

jest.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      layout: _layout,
      initial: _initial,
      animate: _animate,
      exit: _exit,
      transition: _transition,
      ...props
    }: React.HTMLAttributes<HTMLDivElement> & {
      layout?: unknown
      initial?: unknown
      animate?: unknown
      exit?: unknown
      transition?: unknown
    }) => <div {...props}>{children}</div>,
  },
}))

const mockTask: Task = {
  id: 'uuid-1',
  title: 'Tarefa de teste',
  description: 'Descrição da tarefa',
  status: 'PENDING',
  createdAt: '2026-04-21T00:00:00.000Z',
  updatedAt: '2026-04-21T00:00:00.000Z',
}

const renderWithProvider = (ui: React.ReactElement) =>
  render(<TooltipProvider>{ui}</TooltipProvider>)

describe('TaskCard', () => {
  it('should render task title and description', () => {
    renderWithProvider(<TaskCard task={mockTask} />)

    expect(screen.getByText('Tarefa de teste')).toBeInTheDocument()
    expect(screen.getAllByText('Descrição da tarefa').length).toBeGreaterThan(0)
  })

  it('should render the correct status badge for PENDING', () => {
    renderWithProvider(<TaskCard task={mockTask} />)
    expect(screen.getByText('Pendente')).toBeInTheDocument()
  })

  it('should render the correct status badge for IN_PROGRESS', () => {
    renderWithProvider(<TaskCard task={{ ...mockTask, status: 'IN_PROGRESS' }} />)
    expect(screen.getByText('Em andamento')).toBeInTheDocument()
  })

  it('should render the correct status badge for DONE', () => {
    renderWithProvider(<TaskCard task={{ ...mockTask, status: 'DONE' }} />)
    expect(screen.getByText('Concluída')).toBeInTheDocument()
  })

  it('should call openEditForm when edit button is clicked', () => {
    renderWithProvider(<TaskCard task={mockTask} />)
    fireEvent.click(screen.getByLabelText('Editar tarefa'))
    expect(mockOpenEditForm).toHaveBeenCalledWith(mockTask)
  })

  it('should call openDeleteDialog when delete button is clicked', () => {
    renderWithProvider(<TaskCard task={mockTask} />)
    fireEvent.click(screen.getByLabelText('Excluir tarefa'))
    expect(mockOpenDeleteDialog).toHaveBeenCalledWith(mockTask)
  })

  it('should not render description when it is null', () => {
    renderWithProvider(<TaskCard task={{ ...mockTask, description: null }} />)
    expect(screen.queryByText('Descrição da tarefa')).not.toBeInTheDocument()
  })
})
