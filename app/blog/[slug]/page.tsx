import Card from "@/components/common/Card"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface BlogPost {
  title: string
  publishedAt: string
  readTime: string
  content: string
}

// Mock blog post data - in a real app, this would come from a database or CMS
const blogPosts: Record<string, BlogPost> = {
  "sms-onay-nedir": {
    title: "SMS Onay Nedir?",
    publishedAt: "2026-08-15",
    readTime: "5 dk",
    content: `
      <p>SMS onay, günümüzde dijital dünyada güvenlik ve kimlik doğrulama için kullanılan en yaygın yöntemlerden biridir. 
      Bu sistem, kullanıcıların telefon numaralarına gönderilen tek kullanımlık kodlar ile kimliklerini doğrulamalarını sağlar.</p>

      <h2>SMS Onay Sistemi Nasıl Çalışır?</h2>
      <p>SMS onay süreci genellikle şu adımları içerir:</p>
      <ul>
        <li>Kullanıcı telefon numarasını girer</li>
        <li>Sistem numaraya bir doğrulama kodu gönderir</li>
        <li>Kullanıcı kodu ilgili alana girer</li>
        <li>Sistem kodun doğruluğunu kontrol eder</li>
        <li>Doğrulama başarılı olursa işleme devam edilir</li>
      </ul>

      <h2>Neden SMS Onay Kullanılır?</h2>
      <p>SMS onay sistemleri birçok nedenle tercih edilir:</p>
      <ul>
        <li>Yüksek güvenlik sağlar</li>
        <li>Kullanımı kolaydır</li>
        <li>Geniş kullanıcı kitlesi tarafından desteklenir</li>
        <li>Maliyet etkin çözümdür</li>
        <li>Hızlı doğrulama sağlar</li>
      </ul>

      <h2>Güvenli Kullanım İpuçları</h2>
      <p>SMS onay sistemlerini güvenli kullanmak için şu ipuçlarını dikkate almalısınız:</p>
      <ul>
        <li>Doğrulama kodlarınızı asla paylaşmayın</li>
        <li>Güvenmediğiniz servislerde SMS onay kullanmayın</li>
        <li>Şüpheli durumlarda destek ekibi ile iletişime geçin</li>
        <li>Telefon numaranızı güvende tutun</li>
      </ul>

      <p>OnaylaNumber olarak, SMS onay işlemleriniz için güvenli ve güvenilir bir platform sunuyoruz.</p>
    `,
  },
  "sanal-numara-nasil-calisir": {
    title: "Sanal Numara Nasıl Çalışır?",
    publishedAt: "2026-08-10",
    readTime: "4 dk",
    content: `
      <p>Sanal numaralar, fiziksel bir SIM kart gerektirmeyen, internet üzerinden çalışan telefon numaralarıdır. 
      Bu teknoloji, özellikle SMS doğrulama işlemlerinde yaygın olarak kullanılır.</p>

      <h2>Sanal Numara Teknolojisi</h2>
      <p>Sanal numaralar, VoIP (Voice over IP) teknolojisi kullanılarak çalışır. Bu numaralar bulut tabanlı sistemlerde 
      barınır ve internet bağlantısı olan herhangi bir cihazdan erişilebilir.</p>

      <h2>Avantajları</h2>
      <ul>
        <li>Gizlilik sağlar</li>
        <li>Herhangi bir yerden kullanılabilir</li>
        <li>Maliyet etkindir</li>
        <li>Kolay yönetilebilir</li>
        <li>Geçici kullanım için idealdir</li>
      </ul>

      <h2>Kullanım Alanları</h2>
      <p>Sanal numaralar birçok farklı alanda kullanılır:</p>
      <ul>
        <li>SMS doğrulama işlemleri</li>
        <li>Uluslararası iletişim</li>
        <li>İşletme numaraları</li>
        <li>Gizlilik ihtiyacı olan durumlar</li>
      </ul>

      <p>OnaylaNumber platformu ile farklı ülkelerden sanal numara temin edebilirsiniz.</p>
    `,
  },
  "online-gizlilik-koruma": {
    title: "Online Gizliliğinizi Nasıl Koruyabilirsiniz?",
    publishedAt: "2026-08-05",
    readTime: "6 dk",
    content: `
      <p>Dijital dünyada gizlilik her zamankinden daha önemli hale geldi. Kişisel verilerinizi korumak ve 
      online gizliliğinizi sağlamak için alabileceğiniz önlemler bulunmaktadır.</p>

      <h2>Temel Gizlilik İpuçları</h2>
      <ul>
        <li>Güçlü şifreler kullanın</li>
        <li>İki faktörlü doğrulama aktif edin</li>
        <li>Uygulamaları güncel tutun</li>
        <li>Herkesi her yerde paylaşmayın</li>
        <li>Gizlilik ayarlarını kontrol edin</li>
      </ul>

      <h2>Sanal Numaraların Rolü</h2>
      <p>Sanal numaralar, kişisel telefon numaranızı paylaşmadan doğrulama işlemleri yapmanızı sağlar. 
      Bu sayede asıl numaranız gizli kalır.</p>

      <h2>Güvenli İnternet Kullanımı</h2>
      <ul>
        <li>HTTPS siteleri tercih edin</li>
        <li>Public Wi-Fi'de hassas işlemler yapmayın</li>
        <li>Phishing'e dikkat edin</li>
        <li>Antivirüs kullanın</li>
      </ul>

      <p>Gizlilik sizin hakkınızdır. OnaylaNumber olarak kullanıcı gizliliğine önem veriyoruz.</p>
    `,
  },
  "telefon-dogrulama-sistemleri": {
    title: "Telefon Doğrulama Sistemleri Nasıl Çalışır?",
    publishedAt: "2026-07-28",
    readTime: "7 dk",
    content: `
      <p>Telefon doğrulama sistemleri, modern güvenlik altyapısının önemli bir parçasıdır. İki faktörlü doğrulama 
      (2FA) olarak da bilinen bu sistemler, hesap güvenliğini artırmak için kullanılır.</p>

      <h2>Çeşitleri</h2>
      <ul>
        <li>SMS doğrulama</li>
        <li>Voice call doğrulama</li>
        <li>Uygulama tabanlı doğrulama</li>
        <li>Hardware token doğrulama</li>
      </ul>

      <h2>Avantajları</h2>
      <ul>
        <li>Ekstra güvenlik katmanı sağlar</li>
        <li>Kullanıcı dostudur</li>
        <li>Maliyet etkindir</li>
        <li>Geniş uyumluluk</li>
      </ul>

      <h2>Gelecek Teknolojiler</h2>
      <p>Biometrik doğrulama ve AI tabanlı sistemler gelecekte telefon doğrulama yerini alabilir.</p>

      <p>OnaylaNumber ile güvenli SMS doğrulama işlemleri gerçekleştirebilirsiniz.</p>
    `,
  },
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug]

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <Card>
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-[#171725] mb-2">Makale Bulunamadı</h1>
            <p className="text-[#6B7280] mb-6">Aradığınız makale mevcut değil.</p>
            <Link href="/blog">
              <button className="px-6 py-2 bg-[#2196F3] text-white rounded-xl hover:bg-[#1E88E5] transition-colors">
                Blog Sayfasına Dön
              </button>
            </Link>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-12">
      <Link href="/blog" className="inline-flex items-center gap-2 text-[#6B7280] hover:text-[#171725] mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Blog Sayfasına Dön
      </Link>

      <Card>
        <h1 className="text-3xl md:text-4xl font-bold text-[#171725] mb-4">{post.title}</h1>
        
        <div className="flex items-center gap-4 text-sm text-[#6B7280] mb-8 pb-8 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(post.publishedAt).toLocaleDateString("tr-TR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {post.readTime}
          </div>
        </div>

        <div 
          className="prose prose-lg max-w-none text-[#6B7280]"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </Card>
    </div>
  )
}