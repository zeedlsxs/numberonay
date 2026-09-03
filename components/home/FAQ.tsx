import Accordion from "@/components/common/Accordion"

export default function FAQ() {
  const faqItems = [
    {
      id: "1",
      question: "SMS onay nedir?",
      answer: "SMS onay, çeşitli platform ve uygulamalarda hesap oluştururken veya işlem yaparken telefon numaranız üzerinden gönderilen doğrulama kodu sistemidir. Sanal numaralar kullanarak kişisel numaranızı paylaşmadan bu işlemi gerçekleştirebilirsiniz.",
    },
    {
      id: "2",
      question: "Hangi servisler destekleniyor?",
      answer: "Platformumuz WhatsApp, Telegram, Instagram, Facebook, Google, X (Twitter), Discord, TikTok, Microsoft, Apple ve birçok popüler servisi desteklemektedir. Desteklenen servis listesi sürekli güncellenmektedir.",
    },
    {
      id: "3",
      question: "Sanal numara nedir?",
      answer: "Sanal numara, fiziksel bir SIM kart gerektirmeyen, internet üzerinden çalışan ve SMS alabilen telefon numarasıdır. Bu numaralar geçici olarak kullanılır ve doğrulama işlemleri için idealdir.",
    },
    {
      id: "4",
      question: "Numarayı ne kadar süre kullanabilirim?",
      answer: "Numaralar genellikle 15 dakika ile 1 saat arasında kullanılabilir. Süre, seçilen ülke ve servise göre değişiklik gösterebilir. SMS geldikten sonra kodu kullanarak işleminizi tamamlayabilirsiniz.",
    },
    {
      id: "5",
      question: "SMS gelmezse ne olur?",
      answer: "SMS gelmezse veya numara kullanılamaz durumda ise, sistemimiz otomatik olarak iade işlemi başlatır. Bakiyeniz SMS sağlayıcısının iade politikasına göre geri yüklenir.",
    },
    {
      id: "6",
      question: "Bakiyem ne zaman iade edilir?",
      answer: "İade işlemleri genellikle 24 saat içinde gerçekleşir. SMS sağlayıcısının iade sürecine bağlı olarak bu süre değişiklik gösterebilir.",
    },
    {
      id: "7",
      question: "Aynı numarayı tekrar kullanabilir miyim?",
      answer: "Hayır, sanal numaralar tek kullanımlıktır. Her yeni işlem için yeni bir numara almanız gerekir. Bu, güvenlik ve gizlilik açısından önemlidir.",
    },
    {
      id: "8",
      question: "Hangi ülkeler destekleniyor?",
      answer: "Türkiye, Amerika Birleşik Devletleri, İngiltere, Almanya, Fransa, Hollanda, İspanya, İtalya, Brezilya, Endonezya, Filipinler, Tayland, Romanya, Suudi Arabistan ve birçok diğer ülke desteklenmektedir.",
    },
    {
      id: "9",
      question: "Ödeme sistemi ne zaman aktif olacak?",
      answer: "Ödeme sistemi şu anda geliştirme aşamasındadır. Yakında bakiye yükleme özelliği aktif olacaktır. Güncellemelerden haberdar olmak için sosyal medya hesaplarımızı takip edebilirsiniz.",
    },
    {
      id: "10",
      question: "Hesabımı nasıl silebilirim?",
      answer: "Hesabınızı silmek için profil sayfasındaki 'Hesabı Sil' bölümünü kullanabilirsiniz. Hesap silme işlemi geri alınamaz ve tüm verileriniz kalıcı olarak silinir.",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#171725] mb-4">Sıkça Sorulan Sorular</h2>
          <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
            SMS onay ve sanal numara hizmetleri hakkında merak ettikleriniz.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion items={faqItems} />
        </div>
      </div>
    </section>
  )
}