import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const services = [
  { id: "1", name: "Telegram", slug: "telegram", icon: "📱", isActive: true, isHot: true, sortOrder: 1 },
  { id: "2", name: "WhatsApp", slug: "whatsapp", icon: "💬", isActive: true, isHot: true, sortOrder: 2 },
  { id: "3", name: "Instagram", slug: "instagram", icon: "📷", isActive: true, isHot: true, sortOrder: 3 },
  { id: "4", name: "Facebook", slug: "facebook", icon: "👤", isActive: true, isHot: false, sortOrder: 4 },
  { id: "5", name: "Google / Gmail", slug: "google", icon: "🔍", isActive: true, isHot: true, sortOrder: 5 },
  { id: "6", name: "X / Twitter", slug: "twitter", icon: "🐦", isActive: true, isHot: false, sortOrder: 6 },
  { id: "7", name: "Discord", slug: "discord", icon: "🎮", isActive: true, isHot: false, sortOrder: 7 },
  { id: "8", name: "TikTok", slug: "tiktok", icon: "🎵", isActive: true, isHot: true, sortOrder: 8 },
  { id: "9", name: "Microsoft", slug: "microsoft", icon: "💻", isActive: true, isHot: false, sortOrder: 9 },
  { id: "10", name: "Apple", slug: "apple", icon: "🍎", isActive: true, isHot: false, sortOrder: 10 },
  { id: "11", name: "Tinder", slug: "tinder", icon: "🔥", isActive: true, isHot: false, sortOrder: 11 },
  { id: "12", name: "Uber", slug: "uber", icon: "🚗", isActive: true, isHot: false, sortOrder: 12 },
  { id: "13", name: "Amazon", slug: "amazon", icon: "📦", isActive: true, isHot: false, sortOrder: 13 },
  { id: "14", name: "Netflix", slug: "netflix", icon: "🎬", isActive: true, isHot: false, sortOrder: 14 },
  { id: "15", name: "Spotify", slug: "spotify", icon: "🎧", isActive: true, isHot: false, sortOrder: 15 },
  { id: "16", name: "LinkedIn", slug: "linkedin", icon: "💼", isActive: true, isHot: false, sortOrder: 16 },
  { id: "17", name: "Steam", slug: "steam", icon: "🎮", isActive: true, isHot: false, sortOrder: 17 },
  { id: "18", name: "Snapchat", slug: "snapchat", icon: "👻", isActive: true, isHot: false, sortOrder: 18 },
];

const countries = [
  { id: "1", name: "Türkiye", isoCode: "TR", dialCode: "+90", flag: "🇹🇷", isActive: true },
  { id: "2", name: "Amerika Birleşik Devletleri", isoCode: "US", dialCode: "+1", flag: "🇺🇸", isActive: true },
  { id: "3", name: "İngiltere", isoCode: "GB", dialCode: "+44", flag: "🇬🇧", isActive: true },
  { id: "4", name: "Almanya", isoCode: "DE", dialCode: "+49", flag: "🇩🇪", isActive: true },
  { id: "5", name: "Fransa", isoCode: "FR", dialCode: "+33", flag: "🇫🇷", isActive: true },
  { id: "6", name: "Hollanda", isoCode: "NL", dialCode: "+31", flag: "🇳🇱", isActive: true },
  { id: "7", name: "İspanya", isoCode: "ES", dialCode: "+34", flag: "🇪🇸", isActive: true },
  { id: "8", name: "İtalya", isoCode: "IT", dialCode: "+39", flag: "🇮🇹", isActive: true },
  { id: "9", name: "Brezilya", isoCode: "BR", dialCode: "+55", flag: "🇧🇷", isActive: true },
  { id: "10", name: "Endonezya", isoCode: "ID", dialCode: "+62", flag: "🇮🇩", isActive: true },
  { id: "11", name: "Filipinler", isoCode: "PH", dialCode: "+63", flag: "🇵🇭", isActive: true },
  { id: "12", name: "Tayland", isoCode: "TH", dialCode: "+66", flag: "🇹🇭", isActive: true },
  { id: "13", name: "Romanya", isoCode: "RO", dialCode: "+40", flag: "🇷🇴", isActive: true },
  { id: "14", name: "Suudi Arabistan", isoCode: "SA", dialCode: "+966", flag: "🇸🇦", isActive: true },
];

const prices: Record<string, Record<string, number>> = {
  "1": { "1": 1500, "2": 2500, "3": 2000, "4": 1800, "5": 2200 },
  "2": { "1": 1800, "2": 3000, "3": 2500, "4": 2200, "5": 2800 },
  "3": { "1": 1200, "2": 2000, "3": 1800, "4": 1500, "5": 1900 },
};

async function main() {
  for (const service of services) {
    await prisma.service.upsert({
      where: { id: service.id },
      update: service,
      create: service,
    });
  }

  for (const country of countries) {
    await prisma.country.upsert({
      where: { id: country.id },
      update: country,
      create: country,
    });
  }

  for (const service of services) {
    for (const country of countries) {
      const price = prices[service.id]?.[country.id] ?? 2000;
      const stock = 25;
      await prisma.serviceCountry.upsert({
        where: {
          serviceId_countryId: {
            serviceId: service.id,
            countryId: country.id,
          },
        },
        update: { price, stock },
        create: {
          serviceId: service.id,
          countryId: country.id,
          price,
          stock,
        },
      });
    }
  }

  const posts = [
    {
      slug: "sms-onay-nedir",
      title: "SMS Onay Nedir?",
      excerpt: "SMS onay sisteminin nasıl çalıştığını, neden önemli olduğunu ve güvenli kullanım ipuçlarını öğrenin.",
      content: "SMS onay, bir hesabın telefon numarası üzerinden doğrulanmasıdır.",
    },
    {
      slug: "sanal-numara-nasil-calisir",
      title: "Sanal Numara Nasıl Çalışır?",
      excerpt: "Sanal numaraların teknolojisi, avantajları ve kullanım alanları hakkında detaylı bilgi.",
      content: "Sanal numaralar, fiziksel SIM olmadan SMS almanızı sağlar.",
    },
    {
      slug: "online-gizlilik-koruma",
      title: "Online Gizliliğinizi Nasıl Koruyabilirsiniz?",
      excerpt: "Dijital dünyada gizliliğinizi korumak için etkili yöntemler ve en iyi uygulamalar.",
      content: "Güçlü şifre, iki faktörlü doğrulama ve dikkatli paylaşım temeldir.",
    },
    {
      slug: "telefon-dogrulama-sistemleri",
      title: "Telefon Doğrulama Sistemleri Nasıl Çalışır?",
      excerpt: "İki faktörlü doğrulama ve telefon doğrulama sistemlerinin teknolojisi.",
      content: "OTP kodları kısa süreli üretilir ve tek kullanımlıktır.",
    },
  ];

  for (const post of posts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: {
        ...post,
        status: "published",
        publishedAt: new Date(),
      },
    });
  }

  console.log("Seed tamamlandı.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
