export const siteConfig = {
  name: "OnaylaNumber",
  description: "SMS doğrulama ve sanal numara seçeneklerini tek panelden yönetin. Farklı servis ve ülke seçeneklerini kolayca görüntüleyin.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://onaylanumber.com",
  supportEmail: "destek@onaylanumber.com",
  currency: "TRY",
  locale: "tr-TR",
  
  // Feature flags
  paymentsEnabled: true,
  googleAuthEnabled: false,
  smsProviderMode: "mock", // "mock" or "production"
  
  // Social links
  socialLinks: {
    twitter: "https://twitter.com/onaylanumber",
    instagram: "https://instagram.com/onaylanumber",
    linkedin: "https://linkedin.com/company/onaylanumber",
  },
  
  // Brand colors
  colors: {
    primary: "#2196F3",
    primaryLight: "#2EA3F2",
    primaryDark: "#1E88E5",
    headerDark: "#29364A",
    headerDarkAlt: "#2D3A4F",
    background: "#FFFFFF",
    backgroundAlt: "#F8FAFC",
    backgroundAlt2: "#F5F7FB",
    textPrimary: "#111827",
    textPrimaryAlt: "#171725",
    textSecondary: "#6B7280",
    textSecondaryAlt: "#737984",
    success: "#25C48A",
    warning: "#FFC107",
    danger: "#EF4444",
  },
  
  // App limits
  maxActivationsPerUser: 10,
  activationTimeoutMinutes: 15,
  
  // SEO
  seo: {
    title: "OnaylaNumber - SMS Onay ve Sanal Numara",
    description: "SMS doğrulama ve sanal numara seçeneklerini tek panelden yönetin. Farklı servis ve ülke seçeneklerini kolayca görüntüleyin.",
    keywords: ["SMS onay", "sanal numara", "SMS doğrulama", "telefon doğrulama", "online numara", "SMS kodu", "Telegram numarası", "WhatsApp numarası"],
  },
}