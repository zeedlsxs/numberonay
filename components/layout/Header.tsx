"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { siteConfig } from "@/config/site"
import Button from "@/components/common/Button"
import { useAuth } from "@/components/auth/AuthProvider"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const isLoggedIn = Boolean(user)

  const navLinks = [
    { href: "/", label: "Ana Sayfa" },
    { href: "#services", label: "SMS Onay" },
    { href: "#pricing", label: "Fiyatlar" },
    { href: "#how-it-works", label: "Nasıl Çalışır?" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Destek" },
  ]

  const dashboardLinks = [
    { href: "/dashboard", label: "Panel" },
    { href: "/dashboard/wallet", label: "Bakiyem" },
    { href: "/dashboard/profile", label: "Profil" },
  ]

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:block bg-[#29364A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#2196F3] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">ON</span>
              </div>
              <span className="font-semibold text-lg">{siteConfig.name}</span>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-white/80 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              {isLoggedIn ? (
                <>
                  {dashboardLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-sm font-medium text-white/80 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => void logout()}
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    Çıkış Yap
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                      Giriş Yap
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button size="sm">Kayıt Ol</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden bg-[#29364A] text-white">
        <div className="px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#2196F3] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">ON</span>
              </div>
              <span className="font-semibold text-lg">{siteConfig.name}</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Menüyü aç"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu Content */}
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white z-50 md:hidden shadow-xl">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-[#E5E7EB]">
                <span className="font-semibold text-lg text-[#171725]">Menü</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-[#F5F7FB] text-[#6B7280] hover:text-[#171725] transition-colors"
                  aria-label="Menüyü kapat"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto p-4">
                <div className="space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 rounded-xl text-[#171725] hover:bg-[#F5F7FB] transition-colors font-medium"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                {isLoggedIn && (
                  <div className="mt-6 pt-6 border-t border-[#E5E7EB]">
                    <p className="px-4 text-sm font-medium text-[#6B7280] mb-2">Hesabım</p>
                    <div className="space-y-2">
                      {dashboardLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block px-4 py-3 rounded-xl text-[#171725] hover:bg-[#F5F7FB] transition-colors font-medium"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </nav>

              {/* Footer */}
              <div className="p-4 border-t border-[#E5E7EB]">
                {isLoggedIn ? (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      void logout()
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    Çıkış Yap
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full">
                        Giriş Yap
                      </Button>
                    </Link>
                    <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full">Kayıt Ol</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}