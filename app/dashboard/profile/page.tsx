"use client"

import { useState } from "react"
import { formatDate } from "@/lib/utils"
import Card from "@/components/common/Card"
import Button from "@/components/common/Button"
import Input from "@/components/common/Input"
import Modal from "@/components/common/Modal"
import { User, Mail, Phone, Calendar, Lock, AlertTriangle } from "lucide-react"

export default function ProfilePage() {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Mock user data - replace with actual user data from auth
  const user = {
    email: "demo@onaylanumber.com",
    name: "Demo",
    surname: "Kullanıcı",
    phone: "",
    createdAt: new Date("2024-01-01"),
  }

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock password change - replace with actual API call
    setIsPasswordModalOpen(false)
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
  }

  const handleDeleteAccount = () => {
    // Mock account deletion - replace with actual API call
    setIsDeleteModalOpen(false)
    // Redirect to home or login page
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#171725] mb-2">Profil</h1>
        <p className="text-[#6B7280]">Hesap bilgilerinizi yönetin.</p>
      </div>

      <div className="grid gap-6">
        {/* Profile Information */}
        <Card>
          <h2 className="text-lg font-semibold text-[#171725] mb-4">Hesap Bilgileri</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] rounded-xl">
              <Mail className="w-5 h-5 text-[#6B7280]" />
              <div className="flex-1">
                <p className="text-sm text-[#6B7280]">E-posta</p>
                <p className="font-medium text-[#171725]">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] rounded-xl">
              <User className="w-5 h-5 text-[#6B7280]" />
              <div className="flex-1">
                <p className="text-sm text-[#6B7280]">Ad Soyad</p>
                <p className="font-medium text-[#171725]">{user.name} {user.surname}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] rounded-xl">
              <Phone className="w-5 h-5 text-[#6B7280]" />
              <div className="flex-1">
                <p className="text-sm text-[#6B7280]">Telefon</p>
                <p className="font-medium text-[#171725]">{user.phone || "Belirtilmemiş"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] rounded-xl">
              <Calendar className="w-5 h-5 text-[#6B7280]" />
              <div className="flex-1">
                <p className="text-sm text-[#6B7280]">Hesap Oluşturulma Tarihi</p>
                <p className="font-medium text-[#171725]">{formatDate(user.createdAt)}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Security */}
        <Card>
          <h2 className="text-lg font-semibold text-[#171725] mb-4">Güvenlik</h2>
          <Button
            variant="outline"
            onClick={() => setIsPasswordModalOpen(true)}
          >
            <Lock className="w-4 h-4 mr-2" />
            Şifre Değiştir
          </Button>
        </Card>

        {/* Danger Zone */}
        <Card className="border-[#EF4444]">
          <h2 className="text-lg font-semibold text-[#EF4444] mb-2">Tehlike Bölgesi</h2>
          <p className="text-sm text-[#6B7280] mb-4">
            Hesabınızı silmek geri alınamaz bir işlemdir. Tüm verileriniz kalıcı olarak silinir.
          </p>
          <Button
            variant="danger"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            Hesabı Sil
          </Button>
        </Card>
      </div>

      {/* Password Change Modal */}
      <Modal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        title="Şifre Değiştir"
        size="md"
      >
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <Input
            label="Mevcut Şifre"
            type="password"
            placeholder="••••••••"
            value={passwordData.currentPassword}
            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
            required
          />

          <Input
            label="Yeni Şifre"
            type="password"
            placeholder="••••••••"
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
            required
          />

          <Input
            label="Yeni Şifre Tekrar"
            type="password"
            placeholder="••••••••"
            value={passwordData.confirmPassword}
            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
            required
          />

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsPasswordModalOpen(false)}
              className="flex-1"
            >
              İptal
            </Button>
            <Button type="submit" className="flex-1">
              Değiştir
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Account Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Hesabı Sil"
        size="md"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-[#FEE2E2] rounded-xl">
            <AlertTriangle className="w-6 h-6 text-[#991B1B] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-[#991B1B] mb-1">Emin misiniz?</p>
              <p className="text-sm text-[#991B1B]">
                Bu işlem geri alınamaz. Hesabınız ve tüm verileriniz kalıcı olarak silinecek.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
              className="flex-1"
            >
              İptal
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteAccount}
              className="flex-1"
            >
              Hesabı Sil
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}