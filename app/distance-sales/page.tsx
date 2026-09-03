import Card from "@/components/common/Card"

export default function DistanceSalesPage() {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#171725] mb-2">Mesafeli Satış Sözleşmesi</h1>
        <p className="text-[#6B7280]">Son güncelleme: 03.09.2026</p>
      </div>

      <Card className="prose prose-lg max-w-none">
        <div className="bg-[#FEF3C7] border border-[#FFC107] rounded-xl p-4 mb-6">
          <p className="text-sm text-[#92400E]">
            ⚠️ Bu belge yasal tavsiye niteliğinde değildir. Gerçek bir hizmet için bir hukuk profesyoneli tarafından hazırlanmalıdır. 
            6502 sayılı Tüketicinin Korunması Hakkında Kanun kapsamında bu sözleşme profesyonel destek alınarak hazırlanmalıdır.
          </p>
        </div>

        <div className="space-y-6 text-[#6B7280]">
          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">1. Taraflar</h2>
            <p>
              <strong>Satıcı:</strong> OnaylaNumber<br />
              <strong>Alıcı:</strong> Hizmeti kullanan müşteri
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">2. Sözleşme Konusu</h2>
            <p>
              Bu sözleşme, Alıcı'nın Satıcı'dan satın aldığı SMS doğrulama ve sanal numara hizmetlerinin 
              kullanım şartlarını belirler.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">3. Hizmet Bilgileri</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Hizmet türü: SMS doğrulama ve sanal numara</li>
              <li>Teslimat şekli: Elektronik teslimat</li>
              <li>Teslimat süresi: Anında</li>
              <li>Fiyat: Web sitemizde belirtilen fiyatlar</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">4. Ödeme</h2>
            <p>
              Ödeme, kredi kartı, banka kartı veya diğer ödeme yöntemleri ile yapılabilir. 
              Ödeme işlemleri güvenli ödeme sağlayıcıları üzerinden gerçekleştirilir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">5. Teslimat</h2>
            <p>
              Hizmetler elektronik olarak anında teslim edilir. Numara bilgileri kullanıcı panelinde 
              görüntülenir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">6. Cayma Hakkı</h2>
            <p>
              Tüketicinin Korunması Hakkında Kanun gereği, hizmetin kullanılmaması koşuluyla 14 gün içinde 
              cayma hakkınız bulunmaktadır. Ancak SMS hizmetleri doğası gereği, kullanıldıktan sonra 
              cayma hakkı kullanılamaz.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">7. İade Koşulları</h2>
            <p>
              İade koşulları İade ve İptal Politikası'nda belirtilmiştir. SMS gelmemesi veya teknik sorunlar 
              durumunda iade yapılabilmektedir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">8. Garanti</h2>
            <p>
              Satıcı, hizmetlerin uygun şekilde sağlanması için gerekli özeni gösterir. Ancak SMS sağlayıcılarının 
              işleyişi nedeniyle garanti kapsamı sınırlıdır.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">9. Sorumluluklar</h2>
            <p>
              Alıcı, hizmetleri yasal amaçlarla kullanmakla yükümlüdür. Yasadışı kullanımdan Alıcı sorumludur.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">10. Uyuşmazlıkların Çözümü</h2>
            <p>
              Uyuşmazlıklar öncelikle görüşme yoluyla çözülür. Çözülememesi durumunda Tüketici Hakem Heyetleri 
              ve mahkemelere başvurulabilir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">11. Yürürlük</h2>
            <p>
              Bu sözleşme, Alıcı tarafından kabul edildiği tarihte yürürlüğe girer.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">12. İletişim</h2>
            <p>
              Sözleşme hakkında sorularınız için bizimle iletişime geçebilirsiniz:
            </p>
            <p className="text-[#171725]">destek@onaylanumber.com</p>
          </section>
        </div>
      </Card>
    </div>
  )
}