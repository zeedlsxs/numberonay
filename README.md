# OnaylaNumber - SMS Onay ve Sanal Numara Platformu

Türkiye'nin en hızlı SMS onay platformu. WhatsApp, Telegram, Instagram ve yüzlerce platform için sanal numara seçeneklerini tek panelden yönetin.

## 🚀 Özellikler

- **Modern ve Profesyonel Arayüz**: Next.js, TypeScript ve Tailwind CSS ile geliştirilmiş, tamamen responsive tasarım
- **SMS Onay Hizmetleri**: Çoklu servis ve ülke desteği ile sanal numara temini
- **Kullanıcı Paneli**: Kapsamlı dashboard ile aktivasyon takibi, bakiye yönetimi ve destek sistemi
- **Güvenlik**: Modern güvenlik standartları ve kullanıcı verisi koruması
- **Mobil Öncelikli Tasarım**: 360px'den 1920px'ye kadar tüm ekran boyutlarında kusursuz çalışma
- **Ölçeklenebilir Mimari**: Gerçek SMS API ve ödeme sistemlerine kolay entegrasyon için hazırlıklı yapı

## 📋 Teknoloji Yığını

- **Framework**: Next.js 16 (App Router)
- **Dil**: TypeScript
- **Styling**: Tailwind CSS
- **İkonlar**: Lucide React
- **Durum Yönetimi**: React Hooks
- **Form Validasyonu**: Custom implementation

## 🛠️ Kurulum

### Gereksinimler

- Node.js 18.x veya üzeri
- npm, yarn veya pnpm

### Adımlar

1. Depoyu klonlayın:
```bash
git clone <repository-url>
cd smmpanel
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Ortam değişkenlerini yapılandırın:
```bash
cp .env.example .env
```

`.env` dosyasını ihtiyaçlarınıza göre düzenleyin.

4. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

5. Tarayıcınızda açın:
```
http://localhost:3000
```

## 🏗️ Proje Yapısı

```
src/
├── app/                    # Next.js App Router sayfaları
│   ├── dashboard/         # Dashboard sayfaları
│   ├── blog/              # Blog sayfaları
│   ├── login/             # Giriş sayfası
│   ├── register/          # Kayıt sayfası
│   └── ...                # Diğer sayfalar
├── components/            # React bileşenleri
│   ├── common/            # Ortak bileşenler (Button, Card, Modal vb.)
│   ├── layout/            # Layout bileşenleri (Header, Footer)
│   ├── home/              # Ana sayfa bileşenleri
│   ├── dashboard/         # Dashboard bileşenleri
│   ├── auth/              # Auth bileşenleri
│   └── sms/               # SMS bileşenleri
├── lib/                   # Yardımcı fonksiyonlar
│   ├── auth/              # Auth fonksiyonları
│   ├── db/                # Veritabanı fonksiyonları
│   ├── sms/               # SMS provider fonksiyonları
│   ├── payments/          # Ödeme provider fonksiyonları
│   ├── validation/        # Validasyon fonksiyonları
│   └── utils/             # Genel yardımcı fonksiyonlar
├── config/                # Konfigürasyon dosyaları
│   └── site.ts            # Site konfigürasyonu
├── types/                 # TypeScript tipleri
│   └── index.ts           # Ana tipler
└── data/                  # Statik veriler
    ├── services.ts        # Servis verileri
    ├── countries.ts       # Ülke verileri
    └── activities.ts      # Aktivite verileri
