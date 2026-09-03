import Card from "@/components/common/Card"

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#171725] mb-2">Hakkımızda</h1>
        <p className="text-[#6B7280]">OnaylaNumber olarak kim olduğumuzu ve ne yaptığımızı öğrenin.</p>
      </div>

      <Card className="prose prose-lg max-w-none">
        <div className="space-y-6 text-[#6B7280]">
          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">Misyonumuz</h2>
            <p>
              OnaylaNumber olarak, kullanıcıların SMS doğrulama ihtiyaçlarını güvenli, hızlı ve uygun 
              fiyatlı bir şekilde karşılamayı amaçlıyoruz. Modern teknoloji ve kullanıcı dostu arayüzümüzle, 
              sanal numara hizmetlerini herkes için erişilebilir kılmayı hedefliyoruz.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">Vizyonumuz</h2>
            <p>
              SMS onay sektöründe lider ve güvenilir bir platform olmak. Kullanıcı deneyimini sürekli 
              iyileştirerek, en iyi hizmeti sunmak ve teknolojik gelişmeleri yakından takip etmek.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">Değerlerimiz</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Güvenlik:</strong> Kullanıcı verilerinin korunması en öncelikli değerimizdir.</li>
              <li><strong>Şeffaflık:</strong> Fiyatlandırma ve hizmet koşullarında açık ve net olmak.</li>
              <li><strong>Kalite:</strong> Yüksek kaliteli ve güvenilir hizmet sunmak.</li>
              <li><strong>Müşteri Odaklılık:</strong> Kullanıcı ihtiyaçlarını ön planda tutmak.</li>
              <li><strong>İnovasyon:</strong> Teknolojik gelişmeleri takip etmek ve yenilikçi çözümler sunmak.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">Hizmetlerimiz</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>SMS doğrulama hizmetleri</li>
              <li>Sanal numara temini</li>
              <li>Çoklu ülke ve servis desteği</li>
              <li>7/24 erişilebilir panel</li>
              <li>Hızlı ve güvenli işlemler</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">Neden OnaylaNumber?</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Kolay ve hızlı kullanım</li>
              <li>Uygun fiyatlar</li>
              <li>Güvenli ödeme sistemi</li>
              <li>7/24 müşteri desteği</li>
              <li>Geniş servis ve ülke ağı</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#171725] mb-3">İletişim</h2>
            <p>
              Sorularınız ve önerileriniz için bizimle iletişime geçebilirsiniz:
            </p>
            <p className="text-[#171725]">destek@onaylanumber.com</p>
          </section>
        </div>
      </Card>
    </div>
  )
}