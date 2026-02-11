"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function InvoicesPage() {
    return (
        <main className="p-6 md:p-10 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
                <Button>Create New Invoice</Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Invoices</CardTitle>
                    <CardDescription>Manage and view your generated invoices.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center text-muted-foreground py-8">
                        No invoices found. Generate one via WhatsApp!
                    </div>
                    {/* Mock List */}
                    {/* 
            <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                    <div>
                        <p className="font-medium">Invoice #1001 - Client A</p>
                        <p className="text-sm text-muted-foreground">Due: 2026-02-20</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Pending</span>
                        <Button variant="outline" size="sm">View PDF</Button>
                    </div>
                </div>
            </div>
            */}
                </CardContent>
            </Card>
        </main>
    )
}