```

## 🔧 Yapılandırma

### Site Konfigürasyonu

`src/config/site.ts` dosyasından site genel ayarlarını düzenleyebilirsiniz:

```typescript
export const siteConfig = {
  name: "OnaylaNumber",
  description: "SMS doğrulama ve sanal numara seçeneklerini tek panelden yönetin.",
  url: "https://onaylanumber.com",
  supportEmail: "destek@onaylanumber.com",
  currency: "TRY",
  locale: "tr-TR",
  paymentsEnabled: false,
  googleAuthEnabled: false,
  smsProviderMode: "mock",
  // ... diğer ayarlar
}
```

### Ortam Değişkenleri

`.env` dosyasında şu değişkenleri yapılandırabilirsiniz:

- `NEXT_PUBLIC_SITE_URL`: Site URL'si
- `SMS_PROVIDER_MODE`: SMS provider modu (`mock` veya `production`)
- `PAYMENTS_ENABLED`: Ödeme sistemi aktif/pasif
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret

## 📱 SMS Provider Entegrasyonu

Gerçek SMS sağlayıcısı entegre etmek için:

1. `src/lib/sms/mock-provider.ts` dosyasındaki `SmsProvider` interface'ini implement edin
2. `src/lib/sms/mock-provider.ts` dosyasındaki `getSmsProvider()` fonksiyonunu güncelleyin
3. `.env` dosyasında `SMS_PROVIDER_MODE=production` olarak ayarlayın

Örnek:

```typescript
// src/lib/sms/real-provider.ts
import { SmsProvider } from "@/types"

export class RealSmsProvider implements SmsProvider {
  async getServices(): Promise<Service[]> {
    // Gerçek API çağrısı
  }

  async buyNumber(serviceId: string, countryId: string): Promise<Activation> {
    // Gerçek API çağrısı
  }

  // ... diğer metodlar
}
```

## 💳 Ödeme Sistemi Entegrasyonu

Ödeme sistemi entegre etmek için:

1. `src/lib/payments/mock-provider.ts` dosyasındaki `PaymentProvider` interface'ini implement edin
2. `.env` dosyasında `PAYMENTS_ENABLED=true` olarak ayarlayın
3. Ödeme provider'ı yapılandırın

Desteklenen provider'lar için hazırlık yapılmıştır:
- Stripe
- iyzico
- PayTR
- Shopier

## 🧪 Test

Testleri çalıştırmak için:

```bash
npm test
```

## 📦 Build

Production build oluşturmak için:

```bash
npm run build
```

Build sonrası test etmek için:

```bash
npm start
```

## 🔍 Lint

Kod kalitesini kontrol etmek için:

```bash
npm run lint
```

## 🌐 Deployment

### Vercel

1. Projeyi Vercel'e import edin
2. Ortam değişkenlerini Vercel panelinde ayarlayın
3. Deploy edin

### Diğer Platformlar

Build sonrası `out` veya `.next` klasörünü hosting platformunuza yükleyin.

## 📝 Mock Mode

Proje şu anda mock modda çalışmaktadır. Bu modda:

- SMS işlemleri simüle edilir
- Ödeme sistemi devre dışıdır
- Veriler statik olarak tanımlanmıştır
- Gerçek API çağrıları yapılmaz

Production'a geçiş için:
1. Gerçek SMS provider'ı entegre edin
2. Ödeme sistemini aktif edin
3. Veritabanı bağlantısını kurun
4. Auth sistemini yapılandırın

## 🔒 Güvenlik

- Input validation ve output encoding
- XSS koruması
- CSRF hazırlığı
- Rate limiting altyapısı
- Secure headers
- Content-Security-Policy hazırlığı
- Environment secrets güvenliği
- SQL injection koruması (ORM kullanımı)

## 📄 Lisans

Bu proje ticari kullanım için hazırlanmıştır.

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Push edin (`git push origin feature/AmazingFeature`)
5. Pull Request açın

## 📞 Destek

Sorularınız için: destek@onaylanumber.com

## 🙏 Teşekkürler

- Next.js ekibi
- Tailwind CSS ekibi
- Lucide Icons

---

**Not**: Bu proje prototip olarak geliştirilmiştir. Production kullanımı için gerçek SMS API, ödeme sistemi ve veritabanı entegrasyonu gereklidir.