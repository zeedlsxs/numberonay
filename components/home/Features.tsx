import Card from "@/components/common/Card"

export default function Features() {
  const features = [
    {
      icon: "⚡",
      title: "Anında İşlem",
      description: "Servis ve ülke seçiminizi tamamlayarak işlemlerinizi panel üzerinden hızlı bir şekilde yönetin.",
    },
    {
      icon: "🛡",
      title: "Güvenli ve Gizli",
      description: "Modern güvenlik standartları kullanılarak hesap bilgileriniz korunur.",
    },
    {
      icon: "$",
      title: "Uygun Fiyatlar",
      description: "Farklı ülke ve servis seçeneklerini tek panel üzerinden karşılaştırın.",
    },
    {
      icon: "↻",
      title: "Otomatik İade Altyapısı",
      description: "SMS sağlayıcısının desteklediği durumlarda başarısız işlemler için otomatik iptal/iade mekanizmasına hazır altyapı.",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#171725] mb-4">Neden OnaylaNumber?</h2>
          <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
            SMS doğrulama ihtiyaçlarınızı tek bir panelden yönetmek için tasarlanmış modern bir platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-[#171725] mb-2">{feature.title}</h3>
                <p className="text-sm text-[#6B7280]">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}