"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { formatCurrency, formatRelativeTime } from "@/lib/utils"
import Card from "@/components/common/Card"
import Badge from "@/components/common/Badge"
import Button from "@/components/common/Button"
import Modal from "@/components/common/Modal"
import EmptyState from "@/components/common/EmptyState"
import { MessageSquare, Clock, CheckCircle, XCircle, AlertCircle, Copy } from "lucide-react"

type ActivationStatus = "WAITING_SMS" | "SMS_RECEIVED" | "COMPLETED" | "CANCELLED" | "EXPIRED"

interface Activation {
  id: string
  service: string
  country: string
  flag: string
  phoneNumber: string
  price: number
  status: ActivationStatus
  smsCode?: string
  smsText?: string
  createdAt: Date
  expiresAt: Date
}

export default function ActivationsPage() {
  const router = useRouter()
  const [selectedTab, setSelectedTab] = useState<"active" | "completed" | "cancelled">("active")
  const [selectedActivation, setSelectedActivation] = useState<Activation | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [activations, setActivations] = useState<Activation[]>([])
  const [checking, setChecking] = useState(false)

  useEffect(() => {
    void fetch("/api/activations")
      .then((res) => res.json())
      .then((data) => {
        const items = (data.activations || []).map((item: Activation & { createdAt: string; expiresAt: string }) => ({
          ...item,
          createdAt: new Date(item.createdAt),
          expiresAt: new Date(item.expiresAt),
        }))
        setActivations(items)
      })
  }, [])

  const getStatusBadge = (status: ActivationStatus) => {
    const badges = {
      WAITING_SMS: { variant: "warning" as const, label: "SMS Bekleniyor" },
      SMS_RECEIVED: { variant: "info" as const, label: "SMS Geldi" },
      COMPLETED: { variant: "success" as const, label: "Tamamlandı" },
      CANCELLED: { variant: "danger" as const, label: "İptal Edildi" },
      EXPIRED: { variant: "default" as const, label: "Süresi Doldu" },
    }
    return badges[status]
  }

  const getStatusIcon = (status: ActivationStatus) => {
    const icons = {
      WAITING_SMS: <Clock className="w-5 h-5" />,
      SMS_RECEIVED: <MessageSquare className="w-5 h-5" />,
      COMPLETED: <CheckCircle className="w-5 h-5" />,
      CANCELLED: <XCircle className="w-5 h-5" />,
      EXPIRED: <AlertCircle className="w-5 h-5" />,
    }
    return icons[status]
  }

  const filteredActivations = activations.filter(activation => {
    if (selectedTab === "active") {
      return activation.status === "WAITING_SMS" || activation.status === "SMS_RECEIVED"
    }
    if (selectedTab === "completed") {
      return activation.status === "COMPLETED"
    }
    if (selectedTab === "cancelled") {
      return activation.status === "CANCELLED" || activation.status === "EXPIRED"
    }
    return true
  })

  const handleViewDetail = (activation: Activation) => {
    setSelectedActivation(activation)
    setIsDetailModalOpen(true)
  }

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    // Show toast notification here
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#171725] mb-2">Aktivasyonlarım</h1>
        <p className="text-[#6B7280]">SMS aktivasyonlarınızı takip edin.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { id: "active" as const, label: "Aktif" },
          { id: "completed" as const, label: "Tamamlandı" },
          { id: "cancelled" as const, label: "İptal Edildi" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`px-4 py-2 rounded-xl font-medium transition-colors whitespace-nowrap ${
              selectedTab === tab.id
                ? "bg-[#2196F3] text-white"
                : "bg-white text-[#6B7280] hover:bg-[#F5F7FB]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Activations List */}
      {filteredActivations.length === 0 ? (
        <Card>
          <EmptyState
            icon={<MessageSquare className="w-16 h-16" />}
            title="Henüz aktivasyonunuz yok"
            description="İlk numaranızı alarak SMS doğrulama işlemlerine başlayın."
            action={{
              label: "Numara Al",
              onClick: () => router.push("/dashboard/sms"),
            }}
          />
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredActivations.map((activation) => {
            const statusBadge = getStatusBadge(activation.status)
            return (
              <Card key={activation.id} className="hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#F8FAFC] rounded-xl flex items-center justify-center">
                      <span className="text-2xl">{activation.flag}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-[#171725]">{activation.service}</p>
                      <p className="text-sm text-[#6B7280]">{activation.country}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-medium text-[#171725]">{formatCurrency(activation.price / 100)}</p>
                      <p className="text-sm text-[#6B7280]">{formatRelativeTime(activation.createdAt)}</p>
                    </div>
                    <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetail(activation)}
                    >
                      Detay
                    </Button>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}

      {/* Activation Detail Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title="Aktivasyon Detayı"
        size="lg"
      >
        {selectedActivation && (
          <div className="space-y-6">
            {/* Phone Number */}
            <div className="bg-[#F8FAFC] rounded-xl p-4">
              <p className="text-sm text-[#6B7280] mb-1">Numaranız</p>
              <div className="flex items-center justify-between">
                <p className="text-xl font-semibold text-[#171725]">{selectedActivation.phoneNumber}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigator.clipboard.writeText(selectedActivation.phoneNumber)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Service Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-[#6B7280] mb-1">Servis</p>
                <p className="font-medium text-[#171725]">{selectedActivation.service}</p>
              </div>
              <div>
                <p className="text-sm text-[#6B7280] mb-1">Ülke</p>
                <p className="font-medium text-[#171725]">{selectedActivation.country}</p>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-3">
              {getStatusIcon(selectedActivation.status)}
              <div>
                <p className="text-sm text-[#6B7280] mb-1">Durum</p>
                <Badge variant={getStatusBadge(selectedActivation.status).variant}>
                  {getStatusBadge(selectedActivation.status).label}
                </Badge>
              </div>
            </div>

            {/* SMS Code */}
            {selectedActivation.smsCode && (
              <div className="bg-[#DCFCE7] rounded-xl p-6 text-center">
                <p className="text-sm text-[#166534] mb-2">Doğrulama Kodunuz</p>
                <p className="text-3xl font-bold text-[#166534] mb-4">{selectedActivation.smsCode}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopyCode(selectedActivation.smsCode!)}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Kopyala
                </Button>
              </div>
            )}

            {/* Timer */}
            {selectedActivation.status === "WAITING_SMS" && (
              <div className="text-center space-y-3">
                <p className="text-sm text-[#6B7280] mb-1">SMS henüz gelmedi</p>
                <Button
                  loading={checking}
                  onClick={async () => {
                    setChecking(true)
                    try {
                      const response = await fetch(`/api/activations/${selectedActivation.id}/check`, {
                        method: "POST",
                      })
                      const data = await response.json()
                      if (data.activation) {
                        const next = {
                          ...selectedActivation,
                          status: data.activation.status,
                          smsCode: data.activation.smsCode,
                          smsText: data.activation.smsText,
                        }
                        setSelectedActivation(next)
                        setActivations((current) =>
                          current.map((item) => (item.id === next.id ? { ...item, ...next } : item)),
                        )
                      }
                    } finally {
                      setChecking(false)
                    }
                  }}
                >
                  SMS Kontrol Et
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}