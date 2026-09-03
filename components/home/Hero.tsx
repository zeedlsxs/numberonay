import Link from "next/link"
import Button from "@/components/common/Button"
import Card from "@/components/common/Card"

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-[#F8FAFC] to-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-[#171725] mb-4">
            Türkiye'nin En Hızlı SMS Onay Platformu
          </h1>
          <p className="text-lg md:text-xl text-[#6B7280] max-w-2xl mx-auto">
            WhatsApp, Telegram, Instagram ve yüzlerce platform için sanal numara seçeneklerini tek panelden yönetin.
          </p>
        </div>

        {/* Service Info Card */}
        <Card className="max-w-2xl mx-auto mb-12 bg-white">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-[#171725] mb-2">
              SMS Onay - Sanal Numara Alma
            </h2>
            <p className="text-[#6B7280] mb-6">
              Platformunuzu ve ülkenizi seçin, uygun numara seçeneklerini görüntüleyin ve işlemlerinizi paneliniz üzerinden yönetin.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="#services">
                <Button size="lg">SMS Onaya Başla</Button>
              </Link>
              <Link href="#how-it-works">
                <Button variant="outline" size="lg">Nasıl Çalışır?</Button>
              </Link>
            </div>
          </div>
        </Card>

        {/* 3 Step Process */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 max-w-3xl mx-auto">
          <Step number={1} title="Servis Seçin" active />
          <ArrowIcon />
          <Step number={2} title="Ülke Seçin" />
          <ArrowIcon />
          <Step number={3} title="Numara Alın" />
        </div>
      </div>
    </section>
  )
}

function Step({ number, title, active }: { number: number; title: string; active?: boolean }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold mb-2 ${
          active ? "bg-[#2196F3]" : "bg-[#2EA3F2]"
        }`}
      >
        {number}
      </div>
      <span className={`text-sm font-medium ${active ? "text-[#171725]" : "text-[#6B7280]"}`}>
        {title}
      </span>
    </div>
  )
}

function ArrowIcon() {
  return (
    <div className="hidden md:block text-[#2196F3]">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  )
}