"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccordionItem {
  id: string
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItem[]
  allowMultiple?: boolean
}

export default function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev)
      if (allowMultiple) {
        if (newSet.has(id)) {
          newSet.delete(id)
        } else {
          newSet.add(id)
        }
      } else {
        // Close all others and toggle current
        return newSet.has(id) ? new Set() : new Set([id])
      }
      return newSet
    })
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden"
        >
          <button
            onClick={() => toggleItem(item.id)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-[#F8FAFC] transition-colors"
          >
            <span className="font-medium text-[#171725]">{item.question}</span>
            <ChevronDown
              className={cn(
                "w-5 h-5 text-[#6B7280] transition-transform duration-200",
                openItems.has(item.id) && "rotate-180"
              )}
            />
          </button>
          <div
            className={cn(
              "overflow-hidden transition-all duration-200 ease-in-out",
              openItems.has(item.id) ? "max-h-96" : "max-h-0"
            )}
          >
            <div className="p-4 pt-0 text-[#6B7280]">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}