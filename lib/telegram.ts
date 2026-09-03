// Telegram Bot Service
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '';

export interface TelegramNotification {
  type: 'payment_success' | 'payment_failed' | 'suspicious_activity' | 'system_alert';
  paymentId?: string;
  amount?: number;
  userId?: string;
  timestamp?: string;
  details?: any;
}

export async function sendTelegramNotification(data: TelegramNotification) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return false;
  }

  let message = '';

  switch (data.type) {
    case 'payment_success':
      message = `✅ *BAŞARILI ÖDEME*\n\n`;
      message += `💰 Tutar: ${data.amount} ₺\n`;
      message += `🆔 Ödeme ID: ${data.paymentId}\n`;
      message += `👤 Kullanıcı ID: ${data.userId}\n`;
      message += `⏰ Zaman: ${data.timestamp}\n`;
      break;

    case 'payment_failed':
      message = `❌ *BAŞARISIZ ÖDEME*\n\n`;
      message += `💰 Tutar: ${data.amount} ₺\n`;
      message += `🆔 Ödeme ID: ${data.paymentId}\n`;
      message += `👤 Kullanıcı ID: ${data.userId}\n`;
      message += `⏰ Zaman: ${data.timestamp}\n`;
      break;

    case 'suspicious_activity':
      message = `⚠️ *ŞÜPHELİ AKTİVİTE*\n\n`;
      message += `👤 Kullanıcı ID: ${data.userId}\n`;
      message += `📋 Detaylar: ${JSON.stringify(data.details)}\n`;
      message += `⏰ Zaman: ${data.timestamp}\n`;
      break;

    case 'system_alert':
      message = `🚨 *SİSTEM UYARISI*\n\n`;
      message += `📋 Detaylar: ${JSON.stringify(data.details)}\n`;
      message += `⏰ Zaman: ${data.timestamp}\n`;
      break;
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'Markdown',
    }),
  });

  const result = await response.json();
  return result.ok;
  } catch (error) {
    return false;
  }
}