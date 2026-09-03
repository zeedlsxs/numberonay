import Link from "next/link"
import { redirect } from "next/navigation"
import { formatCurrency, formatRelativeTime } from "@/lib/utils"
import Card from "@/components/common/Card"
import Button from "@/components/common/Button"
import { getSessionUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { LayoutDashboard, MessageSquare, CheckCircle, XCircle, Clock, Wallet } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const user = await getSessionUser()
  if (!user) {
    redirect("/login")
  }

  const [active, completed, cancelled, recent] = await Promise.all([
    prisma.activation.count({
      where: { userId: user.id, status: { in: ["WAITING_SMS", "SMS_RECEIVED"] } },
    }),
    prisma.activation.count({
      where: { userId: user.id, status: "COMPLETED" },
    }),
    prisma.activation.count({
      where: { userId: user.id, status: { in: ["CANCELLED", "EXPIRED"] } },
    }),
    prisma.activation.findMany({
      where: { userId: user.id },
      include: { service: true, country: true },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ])

  const stats = [
    {
      label: "Bakiye",
      value: formatCurrency(user.balance / 100),
      icon: <Wallet className="w-6 h-6" />,
      color: "bg-[#2196F3]",
    },
    {
      label: "Aktif İşlem",
      value: String(active),
      icon: <Clock className="w-6 h-6" />,
      color: "bg-[#FFC107]",
    },
    {
      label: "Tamamlanan İşlem",
      value: String(completed),
      icon: <CheckCircle className="w-6 h-6" />,
      color: "bg-[#25C48A]",
    },
    {
      label: "İptal Edilen İşlem",
      value: String(cancelled),
      icon: <XCircle className="w-6 h-6" />,
      color: "bg-[#EF4444]",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#171725] mb-2">
          Hoş geldiniz, {user.name || user.email}
        </h1>
        <p className="text-[#6B7280]">Panelinize erişebilirsiniz.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} className="hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center text-white`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-[#6B7280]">{stat.label}</p>
                <p className="text-2xl font-bold text-[#171725]">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mb-8">
        <h2 className="text-lg font-semibold text-[#171725] mb-4">Hızlı İşlemler</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/dashboard/sms">
            <Button className="w-full h-12 text-base">
              <MessageSquare className="w-5 h-5 mr-2" />
              Yeni Numara Al
            </Button>
          </Link>
          <Link href="/dashboard/wallet">
            <Button variant="outline" className="w-full h-12 text-base">
              Bakiye Yükle
            </Button>
          </Link>
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-[#171725] mb-4">Son Aktiviteler</h2>
        <div className="space-y-3">
          {recent.length === 0 ? (
            <div className="text-center py-8 text-[#6B7280]">
              <LayoutDashboard className="w-12 h-12 mx-auto mb-3 text-[#9CA3AF]" />
              <p>Henüz aktiviteniz yok</p>
              <Link href="/dashboard/sms" className="text-[#2196F3] hover:underline mt-2 inline-block">
                İlk numaranızı alın
              </Link>
            </div>
          ) : (
            recent.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{activity.country.flag}</span>
                  <div>
                    <p className="font-medium text-[#171725]">{activity.service.name}</p>
                    <p className="text-sm text-[#6B7280]">{activity.country.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-[#6B7280]">{formatRelativeTime(activity.createdAt)}</span>
                  {activity.status === "COMPLETED" && (
                    <div className="w-6 h-6 rounded-full bg-[#DCFCE7] flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-[#166534]" />
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  )
}
