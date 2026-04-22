import { ClipboardList } from 'lucide-react'

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-muted-foreground">
      <ClipboardList className="h-12 w-12" />
      <p className="text-sm">Nenhuma tarefa encontrada. Crie sua primeira tarefa!</p>
    </div>
  )
}
