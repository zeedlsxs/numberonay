"use client"

import { useEffect, useState } from "react"
import { formatRelativeTime } from "@/lib/utils"
import Card from "@/components/common/Card"
import Button from "@/components/common/Button"
import Input from "@/components/common/Input"
import Badge from "@/components/common/Badge"
import { HelpCircle, MessageSquare, Send } from "lucide-react"

type SupportStatus = "open" | "answered" | "closed"
type SupportCategory = "technical" | "number" | "sms" | "balance" | "account" | "other"

interface SupportTicket {
  id: string
  subject: string
  category: SupportCategory
  message: string
  status: SupportStatus
  createdAt: Date
  updatedAt: Date
}

export default function SupportPage() {
  const [formData, setFormData] = useState({
    subject: "",
    category: "technical" as SupportCategory,
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tickets, setTickets] = useState<SupportTicket[]>([])

  const loadTickets = async () => {
    const response = await fetch("/api/tickets")
    const data = await response.json()
    if (response.ok) {
      setTickets(
        (data.tickets || []).map((ticket: SupportTicket & { createdAt: string; updatedAt: string }) => ({
          ...ticket,
          createdAt: new Date(ticket.createdAt),
          updatedAt: new Date(ticket.updatedAt),
        })),
      )
    }
  }

  useEffect(() => {
    void loadTickets()
  }, [])

  const categories = [
    { value: "technical", label: "Teknik Sorun" },
    { value: "number", label: "Numara Sorunu" },
    { value: "sms", label: "SMS Sorunu" },
    { value: "balance", label: "Bakiye" },
    { value: "account", label: "Hesap" },
    { value: "other", label: "Diğer" },
  ]

  const getStatusBadge = (status: SupportStatus) => {
    const badges = {
      open: { variant: "warning" as const, label: "Açık" },
      answered: { variant: "info" as const, label: "Yanıtlandı" },
      closed: { variant: "success" as const, label: "Kapalı" },
    }
    return badges[status]
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      if (!response.ok) {
        return
      }
      setFormData({ subject: "", category: "technical", message: "" })
      await loadTickets()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#171725] mb-2">Destek Merkezi</h1>
        <p className="text-[#6B7280]">Sorularınız için destek talebi oluşturun.</p>
      </div>

      <div className="grid gap-8">
        {/* New Support Ticket */}
        <Card>
          <h2 className="text-lg font-semibold text-[#171725] mb-4">Yeni Destek Talebi</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Konu"
              placeholder="Sorununuzu kısaca açıklayın"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
            />

            <div>
              <label className="block text-sm font-medium text-[#171725] mb-2">Kategori</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as SupportCategory })}
                className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] bg-white text-[#171725] focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-transparent transition-colors"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#171725] mb-2">Mesaj</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Sorununuzu detaylıca açıklayın..."
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-white text-[#171725] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-transparent transition-colors resize-none"
                required
              />
            </div>

            <Button type="submit" loading={isSubmitting} className="w-full">
              <Send className="w-4 h-4 mr-2" />
              Gönder
            </Button>
          </form>
        </Card>

        {/* Previous Tickets */}
        <Card>
          <h2 className="text-lg font-semibold text-[#171725] mb-4">Destek Talepleri</h2>
          
          {tickets.length === 0 ? (
            <div className="text-center py-8 text-[#6B7280]">
              <HelpCircle className="w-12 h-12 mx-auto mb-3 text-[#9CA3AF]" />
              <p>Henüz destek talebiniz bulunmuyor.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {tickets.map((ticket) => {
                const statusBadge = getStatusBadge(ticket.status)
                const categoryLabel = categories.find(c => c.value === ticket.category)?.label
                return (
                  <div
                    key={ticket.id}
                    className="p-4 bg-[#F8FAFC] rounded-xl hover:bg-[#F5F7FB] transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-medium text-[#171725]">{ticket.subject}</p>
                        <p className="text-sm text-[#6B7280]">{categoryLabel}</p>
                      </div>
                      <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                    </div>
                    <p className="text-sm text-[#6B7280]">{formatRelativeTime(ticket.createdAt)}</p>
                  </div>
                )
              })}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}