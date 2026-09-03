import { activities } from "@/data/activities"
import Card from "@/components/common/Card"
import { Check } from "lucide-react"

export default function RecentActivity() {
  return (
    <section className="py-16 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="max-w-4xl mx-auto bg-[#DBEAFE] border-[#2196F3]">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-[#171725] flex items-center gap-2">
              🔥 Son Aktivite
            </h2>
            <p className="text-sm text-[#6B7280] mt-1">
              Platform üzerindeki son tamamlanan işlemler
            </p>
            <span className="inline-block mt-2 px-2 py-1 bg-[#FEF3C7] text-[#92400E] text-xs rounded-full">
              Demo verileri
            </span>
          </div>

          <div className="space-y-3">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 bg-white rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{activity.flag}</span>
                  <div>
                    <p className="font-medium text-[#171725]">{activity.service}</p>
                    <p className="text-sm text-[#6B7280]">{activity.country}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-[#6B7280]">{activity.timeAgo}</span>
                  <div className="w-6 h-6 rounded-full bg-[#DCFCE7] flex items-center justify-center">
                    <Check className="w-4 h-4 text-[#166534]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}