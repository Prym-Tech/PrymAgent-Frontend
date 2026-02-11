"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import api from "@/lib/api"
import { useRouter } from "next/navigation"

export default function Home() {
    const [loading, setLoading] = useState(false)
    const [waLink, setWaLink] = useState<string | null>(null)
    const [hexCode, setHexCode] = useState<string | null>(null)
    const router = useRouter()

    const handleStart = async () => {
        setLoading(true)
        try {
            const response = await api.post('/auth/generate-hex')
            setHexCode(response.data.code)
            setWaLink(response.data.link)
        } catch (error) {
            console.error("Failed to generate code", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        let interval: NodeJS.Timeout
        if (hexCode) {
            interval = setInterval(async () => {
                try {
                    const res = await api.get(`/auth/status?code=${hexCode}`)
                    if (res.data.status === 'verified') {
                        // Save user session/token if needed
                        // localStorage.setItem('user', JSON.stringify(res.data.username))
                        router.push('/dashboard')
                    }
                } catch (e) {
                    // console.error("Polling error", e)
                }
            }, 3000)
        }
        return () => clearInterval(interval)
    }, [hexCode, router])

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
            <div className="z-10 max-w-md w-full items-center justify-between font-mono text-sm">
                <Card className="w-full border-border bg-card shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center text-primary">PrymAgent</CardTitle>
                        <CardDescription className="text-center">
                            Your AI Pocket CFO on WhatsApp
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {!waLink ? (
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="phone">Get Started</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Click below to verify your account via WhatsApp. No password needed.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center space-y-4">
                                <div className="text-center space-y-2">
                                    <p className="font-bold text-4xl tracking-widest text-brand-green">{hexCode}</p>
                                    <p className="text-sm text-muted-foreground">Verification Code</p>
                                </div>
                                <p className="text-sm text-center">
                                    Click the button below to send this code to our WhatsApp bot.
                                </p>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        {!waLink ? (
                            <Button className="w-full text-white bg-brand-green hover:bg-brand-green/90" onClick={handleStart} disabled={loading}>
                                {loading ? "Generating..." : "Connect with WhatsApp"}
                            </Button>
                        ) : (
                            <Button asChild className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white">
                                <a href={waLink} target="_blank" rel="noopener noreferrer">
                                    Open WhatsApp
                                </a>
                            </Button>
                        )}
                    </CardFooter>
                </Card>
            </div>

            <div className="mt-8 text-center text-sm text-muted-foreground">
                <p>Automated Sales Logging • Invoicing • Financial Reports</p>
            </div>
        </main>
    )
}
