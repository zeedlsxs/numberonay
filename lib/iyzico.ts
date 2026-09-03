import { createHmac, randomUUID } from "node:crypto";

export interface IyzicoConfig {
  apiKey: string;
  secretKey: string;
  baseUrl: string;
}

export interface PaymentRequest {
  price: number;
  paidPrice: number;
  currency: string;
  installment: number;
  basketId: string;
  paymentChannel: string;
  paymentGroup: string;
  callbackUrl?: string;
  card?: {
    cardHolderName?: string;
    cardNumber?: string;
    expireMonth?: string;
    expireYear?: string;
    cvc?: string;
  };
  buyer: {
    id: string;
    name: string;
    surname: string;
    email: string;
    identityNumber: string;
    registrationAddress: string;
    city: string;
    country: string;
    zipCode: string;
  };
  shippingAddress: {
    contactName: string;
    city: string;
    country: string;
    address: string;
    zipCode: string;
  };
  billingAddress: {
    contactName: string;
    city: string;
    country: string;
    address: string;
    zipCode: string;
  };
  basketItems: Array<{
    id: string;
    name: string;
    category1: string;
    category2: string;
    itemType: string;
    price: number;
    url?: string;
  }>;
}

export interface PaymentResponse {
  status: string;
  paymentId?: string;
  price: number;
  paidPrice: number;
  currency: string;
  installment: number;
  fraudStatus?: string;
  errorMessage?: string;
  errorCode?: string;
  conversationId?: string;
  threeDSHtmlContent?: string;
}

function responseFrom(data: Record<string, unknown>, fallback: Partial<PaymentResponse> = {}): PaymentResponse {
  return {
    status: typeof data.status === "string" ? data.status : "failure",
    paymentId: typeof data.paymentId === "string" ? data.paymentId : fallback.paymentId,
    price: Number(data.price ?? fallback.price ?? 0),
    paidPrice: Number(data.paidPrice ?? fallback.paidPrice ?? 0),
    currency: typeof data.currency === "string" ? data.currency : String(fallback.currency ?? "TRY"),
    installment: Number(data.installment ?? fallback.installment ?? 1),
    fraudStatus: typeof data.fraudStatus === "string" ? data.fraudStatus : undefined,
    errorMessage: typeof data.errorMessage === "string" ? data.errorMessage : undefined,
    errorCode: typeof data.errorCode === "string" ? data.errorCode : undefined,
    conversationId: typeof data.conversationId === "string" ? data.conversationId : undefined,
    threeDSHtmlContent: typeof data.threeDSHtmlContent === "string" ? data.threeDSHtmlContent : undefined,
  };
}

export function isMockPaymentMode() {
  const provider = (process.env.PAYMENT_PROVIDER || "").trim().toLowerCase();
  const apiKey = (process.env.IYZICO_API_KEY || "").trim();
  const secretKey = (process.env.IYZICO_SECRET_KEY || "").trim();
  return provider === "mock" || !apiKey || !secretKey || apiKey === "sandbox-api-key" || secretKey === "sandbox-secret-key";
}

export class IyzicoService {
  private config: IyzicoConfig;

  constructor(config: IyzicoConfig) {
    this.config = config;
  }

