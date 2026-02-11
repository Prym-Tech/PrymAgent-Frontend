"use client"
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-background">
            {/* Sidebar */}
            <div className="w-full flex-none md:w-64 border-r bg-card">
                <div className="p-6">
                    <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-lg">
                        <span className="text-primary text-xl">PrymAgent</span>
                    </Link>
                </div>
                <div className="flex flex-col gap-2 px-4">
                    <Link href="/dashboard">
                        <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
                            Overview
                        </Button>
                    </Link>
                    <Link href="/dashboard/transactions">
                        <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
                            Transactions
                        </Button>
                    </Link>
                    <Link href="/dashboard/invoices">
                        <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
                            Invoices
                        </Button>
                    </Link>
                    <Link href="/dashboard/pricing">
                        <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
                            Buy Credits
                        </Button>
                    </Link>
                </div>
                <div className="mt-auto p-4 border-t">
                    <div className="text-xs text-muted-foreground px-2 pb-2">Logged in via WhatsApp</div>
                    <Link href="/">
                        <Button variant="outline" size="sm" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">Log Out</Button>
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow flex-col md:overflow-y-auto">
                {children}
            </div>
        </div>
    )
}
