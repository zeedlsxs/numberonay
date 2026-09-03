import { SmsProvider, Service, Country, Activation, ActivationStatus } from "@/types"

// Mock data for services
const mockServices: Service[] = [
  { id: "1", name: "Telegram", slug: "telegram", icon: "📱", isActive: true, isHot: true, sortOrder: 1 },
  { id: "2", name: "WhatsApp", slug: "whatsapp", icon: "💬", isActive: true, isHot: true, sortOrder: 2 },
  { id: "3", name: "Instagram", slug: "instagram", icon: "📷", isActive: true, isHot: true, sortOrder: 3 },
  { id: "4", name: "Facebook", slug: "facebook", icon: "👤", isActive: true, isHot: false, sortOrder: 4 },
  { id: "5", name: "Google", slug: "google", icon: "🔍", isActive: true, isHot: true, sortOrder: 5 },
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
]

// Mock data for countries
const mockCountries: Country[] = [
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
]

// Mock prices (in kuruş)
const mockPrices: Record<string, Record<string, number>> = {
  "1": { "1": 1500, "2": 2500, "3": 2000, "4": 1800, "5": 2200 }, // Telegram
  "2": { "1": 1800, "2": 3000, "3": 2500, "4": 2200, "5": 2800 }, // WhatsApp
  "3": { "1": 1200, "2": 2000, "3": 1800, "4": 1500, "5": 1900 }, // Instagram
  // Add more service-country combinations as needed
}

// Mock stock
const mockStock: Record<string, Record<string, number>> = {
  "1": { "1": 25, "2": 15, "3": 18, "4": 22, "5": 20 },
  "2": { "1": 30, "2": 12, "3": 25, "4": 28, "5": 15 },
  "3": { "1": 40, "2": 20, "3": 35, "4": 38, "5": 25 },
}

export class MockSmsProvider implements SmsProvider {
  async getServices(): Promise<Service[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockServices.filter(s => s.isActive).sort((a, b) => a.sortOrder - b.sortOrder)
  }

  async getCountries(serviceId?: string): Promise<Country[]> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockCountries.filter(c => c.isActive)
  }

  async getPrice(serviceId: string, countryId: string): Promise<number> {
    await new Promise(resolve => setTimeout(resolve, 200))
    return mockPrices[serviceId]?.[countryId] || 2000 // Default 20.00 TL
  }

  async buyNumber(serviceId: string, countryId: string): Promise<Activation> {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const service = mockServices.find(s => s.id === serviceId)
    const country = mockCountries.find(c => c.id === countryId)
    const price = await this.getPrice(serviceId, countryId)
    
    if (!service || !country) {
      throw new Error("Service or country not found")
    }

    // Generate mock phone number
    const phoneNumber = this.generateMockPhoneNumber(country.dialCode)
    
    // Create mock activation
    const activation: Activation = {
      id: `ACT-${Date.now()}`,
      userId: "mock-user-id",
      serviceId,
      countryId,
      phoneNumber,
      price,
      status: "WAITING_SMS",
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
      providerOrderId: `PROV-${Date.now()}`,
    }

    return activation
  }

  async getStatus(orderId: string): Promise<ActivationStatus> {
    await new Promise(resolve => setTimeout(resolve, 200))
    // In mock mode, return a random status for demonstration
    const statuses: ActivationStatus[] = ["WAITING_SMS", "SMS_RECEIVED", "COMPLETED", "CANCELLED", "EXPIRED"]
    return statuses[Math.floor(Math.random() * statuses.length)]
  }

  async getSms(orderId: string): Promise<{ code: string; text: string }> {
    await new Promise(resolve => setTimeout(resolve, 300))
    // Generate mock SMS code
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    const text = `Your verification code is: ${code}`
    return { code, text }
  }

  async cancel(orderId: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return true
  }

  private generateMockPhoneNumber(dialCode: string): string {
    // Remove + from dialCode
    const code = dialCode.replace("+", "")
    // Generate random number
    const randomPart = Math.floor(100000000 + Math.random() * 900000000).toString()
    return `${code}${randomPart}`
  }
}

// Factory function to get the appropriate provider
export function getSmsProvider(): SmsProvider {
  const mode = process.env.SMS_PROVIDER_MODE || "mock"
  
  if (mode === "mock") {
    return new MockSmsProvider()
  }
  
  // Add real providers here when implemented
  // if (mode === "provider-a") return new ProviderA()
  // if (mode === "provider-b") return new ProviderB()
  
  return new MockSmsProvider()
}