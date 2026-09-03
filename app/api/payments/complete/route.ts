import { NextRequest, NextResponse } from 'next/server';
import { getIyzicoService } from '@/lib/iyzico';
import { sendTelegramNotification } from '@/lib/telegram';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { paymentId, conversationData } = body;

    if (!paymentId) {
      return NextResponse.json(
        { success: false, error: 'Payment ID gerekli' },
        { status: 400 }
      );
    }

    // Complete 3D Secure payment
    const iyzicoService = getIyzicoService();
    const paymentResponse = await iyzicoService.complete3DSPayment(paymentId, conversationData);

    if (paymentResponse.status === 'success') {
      // Send success notification to Telegram
      await sendTelegramNotification({
        type: 'payment_success',
        paymentId: paymentResponse.paymentId,
        amount: paymentResponse.price,
        userId: 'unknown', // This would come from auth in production
        timestamp: new Date().toISOString()
      });

      return NextResponse.json({
        success: true,
        paymentId: paymentResponse.paymentId,
        amount: paymentResponse.price,
        currency: paymentResponse.currency
      });
    } else {
      // Send failure notification to Telegram
      await sendTelegramNotification({
        type: 'payment_failed',
        paymentId: paymentId,
        amount: paymentResponse.price,
        userId: 'unknown',
        timestamp: new Date().toISOString()
      });

      return NextResponse.json(
        { 
          success: false, 
          error: paymentResponse.errorMessage || 'Ödeme tamamlanamadı' 
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Payment completion error:', error);
    return NextResponse.json(
      { success: false, error: 'Sunucu hatası oluştu' },
      { status: 500 }
    );
  }
}