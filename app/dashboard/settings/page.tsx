import Card from "@/components/common/Card"
import { Settings } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#171725] mb-2">Ayarlar</h1>
        <p className="text-[#6B7280]">Hesap ayarlarınızı yönetin.</p>
      </div>

      <Card>
        <div className="text-center py-12">
          <Settings className="w-16 h-16 mx-auto mb-4 text-[#9CA3AF]" />
          <h2 className="text-xl font-semibold text-[#171725] mb-2">Yakında Aktif</h2>
          <p className="text-[#6B7280]">Ayarlar sayfası yakında aktif olacaktır.</p>
        </div>
      </Card>
    </div>
  )
}