  private async request(path: string, payload: Record<string, unknown>) {
    const body = JSON.stringify(payload);
    const randomKey = randomUUID().replace(/-/g, "");
    const signature = createHmac("sha256", this.config.secretKey).update(randomKey + path + body).digest("hex");
    const authorization = Buffer.from(randomKey + ":" + signature).toString("base64");
    const response = await fetch(this.config.baseUrl.replace(/\\/$/, "") + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-iyzi-rnd": randomKey,
        Authorization: "IYZWSv2 " + authorization,
      },
      body,
      cache: "no-store",
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(typeof data.errorMessage === "string" ? data.errorMessage : "Ödeme sağlayıcısından yanıt alınamadı.");
    }
    return data as Record<string, unknown>;
  }

  async create3DSPayment(request: PaymentRequest): Promise<PaymentResponse> {
    const fallback = { price: request.price, paidPrice: request.paidPrice, currency: request.currency, installment: request.installment };
    if (isMockPaymentMode()) {
      return { status: "success", paymentId: "mock-" + Date.now(), ...fallback, fraudStatus: "APPROVED" };
    }

    try {
      const data = await this.request("/payment/3dsecure/initialize", {
        locale: "tr",
        conversationId: request.basketId,
        price: request.price,
        paidPrice: request.paidPrice,
        currency: request.currency,
        installment: request.installment,
        basketId: request.basketId,
        paymentChannel: request.paymentChannel,
        paymentGroup: request.paymentGroup,
        callbackUrl: request.callbackUrl || (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000") + "/api/payments/complete",
        paymentCard: request.card,
        buyer: request.buyer,
        shippingAddress: request.shippingAddress,
        billingAddress: request.billingAddress,
        basketItems: request.basketItems,
      });
      return responseFrom(data, fallback);
    } catch (error) {
      return { status: "failure", ...fallback, errorMessage: error instanceof Error ? error.message : "Ödeme başlatılamadı." };
    }
  }

  async complete3DSPayment(paymentId: string, conversationData?: string): Promise<PaymentResponse> {
    if (isMockPaymentMode()) {
      return { status: "success", paymentId, price: 0, paidPrice: 0, currency: "TRY", installment: 1, fraudStatus: "APPROVED" };
    }

    try {
      const data = await this.request("/payment/3dsecure/auth", {
        locale: "tr",
        conversationId: paymentId,
        paymentId,
        conversationData: conversationData || paymentId,
      });
      return responseFrom(data, { paymentId, currency: "TRY", installment: 1 });
    } catch (error) {
      return { status: "failure", paymentId, price: 0, paidPrice: 0, currency: "TRY", installment: 1, errorMessage: error instanceof Error ? error.message : "Ödeme tamamlanamadı." };
    }
  }

  async getPaymentDetails(paymentId: string): Promise<PaymentResponse> {
    try {
      const data = await this.request("/payment/detail", { locale: "tr", conversationId: paymentId, paymentId });
      return responseFrom(data, { paymentId, currency: "TRY", installment: 1 });
    } catch (error) {
      return { status: "failure", paymentId, price: 0, paidPrice: 0, currency: "TRY", installment: 1, errorMessage: error instanceof Error ? error.message : "Ödeme detayları alınamadı." };
    }
  }

  async refundPayment(paymentId: string, amount?: number): Promise<PaymentResponse> {
    try {
      const data = await this.request("/payment/refund", { locale: "tr", conversationId: paymentId, paymentId, price: amount });
      return responseFrom(data, { paymentId, price: amount || 0, paidPrice: amount || 0, currency: "TRY", installment: 1 });
    } catch (error) {
      return { status: "failure", paymentId, price: amount || 0, paidPrice: amount || 0, currency: "TRY", installment: 1, errorMessage: error instanceof Error ? error.message : "İade işlemi başarısız." };
    }
  }

  async cancelPayment(paymentId: string): Promise<PaymentResponse> {
    try {
      const data = await this.request("/payment/cancel", { locale: "tr", conversationId: paymentId, paymentId });
      return responseFrom(data, { paymentId, currency: "TRY", installment: 1 });
    } catch (error) {
      return { status: "failure", paymentId, price: 0, paidPrice: 0, currency: "TRY", installment: 1, errorMessage: error instanceof Error ? error.message : "İptal işlemi başarısız." };
    }
  }
}

export function getIyzicoService(): IyzicoService {
  return new IyzicoService({
    apiKey: process.env.IYZICO_API_KEY || "sandbox-api-key",
    secretKey: process.env.IYZICO_SECRET_KEY || "sandbox-secret-key",
    baseUrl: process.env.IYZICO_BASE_URL || "https://sandbox-api.iyzipay.com",
  });
}
