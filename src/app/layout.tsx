import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'PrymAgent - Your AI Pocket CFO',
    description: 'Manage finances, invoices, and loans via WhatsApp with AI.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}