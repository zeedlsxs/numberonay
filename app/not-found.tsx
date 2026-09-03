import Link from "next/link"
import Card from "@/components/common/Card"
import Button from "@/components/common/Button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold text-[#171725] mb-2">Sayfa Bulunamadı</h1>
        <p className="text-[#6B7280] mb-6">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir.
        </p>
        <Link href="/">
          <Button>Ana Sayfaya Dön</Button>
        </Link>
      </Card>
    </div>
  )
}