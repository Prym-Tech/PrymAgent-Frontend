"use client"

import { useEffect, useMemo, useState } from "react"
import api from "@/lib/api"
import { buildBackendUrl } from "@/lib/urls"
import { formatCurrency, formatDate, whatsappLink } from "@/lib/format"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

type Tab = "ALL" | "QUOTE" | "INVOICE" | "RECEIPT"

interface DocumentRow {
  type: string
  id: number
  number: string
  client_name: string
  amount: number
  amount_paid?: number
  balance_due?: number
  status: string
  issue_date: string | null
  due_date?: string | null
  valid_until?: string | null
  pdf_url: string | null
  payment_page_url?: string | null
}

export default function DocumentsPage() {
  const [tab, setTab] = useState<Tab>("ALL")
  const [client, setClient] = useState("")
  const [status, setStatus] = useState("")
  const [rows, setRows] = useState<DocumentRow[]>([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const loadDocuments = async () => {
    setLoading(true)
    setError("")
    try {
      const params = new URLSearchParams()
      params.set("type", tab)
      if (client) params.set("client", client)
      if (status) params.set("status", status)
      const res = await api.get(buildBackendUrl(`/finance/api/dashboard/documents/?${params.toString()}`))
      const nextRows = [
        ...(res.data.quotes || []),
        ...(res.data.invoices || []),
        ...(res.data.receipts || []),
      ]
      setRows(nextRows)
    } catch {
      setError("Unable to load documents.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDocuments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])

  const statusOptions = useMemo(() => {
    if (tab === "QUOTE") return ["", "SENT", "ACCEPTED", "EXPIRED", "CONVERTED", "CANCELLED"]
    if (tab === "INVOICE") return ["", "UNPAID", "PART_PAID", "PAID", "OVERDUE", "CANCELLED"]
    return [""]
  }, [tab])

  const updateInvoiceStatus = async (doc: DocumentRow, nextStatus: string) => {
    const amount = nextStatus === "PART_PAID" ? window.prompt("Amount paid?") : undefined
    if (nextStatus === "PART_PAID" && !amount) return
    try {
      await api.post(buildBackendUrl(`/finance/api/dashboard/invoices/${doc.number}/status/`), {
        status: nextStatus,
        amount_paid: amount,
      })
      await loadDocuments()
    } catch (err: any) {
      alert(err?.response?.data?.error || "Unable to update invoice status.")
    }
  }

  const copyLink = async (doc: DocumentRow) => {
    const link = doc.pdf_url || (doc.payment_page_url ? `${window.location.origin}${doc.payment_page_url}` : "")
    if (!link) return
    await navigator.clipboard.writeText(link)
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <header>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Documents</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight">Quotes, invoices, and receipts</h1>
      </header>

      <Card className="rounded-3xl">
        <CardContent className="grid gap-3 p-4 md:grid-cols-[1fr_1fr_160px]">
          <Input value={client} onChange={(event) => setClient(event.target.value)} placeholder="Search client/customer" />
          <select className="h-10 rounded-md border bg-background px-3 text-sm" value={status} onChange={(event) => setStatus(event.target.value)}>
            {statusOptions.map((option) => <option key={option || "all"} value={option}>{option || "All statuses"}</option>)}
          </select>
          <Button onClick={loadDocuments} disabled={loading}>{loading ? "Loading..." : "Apply filters"}</Button>
        </CardContent>
      </Card>

      <div className="flex gap-2 overflow-x-auto">
        {(["ALL", "QUOTE", "INVOICE", "RECEIPT"] as Tab[]).map((item) => (
          <Button key={item} variant={tab === item ? "default" : "outline"} className="rounded-full" onClick={() => setTab(item)}>
            {item === "ALL" ? "All" : `${item[0]}${item.slice(1).toLowerCase()}s`}
          </Button>
        ))}
      </div>

      {error ? <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}

      <div className="grid gap-4">
        {rows.length ? rows.map((doc) => (
          <Card key={`${doc.type}-${doc.number}`} className="rounded-3xl">
            <CardHeader className="gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <CardTitle className="text-xl">{doc.type} {doc.number}</CardTitle>
                <CardDescription>{doc.client_name || "No client"} · {formatDate(doc.issue_date)}</CardDescription>
              </div>
              <span className="w-fit rounded-full bg-muted px-3 py-1 text-xs font-bold">{doc.status}</span>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
              <div className="grid gap-2 text-sm sm:grid-cols-3">
                <p><span className="text-muted-foreground">Amount:</span> <b>{formatCurrency(doc.amount)}</b></p>
                {doc.balance_due !== undefined ? <p><span className="text-muted-foreground">Balance:</span> <b>{formatCurrency(doc.balance_due)}</b></p> : null}
                <p><span className="text-muted-foreground">Due/valid:</span> <b>{formatDate(doc.due_date || doc.valid_until)}</b></p>
              </div>
              <div className="flex flex-wrap gap-2">
                {doc.pdf_url ? <a href={doc.pdf_url} target="_blank" rel="noreferrer"><Button size="sm">View PDF</Button></a> : null}
                <Button size="sm" variant="outline" onClick={() => copyLink(doc)}>Copy link</Button>
                {doc.type === "INVOICE" ? (
                  <>
                    <Button size="sm" variant="outline" onClick={() => updateInvoiceStatus(doc, "PAID")}>Mark paid</Button>
                    <Button size="sm" variant="outline" onClick={() => updateInvoiceStatus(doc, "PART_PAID")}>Part-paid</Button>
                    <Button size="sm" variant="outline" onClick={() => updateInvoiceStatus(doc, "OVERDUE")}>Overdue</Button>
                    <a href={whatsappLink(`Generate receipt for invoice ${doc.number}`)} target="_blank" rel="noreferrer">
                      <Button size="sm" variant="outline">Receipt</Button>
                    </a>
                  </>
                ) : null}
              </div>
            </CardContent>
          </Card>
        )) : (
          <Card className="rounded-3xl">
            <CardContent className="p-8 text-center text-muted-foreground">No documents found.</CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
