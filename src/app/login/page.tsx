"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import api from "@/lib/api"
import { buildBackendUrl } from "@/lib/urls"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type LoginState = "idle" | "ready" | "waiting" | "verified" | "expired" | "failed"
const LOGIN_STORAGE_KEY = "prymagent_pending_login"

export default function LoginPage() {
  const router = useRouter()
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [state, setState] = useState<LoginState>("idle")
  const [loginId, setLoginId] = useState("")
  const [pollToken, setPollToken] = useState("")
  const [whatsappLink, setWhatsappLink] = useState("")
  const [expiresAt, setExpiresAt] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const urlLoginId = params.get("login_id")
    const urlPollToken = params.get("poll_token")
    if (urlLoginId && urlPollToken) {
      resumeLogin({ login_id: urlLoginId, poll_token: urlPollToken })
      window.history.replaceState({}, "", "/login")
      return () => {
        if (pollRef.current) clearInterval(pollRef.current)
      }
    }

    const saved = readStoredLogin()
    if (saved) {
      resumeLogin(saved)
    }

    return () => {
      if (pollRef.current) clearInterval(pollRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const storeLogin = (payload: any) => {
    if (typeof window === "undefined") return
    localStorage.setItem(LOGIN_STORAGE_KEY, JSON.stringify(payload))
  }

  const clearStoredLogin = () => {
    if (typeof window === "undefined") return
    localStorage.removeItem(LOGIN_STORAGE_KEY)
  }

  const readStoredLogin = () => {
    if (typeof window === "undefined") return null
    try {
      const raw = localStorage.getItem(LOGIN_STORAGE_KEY)
      if (!raw) return null
      const parsed = JSON.parse(raw)
      if (parsed.expires_at && new Date(parsed.expires_at).getTime() < Date.now()) {
        localStorage.removeItem(LOGIN_STORAGE_KEY)
        return null
      }
      if (!parsed.login_id || !parsed.poll_token) return null
      return parsed
    } catch {
      localStorage.removeItem(LOGIN_STORAGE_KEY)
      return null
    }
  }

  const resumeLogin = (payload: any) => {
    setLoginId(payload.login_id)
    setPollToken(payload.poll_token)
    setPhoneNumber(payload.phone_number || "")
    setExpiresAt(payload.expires_at || "")
    setWhatsappLink(payload.whatsapp_link || "")
    setError("")
    setState("waiting")
    pollStatus(payload.login_id, payload.poll_token)
  }

  const startLogin = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await api.post(buildBackendUrl("/api/auth/whatsapp/start"), { phone_number: phoneNumber })
      setLoginId(res.data.login_id)
      setPollToken(res.data.poll_token)
      setWhatsappLink(res.data.whatsapp_link)
      setExpiresAt(res.data.expires_at)
      storeLogin({
        phone_number: phoneNumber,
        login_id: res.data.login_id,
        poll_token: res.data.poll_token,
        whatsapp_link: res.data.whatsapp_link,
        expires_at: res.data.expires_at,
      })
      setState("ready")
    } catch (err: any) {
      setError(err?.response?.data?.error || "Unable to start login. Please check your number and try again.")
    } finally {
      setLoading(false)
    }
  }

  const pollStatus = (id = loginId, token = pollToken) => {
    if (pollRef.current) clearInterval(pollRef.current)
    pollRef.current = setInterval(async () => {
      try {
        const res = await api.get(buildBackendUrl(`/api/auth/whatsapp/status?login_id=${id}&poll_token=${token}`))
        if (res.data.status === "verified") {
          if (pollRef.current) clearInterval(pollRef.current)
          clearStoredLogin()
          setState("verified")
          setTimeout(() => router.push("/dashboard"), 700)
        } else if (res.data.status === "expired") {
          if (pollRef.current) clearInterval(pollRef.current)
          clearStoredLogin()
          setState("expired")
          setError(res.data.error || "This login code has expired. Please request a new one.")
        } else if (res.data.status === "failed") {
          if (pollRef.current) clearInterval(pollRef.current)
          clearStoredLogin()
          setState("failed")
          setError(res.data.error || "Verification failed. Please try again.")
        }
      } catch (err: any) {
        setError(err?.response?.data?.error || "Unable to check login status.")
      }
    }, 2500)
  }

  const openWhatsApp = () => {
    setState("waiting")
    pollStatus()
    window.open(whatsappLink, "_blank", "noopener,noreferrer")
  }

  const reset = () => {
    if (pollRef.current) clearInterval(pollRef.current)
    clearStoredLogin()
    setState("idle")
    setLoginId("")
    setPollToken("")
    setWhatsappLink("")
    setExpiresAt("")
    setError("")
  }

  return (
    <main className="min-h-screen bg-[#f7faf0] px-4 py-8 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center">
        <div className="grid w-full gap-6 lg:grid-cols-[1fr_0.9fr]">
          <section className="rounded-[2rem] bg-[#101820] p-6 text-white shadow-2xl sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#b0d226]">PrymAgent Solo</p>
            <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl">
              Your billing archive, profile, and credits in one simple dashboard.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/75">
              PrymAgent stays WhatsApp-first. The dashboard helps you manage documents, client history, branding, and billing visibility.
            </p>
          </section>

          <Card className="rounded-[2rem] border-[#d2d8c7] bg-white/90 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Sign in with WhatsApp</CardTitle>
              <CardDescription>
                Enter your WhatsApp number to access your PrymAgent dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="phone">WhatsApp number</Label>
                <Input
                  id="phone"
                  placeholder="08012345678"
                  value={phoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                  disabled={state === "waiting" || state === "verified"}
                />
              </div>

              <div className="rounded-2xl border border-[#d2d8c7] bg-[#f7faf0] p-4 text-xs leading-6 text-[#5f636d]">
                By continuing, you agree to PrymAgent's{" "}
                <a href="/terms" className="font-black text-[#101820] underline underline-offset-4">
                  Terms and Conditions
                </a>{" "}
                and acknowledge the{" "}
                <a href="/privacy" className="font-black text-[#101820] underline underline-offset-4">
                  Privacy Policy
                </a>
                . PrymAgent helps prepare billing records, but you remain responsible for confirming document and payment details before use.
              </div>

              {state === "idle" || state === "expired" || state === "failed" ? (
                <Button className="w-full" onClick={startLogin} disabled={loading || !phoneNumber.trim()}>
                  {loading ? "Preparing login..." : "Continue"}
                </Button>
              ) : null}

              {state === "ready" ? (
                <div className="space-y-4 rounded-2xl border bg-[#f7faf0] p-4">
                  <p className="text-sm text-muted-foreground">
                    We’ll verify your number through WhatsApp. Tap the button below to send a secure login code to PrymAgent.
                  </p>
                  <Button className="w-full bg-[#00d37f] text-[#101820] hover:bg-[#00d37f]/90" onClick={openWhatsApp}>
                    Verify with WhatsApp
                  </Button>
                  <p className="text-xs text-muted-foreground">Code expires at {expiresAt ? new Date(expiresAt).toLocaleTimeString() : "soon"}.</p>
                </div>
              ) : null}

              {state === "waiting" ? (
                <div className="rounded-2xl border border-[#b0d226] bg-[#b0d226]/15 p-4 text-sm">
                  Waiting for your WhatsApp verification message. After sending the message, return to this page. We’ll sign you in automatically.
                </div>
              ) : null}

              {state === "verified" ? (
                <div className="rounded-2xl border border-[#00d37f] bg-[#00d37f]/15 p-4 text-sm">
                  Number verified. Opening your dashboard...
                </div>
              ) : null}

              {error ? <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}

              {state !== "idle" && state !== "verified" ? (
                <Button variant="ghost" className="w-full" onClick={reset}>
                  Start again
                </Button>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
