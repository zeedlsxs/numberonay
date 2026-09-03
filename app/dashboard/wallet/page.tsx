"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertCircle, ArrowDownToLine, ArrowUpRight, CheckCircle2, ChevronRight, CreditCard, Lock, Plus, ReceiptText, ShieldCheck, Sparkles, Wallet } from "lucide-react";
import { formatCurrency } from "@lib/utils";
import Card from "@components/common/Card";
import Button from "@components/common/Button";
import Modal from "@components/common/Modal";
import Input from "@components/common/Input";
import Toast from "@components/common/Toast";

interface Transaction {
  id: string;
  type: string;
  amount: number;
  status: string;
  description: string;
  createdAt: string;
}

type ToastState = { type: "success" | "error"; message: string } | null;
type PaymentForm = { amount: string; cardHolderName: string; cardNumber: string; expiryMonth: string; expiryYear: string; cvc: string };

const quickAmounts = [50, 100, 250, 500];
const emptyPaymentForm: PaymentForm = { amount: "", cardHolderName: "", cardNumber: "", expiryMonth: "", expiryYear: "", cvc: "" };

function formatCardNumber(value: string) {
  return value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}

function passesLuhn(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length < 13 || digits.length > 19) return false;
  let sum = 0;
  let shouldDouble = false;
  for (let index = digits.length - 1; index >= 0; index -= 1) {
    let digit = Number(digits[index]);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

function submitThreeDSecure(html: string) {
  const markup = html.includes("<form") ? html : window.atob(html);
  const wrapper = document.createElement("div");
  wrapper.innerHTML = markup;
  const form = wrapper.querySelector("form");
  if (!form) throw new Error("Güvenli ödeme doğrulama ekranı oluşturulamadı.");
  document.body.appendChild(wrapper);
  form.submit();
}

export default function WalletPage() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<ToastState>(null);
  const [paymentError, setPaymentError] = useState("");
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [paymentForm, setPaymentForm] = useState<PaymentForm>(emptyPaymentForm);

  const totalDeposits = useMemo(
    () => transactions.filter((transaction) => transaction.type === "deposit").reduce((sum, transaction) => sum + Number(transaction.amount), 0),
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

  const updateForm = (key: keyof PaymentForm, value: string) => {
    setPaymentForm((current) => ({ ...current, [key]: value }));
    if (paymentError) setPaymentError("");
  };

  const openPaymentModal = () => {
    setPaymentError("");
    setToast(null);
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    if (!isProcessing) setIsPaymentModalOpen(false);
  };

  const resetPaymentForm = () => setPaymentForm({ ...emptyPaymentForm });

  const handlePaymentSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPaymentError("");
    setToast(null);

    const amount = Number(paymentForm.amount);
    const cardNumber = paymentForm.cardNumber.replace(/\s/g, "");
    const month = Number(paymentForm.expiryMonth);
    const year = paymentForm.expiryYear.replace(/\D/g, "");

    if (!Number.isInteger(amount) || amount < 10 || amount > 100000) {
      setPaymentError("Yükleme tutarı 10 TL ile 100.000 TL arasında olmalı.");
      return;
    }
    if (!paymentForm.cardHolderName.trim()) {
      setPaymentError("Kart üzerindeki ad soyadı girin.");
      return;
    }
    if (!passesLuhn(cardNumber)) {
      setPaymentError("Kart numarası geçersiz. Lütfen bilgileri kontrol edin.");
      return;
    }
    if (month < 1 || month > 12 || year.length !== 2) {
      setPaymentError("Son kullanma tarihini AA / YY formatında girin.");
      return;
    }
    if (!/^\d{3,4}$/.test(paymentForm.cvc)) {
      setPaymentError("CVV 3 veya 4 haneli olmalı.");
      return;
    }

    setIsProcessing(true);
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
            expireMonth: String(month).padStart(2, "0"),
            expireYear: year,
            cvc: paymentForm.cvc,
          },
        }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Ödeme başlatılamadı. Kart bilgilerini kontrol edip tekrar deneyin.");
      }

      if (data.credited) {
        setBalance(Number(data.balance ?? balance + amount));
        await loadWallet();
        setToast({ type: "success", message: formatCurrency(amount) + " bakiyenize eklendi." });
        setIsPaymentModalOpen(false);
        resetPaymentForm();
      } else if (data.threeDSHtmlContent) {
        submitThreeDSecure(data.threeDSHtmlContent);
      } else if (data.paymentUrl) {
        window.location.assign(data.paymentUrl);
      } else {
        setToast({ type: "success", message: "Ödeme başlatıldı. Sonuç kesinleşince bakiyeniz güncellenecek." });
        setIsPaymentModalOpen(false);
        resetPaymentForm();
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Ödeme sırasında beklenmeyen bir hata oluştu.";
      setPaymentError(message);
      setToast({ type: "error", message });
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
        <Button onClick={openPaymentModal} className="inline-flex items-center justify-center gap-2 bg-yellow-500 px-5 py-3 font-semibold text-black shadow-lg shadow-yellow-500/10 transition hover:bg-yellow-400"><Plus className="h-4 w-4" /> Bakiye yükle</Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr]">
        <Card className="relative overflow-hidden border border-yellow-300/20 bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600 p-6 text-slate-950 shadow-xl shadow-amber-900/20 sm:p-8">
          <div className="absolute -right-12 -top-16 h-48 w-48 rounded-full bg-white/20 blur-2xl" />
          <div className="relative flex items-start justify-between"><div><p className="text-sm font-medium text-slate-950/70">Kullanılabilir bakiye</p><p className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{isLoading ? "—" : formatCurrency(balance)}</p><p className="mt-4 flex items-center gap-2 text-sm font-medium text-slate-950/70"><CheckCircle2 className="h-4 w-4" /> Harcamaya hazır</p></div><div className="rounded-2xl bg-black/10 p-3"><Wallet className="h-8 w-8" /></div></div>
        </Card>
        <Card className="border border-white/10 bg-white/[0.04] p-6"><div className="flex items-center justify-between text-slate-400"><span className="text-sm">Toplam yükleme</span><ArrowDownToLine className="h-5 w-5 text-emerald-400" /></div><p className="mt-6 text-2xl font-bold text-white">{formatCurrency(totalDeposits)}</p><p className="mt-2 text-xs text-slate-500">Kayıtlı işlemlerine göre</p></Card>
        <Card className="border border-white/10 bg-white/[0.04] p-6"><div className="flex items-center justify-between text-slate-400"><span className="text-sm">İşlem sayısı</span><ArrowUpRight className="h-5 w-5 text-yellow-400" /></div><p className="mt-6 text-2xl font-bold text-white">{transactions.length}</p><p className="mt-2 text-xs text-slate-500">Son hareketlerin</p></Card>
      </div>

      <Card className="overflow-hidden border border-white/10 bg-white/[0.03]">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6"><div><h2 className="font-semibold text-white">Son işlemler</h2><p className="mt-1 text-xs text-slate-500">Cüzdan hareketlerinin özeti</p></div><ReceiptText className="h-5 w-5 text-slate-500" /></div>
        {transactions.length === 0 ? <div className="px-6 py-10 text-center text-sm text-slate-500">Henüz cüzdan işlemi bulunmuyor.</div> : <div className="divide-y divide-white/5">{transactions.slice(0, 5).map((transaction) => <div key={transaction.id} className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6"><div className="flex min-w-0 items-center gap-3"><div className="rounded-xl bg-emerald-400/10 p-2 text-emerald-400"><ArrowDownToLine className="h-4 w-4" /></div><div className="min-w-0"><p className="truncate text-sm font-medium text-slate-200">{transaction.description}</p><p className="mt-1 text-xs text-slate-500">{new Date(transaction.createdAt).toLocaleDateString("tr-TR")}</p></div></div><span className="shrink-0 text-sm font-semibold text-emerald-400">+{formatCurrency(Number(transaction.amount))}</span></div>)}</div>}
      </Card>

      <Modal isOpen={isPaymentModalOpen} onClose={closePaymentModal} title="Bakiye yükle" size="lg">
        <form onSubmit={handlePaymentSubmit} className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="rounded-2xl bg-slate-950 p-5 text-white lg:flex lg:flex-col lg:justify-between"><div><div className="mb-5 flex items-center gap-3"><div className="rounded-xl bg-yellow-400/15 p-2.5 text-yellow-300"><Wallet className="h-5 w-5" /></div><div><p className="text-sm font-semibold">Güvenli bakiye yükleme</p><p className="mt-1 text-xs text-slate-400">Ödemen kart sağlayıcında doğrulanır.</p></div></div><p className="text-xs uppercase tracking-[0.16em] text-slate-500">Yüklenecek tutar</p><p className="mt-2 text-3xl font-bold text-yellow-300">{paymentForm.amount ? formatCurrency(Number(paymentForm.amount)) : "0,00 TL"}</p><div className="mt-6 grid grid-cols-2 gap-2">{quickAmounts.map((quickAmount) => <button key={quickAmount} type="button" onClick={() => updateForm("amount", String(quickAmount))} className={"rounded-xl border px-3 py-2.5 text-sm font-semibold transition " + (paymentForm.amount === String(quickAmount) ? "border-yellow-300 bg-yellow-300 text-slate-950" : "border-white/10 bg-white/5 text-slate-300 hover:border-yellow-300/60")}>{quickAmount} TL</button>)}</div></div><div className="mt-8 space-y-3 border-t border-white/10 pt-4 text-xs text-slate-400"><p className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-400" /> Kart bilgileri saklanmaz</p><p className="flex items-center gap-2"><Lock className="h-4 w-4 text-emerald-400" /> 3D Secure ile korunur</p></div></div>
          <div className="space-y-4">
            {paymentError && <div role="alert" className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-3 text-sm text-red-700"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /><span>{paymentError}</span></div>}
            <Input label="Tutar (TL)" type="number" min="10" max="100000" step="1" placeholder="100" value={paymentForm.amount} onChange={(event) => updateForm("amount", event.target.value)} required />
            <Input label="Kart üzerindeki ad soyad" type="text" autoComplete="cc-name" placeholder="AD SOYAD" value={paymentForm.cardHolderName} onChange={(event) => updateForm("cardHolderName", event.target.value.toUpperCase())} required />
            <Input label="Kart numarası" type="text" inputMode="numeric" autoComplete="cc-number" placeholder="1234 5678 9012 3456" value={paymentForm.cardNumber} onChange={(event) => updateForm("cardNumber", formatCardNumber(event.target.value))} maxLength={19} required />
            <div className="grid grid-cols-3 gap-3"><Input label="Ay" type="text" inputMode="numeric" autoComplete="cc-exp-month" placeholder="AA" value={paymentForm.expiryMonth} onChange={(event) => updateForm("expiryMonth", event.target.value.replace(/\D/g, "").slice(0, 2))} required /><Input label="Yıl" type="text" inputMode="numeric" autoComplete="cc-exp-year" placeholder="YY" value={paymentForm.expiryYear} onChange={(event) => updateForm("expiryYear", event.target.value.replace(/\D/g, "").slice(0, 2))} required /><Input label="CVV" type="password" inputMode="numeric" autoComplete="cc-csc" placeholder="•••" value={paymentForm.cvc} onChange={(event) => updateForm("cvc", event.target.value.replace(/\D/g, "").slice(0, 4))} maxLength={4} required /></div>
            <p className="flex items-start gap-2 text-xs leading-5 text-slate-500"><Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" /> Ödeme, güvenli sağlayıcı üzerinden gerçekleştirilir. Hassas bilgiler loglanmaz.</p>
            <Button type="submit" loading={isProcessing} className="flex w-full items-center justify-center gap-2 bg-yellow-500 py-3 font-semibold text-black hover:bg-yellow-400">Ödemeye devam et {!isProcessing && <ChevronRight className="h-4 w-4" />}</Button>
          </div>
        </form>
      </Modal>

      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}
