import { PaymentProvider } from "@/types"

export class MockPaymentProvider implements PaymentProvider {
  async createPayment(amount: number, userId: string): Promise<{ paymentUrl: string; paymentId: string }> {
    // In mock mode, payments are disabled
    throw new Error("Ödeme sistemi şu anda aktif değildir.")
  }

  async verifyPayment(paymentId: string): Promise<boolean> {
    // In mock mode, payments are disabled
    throw new Error("Ödeme sistemi şu anda aktif değildir.")
  }

  async refund(paymentId: string, amount: number): Promise<boolean> {
    // In mock mode, payments are disabled
    throw new Error("Ödeme sistemi şu anda aktif değildir.")
  }
}

export class NoopPaymentProvider implements PaymentProvider {
  async createPayment(amount: number, userId: string): Promise<{ paymentUrl: string; paymentId: string }> {
    // No-op implementation for when payments are completely disabled
    return {
      paymentUrl: "",
      paymentId: "noop",
    }
  }

  async verifyPayment(paymentId: string): Promise<boolean> {
    return false
  }

  async refund(paymentId: string, amount: number): Promise<boolean> {
    return false
  }
}

export function getPaymentProvider(): PaymentProvider {
  const paymentsEnabled = process.env.PAYMENTS_ENABLED === "true"
  
  if (!paymentsEnabled) {
    return new NoopPaymentProvider()
  }
  
  // Add real payment providers here when implemented
  // if (process.env.PAYMENT_PROVIDER === "stripe") return new StripeProvider()
  // if (process.env.PAYMENT_PROVIDER === "iyzico") return new IyzicoProvider()
  // if (process.env.PAYMENT_PROVIDER === "paytr") return new PaytrProvider()
  
  return new MockPaymentProvider()
}