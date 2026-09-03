export default function HowItWorks() {
  const steps = [
    {
      icon: "👤",
      title: "Hesabınızı oluşturun",
      description: "Ücretsiz kayıt olarak platforma erişim sağlayın.",
    },
    {
      icon: "📱",
      title: "Servis seçin",
      description: "SMS onay almak istediğiniz platformu seçin.",
    },
    {
      icon: "🌍",
      title: "Ülke seçin",
      description: "Numara almak istediğiniz ülkeyi belirleyin.",
    },
    {
      icon: "📞",
      title: "Uygun numarayı seçin",
      description: "Mevcut numaraları inceleyin ve seçiminizi yapın.",
    },
    {
      icon: "🚀",
      title: "Aktivasyon işlemini başlatın",
      description: "Numara satın alma işlemini tamamlayın.",
    },
    {
      icon: "💬",
      title: "SMS durumunu panelden takip edin",
      description: "Gelen SMS kodunu anında görüntüleyin.",
    },
  ]

  return (
    <section id="how-it-works" className="py-16 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#171725] mb-4">Nasıl Çalışır?</h2>
          <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
            6 basit adımda SMS onay işleminizi tamamlayın.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 border border-[#E5E7EB] hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-3">{step.icon}</div>
              <h3 className="text-lg font-semibold text-[#171725] mb-2">{step.title}</h3>
              <p className="text-sm text-[#6B7280]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}