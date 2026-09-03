import Hero from "@/components/home/Hero"
import ServiceSelection from "@/components/home/ServiceSelection"
import RecentActivity from "@/components/home/RecentActivity"
import Features from "@/components/home/Features"
import HowItWorks from "@/components/home/HowItWorks"
import FAQ from "@/components/home/FAQ"
import SEOContent from "@/components/home/SEOContent"
import CTA from "@/components/home/CTA"

export default function Home() {
  return (
    <main>
      <Hero />
      <ServiceSelection />
      <RecentActivity />
      <Features />
      <HowItWorks />
      <FAQ />
      <SEOContent />
      <CTA />
    </main>
  )
}