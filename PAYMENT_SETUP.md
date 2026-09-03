# OnaylaNumber Ödeme Sistemi Kurulum Rehberi

Bu rehber, OnaylaNumber projesine iyzico ödeme sistemi ve Telegram botu entegrasyonu için adım adım kurulum talimatlarını içerir.

## 📋 Ön Hazırlık

### Gereksinimler
- Node.js 18.x veya üzeri
- iyzico Sandbox hesabı
- Telegram Bot Token ve Chat ID
- PostgreSQL veya MongoDB (opsiyonel, production için)

## 🔧 Adım 1: iyzico Hesabı Oluşturma

1. [iyzico.com](https://iyzico.com) adresine gidin
2. Kayıt olun ve satıcı hesabı oluşturun
3. Sandbox ortamında test API anahtarlarını alın:
   - API Key
   - Secret Key
4. Test kartları ile ödeme işlemlerini test edin

## 🤖 Adım 2: Telegram Botu Oluşturma

1. Telegram'da [@BotFather](https://t.me/botfather) ile iletişime geçin
2. `/newbot` komutunu gönderin
3. Bot adı ve kullanıcı adı belirleyin
4. Bot token'ı kopyalayın
5. Kendi kullanıcı ID'nizi alın:
   - [@userinfobot](https://t.me/userinfobot) ile iletişime geçin
   - ID'nizi kopyalayın

## 🌐 Adım 3: Environment Variables Ayarlama

`.env` dosyasını oluşturun veya güncelleyin:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://onaylanumber.com

# SMS Provider Configuration
SMS_PROVIDER_MODE=mock

# Payment Configuration
PAYMENTS_ENABLED=true

# iyzico Configuration
IYZICO_API_KEY=sandbox-api-key
IYZICO_SECRET_KEY=sandbox-secret-key
IYZICO_BASE_URL=https://sandbox-api.iyzipay.com

# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_CHAT_ID=your-chat-id

# Security Configuration
RATE_LIMIT_MAX_REQUESTS=5
RATE_LIMIT_WINDOW_MS=60000

# Database (Production için)
# DATABASE_URL=postgresql://user:password@localhost:5432/onaylanumber

# Other Environment Variables
NODE_ENV=development
```

## 🛠️ Adım 4: Build ve Test

```bash
# Bağımlılıkları yükleyin
npm install

# Build oluşturun
npm run build

# Development sunucusunu başlatın
npm run dev
```

## 🧪 Adım 5: Test İşlemleri

### 1. Ödeme Başlatma Testi

```bash
curl -X POST http://localhost:3000/api/payments/initiate \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 10000,
    "currency": "TRY",
    "userId": "test-user",
    "card": {
      "cardHolderName": "TEST USER",
      "cardNumber": "5528790000000008",
      "expireMonth": "12",
      "expireYear": "25",
      "cvc": "123"
    }
  }'
```

### 2. Webhook Testi

```bash
curl -X POST http://localhost:3000/api/payments/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "paymentId": "test-payment-id",
    "status": "success",
    "amount": 10000,
    "userId": "test-user"
  }'
```

### 3. Güvenlik Testleri

**Rate Limiting Testi:**
```bash
# 6 kez ard arda çağırın (5 limit)
for i in {1..6}; do
  curl -X POST http://localhost:3000/api/payments/initiate \
    -H "Content-Type: application/json" \
    -d '{"amount": 10000, "currency": "TRY", "userId": "test"}'
done
```

**Şüpheli Aktivite Testi:**
```bash
# Hatalı kart numaraları ile test
curl -X POST http://localhost:3000/api/payments/initiate \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 10000,
    "currency": "TRY",
    "userId": "test-user",
    "card": {
      "cardNumber": "1234567890123456"
    }
  }'
```

## 🔒 Adım 6: Güvenlik Önlemleri

### Rate Limiting
- Aynı IP'den dakikada maksimum 5 ödeme isteği
- Limit aşılırsa Telegram uyarısı gönderilir
- 15 dakika bloklama

### Kart Verileri
- Kart numarası sadece BIN (ilk 6) ve son 4 hane loglanır
- Kart bilgileri asla veritabanında saklanmaz
- 3D Secure zorunlu

### Şüpheli Aktivite Tespiti
- Çok fazla başarısız deneme
- Aynı IP'den farklı kartlarla hızlı işlemler
- Anomali tespiti

## 🚀 Adım 7: Production'a Geçiş

### 1. Canlı API Anahtarları
```env
IYZICO_API_KEY=live-api-key
IYZICO_SECRET_KEY=live-secret-key
IYZICO_BASE_URL=https://api.iyzipay.com
```

### 2. SSL Sertifikası
```bash
# Let's Encrypt ile SSL
certbot --nginx -d onaylanumber.com
```

### 3. Veritabanı Bağlantısı
```env
DATABASE_URL=postgresql://user:password@localhost:5432/onaylanumber
```

### 4. Build ve Deploy
```bash
npm run build
npm start
```

## 📊 Adım 8: Monitoring ve Loglama

### Telegram Bildirimleri
- ✅ Başarılı ödemeler
- ❌ Başarısız ödemeler
- ⚠️ Şüpheli aktiviteler
- 🚨 Sistem uyarıları

### Loglama
- Ödeme başlatma logları
- Webhook logları
- Güvenlik olayları
- Hata logları

## 🧹 Adım 9: Bakım ve Destek

### Düzenli Kontroller
- Rate limiting istatistikleri
- Ödeme başarı oranları
- Şüpheli aktivite raporları
- Telegram bildirimleri

### Sorun Giderme
1. Logları kontrol edin
2. Telegram bildirimlerini inceleyin
3. iyzico panelini kontrol edin
4. Environment variables'ı doğrulayın

## 📞 Destek

Sorularınız için:
- iyzico: https://iyzico.com/support
- Telegram: @userinfobot
- Proje: destek@onaylanumber.com

## ⚠️ Yasal Uyarılar

- Bu sistem KVKK ve GDPR uyumlu çalışır
- Kart bilgileri yasal olarak saklanmaz
- Tüm işlemler 3D Secure ile korunur
- Log'lar sadece güvenlik amaçlı tutulur

---

**Not:** Bu sistem test ve development ortamı içindir. Production kullanımı için ek güvenlik önlemleri alınmalıdır.