import Card from "@/components/common/Card"

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#171725] mb-2">Gizlilik Politikası</h1>
        <p className="text-[#6B7280]">Son güncelleme: 03.09.2026</p>
      </div>

      <Card className="prose prose-lg max-w-none">
        <div className="bg-[#FEF3C7] border border-[#FFC107] rounded-xl p-4 mb-6">
          <p className="text-sm text-[#92400E]">
            ⚠️ Bu belge yasal tavsiye niteliğinde değildir. Gerçek bir hizmet için bir hukuk profesyoneli tarafından hazırlanmalıdır.
          </p>
        </div>

        <div className="space-y-6 text-[#6B7280]">
          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">1. Genel Bilgiler</h2>
            <p>
              OnaylaNumber ("biz", "şirket"), kullanıcıların kişisel verilerinin korunmasına büyük önem verir. 
              Bu Gizlilik Politikası, hizmetlerimizi kullanırken kişisel verilerinizin nasıl toplandığını, 
              kullanıldığını ve korunduğunu açıklar.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">2. Toplanan Veriler</h2>
            <p>Hizmetlerimizi kullanırken aşağıdaki kişisel verileri toplayabiliriz:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>E-posta adresi</li>
              <li>Ad ve soyad</li>
              <li>Telefon numarası (opsiyonel)</li>
              <li>Ödeme bilgileri (şifrelenmiş olarak)</li>
              <li>IP adresi ve cihaz bilgileri</li>
              <li>Kullanım verileri ve aktivite geçmişi</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">3. Verilerin Kullanımı</h2>
            <p>Kişisel verilerinizi aşağıdaki amaçlarla kullanırız:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Hizmetlerimizi sağlamak ve iyileştirmek</li>
              <li>Kullanıcı hesaplarını oluşturmak ve yönetmek</li>
              <li>İşlemleri gerçekleştirmek ve güvenliği sağlamak</li>
              <li>Müşteri desteği sağlamak</li>
              <li>Yasal yükümlülükleri yerine getirmek</li>
              <li>Kullanıcı deneyimini kişiselleştirmek</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">4. Veri Paylaşımı</h2>
            <p>
              Kişisel verilerinizi üçüncü taraflarla aşağıdaki durumlarda paylaşabiliriz:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>SMS sağlayıcıları ile hizmet sunumu için</li>
              <li>Ödeme sağlayıcıları ile işlemler için</li>
              <li>Yasal gereklilikler durumunda</li>
              <li>Şirket birleşmesi veya satışı durumunda</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">5. Veri Güvenliği</h2>
            <p>
              Kişisel verilerinizi korumak için modern güvenlik önlemleri alırız. 
              Verileriniz şifrelenmiş olarak saklanır ve yetkisiz erişime karşı korunur.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">6. Kullanıcı Hakları</h2>
            <p>Kişisel verileriniz konusunda aşağıdaki haklara sahipsiniz:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Verilerinize erişim talep etme</li>
              <li>Verilerinizi düzeltme veya güncelleme</li>
              <li>Verilerinizi silme</li>
              <li>Veri işlemenin kısıtlanmasını talep etme</li>
              <li>Veri taşınabilirliği</li>
              <li>İtiraz hakkı</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">7. Çerezler</h2>
            <p>
              Hizmetlerimizi iyileştirmek için çerezler ve benzer teknolojiler kullanabiliriz. 
              Çerez ayarlarınızı tarayıcınızdan yönetebilirsiniz.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">8. İletişim</h2>
            <p>
              Gizlilik politikası hakkında sorularınız için bizimle iletişime geçebilirsiniz:
            </p>
            <p className="text-[#171725]">destek@onaylanumber.com</p>
          </section>
        </div>
      </Card>
    </div>
  )
}