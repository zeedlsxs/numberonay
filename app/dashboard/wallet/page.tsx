"use client";

import { useEffect, useMemo, useState } from "react";
import { formatCurrency } from "@lib/utils";
import Card from "@components/common/Card";
import Button from "@components/common/Button";
import Modal from "@components/common/Modal";
import Input from "@components/common/Input";
import Toast from "@components/common/Toast";
import {
  ArrowDownToLine,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Lock,
  Plus,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";

interface Transaction {
  id: string;
  type: string;
  amount: number;
  status: string;
  description: string;
  createdAt: string;
}

type ToastState = { type: "success" | "error"; message: string } | null;

const quickAmounts = [50, 100, 250, 500];
const emptyPaymentForm = {
  amount: "",
  cardHolderName: "",
  cardNumber: "",
  expiryMonth: "",
  expiryYear: "",
  cvc: "",
};

export default function WalletPage() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<ToastState>(null);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [paymentForm, setPaymentForm] = useState(emptyPaymentForm);

  const totalDeposits = useMemo(
    () => transactions.filter((tx) => tx.type === "deposit").reduce((sum, tx) => sum + Number(tx.amount), 0),
    [transactions],
  );

  const loadWallet = async () => {
    try {
      const response = await fetch("/api/wallet", { cache: "no-store" });
      if (!response.ok) throw new Error("wallet-load-failed");
      const data = await response.json();
      setBalance(Number(data.balance || 0));
      setTransactions(Array.isArray(data.transactions) ? data.transactions : []);
    } catch {
      setToast({ type: "error", message: "Cüzdan bilgileri şu an yüklenemedi." });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadWallet();
  }, []);

  const updateForm = (key: keyof typeof emptyPaymentForm, value: string) => {
    setPaymentForm((current) => ({ ...current, [key]: value }));
  };

  const resetPaymentForm = () => setPaymentForm({ ...emptyPaymentForm });

  const handlePaymentSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsProcessing(true);
    setToast(null);

    const amount = Number(paymentForm.amount);
    const cardNumber = paymentForm.cardNumber.replace(/\s/g, "");
    if (!Number.isFinite(amount) || amount < 10) {
      setToast({ type: "error", message: "Minimum yükleme tutarı 10 TL." });
      setIsProcessing(false);
      return;
    }

    try {
      const response = await fetch("/api/payments/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          currency: "TRY",
          card: {
            cardHolderName: paymentForm.cardHolderName.trim(),
            cardNumber,
            expireMonth: paymentForm.expiryMonth,
            expireYear: paymentForm.expiryYear,
            cvc: paymentForm.cvc,
          },
        }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Ödeme başlatılamadı.");
      }

      if (data.credited) {
        setBalance(Number(data.balance ?? balance + amount));
        await loadWallet();
        setToast({ type: "success", message: formatCurrency(amount) + " bakiyenize eklendi." });
        setIsPaymentModalOpen(false);
        resetPaymentForm();
      } else if (data.paymentUrl) {
        window.location.assign(data.paymentUrl);
      } else {
        setToast({ type: "success", message: "Ödeme başlatıldı. Sonuç kesinleşince bakiyeniz güncellenecek." });
        setIsPaymentModalOpen(false);
        resetPaymentForm();
      }
    } catch (error) {
      setToast({
        type: "error",
        message: error instanceof Error ? error.message : "Ödeme sırasında hata oluştu.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 flex items-center gap-2 text-sm font-medium text-yellow-400"><Sparkles className="h-4 w-4" /> Finans merkezi</p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Cüzdanım</h1>
          <p className="mt-2 max-w-xl text-sm text-slate-400 sm:text-base">Bakiyeni yönet, işlemlerini tek ekrandan takip et.</p>
        </div>
        <Button onClick={() => setIsPaymentModalOpen(true)} className="inline-flex items-center justify-center gap-2 bg-yellow-500 px-5 py-3 font-semibold text-black shadow-lg shadow-yellow-500/10 transition hover:bg-yellow-400"><Plus className="h-4 w-4" /> Bakiye yükle</Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr]">
        <Card className="relative overflow-hidden border border-yellow-300/20 bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600 p-6 text-slate-950 shadow-xl shadow-amber-900/20 sm:p-8">
          <div className="absolute -right-12 -top-16 h-48 w-48 rounded-full bg-white/20 blur-2xl" />
          <div className="relative flex items-start justify-between"><div><p className="text-sm font-medium text-slate-950/70">Kullanılabilir bakiye</p><p className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{formatCurrency(balance)}</p><p className="mt-4 flex items-center gap-2 text-sm font-medium text-slate-950/70"><CheckCircle2 className="h-4 w-4" /> Hesabındaki güncel tutar</p></div><div className="rounded-2xl bg-black/10 p-3"><Wallet className="h-8 w-8" /></div></div>
        </Card>
        <Card className="border border-white/10 bg-white/[0.04] p-6"><div className="flex items-center justify-between text-slate-400"><span className="text-sm">Toplam yükleme</span><ArrowDownToLine className="h-5 w-5 text-emerald-400" /></div><p className="mt-6 text-2xl font-bold text-white">{formatCurrency(totalDeposits)}</p><p className="mt-2 text-xs text-slate-500">Kayıtlı işlemlerine göre</p></Card>
        <Card className="border border-white/10 bg-white/[0.04] p-6"><div className="flex items-center justify-between text-slate-400"><span className="text-sm">İşlem sayısı</span><ArrowUpRight className="h-5 w-5 text-yellow-400" /></div><p className="mt-6 text-2xl font-bold text-white">{transactions.length}</p><p className="mt-2 text-xs text-slate-500">Son 50 işlem gösteriliyor</p></Card>
      </div>

      <Card className="overflow-hidden border border-white/10 bg-white/[0.03]">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-5 sm:px-6"><div><h2 className="text-lg font-semibold text-white">Son işlemler</h2><p className="mt-1 text-sm text-slate-500">Cüzdan hareketlerinin özeti</p></div><button type="button" onClick={() => void loadWallet()} className="text-sm font-medium text-yellow-400 transition hover:text-yellow-300">Yenile</button></div>
        <div className="divide-y divide-white/5">
          {isLoading ? <div className="px-6 py-12 text-center text-sm text-slate-500">Cüzdan yükleniyor...</div> : transactions.length === 0 ? <div className="px-6 py-14 text-center"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400/10 text-yellow-400"><Wallet className="h-7 w-7" /></div><p className="mt-4 font-medium text-white">Henüz işlem yok</p><p className="mt-1 text-sm text-slate-500">İlk bakiyeni yükleyerek başlayabilirsin.</p></div> : transactions.map((transaction) => { const isDeposit = transaction.type === "deposit"; return <div key={transaction.id} className="flex items-center justify-between gap-4 px-5 py-4 transition hover:bg-white/[0.03] sm:px-6"><div className="flex min-w-0 items-center gap-3"><div className={"flex h-10 w-10 shrink-0 items-center justify-center rounded-xl " + (isDeposit ? "bg-emerald-400/10 text-emerald-400" : "bg-red-400/10 text-red-400")}>{isDeposit ? <ArrowDownToLine className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}</div><div className="min-w-0"><p className="truncate text-sm font-medium text-white">{transaction.description}</p><p className="mt-1 text-xs text-slate-500">{new Date(transaction.createdAt).toLocaleDateString("tr-TR")}</p></div></div><div className={"shrink-0 text-sm font-semibold " + (isDeposit ? "text-emerald-400" : "text-red-400")}>{isDeposit ? "+" : "-"} {formatCurrency(Number(transaction.amount))}</div></div>; })}
        </div>
      </Card>

      <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:p-5"><div className="flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-emerald-400" /><span>Ödeme bilgilerin Telegram’a veya uygulama loglarına gönderilmez.</span></div><span className="flex items-center gap-1 text-xs text-slate-500"><Lock className="h-3 w-3" /> Güvenli ödeme akışı</span></div>

      <Modal isOpen={isPaymentModalOpen} onClose={() => !isProcessing && setIsPaymentModalOpen(false)} title="Bakiye yükle">
        <form onSubmit={handlePaymentSubmit} className="space-y-5">
          <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-4"><div className="flex items-start gap-3"><CreditCard className="mt-0.5 h-5 w-5 shrink-0 text-yellow-400" /><div><p className="font-medium text-white">Ne kadar yüklemek istiyorsun?</p><p className="mt-1 text-xs leading-5 text-slate-400">Minimum 10 TL. Kart bilgilerin yalnızca ödeme servisine iletilir.</p></div></div><div className="mt-4 grid grid-cols-4 gap-2">{quickAmounts.map((quickAmount) => <button key={quickAmount} type="button" onClick={() => updateForm("amount", String(quickAmount))} className={"rounded-xl border px-2 py-2 text-sm font-semibold transition " + (paymentForm.amount === String(quickAmount) ? "border-yellow-400 bg-yellow-400 text-black" : "border-white/10 bg-white/[0.04] text-slate-300 hover:border-yellow-400/50")}>{quickAmount} TL</button>)}</div></div>
          <div><label className="mb-2 block text-sm font-medium text-slate-200">Tutar (TL)</label><Input type="number" min="10" step="1" placeholder="100" value={paymentForm.amount} onChange={(event) => updateForm("amount", event.target.value)} required className="w-full" /></div>
          <div><label className="mb-2 block text-sm font-medium text-slate-200">Kart sahibi</label><Input type="text" autoComplete="cc-name" placeholder="Ad Soyad" value={paymentForm.cardHolderName} onChange={(event) => updateForm("cardHolderName", event.target.value)} required className="w-full" /></div>
          <div><label className="mb-2 block text-sm font-medium text-slate-200">Kart numarası</label><Input type="text" inputMode="numeric" autoComplete="cc-number" placeholder="1234 5678 9012 3456" value={paymentForm.cardNumber} onChange={(event) => updateForm("cardNumber", event.target.value.replace(/[^0-9 ]/g, "").replace(/\s+/g, " ").slice(0, 19))} maxLength={19} required className="w-full" /></div>
          <div className="grid grid-cols-3 gap-3"><div><label className="mb-2 block text-sm font-medium text-slate-200">Ay</label><Input type="text" inputMode="numeric" autoComplete="cc-exp-month" placeholder="01" value={paymentForm.expiryMonth} onChange={(event) => updateForm("expiryMonth", event.target.value.replace(/\D/g, "").slice(0, 2))} required className="w-full" /></div><div><label className="mb-2 block text-sm font-medium text-slate-200">Yıl</label><Input type="text" inputMode="numeric" autoComplete="cc-exp-year" placeholder="28" value={paymentForm.expiryYear} onChange={(event) => updateForm("expiryYear", event.target.value.replace(/\D/g, "").slice(0, 2))} required className="w-full" /></div><div><label className="mb-2 block text-sm font-medium text-slate-200">CVV</label><Input type="password" inputMode="numeric" autoComplete="cc-csc" placeholder="•••" value={paymentForm.cvc} onChange={(event) => updateForm("cvc", event.target.value.replace(/\D/g, "").slice(0, 3))} required className="w-full" /></div></div>
          <div className="flex items-start gap-2 text-xs leading-5 text-slate-500"><Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" /><span>Ödeme işlemi güvenli ödeme API’si üzerinden başlatılır. Hassas bilgiler bildirimlere veya loglara yazılmaz.</span></div>
          <Button type="submit" disabled={isProcessing} className="flex w-full items-center justify-center gap-2 bg-yellow-500 py-3 font-semibold text-black hover:bg-yellow-400">{isProcessing ? "Ödeme başlatılıyor..." : "Güvenli şekilde devam et"}{!isProcessing && <ChevronRight className="h-4 w-4" />}</Button>
        </form>
      </Modal>

      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}
