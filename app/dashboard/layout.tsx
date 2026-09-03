import DashboardSidebar from "@/components/dashboard/DashboardSidebar"
import { getSessionUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getSessionUser()
  if (!user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 md:ml-64 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}