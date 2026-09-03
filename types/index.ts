export interface User {
  id: string
  email: string
  name: string
  surname?: string
  phone?: string
  balance: number // stored as integer (cents/kuruş)
  status: "active" | "suspended" | "banned"
  role: "user" | "admin"
  createdAt: Date
  updatedAt: Date
}

export interface Service {
  id: string
  name: string
  slug: string
  icon: string
  isActive: boolean
  isHot: boolean
  sortOrder: number
}

export interface Country {
  id: string
  name: string
  isoCode: string
  dialCode: string
  flag: string
  isActive: boolean
}

export interface ServiceCountry {
  id: string
  serviceId: string
  countryId: string
  price: number // stored as integer (cents/kuruş)
  stock: number
  providerReference?: string
}

export type ActivationStatus = "WAITING_SMS" | "SMS_RECEIVED" | "COMPLETED" | "CANCELLED" | "EXPIRED"

export interface Activation {
  id: string
  userId: string
  serviceId: string
  countryId: string
  phoneNumber: string
  price: number
  status: ActivationStatus
  smsCode?: string
  smsText?: string
  providerOrderId?: string
  createdAt: Date
  expiresAt: Date
  completedAt?: Date
}

export type TransactionType = "deposit" | "withdraw" | "purchase" | "refund" | "bonus"

export type TransactionStatus = "pending" | "completed" | "failed" | "cancelled"

export interface WalletTransaction {
  id: string
  userId: string
  type: TransactionType
  amount: number // stored as integer (cents/kuruş)
  status: TransactionStatus
  description: string
  createdAt: Date
}

export type SupportCategory = "technical" | "number" | "sms" | "balance" | "account" | "other"

export type SupportStatus = "open" | "answered" | "closed"

export interface SupportTicket {
  id: string
  userId: string
  subject: string
  category: SupportCategory
  message: string
  status: SupportStatus
  createdAt: Date
  updatedAt: Date
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage?: string
  status: "draft" | "published"
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface SmsProvider {
  getServices(): Promise<Service[]>
  getCountries(serviceId?: string): Promise<Country[]>
  getPrice(serviceId: string, countryId: string): Promise<number>
  buyNumber(serviceId: string, countryId: string): Promise<Activation>
  getStatus(orderId: string): Promise<ActivationStatus>
  getSms(orderId: string): Promise<{ code: string; text: string }>
  cancel(orderId: string): Promise<boolean>
}

export interface PaymentProvider {
  createPayment(amount: number, userId: string): Promise<{ paymentUrl: string; paymentId: string }>
  verifyPayment(paymentId: string): Promise<boolean>
  refund(paymentId: string, amount: number): Promise<boolean>
}