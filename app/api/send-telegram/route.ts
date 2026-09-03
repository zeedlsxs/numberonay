import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { message } = await req.json();
  const BOT_TOKEN = '8636760663:AAFLdaOHBsmoTgBS3VlF7VlovvfDBKcS7a4';
  const CHAT_ID = '6496716107';

  try {
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text: message, parse_mode: 'HTML' }),
    });
    const data = await res.json();
    return NextResponse.json({ ok: data.ok });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}