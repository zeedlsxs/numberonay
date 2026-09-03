import Link from "next/link"
import Button from "@/components/common/Button"

export default function CTA() {
  return (
    <section className="py-16 bg-[#2196F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Hemen Başlayın
        </h2>
        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
          Ücretsiz kayıt olun ve ihtiyacınız olan SMS onay hizmetine anında erişin.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register">
            <Button size="lg" className="bg-white text-[#2196F3] hover:bg-gray-100">
              Ücretsiz Kayıt Ol
            </Button>
          </Link>
          <Link href="#services">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
            >
              Servisleri İncele
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}