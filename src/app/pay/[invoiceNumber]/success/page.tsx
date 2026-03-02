"use client"

import { useEffect, useState } from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import { CheckCircle, Download, ArrowLeft, Loader2 } from 'lucide-react'
import Image from 'next/image'

export default function PaymentSuccessPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const invoiceNumber = params.invoiceNumber as string
  const reference = searchParams.get('ref')
  
  const [verifying, setVerifying] = useState(true)
  const [verified, setVerified] = useState(false)

  useEffect(() => {
    // Simulate verification delay (in production, you'd verify with backend)
    const timer = setTimeout(() => {
      setVerifying(false)
      setVerified(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg font-medium text-foreground mb-2">Verifying Payment...</p>
          <p className="text-sm text-muted-foreground">Please wait</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        
        {/* Success Card */}
        <div className="bg-card border border-border rounded-2xl p-8 text-center shadow-lg">
          
          {/* Success Icon */}
          <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 animate-in zoom-in duration-500">
            <CheckCircle className="h-12 w-12 text-primary" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-foreground mb-3 animate-in fade-in slide-in-from-bottom-3 duration-500 delay-100">
            Payment Successful!
          </h1>
          
          <p className="text-muted-foreground mb-6 animate-in fade-in slide-in-from-bottom-3 duration-500 delay-200">
            Your payment has been processed successfully.
          </p>

          {/* Payment Details */}
          <div className="bg-muted/50 rounded-xl p-6 mb-6 text-left animate-in fade-in slide-in-from-bottom-3 duration-500 delay-300">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Invoice</span>
                <span className="font-mono font-medium text-foreground">{invoiceNumber}</span>
              </div>
              {reference && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Reference</span>
                  <span className="font-mono text-xs text-foreground">{reference}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Paid
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          {/* <div className="space-y-3 animate-in fade-in slide-in-from-bottom-3 duration-500 delay-400">
            <button
              onClick={() => router.push('/')}
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </button>
          </div> */}

          {/* Footer Note */}
          <p className="text-xs text-muted-foreground mt-6">
            {/* A receipt has been sent to your email. */}
            <br />
            Questions? Contact the merchant directly.
          </p>
        </div>

        {/* PrymAgent Badge */}
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Powered by{' '}
            <a href="https://mybizagent.prymshare.com" className="text-primary font-medium hover:underline">
              PrymAgent
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}