"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function PricingRedirectPage() {
  const router = useRouter()
  useEffect(() => {
    router.replace("/dashboard/billing")
  }, [router])
  return <main className="p-6 text-sm text-muted-foreground">Opening billing...</main>
}
