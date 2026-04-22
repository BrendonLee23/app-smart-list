import { render, screen } from '@testing-library/react'
import { EmptyState } from '@/components/shared/EmptyState'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { ErrorState } from '@/components/shared/ErrorState'

describe('App Health', () => {
  it('should render EmptyState without crashing', () => {
    render(<EmptyState />)
    expect(screen.getByText(/Nenhuma tarefa encontrada/)).toBeInTheDocument()
  })

  it('should render LoadingSpinner without crashing', () => {
    const { container } = render(<LoadingSpinner />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('should render ErrorState with default message', () => {
    render(<ErrorState />)
    expect(screen.getByText(/Ocorreu um erro ao carregar/)).toBeInTheDocument()
  })

  it('should render ErrorState with custom message', () => {
    render(<ErrorState message="Erro customizado" />)
    expect(screen.getByText('Erro customizado')).toBeInTheDocument()
  })
})
