import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'PrymAgent - AI billing assistant',
    description: 'Create quotes, invoices, receipts, track payments, and keep billing records from WhatsApp and web.',
    icons: {
        icon: '/favicon.ico',
    },
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
