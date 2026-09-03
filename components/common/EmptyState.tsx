import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export default function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 px-4 text-center", className)}>
      {icon && (
        <div className="w-16 h-16 mb-4 flex items-center justify-center text-[#9CA3AF]">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-[#171725] mb-2">{title}</h3>
      {description && (
        <p className="text-[#6B7280] mb-6 max-w-md">{description}</p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-2 bg-[#2196F3] text-white rounded-xl hover:bg-[#1E88E5] transition-colors font-medium"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}