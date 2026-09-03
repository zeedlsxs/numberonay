import Card from "@/components/common/Card"

export default function RefundPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#171725] mb-2">İade ve İptal Politikası</h1>
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
            <h2 className="text-xl font-semibold text-[#171725] mb-3">1. Genel İade Politikası</h2>
            <p>
              OnaylaNumber olarak müşteri memnuniyetine önem veriyoruz. SMS onay hizmetlerinin doğası 
              gereği, belirli koşullar altında iade ve iptal işlemlerini gerçekleştiriyoruz.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">2. İade Edilebilir Durumlar</h2>
            <p>Aşağıdaki durumlarda iade talebinde bulunabilirsiniz:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>SMS gelmemesi ve numaranın kullanılamaması durumunda</li>
              <li>Servis veya ülke hatası nedeniyle numara alınamaması durumunda</li>
              <li>Teknik sorunlar nedeniyle hizmetin sağlanamaması durumunda</li>
              <li>15 dakika içinde SMS gelmemesi durumunda otomatik iade</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">3. İade Edilemez Durumlar</h2>
            <p>Aşağıdaki durumlarda iade yapılmaz:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>SMS başarıyla alındıktan sonra</li>
              <li>Kullanıcı hatası nedeniyle yanlış servis/ülke seçimi</li>
              <li>Doğrulama kodu kullanıldıktan sonra</li>
              <li>Hizmetin doğru şekilde sağlanması durumunda</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">4. İade Süreci</h2>
            <p>
              İade talepleriniz aşağıdaki şekilde işlenir:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Destek talebi oluşturarak iade talebinde bulunabilirsiniz</li>
              <li>Talebiniz 24 saat içinde incelenir</li>
              <li>Onaylanan iadeler bakiyenize eklenir</li>
              <li>Otomatik iadeler sistem tarafından gerçekleştirilir</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">5. İade Süresi</h2>
            <p>
              Onaylanan iadeler genellikle 1-3 iş günü içinde bakiyenize yansır. SMS sağlayıcısının 
              iade sürecine bağlı olarak bu süre değişiklik gösterebilir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">6. Bakiye İadesi</h2>
            <p>
              Bakiye iadeleri sadece aynı hizmet için kullanılabilir. Nakit iade veya farklı hizmetlere 
              transfer mümkün değildir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">7. İptal Hakkı</h2>
            <p>
              Numara satın alma işleminden sonra, SMS gelmediği takdirde 15 dakika içinde iptal talebinde 
              bulunabilirsiniz. Bu süre sonra iptal mümkün değildir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">8. İstisnai Durumlar</h2>
            <p>
              OnaylaNumber, istisnai durumlarda (sistem arızası, force majeure vb.) iade politikasını 
              değiştirme hakkını saklı tutar.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">9. İletişim</h2>
            <p>
              İade ve iptal talepleriniz için destek sayfasından talep oluşturabilir veya bizimle iletişime geçebilirsiniz:
            </p>
            <p className="text-[#171725]">destek@onaylanumber.com</p>
          </section>
        </div>
      </Card>
    </div>
  )
}