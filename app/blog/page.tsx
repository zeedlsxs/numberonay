import Link from "next/link"
import Card from "@/components/common/Card"
import { Calendar, Clock } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  readTime: string
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "SMS Onay Nedir?",
    slug: "sms-onay-nedir",
    excerpt: "SMS onay sisteminin nasıl çalıştığını, neden önemli olduğunu ve güvenli kullanım ipuçlarını öğrenin.",
    publishedAt: "2026-08-15",
    readTime: "5 dk",
  },
  {
    id: "2",
    title: "Sanal Numara Nasıl Çalışır?",
    slug: "sanal-numara-nasil-calisir",
    excerpt: "Sanal numaraların teknolojisi, avantajları ve kullanım alanları hakkında detaylı bilgi.",
    publishedAt: "2026-08-10",
    readTime: "4 dk",
  },
  {
    id: "3",
    title: "Online Gizliliğinizi Nasıl Koruyabilirsiniz?",
    slug: "online-gizlilik-koruma",
    excerpt: "Dijital dünyada gizliliğinizi korumak için etkili yöntemler ve en iyi uygulamalar.",
    publishedAt: "2026-08-05",
    readTime: "6 dk",
  },
  {
    id: "4",
    title: "Telefon Doğrulama Sistemleri Nasıl Çalışır?",
    slug: "telefon-dogrulama-sistemleri",
    excerpt: "İki faktörlü doğrulama ve telefon doğrulama sistemlerinin teknolojisi ve güvenlik aspects.",
    publishedAt: "2026-07-28",
    readTime: "7 dk",
  },
]

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#171725] mb-2">Blog</h1>
        <p className="text-[#6B7280]">SMS onay, sanal numara ve dijital gizlilik hakkında en son bilgiler.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
              <div className="h-48 bg-gradient-to-br from-[#2196F3] to-[#1E88E5] rounded-xl mb-4 flex items-center justify-center">
                <span className="text-6xl">📱</span>
              </div>
              <h2 className="text-xl font-semibold text-[#171725] mb-2">{post.title}</h2>
              <p className="text-[#6B7280] mb-4 line-clamp-3">{post.excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-[#6B7280]">
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
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}