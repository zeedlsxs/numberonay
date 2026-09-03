"use client"

import { useState } from "react"
import { Search, ArrowRight } from "lucide-react"
import Card from "@/components/common/Card"
import Badge from "@/components/common/Badge"
import { services } from "@/data/services"

export default function ServiceSelection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedService, setSelectedService] = useState<string | null>(null)

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.slug.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <section id="services" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-[#171725]">1. Servis Seçin</h2>
            <button className="p-2 rounded-lg hover:bg-[#F5F7FB] text-[#6B7280] transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
              <input
                type="text"
                placeholder="Servis ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] text-[#171725] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-transparent transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredServices.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`w-full flex items-center justify-between p-4 rounded-xl transition-colors ${
                  selectedService === service.id
                    ? "bg-[#2196F3] text-white"
                    : "bg-[#F8FAFC] hover:bg-[#F5F7FB] text-[#171725]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{service.icon}</span>
                  <span className="font-medium">{service.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {service.isHot && <Badge variant="hot">HOT</Badge>}
                  {selectedService === service.id && (
                    <ArrowRight className="w-5 h-5" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {selectedService && (
            <div className="mt-6 pt-6 border-t border-[#E5E7EB]">
              <p className="text-sm text-[#6B7280] mb-4">
                Seçilen servis: <span className="font-medium text-[#171725]">
                  {services.find(s => s.id === selectedService)?.name}
                </span>
              </p>
              <button className="w-full py-3 bg-[#2196F3] text-white rounded-xl hover:bg-[#1E88E5] transition-colors font-medium">
                Devam Et
              </button>
            </div>
          )}
        </Card>
      </div>
    </section>
  )
}