"use client"

import { useState } from "react"
import Link from "next/link"
import { Mail } from "lucide-react"
import Button from "@/components/common/Button"
import Input from "@/components/common/Input"
import Card from "@/components/common/Card"
import Toast from "@/components/common/Toast"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null)

  const validateEmail = () => {
    if (!email) {
      setError("E-posta adresi gereklidir")
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Geçerli bir e-posta adresi girin")
      return false
    }
    setError("")
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateEmail()) {
      return
    }

    setIsLoading(true)

    // Mock password reset - replace with actual auth logic
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
      setToast({ 
        type: "success", 
        message: "Şifre sıfırlama bağlantısı e-posta adresinize gönderildi (Demo modu)" 
      })
    }, 1000)
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        {toast && (
          <Toast
            type={toast.type}
            message={toast.message}
            onClose={() => setToast(null)}
          />
        )}

        <Card className="w-full max-w-md text-center">
          <div className="w-16 h-16 bg-[#DCFCE7] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-[#166534]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#171725] mb-2">Bağlantı Gönderildi</h1>
          <p className="text-[#6B7280] mb-6">
            Şifre sıfırlama bağlantısı e-posta adresinize gönderildi. Lütfen gelen kutunuzu kontrol edin.
          </p>
          <Link href="/login">
            <Button>Giriş Sayfasına Dön</Button>
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-[#2196F3] rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">ON</span>
          </div>
          <h1 className="text-2xl font-bold text-[#171725]">Şifremi Unuttum</h1>
          <p className="text-[#6B7280] mt-2">Şifre sıfırlama bağlantısı almak için e-posta adresinizi girin</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="E-posta"
            type="email"
            placeholder="ornek@email.com"
            icon={<Mail className="w-5 h-5" />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
          />

          <Button type="submit" className="w-full" loading={isLoading}>
            Bağlantı Gönder
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-[#6B7280]">
          <Link href="/login" className="text-[#2196F3] font-medium hover:underline">
            Giriş Sayfasına Dön
          </Link>
        </p>
      </Card>
    </div>
  )
}