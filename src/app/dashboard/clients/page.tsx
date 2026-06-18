"use client"

import { useEffect, useState } from "react"
import api from "@/lib/api"
import { buildBackendUrl } from "@/lib/urls"
import { formatCurrency, formatDate } from "@/lib/format"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ClientRow {
  id: number
  name: string
  email: string | null
  phone: string | null
  address: string | null
  notes: string | null
  total_invoiced: number
  total_paid: number
  outstanding_balance: number
  quotes_count: number
  invoices_count: number
  receipts_count: number
}

export default function ClientsPage() {
  const [clients, setClients] = useState<ClientRow[]>([])
  const [selected, setSelected] = useState<any>(null)
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", notes: "" })
  const [error, setError] = useState("")

  const loadClients = async () => {
    try {
      const res = await api.get(buildBackendUrl("/finance/api/dashboard/clients/"))
      setClients(res.data.clients || [])
    } catch {
      setError("Unable to load clients.")
    }
  }

  useEffect(() => {
    loadClients()
  }, [])

  const selectClient = async (client: ClientRow) => {
    const res = await api.get(buildBackendUrl(`/finance/api/dashboard/clients/${client.id}/`))
    setSelected(res.data)
    setForm({
      name: res.data.client.name || "",
      email: res.data.client.email || "",
      phone: res.data.client.phone || "",
      address: res.data.client.address || "",
      notes: res.data.client.notes || "",
    })
  }

  const saveClient = async () => {
    try {
      if (selected?.client?.id) {
        const res = await api.put(buildBackendUrl(`/finance/api/dashboard/clients/${selected.client.id}/`), form)
        setSelected(res.data)
      } else {
        const res = await api.post(buildBackendUrl("/finance/api/dashboard/clients/"), form)
        setSelected({ client: res.data.client, quotes: [], invoices: [], receipts: [], payments: [] })
      }
      setForm({ name: "", email: "", phone: "", address: "", notes: "" })
      await loadClients()
    } catch (err: any) {
      setError(err?.response?.data?.error || "Unable to save client.")
    }
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <section className="space-y-4">
        <header>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Clients</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight">Billing records</h1>
        </header>
        {error ? <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
        <div className="grid gap-3">
          {clients.map((client) => (
            <button key={client.id} onClick={() => selectClient(client)} className="rounded-3xl border bg-white p-4 text-left shadow-sm transition hover:border-[#b0d226]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-bold">{client.name}</p>
                  <p className="text-sm text-muted-foreground">{client.email || client.phone || "No contact saved"}</p>
                </div>
                <span className="text-sm font-bold">{formatCurrency(client.outstanding_balance)}</span>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                {client.quotes_count} quotes · {client.invoices_count} invoices · {client.receipts_count} receipts
              </p>
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle>{selected ? "Edit client" : "Add client"}</CardTitle>
            <CardDescription>Client updates are free and sync with WhatsApp records.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {(["name", "email", "phone", "address", "notes"] as const).map((field) => (
              <div key={field} className="space-y-2">
                <Label htmlFor={field}>{field[0].toUpperCase() + field.slice(1)}</Label>
                <Input id={field} value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })} />
              </div>
            ))}
            <div className="flex gap-2">
              <Button onClick={saveClient} disabled={!form.name}>Save client</Button>
              {selected ? <Button variant="outline" onClick={() => { setSelected(null); setForm({ name: "", email: "", phone: "", address: "", notes: "" }) }}>New client</Button> : null}
            </div>
          </CardContent>
        </Card>

        {selected ? (
          <Card className="rounded-3xl">
            <CardHeader>
              <CardTitle>{selected.client.name}</CardTitle>
              <CardDescription>
                {formatCurrency(selected.client.total_invoiced)} invoiced · {formatCurrency(selected.client.total_paid)} paid · {formatCurrency(selected.client.outstanding_balance)} outstanding
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-5">
              {["quotes", "invoices", "receipts", "payments"].map((key) => (
                <div key={key}>
                  <h3 className="mb-2 font-bold capitalize">{key}</h3>
                  <div className="grid gap-2">
                    {(selected[key] || []).slice(0, 5).map((item: any) => (
                      <div key={item.number || item.payment_number} className="flex items-center justify-between rounded-2xl bg-muted/60 p-3 text-sm">
                        <span>{item.number || item.payment_number}</span>
                        <span>{formatCurrency(item.amount)} · {formatDate(item.issue_date || item.payment_date)}</span>
                      </div>
                    ))}
                    {!(selected[key] || []).length ? <p className="text-sm text-muted-foreground">No {key} yet.</p> : null}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ) : null}
      </section>
    </div>
  )
}
