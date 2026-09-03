// iyzico Payment Service
// This is a TypeScript implementation for iyzico integration

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
}

export class IyzicoService {
  private config: IyzicoConfig;

  constructor(config: IyzicoConfig) {
    this.config = config;
  }

  // Create 3D Secure payment initialization
  async create3DSPayment(request: PaymentRequest): Promise<PaymentResponse> {
    try {
      // In a real implementation, this would call iyzico API
      // For now, we'll return a mock response
      console.log('Creating 3DS payment with iyzico:', {
        price: request.price,
        currency: request.currency,
        basketId: request.basketId
      });

      // Mock response for development
      return {
        status: 'success',
        paymentId: `iyzico-${Date.now()}`,
        price: request.price,
        paidPrice: request.paidPrice,
        currency: request.currency,
        installment: request.installment,
        fraudStatus: 'APPROVED'
      };
    } catch (error) {
      console.error('iyzico payment error:', error);
      return {
        status: 'error',
        errorMessage: 'Ödeme işlemi başlatılamadı',
        price: request.price,
        paidPrice: request.paidPrice,
        currency: request.currency,
        installment: request.installment
      };
    }
  }

  // Complete 3D Secure payment
  async complete3DSPayment(paymentId: string, conversationData: string): Promise<PaymentResponse> {
    try {
      console.log('Completing 3DS payment:', paymentId);

      // Mock response
      return {
        status: 'success',
        paymentId: paymentId,
        price: 0,
        paidPrice: 0,
        currency: 'TRY',
        installment: 1,
        fraudStatus: 'APPROVED'
      };
    } catch (error) {
      console.error('iyzico complete payment error:', error);
      return {
        status: 'error',
        errorMessage: 'Ödeme tamamlanamadı',
        paymentId: paymentId,
        price: 0,
        paidPrice: 0,
        currency: 'TRY',
        installment: 1
      };
    }
  }

  // Get payment details
  async getPaymentDetails(paymentId: string): Promise<PaymentResponse> {
    try {
      console.log('Getting payment details:', paymentId);

      // Mock response
      return {
        status: 'success',
        paymentId: paymentId,
        price: 100,
        paidPrice: 100,
        currency: 'TRY',
        installment: 1,
        fraudStatus: 'APPROVED'
      };
    } catch (error) {
      console.error('iyzico get payment error:', error);
      return {
        status: 'error',
        errorMessage: 'Ödeme detayları alınamadı',
        paymentId: paymentId,
        price: 0,
        paidPrice: 0,
        currency: 'TRY',
        installment: 1
      };
    }
  }

  // Refund payment
  async refundPayment(paymentId: string, amount?: number): Promise<PaymentResponse> {
    try {
      console.log('Refunding payment:', paymentId, amount);

      // Mock response
      return {
        status: 'success',
        paymentId: paymentId,
        price: amount || 0,
        paidPrice: amount || 0,
        currency: 'TRY',
        installment: 1
      };
    } catch (error) {
      console.error('iyzico refund error:', error);
      return {
        status: 'error',
        errorMessage: 'İade işlemi başarısız',
        paymentId: paymentId,
        price: 0,
        paidPrice: 0,
        currency: 'TRY',
        installment: 1
      };
    }
  }

  // Cancel payment
  async cancelPayment(paymentId: string): Promise<PaymentResponse> {
    try {
      console.log('Cancelling payment:', paymentId);

      // Mock response
      return {
        status: 'success',
        paymentId: paymentId,
        price: 0,
        paidPrice: 0,
        currency: 'TRY',
        installment: 1
      };
    } catch (error) {
      console.error('iyzico cancel error:', error);
      return {
        status: 'error',
        errorMessage: 'İptal işlemi başarısız',
        paymentId: paymentId,
        price: 0,
        paidPrice: 0,
        currency: 'TRY',
        installment: 1
      };
    }
  }
}

// Factory function to get iyzico service instance
export function getIyzicoService(): IyzicoService {
  const config: IyzicoConfig = {
    apiKey: process.env.IYZICO_API_KEY || 'sandbox-api-key',
    secretKey: process.env.IYZICO_SECRET_KEY || 'sandbox-secret-key',
    baseUrl: process.env.IYZICO_BASE_URL || 'https://sandbox-api.iyzipay.com'
  };

  return new IyzicoService(config);
}