"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  MessageSquare,
  List,
  Wallet,
  History,
  HelpCircle,
  User,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/components/auth/AuthProvider"

interface NavItem {
  href: string
  label: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
  { href: "/dashboard/sms", label: "SMS Onay", icon: <MessageSquare className="w-5 h-5" /> },
  { href: "/dashboard/activations", label: "Aktivasyonlarım", icon: <List className="w-5 h-5" /> },
  { href: "/dashboard/wallet", label: "Bakiye", icon: <Wallet className="w-5 h-5" /> },
  { href: "/dashboard/history", label: "İşlem Geçmişi", icon: <History className="w-5 h-5" /> },
  { href: "/dashboard/support", label: "Destek", icon: <HelpCircle className="w-5 h-5" /> },
  { href: "/dashboard/profile", label: "Profil", icon: <User className="w-5 h-5" /> },
  { href: "/dashboard/settings", label: "Ayarlar", icon: <Settings className="w-5 h-5" /> },
]

export default function DashboardSidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { logout } = useAuth()

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="md:hidden fixed bottom-4 right-4 z-50 w-14 h-14 bg-[#2196F3] text-white rounded-full shadow-lg flex items-center justify-center"
        aria-label="Menüyü aç"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full w-64 bg-[#29364A] text-white z-50 transform transition-transform duration-300 ease-in-out",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0 md:static md:z-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#2196F3] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">ON</span>
              </div>
              <span className="font-semibold">OnaylaNumber</span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Menüyü kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors",
                      pathname === item.href
                        ? "bg-[#2196F3] text-white"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => void logout()}
              className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Çıkış Yap</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}