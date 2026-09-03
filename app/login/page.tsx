"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Mail, Lock } from "lucide-react"
import { siteConfig } from "@/config/site"
import Button from "@/components/common/Button"
import Input from "@/components/common/Input"
import Card from "@/components/common/Card"
import Toast from "@/components/common/Toast"
import { useAuth } from "@/components/auth/AuthProvider"

export default function LoginPage() {
  const router = useRouter()
  const { refresh } = useAuth()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: true,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = "E-posta adresi gereklidir"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Geçerli bir e-posta adresi girin"
    }

    if (!formData.password) {
      newErrors.password = "Şifre gereklidir"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          remember: formData.remember,
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        setToast({ type: "error", message: data.error || "Giriş yapılamadı." })
        return
      }
      await refresh()
      setToast({ type: "success", message: "Giriş başarılı! Panele yönlendiriliyorsunuz..." })
      router.push("/dashboard")
    } catch {
      setToast({ type: "error", message: "Sunucuya bağlanılamadı." })
    } finally {
      setIsLoading(false)
    }
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
          <h1 className="text-2xl font-bold text-[#171725]">Giriş Yap</h1>
          <p className="text-[#6B7280] mt-2">Hesabınıza giriş yapın</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="E-posta"
            type="email"
            placeholder="ornek@email.com"
            icon={<Mail className="w-5 h-5" />}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
          />

          <Input
            label="Şifre"
            type="password"
            placeholder="••••••••"
            icon={<Lock className="w-5 h-5" />}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            error={errors.password}
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-[#6B7280]">
              <input
                type="checkbox"
                checked={formData.remember}
                onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                className="w-4 h-4 rounded border-[#E5E7EB] text-[#2196F3] focus:ring-[#2196F3]"
              />
              Beni hatırla
            </label>
            <Link href="/forgot-password" className="text-sm text-[#2196F3] hover:underline">
              Şifremi Unuttum
            </Link>
          </div>

          <Button type="submit" className="w-full" loading={isLoading}>
            Giriş Yap
          </Button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E5E7EB]" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-[#6B7280]">veya</span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full mt-4"
            disabled={!siteConfig.googleAuthEnabled}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {siteConfig.googleAuthEnabled ? "Google ile Giriş Yap" : "Google ile giriş özelliği yapılandırılmamış"}
          </Button>
        </div>

        <p className="mt-6 text-center text-sm text-[#6B7280]">
          Hesabınız yok mu?{" "}
          <Link href="/register" className="text-[#2196F3] font-medium hover:underline">
            Kayıt Ol
          </Link>
        </p>
      </Card>
    </div>
  )
}