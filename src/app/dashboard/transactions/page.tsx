"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function TransactionsPage() {
    return (
        <main className="p-6 md:p-10 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
                <div className="flex gap-2">
                    <Button variant="outline">Export CSV</Button>
                    <Button>Log Transaction</Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Transactions</CardTitle>
                    <CardDescription>View your income and expenses.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                <div className="space-y-1">
                                    <p className="font-medium">Transaction #{1000 + i}</p>
                                    <p className="text-xs text-muted-foreground">2026-02-10 • {i % 2 === 0 ? 'Expense' : 'Income'}</p>
                                </div>
                                <div className={`font-bold ${i % 2 === 0 ? 'text-red-500' : 'text-brand-green'}`}>
                                    {i % 2 === 0 ? '-' : '+'}₦{(i * 5000).toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}
