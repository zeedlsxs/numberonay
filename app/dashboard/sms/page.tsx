"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, ArrowRight } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import Card from "@/components/common/Card"
import Button from "@/components/common/Button"
import Badge from "@/components/common/Badge"
import Toast from "@/components/common/Toast"
import { services } from "@/data/services"
import { countries } from "@/data/countries"

export default function SMSPage() {
  const router = useRouter()
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [serviceSearch, setServiceSearch] = useState("")
  const [countrySearch, setCountrySearch] = useState("")
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)
  const [isBuying, setIsBuying] = useState(false)
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null)

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(serviceSearch.toLowerCase()) ||
    service.slug.toLowerCase().includes(serviceSearch.toLowerCase())
  )

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
    country.isoCode.toLowerCase().includes(countrySearch.toLowerCase())
  )

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId)
    setStep(2)
  }

  const handleCountrySelect = (countryId: string) => {
    setSelectedCountry(countryId)
    setStep(3)
    if (selectedService) {
      void fetch(`/api/catalog/offer?serviceId=${selectedService}&countryId=${countryId}`)
        .then((res) => res.json())
        .then((data) => {
          setPrice(Number(data.price) || 2000)
          setStock(Number(data.stock) || 0)
        })
        .catch(() => {
          setPrice(2000)
          setStock(0)
        })
    }
  }

  const handleBack = () => {
    if (step === 3) {
      setStep(2)
      setSelectedCountry(null)
    } else if (step === 2) {
      setStep(1)
      setSelectedService(null)
    }
  }

  const handlePurchase = async () => {
    if (!selectedService || !selectedCountry) return
    setIsBuying(true)
    try {
      const response = await fetch("/api/activations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: selectedService,
          countryId: selectedCountry,
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        setToast({ type: "error", message: data.error || "Numara alınamadı." })
        return
      }
      router.push("/dashboard/activations")
    } catch {
      setToast({ type: "error", message: "Sunucuya bağlanılamadı." })
    } finally {
      setIsBuying(false)
    }
  }

  const selectedServiceData = services.find(s => s.id === selectedService)
  const selectedCountryData = countries.find(c => c.id === selectedCountry)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#171725] mb-2">SMS Onay</h1>
        <p className="text-[#6B7280]">Sanal numara alın ve SMS doğrulama işlemlerinizi tamamlayın.</p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <StepIndicator number={1} title="Servis" active={step === 1} completed={step > 1} />
        <div className="w-12 h-0.5 bg-[#E5E7EB]" />
        <StepIndicator number={2} title="Ülke" active={step === 2} completed={step > 2} />
        <div className="w-12 h-0.5 bg-[#E5E7EB]" />
        <StepIndicator number={3} title="Numara" active={step === 3} completed={false} />
      </div>

      <Card>
        {/* Step 1: Service Selection */}
        {step === 1 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#171725]">Servis Seçin</h2>
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
                  value={serviceSearch}
                  onChange={(e) => setServiceSearch(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] text-[#171725] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-transparent transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredServices.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceSelect(service.id)}
                  className="w-full flex items-center justify-between p-4 rounded-xl transition-colors bg-[#F8FAFC] hover:bg-[#F5F7FB] text-[#171725]"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{service.icon}</span>
                    <span className="font-medium">{service.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {service.isHot && <Badge variant="hot">HOT</Badge>}
                    <ArrowRight className="w-5 h-5 text-[#6B7280]" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Country Selection */}
        {step === 2 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#171725]">Ülke Seçin</h2>
              <button onClick={handleBack} className="text-[#6B7280] hover:text-[#171725] transition-colors">
                Geri
              </button>
            </div>

            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                <input
                  type="text"
                  placeholder="Ülke ara..."
                  value={countrySearch}
                  onChange={(e) => setCountrySearch(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] text-[#171725] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-transparent transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredCountries.map((country) => (
                <button
                  key={country.id}
                  onClick={() => handleCountrySelect(country.id)}
                  className="w-full flex items-center justify-between p-4 rounded-xl transition-colors bg-[#F8FAFC] hover:bg-[#F5F7FB] text-[#171725]"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{country.flag}</span>
                    <span className="font-medium">{country.name}</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#6B7280]" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Purchase */}
        {step === 3 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#171725]">Numara Alın</h2>
              <button onClick={handleBack} className="text-[#6B7280] hover:text-[#171725] transition-colors">
                Geri
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-[#F8FAFC] rounded-xl">
                <span className="text-2xl">{selectedServiceData?.icon}</span>
                <div>
                  <p className="text-sm text-[#6B7280]">Servis</p>
                  <p className="font-medium text-[#171725]">{selectedServiceData?.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-[#F8FAFC] rounded-xl">
                <span className="text-2xl">{selectedCountryData?.flag}</span>
                <div>
                  <p className="text-sm text-[#6B7280]">Ülke</p>
                  <p className="font-medium text-[#171725]">{selectedCountryData?.name}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-[#F8FAFC] rounded-xl">
                  <p className="text-sm text-[#6B7280]">Fiyat</p>
                  <p className="font-medium text-[#171725]">{formatCurrency(price / 100)}</p>
                </div>
                <div className="p-4 bg-[#F8FAFC] rounded-xl">
                  <p className="text-sm text-[#6B7280]">Stok</p>
                  <p className="font-medium text-[#171725]">{stock}</p>
                </div>
              </div>

              <Button onClick={handlePurchase} className="w-full" size="lg" loading={isBuying}>
                Numara Al
              </Button>

              <p className="text-xs text-[#6B7280] text-center">
                * Demo modunda çalışmaktadır. Gerçek SMS sağlayıcısı bağlanmadı.
              </p>
            </div>
          </div>
        )}
      </Card>

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}

function StepIndicator({ number, title, active, completed }: { number: number; title: string; active: boolean; completed: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
          active ? "bg-[#2196F3] text-white" : completed ? "bg-[#25C48A] text-white" : "bg-[#E5E7EB] text-[#6B7280]"
        }`}
      >
        {completed ? "✓" : number}
      </div>
      <span className={`text-sm font-medium ${active ? "text-[#171725]" : "text-[#6B7280]"}`}>
        {title}
      </span>
    </div>
  )
}