"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import api from "@/lib/api"
import { buildBackendUrl } from "@/lib/urls"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/documents", label: "Documents" },
  { href: "/dashboard/clients", label: "Clients" },
  { href: "/dashboard/profile", label: "Profile" },
  { href: "/dashboard/billing", label: "Billing" },
]

interface UserPayload {
  brand_name: string | null
  display_phone: string
  credits: number
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<UserPayload | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get(buildBackendUrl("/api/auth/me"))
      .then((res) => setUser(res.data.user))
      .catch(() => router.replace("/login"))
      .finally(() => setLoading(false))
  }, [router])

  const logout = async () => {
    try {
      await api.post(buildBackendUrl("/api/auth/logout"))
    } finally {
      router.replace("/login")
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4">
        <p className="text-sm text-muted-foreground">Opening your dashboard...</p>
      </main>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-x-0 top-0 z-30 border-b border-[#d2d8c7] bg-[#f7faf0]/95 backdrop-blur md:inset-y-0 md:right-auto md:w-72 md:border-b-0 md:border-r">
        <div className="flex items-center justify-between gap-3 px-4 py-3 md:block md:p-6">
          <Link href="/dashboard" className="block">
            <span className="text-xl font-black text-[#101820]">PrymAgent</span>
            <span className="block text-xs text-muted-foreground">Solo dashboard</span>
          </Link>
          <div className="flex items-center gap-2 md:mt-5 md:block">
            <div className="rounded-full bg-[#b0d226]/25 px-3 py-1 text-xs font-bold md:inline-block">
              {user?.credits ?? 0} credits
            </div>
            <Button variant="outline" size="sm" className="h-8 rounded-full px-3 text-xs md:hidden" onClick={logout}>
              Log out
            </Button>
          </div>
        </div>

        <nav className="flex gap-2 overflow-x-auto px-3 pb-3 md:block md:space-y-2 md:px-4">
          {navItems.map((item) => {
            const active = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={active ? "default" : "ghost"}
                  className="shrink-0 justify-start rounded-full md:w-full md:rounded-xl"
                >
                  {item.label}
                </Button>
              </Link>
            )
          })}
        </nav>

        <div className="hidden border-t p-4 md:absolute md:bottom-0 md:left-0 md:right-0 md:block">
          <p className="text-sm font-semibold">{user?.brand_name || "Your business"}</p>
          <p className="mb-3 text-xs text-muted-foreground">{user?.display_phone}</p>
          <Button variant="outline" size="sm" className="w-full" onClick={logout}>
            Log out
          </Button>
        </div>
      </aside>

      <main className="px-4 pb-8 pt-32 sm:px-6 md:ml-72 md:px-8 md:pt-8">
        {children}
      </main>
    </div>
  )
}
