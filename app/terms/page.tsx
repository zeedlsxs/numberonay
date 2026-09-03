import Card from "@/components/common/Card"

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#171725] mb-2">Kullanım Şartları</h1>
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
            <h2 className="text-xl font-semibold text-[#171725] mb-3">1. Kabul Edilme</h2>
            <p>
              OnaylaNumber hizmetlerini kullanarak bu Kullanım Şartları'nı kabul etmiş sayılırsınız. 
              Bu şartları kabul etmiyorsanız, hizmetlerimizi kullanmamalısınız.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">2. Hizmetler</h2>
            <p>
              OnaylaNumber, SMS doğrulama ve sanal numara hizmetleri sunar. Hizmetler sadece yasal 
              ve yetkili kullanım için sağlanır.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">3. Kullanıcı Sorumlulukları</h2>
            <p>Hizmetlerimizi kullanırken aşağıdaki sorumluluklara sahipsiniz:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Doğru ve güncel bilgiler sağlamak</li>
              <li>Hizmetleri yasal amaçlarla kullanmak</li>
              <li>Başka kullanıcıların haklarını ihlal etmemek</li>
              <li>Güvenlik hesap bilgilerini korumak</li>
              <li>Şartları ihlal etmemek</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">4. Yasaklanmış Kullanımlar</h2>
            <p>Aşağıdaki kullanımlar kesinlikle yasaktır:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Yasa dışı faaliyetler için hizmet kullanmak</li>
              <li>Başka kişilerin hesaplarına erişmek</li>
              <li>Spam veya kötüye kullanım</li>
              <li>Sistemi aşırı yüklemek</li>
              <li>Virüs veya zararlı kod dağıtmak</li>
              <li>Fikri mülkiyet haklarını ihlal etmek</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">5. Hesap Güvenliği</h2>
            <p>
              Hesap güvenliğinden tamamen siz sorumlusunuz. Şifrenizin güvenliğinden siz sorumlusunuz 
              ve hesabınızın altındaki tüm aktiviteler size aittir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">6. Fiyatlandırma ve Ödeme</h2>
            <p>
              Hizmet fiyatları web sitemizde belirtilir. Ödeme işlemleri güvenli ödeme sağlayıcıları 
              üzerinden gerçekleştirilir. İade politikamız ayrı bir belgede belirtilmiştir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">7. Hizmet Değişiklikleri</h2>
            <p>
              Hizmetlerimizi her zaman değiştirme, iyileştirme veya durdurma hakkını saklı tutarız. 
              Önemli değişiklikleri önceden bildireceğiz.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">8. Sorumluluk Reddi</h2>
            <p>
              Hizmetler "olduğu gibi" sağlanır. Hizmetlerin kesintisiz, hatasız veya güvenli olduğunu 
              garanti etmeyiz. Hizmet kullanımından kaynaklanan kayıplardan sorumlu değiliz.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">9. Fesih</h2>
            <p>
              Bu şartları ihlal ederseniz hesabınızı feshetme hakkını saklı tutarız. Ayrıca istediğiniz 
              zaman hesabınızı kapatabilirsiniz.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">10. Uygulanabilir Hukuk</h2>
            <p>
              Bu şartlar Türk hukukuna tabidir. Herhangi bir anlaşmazlık durumunda Türk mahkemeleri 
              yetkilidir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">11. İletişim</h2>
            <p>
              Bu şartlar hakkında sorularınız için bizimle iletişime geçebilirsiniz:
            </p>
            <p className="text-[#171725]">destek@onaylanumber.com</p>
          </section>
        </div>
      </Card>
    </div>
  )
}