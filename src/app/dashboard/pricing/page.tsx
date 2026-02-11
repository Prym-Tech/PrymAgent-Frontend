"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import api from "@/lib/api"

export default function PricingPage() {
    const [loading, setLoading] = useState(false)

    const handleBuy = async (amount: number) => {
        setLoading(true)
        try {
            const res = await api.post('/finance/buy-credits', { amount })
            if (res.data.authorization_url) {
                window.location.href = res.data.authorization_url
            }
        } catch (e) {
            console.error("Payment init failed", e)
            alert("Failed to initialize payment. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="p-6 md:p-10 space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Buy Credits</h1>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-2 hover:border-brand-green transition-all">
                    <CardHeader>
                        <CardTitle>Standard Plan</CardTitle>
                        <CardDescription>Perfect for testing the waters.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold mb-4">₦500</div>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>✓ 10 Credits</li>
                            <li>✓ Full Feature Access</li>
                            <li>✓ No Expiry</li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" onClick={() => handleBuy(500)} disabled={loading}>
                            {loading ? "Processing..." : "Buy Now"}
                        </Button>
                    </CardFooter>
                </Card>

                <Card className="border-2 border-brand-green/50 bg-brand-green/5 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-brand-green text-white text-xs px-2 py-1 rounded-bl-lg font-bold">BEST VALUE</div>
                    <CardHeader>
                        <CardTitle>Pro Plan</CardTitle>
                        <CardDescription>For serious business owners.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold mb-4">₦1,000</div>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>✓ 25 Credits <span className="text-brand-green font-bold">(+5 Bonus)</span></li>
                            <li>✓ Priority AI Processing</li>
                            <li>✓ No Expiry</li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full bg-brand-green hover:bg-brand-green/90 text-white" onClick={() => handleBuy(1000)} disabled={loading}>
                            {loading ? "Processing..." : "Buy Now"}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </main>
    )
}
