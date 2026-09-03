"use client"

import { useEffect, useState } from "react"
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react"
import { cn } from "@/lib/utils"

type ToastType = "success" | "error" | "warning" | "info"

interface ToastProps {
  type: ToastType
  message: string
  duration?: number
  onClose: () => void
}

export default function Toast({ type, message, duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-[#25C48A]" />,
    error: <XCircle className="w-5 h-5 text-[#EF4444]" />,
    warning: <AlertCircle className="w-5 h-5 text-[#FFC107]" />,
    info: <Info className="w-5 h-5 text-[#2196F3]" />,
  }

  const backgrounds = {
    success: "bg-white border-[#25C48A]",
    error: "bg-white border-[#EF4444]",
    warning: "bg-white border-[#FFC107]",
    info: "bg-white border-[#2196F3]",
  }

  return (
    <div
      className={cn(
        "fixed top-4 right-4 z-50 flex items-center gap-3 p-4 rounded-xl border shadow-lg transition-all duration-300",
        backgrounds[type],
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
      )}
    >
      {icons[type]}
      <p className="text-sm font-medium text-[#171725]">{message}</p>
      <button
        onClick={() => {
          setIsVisible(false)
          setTimeout(onClose, 300)
        }}
        className="p-1 rounded-lg hover:bg-[#F5F7FB] text-[#6B7280] hover:text-[#171725] transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}