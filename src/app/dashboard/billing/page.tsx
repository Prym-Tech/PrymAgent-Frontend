"use client"

import { useEffect, useState } from "react"
import api from "@/lib/api"
import { buildBackendUrl } from "@/lib/urls"
import { formatCurrency, formatDate } from "@/lib/format"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface Bundle {
  id: number
  name: string
  credits: number
  price: number
}

export default function BillingPage() {
  const [data, setData] = useState<any>(null)
  const [loadingKey, setLoadingKey] = useState("")
  const [error, setError] = useState("")

  const loadBilling = async () => {
    const res = await api.get(buildBackendUrl("/finance/api/dashboard/billing/"))
    setData(res.data)
  }

  useEffect(() => {
    loadBilling().catch(() => setError("Unable to load billing details."))
  }, [])

  const buyCredits = async (bundle: Bundle) => {
    setLoadingKey(`bundle-${bundle.id}`)
    setError("")
    try {
      const res = await api.post(buildBackendUrl("/finance/api/finance/buy-credits/"), { bundle_id: bundle.id })
      if (res.data.authorization_url) window.location.href = res.data.authorization_url
    } catch {
      setError("Unable to start credit purchase.")
    } finally {
      setLoadingKey("")
    }
  }

  const startPro = async (interval: "MONTHLY" | "YEARLY") => {
    setLoadingKey(`pro-${interval}`)
    setError("")
    try {
      const res = await api.post(buildBackendUrl("/finance/api/subscriptions/pro/init/"), { interval })
      if (res.data.authorization_url) window.location.href = res.data.authorization_url
    } catch (err: any) {
      setError(err?.response?.data?.error || "Unable to start Pro checkout.")
    } finally {
      setLoadingKey("")
    }
  }

  const cancelPro = async () => {
    setLoadingKey("cancel")
    try {
      await api.post(buildBackendUrl("/finance/api/subscriptions/pro/cancel/"))
      await loadBilling()
    } catch (err: any) {
      setError(err?.response?.data?.error || "Unable to cancel renewal.")
    } finally {
      setLoadingKey("")
    }
  }

  const subscription = data?.pro?.subscription
  const proPlan = data?.pro?.pro_plan

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <header>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Billing</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight">Credits and plan</h1>
      </header>

      {error ? <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}

      <section className="grid gap-5 lg:grid-cols-[0.7fr_1.3fr]">
        <Card className="rounded-3xl bg-[#101820] text-white">
          <CardHeader>
            <CardDescription className="text-white/60">Current balance</CardDescription>
            <CardTitle className="text-5xl">{data?.credit_balance ?? 0}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-white/70">Credits are added only after payment confirmation.</p>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          {(data?.bundles || []).map((bundle: Bundle) => (
            <Card key={bundle.id} className="rounded-3xl">
              <CardHeader>
                <CardTitle>{bundle.name}</CardTitle>
                <CardDescription>{bundle.credits} credits</CardDescription>
              </CardHeader>
              <CardContent><p className="text-3xl font-black">{formatCurrency(bundle.price)}</p></CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => buyCredits(bundle)} disabled={!!loadingKey}>
                  {loadingKey === `bundle-${bundle.id}` ? "Processing..." : "Buy credits"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle>PrymAgent Pro</CardTitle>
            <CardDescription>{subscription?.is_active ? `${subscription.interval} · ${subscription.status}` : "No active Pro subscription"}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {subscription?.is_active ? (
              <>
                <p>Current period ends: <b>{formatDate(subscription.current_period_end)}</b></p>
                <p>Renewal: <b>{subscription.cancel_at_period_end ? "Cancels at period end" : formatDate(subscription.next_payment_date)}</b></p>
                <Button variant="outline" onClick={cancelPro} disabled={loadingKey === "cancel" || subscription.cancel_at_period_end}>
                  {subscription.cancel_at_period_end ? "Renewal cancelled" : "Cancel renewal"}
                </Button>
              </>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                <Button onClick={() => startPro("MONTHLY")} disabled={!!loadingKey}>
                  Monthly {formatCurrency(proPlan?.monthly_price || 4000)}
                </Button>
                <Button variant="outline" onClick={() => startPro("YEARLY")} disabled={!!loadingKey}>
                  Yearly {formatCurrency(proPlan?.annual_price || 40000)}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle>Template status</CardTitle>
            <CardDescription>Custom document templates can be enabled by the PrymAgent team.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2 text-sm">
            {Object.entries(data?.custom_templates || {}).map(([key, value]) => (
              <div key={key} className="flex justify-between rounded-2xl bg-muted p-3">
                <span className="capitalize">{key}</span>
                <b>{value ? "Custom" : "Default"}</b>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <Card className="rounded-3xl">
        <CardHeader>
          <CardTitle>Credit history</CardTitle>
          <CardDescription>Recent credit purchases, usage, bonuses, and refunds.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {(data?.ledger || []).map((item: any) => (
            <div key={item.id} className="flex items-center justify-between rounded-2xl border p-3 text-sm">
              <div>
                <p className="font-semibold">{item.description}</p>
                <p className="text-muted-foreground">{formatDate(item.created_at)}</p>
              </div>
              <b>{item.amount > 0 ? "+" : ""}{item.amount}</b>
            </div>
          ))}
          {!(data?.ledger || []).length ? <p className="text-sm text-muted-foreground">No credit history yet.</p> : null}
        </CardContent>
      </Card>
    </div>
  )
}
