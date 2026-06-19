"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import api from "@/lib/api"
import { buildBackendUrl } from "@/lib/urls"
import { formatCurrency, formatDate, whatsappLink } from "@/lib/format"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface RecentDocument {
  type: string
  number: string
  client_name: string
  amount: number
  status: string
  issue_date: string | null
  has_pdf?: boolean
  pdf_url: string | null
}

interface Overview {
  credit_balance: number
  paid_this_month: number
  total_outstanding: number
  overdue_amount: number
  unpaid_invoice_count: number
  recent_documents: RecentDocument[]
  pro?: { subscription?: { is_active?: boolean; status?: string } | null }
}

const quickActions = [
  ["New Quote", "Create a quote"],
  ["New Invoice", "Create an invoice"],
  ["New Receipt", "Create a receipt"],
  ["Add Client", "Add a client"],
]

function documentDownloadUrl(doc: RecentDocument) {
  return buildBackendUrl(`/finance/api/dashboard/documents/${doc.type}/${doc.number}/download/`)
}

export default function Dashboard() {
  const [overview, setOverview] = useState<Overview | null>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    api
      .get(buildBackendUrl("/finance/api/dashboard/overview/"))
      .then((res) => setOverview(res.data))
      .catch(() => setError("Unable to load your dashboard right now."))
  }, [])

  const cards = [
    ["Paid this month", formatCurrency(overview?.paid_this_month), "Confirmed payments received."],
    ["Outstanding", formatCurrency(overview?.total_outstanding), "Open balances across invoices."],
    ["Overdue", formatCurrency(overview?.overdue_amount), "Invoices marked overdue."],
    ["Unpaid invoices", String(overview?.unpaid_invoice_count ?? 0), "Unpaid, part-paid, draft, or overdue."],
  ]

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Overview</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Your billing workspace</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Review documents, track payment status, manage clients, and keep your WhatsApp billing flow organized.
          </p>
        </div>
        <Link href="/dashboard/billing">
          <Button className="rounded-full">Credits: {overview?.credit_balance ?? 0}</Button>
        </Link>
      </header>

      {error ? <div className="rounded-2xl bg-red-50 p-4 text-sm text-red-700">{error}</div> : null}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(([title, value, hint]) => (
          <Card key={title} className="rounded-3xl">
            <CardHeader className="pb-3">
              <CardDescription>{title}</CardDescription>
              <CardTitle className="text-3xl">{value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{hint}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle>Recent documents</CardTitle>
            <CardDescription>Your latest quotes, invoices, and receipts.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {overview?.recent_documents?.length ? (
              overview.recent_documents.map((doc) => (
                <div key={`${doc.type}-${doc.number}`} className="flex flex-col gap-3 rounded-2xl border p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-bold">{doc.type} {doc.number}</p>
                    <p className="text-sm text-muted-foreground">{doc.client_name} · {formatDate(doc.issue_date)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold">{formatCurrency(doc.amount)}</span>
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">{doc.status}</span>
                    {doc.pdf_url || doc.has_pdf ? (
                      <a href={documentDownloadUrl(doc)}>
                        <Button size="sm" variant="outline">Download</Button>
                      </a>
                    ) : null}
                  </div>
                </div>
              ))
            ) : (
              <p className="rounded-2xl bg-muted p-4 text-sm text-muted-foreground">No documents yet. Start from WhatsApp when you are ready.</p>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-3xl bg-[#101820] text-white">
          <CardHeader>
            <CardTitle>Quick actions</CardTitle>
            <CardDescription className="text-white/65">Creation stays WhatsApp-first for accuracy.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {quickActions.map(([label, message]) => (
              <a key={label} href={whatsappLink(message)} target="_blank" rel="noreferrer">
                <Button className="w-full rounded-full bg-[#b0d226] text-[#101820] hover:bg-[#b0d226]/90">
                  {label}
                </Button>
              </a>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
