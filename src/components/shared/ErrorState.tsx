import { AlertCircle } from 'lucide-react'

interface ErrorStateProps {
  message?: string
}

export function ErrorState({ message = 'Ocorreu um erro ao carregar os dados.' }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-destructive">
      <AlertCircle className="h-10 w-10" />
      <p className="text-sm">{message}</p>
    </div>
  )
}
