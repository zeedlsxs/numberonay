import { ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger"
  size?: "sm" | "md" | "lg"
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, disabled, children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    
    const variants = {
      primary: "bg-[#2196F3] text-white hover:bg-[#1E88E5] focus-visible:ring-[#2196F3]",
      secondary: "bg-[#29364A] text-white hover:bg-[#2D3A4F] focus-visible:ring-[#29364A]",
      outline: "border-2 border-[#2196F3] text-[#2196F3] hover:bg-[#2196F3] hover:text-white focus-visible:ring-[#2196F3]",
      ghost: "text-[#6B7280] hover:text-[#111827] hover:bg-[#F5F7FB] focus-visible:ring-[#6B7280]",
      danger: "bg-[#EF4444] text-white hover:bg-[#DC2626] focus-visible:ring-[#EF4444]",
    }
    
    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-13 px-8 text-lg",
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Yükleniyor...
          </span>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = "Button"

export default Button