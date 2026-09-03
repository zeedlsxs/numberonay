"use client"

import { useState } from "react"
import Card from "@/components/common/Card"
import Button from "@/components/common/Button"
import Input from "@/components/common/Input"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Mock submission - replace with actual API call
    setTimeout(() => {
      setIsSubmitting(false)
      setFormData({ name: "", email: "", subject: "", message: "" })
      // Show success toast here
    }, 1000)
  }

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#171725] mb-2">İletişim</h1>
        <p className="text-[#6B7280]">Sorularınız için bizimle iletişime geçin.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Contact Info */}
        <Card>
          <h2 className="text-lg font-semibold text-[#171725] mb-4">İletişim Bilgileri</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-[#2196F3] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-[#171725]">E-posta</p>
                <p className="text-[#6B7280]">destek@onaylanumber.com</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-[#2196F3] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-[#171725]">Telefon</p>
                <p className="text-[#6B7280]">+90 212 000 00 00</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#2196F3] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-[#171725]">Adres</p>
                <p className="text-[#6B7280]">İstanbul, Türkiye</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-[#E5E7EB]">
            <p className="text-sm text-[#6B7280]">
              Müşteri desteği için en hızlı yantı e-posta yoluyla alabilirsiniz. 
              Mesajlarınız genellikle 24 saat içinde yanıtlanır.
            </p>
          </div>
        </Card>

        {/* Contact Form */}
        <Card>
          <h2 className="text-lg font-semibold text-[#171725] mb-4">Mesaj Gönder</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Ad Soyad"
              placeholder="Adınız ve soyadınız"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <Input
              label="E-posta"
              type="email"
              placeholder="ornek@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <Input
              label="Konu"
              placeholder="Mesajınızın konusu"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
            />

            <div>
              <label className="block text-sm font-medium text-[#171725] mb-2">Mesaj</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Mesajınızı yazın..."
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-white text-[#171725] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-transparent transition-colors resize-none"
                required
              />
            </div>

            <Button type="submit" loading={isSubmitting} className="w-full">
              <Send className="w-4 h-4 mr-2" />
              Gönder
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}