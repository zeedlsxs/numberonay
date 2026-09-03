import Link from "next/link"
import { siteConfig } from "@/config/site"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { href: "/register", label: "Kayıt Ol" },
    { href: "/login", label: "Giriş Yap" },
    { href: "#services", label: "SMS Onay" },
    { href: "#how-it-works", label: "Nasıl Çalışır?" },
    { href: "/blog", label: "Blog" },
  ]

  const corporateLinks = [
    { href: "/about", label: "Hakkımızda" },
    { href: "/contact", label: "İletişim" },
    { href: "/contact", label: "Destek" },
  ]

  const legalLinks = [
    { href: "/distance-sales", label: "Mesafeli Satış Sözleşmesi" },
    { href: "/refund-policy", label: "İade ve İptal Politikası" },
    { href: "/privacy", label: "Gizlilik Politikası" },
    { href: "/terms", label: "Kullanım Şartları" },
    { href: "/kvkk", label: "KVKK Aydınlatma Metni" },
  ]

  return (
    <footer className="bg-[#29364A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#2196F3] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">ON</span>
              </div>
              <span className="font-semibold text-lg">{siteConfig.name}</span>
            </div>
            <p className="text-white/70 text-sm mb-4">
              Hızlı, güvenilir ve kullanıcı dostu SMS onay platformu.
            </p>
            <a
              href={`mailto:${siteConfig.supportEmail}`}
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              {siteConfig.supportEmail}
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Hızlı Erişim</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Corporate */}
          <div>
            <h3 className="font-semibold mb-4">Kurumsal</h3>
            <ul className="space-y-2">
              {corporateLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Yasal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-center text-sm text-white/60">
            © {currentYear} {siteConfig.name}. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  )
}