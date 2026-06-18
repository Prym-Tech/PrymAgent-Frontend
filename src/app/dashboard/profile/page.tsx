"use client"

import { ChangeEvent, useEffect, useState } from "react"
import api from "@/lib/api"
import { buildBackendUrl } from "@/lib/urls"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const initialProfile = {
  brand_name: "",
  business_email: "",
  business_phone: "",
  business_address: "",
  brand_color: "#b0d226",
  bank_name: "",
  account_number: "",
  account_name: "",
  preferred_payment_option: "BANK",
  terms_and_conditions: "",
  signature_text: "",
  logo_url: "",
}

export default function ProfilePage() {
  const [profile, setProfile] = useState(initialProfile)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const loadProfile = async () => {
    const res = await api.get(buildBackendUrl("/api/profile/"))
    setProfile({ ...initialProfile, ...res.data.profile })
  }

  useEffect(() => {
    loadProfile().catch(() => setError("Unable to load profile."))
  }, [])

  const updateField = (field: keyof typeof initialProfile, value: string) => {
    setProfile({ ...profile, [field]: value })
  }

  const save = async () => {
    setSaving(true)
    setError("")
    setMessage("")
    try {
      const res = await api.put(buildBackendUrl("/api/profile/"), profile)
      setProfile({ ...initialProfile, ...res.data.profile })
      setMessage(res.data.bank_verification?.message ? `Saved. Bank check: ${res.data.bank_verification.message}` : "Profile saved.")
    } catch (err: any) {
      setError(err?.response?.data?.error || "Unable to save profile.")
    } finally {
      setSaving(false)
    }
  }

  const uploadLogo = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const payload = new FormData()
    payload.append("logo", file)
    setError("")
    try {
      const res = await api.post(buildBackendUrl("/api/profile/logo/"), payload, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      setProfile({ ...initialProfile, ...res.data.profile })
      setMessage("Logo uploaded. It will appear on future PDFs.")
    } catch (err: any) {
      setError(err?.response?.data?.error || "Unable to upload logo.")
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Profile</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight">Business profile and branding</h1>
      </header>

      {message ? <p className="rounded-xl bg-[#00d37f]/15 p-3 text-sm">{message}</p> : null}
      {error ? <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}

      <Card className="rounded-3xl">
        <CardHeader>
          <CardTitle>Brand identity</CardTitle>
          <CardDescription>These details appear on quotes, invoices, receipts, and payment pages.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Field label="Business name" value={profile.brand_name || ""} onChange={(value) => updateField("brand_name", value)} />
          <Field label="Email" value={profile.business_email || ""} onChange={(value) => updateField("business_email", value)} />
          <Field label="Phone" value={profile.business_phone || ""} onChange={(value) => updateField("business_phone", value)} />
          <Field label="Brand colour" type="color" value={profile.brand_color || "#b0d226"} onChange={(value) => updateField("brand_color", value)} />
          <div className="space-y-2 md:col-span-2">
            <Label>Address</Label>
            <Input value={profile.business_address || ""} onChange={(event) => updateField("business_address", event.target.value)} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Logo</Label>
            <div className="flex flex-wrap items-center gap-4 rounded-2xl border p-4">
              {profile.logo_url ? <img src={profile.logo_url} alt="Business logo" className="h-14 max-w-40 rounded-xl bg-white object-contain p-2" /> : <span className="text-sm text-muted-foreground">No logo uploaded</span>}
              <Input type="file" accept="image/png,image/jpeg,image/webp" onChange={uploadLogo} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-3xl">
        <CardHeader>
          <CardTitle>Payment details</CardTitle>
          <CardDescription>Payment links require verified bank details.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Field label="Bank name" value={profile.bank_name || ""} onChange={(value) => updateField("bank_name", value)} />
          <Field label="Account number" value={profile.account_number || ""} onChange={(value) => updateField("account_number", value)} />
          <Field label="Account name" value={profile.account_name || ""} onChange={(value) => updateField("account_name", value)} />
          <div className="space-y-2">
            <Label>Preferred payment option</Label>
            <select className="h-10 w-full rounded-md border bg-background px-3 text-sm" value={profile.preferred_payment_option || "BANK"} onChange={(event) => updateField("preferred_payment_option", event.target.value)}>
              <option value="BANK">Bank</option>
              <option value="LINK">Payment link</option>
              <option value="BOTH">Bank + link</option>
              <option value="NONE">None</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-3xl">
        <CardHeader>
          <CardTitle>Defaults</CardTitle>
          <CardDescription>Saved terms and signature text can be reused in documents.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Field label="Payment terms / notes" value={profile.terms_and_conditions || ""} onChange={(value) => updateField("terms_and_conditions", value)} />
          <Field label="Signature or stamp text" value={profile.signature_text || ""} onChange={(value) => updateField("signature_text", value)} />
          <Button onClick={save} disabled={saving}>{saving ? "Saving..." : "Save profile"}</Button>
        </CardContent>
      </Card>
    </div>
  )
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input type={type} value={value} onChange={(event) => onChange(event.target.value)} />
    </div>
  )
}
