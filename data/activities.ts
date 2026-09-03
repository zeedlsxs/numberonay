export interface Activity {
  id: string
  service: string
  country: string
  flag: string
  timeAgo: string
  status: "completed" | "pending"
}

export const activities: Activity[] = [
  {
    id: "1",
    service: "WhatsApp",
    country: "İngiltere",
    flag: "🇬🇧",
    timeAgo: "3 dakika önce",
    status: "completed",
  },
  {
    id: "2",
    service: "Telegram",
    country: "Türkiye",
    flag: "🇹🇷",
    timeAgo: "6 dakika önce",
    status: "completed",
  },
  {
    id: "3",
    service: "Instagram",
    country: "ABD",
    flag: "🇺🇸",
    timeAgo: "12 dakika önce",
    status: "completed",
  },
  {
    id: "4",
    service: "WhatsApp",
    country: "Filipinler",
    flag: "🇵🇭",
    timeAgo: "18 dakika önce",
    status: "completed",
  },
  {
    id: "5",
    service: "Telegram",
    country: "Almanya",
    flag: "🇩🇪",
    timeAgo: "25 dakika önce",
    status: "completed",
  },
  {
    id: "6",
    service: "Google",
    country: "Fransa",
    flag: "🇫🇷",
    timeAgo: "32 dakika önce",
    status: "completed",
  },
]