import Card from "@/components/common/Card"

export default function KVKKPage() {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#171725] mb-2">KVKK Aydınlatma Metni</h1>
        <p className="text-[#6B7280]">Son güncelleme: 03.09.2026</p>
      </div>

      <Card className="prose prose-lg max-w-none">
        <div className="bg-[#FEF3C7] border border-[#FFC107] rounded-xl p-4 mb-6">
          <p className="text-sm text-[#92400E]">
            ⚠️ Bu belge yasal tavsiye niteliğinde değildir. Gerçek bir hizmet için bir hukuk profesyoneli tarafından hazırlanmalıdır. 
            6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında bu metin profesyonel destek alınarak hazırlanmalıdır.
          </p>
        </div>

        <div className="space-y-6 text-[#6B7280]">
          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">1. Veri Sorumlusu</h2>
            <p>
              OnaylaNumber olarak 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında 
              veri sorumlusu sıfatıyla hareket etmekteyiz.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">2. Kişisel Verilerin İşlenme Amacı</h2>
            <p>
              Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>SMS doğrulama hizmetlerinin sunulması</li>
              <li>Kullanıcı hesaplarının oluşturulması ve yönetilmesi</li>
              <li>Ödeme işlemlerinin gerçekleştirilmesi</li>
              <li>Müşteri hizmetlerinin sağlanması</li>
              <li>Güvenlik ve denetim faaliyetleri</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">3. İşlenen Kişisel Veriler</h2>
            <p>Aşağıdaki kişisel verileriniz işlenmektedir:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Kimlik bilgileri (ad, soyad)</li>
              <li>İletişim bilgileri (e-posta, telefon)</li>
              <li>Ödeme bilgileri</li>
              <li>İşlem ve kullanım verileri</li>
              <li>Teknik veriler (IP adresi, cihaz bilgileri)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">4. Veri Toplama Yöntemleri</h2>
            <p>
              Kişisel verileriniz aşağıdaki yöntemlerle toplanmaktadır:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Web sitemiz ve mobil uygulamalarımız üzerinden</li>
              <li>Kayıt formları ve iletişim kanalları üzerinden</li>
              <li>Çerezler ve benzer teknolojiler aracılığıyla</li>
              <li>Ödeme süreçleri sırasında</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">5. Veri Aktarımı</h2>
            <p>
              Kişisel verileriniz aşağıdaki durumlarda aktarılabilir:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>SMS sağlayıcıları ile hizmet sunumu için</li>
              <li>Ödeme sağlayıcıları ile işlemler için</li>
              <li>Yasal zorunluluklar halinde yetkili kurumlarla</li>
              <li>Yurt dışı sunucu ve hizmet sağlayıcılarla (gerekli güvenlik önlemleri alınarak)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">6. Veri Saklama Süresi</h2>
            <p>
              Kişisel verileriniz, ilgili yasal saklama süreleri boyunca veya işleme amaçlarının 
              gerektirdiği süre boyunca saklanacaktır. Süre dolduğunda veriler silinir veya yok edilir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">7. Veri Güvenliği</h2>
            <p>
              Kişisel verilerinizin güvenliği için aşağıdaki önlemleri alıyoruz:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Şifreleme ve güvenli iletişim protokolleri</li>
              <li>Erişim kontrolü ve yetkilendirme</li>
              <li>Güvenlik yazılımları ve düzenli güncellemeler</li>
              <li>Personel eğitimi ve farkındalık</li>
              <li>Düzenli güvenlik denetimleri</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">8. Haklarınız</h2>
            <p>
              KVKK kapsamında aşağıdaki haklara sahipsiniz:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>Verilerinizin işlenme amacını ve bunlara uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>Yurt içinde veya yurt dışında verilerin aktarıldığı kişileri öğrenme</li>
              <li>Verilerin eksik veya yanlış işlenmesi halinde düzeltilmesini isteme</li>
              <li>Verilerin silinmesini veya yok edilmesini isteme</li>
              <li>İşlemenin gerekli şartlar taşıması halinde silinmesini yerine damga vurulmasını isteme</li>
              <li>Verilerin otomatik sistemler ile analiz edilmesi durumunda itiraz etme</li>
              <li>Verilerin kanuna aykırı işlenmesi sonucunda zarara uğramanız halinde tazminat talep etme</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">9. Başvuru Yöntemi</h2>
            <p>
              Haklarınızı kullanmak için aşağıdaki yöntemlerle başvurabilirsiniz:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Web sitemizdeki form üzerinden</li>
              <li>Kayıtlı e-posta adresiniz üzerinden</li>
              <li>Noter kanalıyla</li>
              <li>Güvenli elektronik imza ile</li>
            </ul>
            <p className="text-[#171725]">destek@onaylanumber.com</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">10. İletişim</h2>
            <p>
              KVKK kapsamındaki talepleriniz için bizimle iletişime geçebilirsiniz:
            </p>
            <p className="text-[#171725]">destek@onaylanumber.com</p>
          </section>
        </div>
      </Card>
    </div>
  )
}