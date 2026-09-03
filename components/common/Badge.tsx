import { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info" | "hot"
}

export default function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  const variants = {
    default: "bg-[#F5F7FB] text-[#6B7280]",
    success: "bg-[#DCFCE7] text-[#166534]",
    warning: "bg-[#FEF3C7] text-[#92400E]",
    danger: "bg-[#FEE2E2] text-[#991B1B]",
    info: "bg-[#DBEAFE] text-[#1E40AF]",
    hot: "bg-[#FEF3C7] text-[#92400E]",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    >
      {variant === "hot" && <span className="mr-1">🔥</span>}
      {children}
    </span>
  )
}