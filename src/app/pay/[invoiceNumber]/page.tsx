"use client"

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { AlertCircle, Check, Clock, Loader2, Lock, ArrowLeft } from 'lucide-react'

interface InvoiceItem {
  description: string
  quantity: number
  unit_price: number
  total: number
}

interface MerchantInfo {
  brand_name: string
  logo_url: string | null
  brand_color: string
  phone: string
  email: string
  address: string
}

interface InvoiceData {
  invoice_number: string
  client_name: string
  client_address: string
  merchant: MerchantInfo
  items: InvoiceItem[]
  subtotal: number
  tax_rate: number
  tax_amount: number
  total: number
  due_date: string | null
  payment_reference: string
  payment_method: string
  status: string
  created_at: string
}

declare global {
  interface Window {
    PaystackPop: any
  }
}

export default function PaymentPage() {
  const params = useParams()
  const router = useRouter()
  const invoiceNumber = params.invoiceNumber as string

  const [invoice, setInvoice] = useState<InvoiceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const [paystackLoaded, setPaystackLoaded] = useState(false)

  // Load Paystack inline script
  useEffect(() => {
    if (document.getElementById('paystack-inline-js')) {
      setPaystackLoaded(true)
      return
    }

    const script = document.createElement('script')
    script.id = 'paystack-inline-js'
    script.src = 'https://js.paystack.co/v1/inline.js'
    script.async = true
    script.onload = () => setPaystackLoaded(true)
    script.onerror = () => console.error('Failed to load Paystack')
    document.body.appendChild(script)
  }, [])

  // Fetch invoice data
  useEffect(() => {
    if (!invoiceNumber) return

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/'
    
    fetch(`${apiUrl}/finance/api/invoices/${invoiceNumber}/payment-page/`)
      .then(res => {
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error('Invoice not found or already paid')
          }
          throw new Error('Failed to load invoice')
        }
        return res.json()
      })
      .then(data => {
        setInvoice(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching invoice:', err)
        setError(err.message || 'Unable to load invoice')
        setLoading(false)
      })
  }, [invoiceNumber])

  const handlePayment = () => {
    if (!invoice || !paystackLoaded || processing) return

    setProcessing(true)

    try {
      const handler = window.PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || 'pk_test_c63e1544aff4a7ce41765ab96e572a085a90901e', // Replace with your public key
        email: invoice.merchant.email,
        amount: Math.round(invoice.total * 100), // Convert to kobo
        ref: invoice.payment_reference,
        currency: 'NGN',
        label: invoice.merchant.brand_name,
        metadata: {
          type: 'INVOICE',  // Critical for webhook routing
          invoice_number: invoice.invoice_number,
          merchant_brand: invoice.merchant.brand_name,
          client_name: invoice.client_name,
          custom_fields: [
            {
              display_name: 'Invoice',
              variable_name: 'invoice_number',
              value: invoice.invoice_number,
            },
            {
              display_name: 'Merchant',
              variable_name: 'merchant',
              value: invoice.merchant.brand_name,
            },
          ]
        },
        onClose: function() {
          setProcessing(false)
        },
        callback: function(response: any) {
          // Payment successful
          router.push(`/pay/${invoiceNumber}/success?ref=${response.reference}`)
        }
      })
      
      handler.openIframe()
    } catch (err) {
      console.error('Payment error:', err)
      alert('Payment initialization failed. Please try again.')
      setProcessing(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
    }).format(amount).replace('NGN', '₦')
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading invoice...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !invoice) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="max-w-md w-full bg-card border border-border rounded-2xl p-8 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Invoice Not Found</h1>
          <p className="text-muted-foreground mb-6">
            {error || 'This invoice does not exist or has already been paid.'}
          </p>
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-primary-foreground font-medium hover:opacity-90 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Home
          </button>
        </div>
      </div>
    )
  }

  const brandColor = invoice.merchant.brand_color
  const isDueSoon = invoice.due_date && new Date(invoice.due_date) < new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        
        {/* Header Card */}
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-6 shadow-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-6">
            {/* Left: Logo + Brand */}
            <div className="flex items-center gap-4 min-w-0 flex-1">
              {invoice.merchant.logo_url ? (
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                  <Image
                    src={invoice.merchant.logo_url}
                    alt={invoice.merchant.brand_name}
                    fill
                    className="object-contain p-2"
                    unoptimized={true}
                  />
                </div>
              ) : (
                <div 
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center text-white font-bold text-xl sm:text-2xl flex-shrink-0"
                  style={{ backgroundColor: brandColor }}
                >
                  {invoice.merchant.brand_name.charAt(0).toUpperCase()}
                </div>
              )}
              
              <div className="min-w-0 flex-1">
                <h1 
                  className="text-xl sm:text-2xl font-bold text-foreground truncate sm:whitespace-normal sm:line-clamp-2" 
                  style={{ color: brandColor }}
                  title={invoice.merchant.brand_name}
                >
                  {invoice.merchant.brand_name}
                </h1>
                {invoice.merchant.phone && (
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 truncate">
                    📱 {invoice.merchant.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Right: Invoice Badge */}
            <div className="flex flex-col items-start sm:items-end gap-2 w-full sm:w-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-xs font-medium text-foreground">
                <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
                INVOICE
              </div>
              <p className="text-sm font-mono text-muted-foreground">
                {invoice.invoice_number}
              </p>
            </div>
          </div>

          {/* Bill To */}
          <div className="border-t border-border pt-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Bill To
                </p>
                <p className="text-foreground font-semibold break-words">{invoice.client_name}</p>
                {invoice.client_address && (
                  <p className="text-sm text-muted-foreground mt-1 break-words">{invoice.client_address}</p>
                )}
              </div>

              <div className="text-left sm:text-right">
                <div className="mb-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Issue Date
                  </p>
                  <p className="text-sm text-foreground">{formatDate(invoice.created_at)}</p>
                </div>
                
                {invoice.due_date && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                      Due Date
                    </p>
                    <div className="flex items-center gap-2 justify-start sm:justify-end">
                      {isDueSoon && <Clock className="h-3 w-3 text-amber-500 flex-shrink-0" />}
                      <p className={`text-sm font-medium ${isDueSoon ? 'text-amber-500' : 'text-foreground'}`}>
                        {formatDate(invoice.due_date)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-6 shadow-lg overflow-hidden">
          <h2 className="text-lg font-semibold text-foreground mb-4">Invoice Details</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Item
                  </th>
                  <th className="text-center py-3 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Qty
                  </th>
                  <th className="text-right py-3 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Price
                  </th>
                  <th className="text-right py-3 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, idx) => (
                  <tr key={idx} className="border-b border-border/50 last:border-0">
                    <td className="py-4 px-2 text-foreground">{item.description}</td>
                    <td className="py-4 px-2 text-center text-muted-foreground">{item.quantity}</td>
                    <td className="py-4 px-2 text-right text-muted-foreground">
                      {formatCurrency(item.unit_price)}
                    </td>
                    <td className="py-4 px-2 text-right font-medium text-foreground">
                      {formatCurrency(item.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="mt-6 pt-6 border-t border-border space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium text-foreground">{formatCurrency(invoice.subtotal)}</span>
            </div>

            {invoice.tax_rate > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {invoice.tax_rate === 7.5 ? 'VAT' : 'Tax'} ({invoice.tax_rate}%)
                </span>
                <span className="font-medium text-foreground">{formatCurrency(invoice.tax_amount)}</span>
              </div>
            )}

            <div className="pt-3 border-t border-border">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-foreground">Total Due</span>
                <span className="text-2xl font-bold" style={{ color: brandColor }}>
                  {formatCurrency(invoice.total)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Button */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
          <div className="flex items-start gap-3 mb-6">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Lock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Secure Payment</h3>
              <p className="text-sm text-muted-foreground">
                Your payment is processed securely via Paystack. We don't store your card details.
              </p>
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={processing || !paystackLoaded}
            className="w-full py-4 rounded-xl font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
            style={{ backgroundColor: brandColor }}
          >
            {processing ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Check className="h-5 w-5" />
                Pay {formatCurrency(invoice.total)}
              </>
            )}
          </button>

          <p className="text-center text-xs text-muted-foreground mt-4">
            Secured by Paystack • Powered by{' '}
            <a href="https://prymshare.com" className="text-primary hover:underline">
              PrymAgent
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}