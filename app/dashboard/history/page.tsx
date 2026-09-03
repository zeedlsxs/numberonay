"use client"

import { useEffect, useState } from "react"
import Card from "@/components/common/Card"
import { formatCurrency, formatRelativeTime } from "@/lib/utils"
import { History } from "lucide-react"

type Transaction = {
  id: string
  type: string
  amount: number
  status: string
  description: string
  createdAt: string
}

export default function HistoryPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    void fetch("/api/wallet")
      .then((res) => res.json())
      .then((data) => setTransactions(data.transactions || []))
  }, [])

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#171725] mb-2">İşlem Geçmişi</h1>
        <p className="text-[#6B7280]">Tüm işlemlerinizi görüntüleyin.</p>
      </div>

      <Card>
        {transactions.length === 0 ? (
          <div className="text-center py-12">
            <History className="w-16 h-16 mx-auto mb-4 text-[#9CA3AF]" />
            <h2 className="text-xl font-semibold text-[#171725] mb-2">Henüz İşlem Yok</h2>
            <p className="text-[#6B7280]">İşlem geçmişiniz boş.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-xl">
                <div>
                  <p className="font-medium text-[#171725]">{tx.description}</p>
                  <p className="text-sm text-[#6B7280]">{formatRelativeTime(tx.createdAt)}</p>
                </div>
                <p className={`font-semibold ${tx.amount >= 0 ? "text-[#25C48A]" : "text-[#EF4444]"}`}>
                  {formatCurrency(tx.amount / 100)}
                </p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
