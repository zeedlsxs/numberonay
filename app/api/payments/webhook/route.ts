import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { paymentId, status, amount, userId } = body;

    // Webhook güvenliği kontrolü (iyzico signature)
    const signature = request.headers.get('x-iyzico-signature');
    
    // Burada signature doğrulaması yapılacak
    
    // Ödeme sonucuna göre işlem
    if (status === 'success') {
      // Kullanıcıya bakiye ekle
      // Telegram botuna bildirim gönder
      await sendTelegramNotification({
        type: 'payment_success',
        paymentId,
        amount,
        userId,
        timestamp: new Date().toISOString()
      });
    } else {
      // Başarısız ödeme bildirimi
      await sendTelegramNotification({
        type: 'payment_failed',
        paymentId,
        amount,
        userId,
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Webhook işlenemedi' },
      { status: 500 }
    );
  }
}

async function sendTelegramNotification(data: any) {
  // Telegram bot API çağrısı
  // Şimdilik mock
  console.log('Telegram notification:', data);
}