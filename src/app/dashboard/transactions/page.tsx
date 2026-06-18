"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function TransactionsRedirectPage() {
  const router = useRouter()
  useEffect(() => {
    router.replace("/dashboard/documents")
  }, [router])
  return <main className="p-6 text-sm text-muted-foreground">Opening documents...</main>
}
