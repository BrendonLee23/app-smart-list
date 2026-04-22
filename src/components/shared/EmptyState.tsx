'use client'

import { motion } from 'framer-motion'
import { ClipboardList } from 'lucide-react'

export function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center gap-3 py-20 text-muted-foreground"
    >
      <ClipboardList className="h-12 w-12" />
      <p className="text-sm">Nenhuma tarefa encontrada. Crie sua primeira tarefa!</p>
    </motion.div>
  )
}
