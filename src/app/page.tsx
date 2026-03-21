"use client"

import Image from "next/image"
import { ArrowRight, MessageCircle, Receipt, BarChart3, FileText, Smartphone } from "lucide-react"

export default function Home() {
  const WHATSAPP_NUMBER = "2349032879124" 
  const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi!%20I%27d%20like%20to%20get%20started%20with%20MyBizAgent`

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      
      {/* ----------------- SOPHISTICATED BACKGROUND SYSTEM ----------------- */}
      <div className="fixed inset-0 z-0">
        {/* Layered gradient foundation */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
        
        {/* Organic shape accents */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/[0.03] rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-yellow/[0.04] rounded-full blur-[120px] -translate-x-1/4 translate-y-1/4" />
        
        {/* Fine grid overlay - very subtle */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      {/* ----------------- NAVIGATION ----------------- */}
      <nav className="relative z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Image 
                src="/assets/icons/logohead.png" 
                alt="Prym Logo" 
                width={32} 
                height={32}
                className="h-8 w-8"
              />
              <span className="text-xl font-bold tracking-tight">
                PrymAgent<span className="text-primary">.</span>
              </span>
            </div>
            
            <button 
              disabled 
              className="group relative flex items-center gap-2 rounded-lg border border-border/60 bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/50 cursor-not-allowed"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30" />
              <span>Dashboard Coming Soon</span>
              <span className="absolute -bottom-9 right-0 w-max opacity-0 transition-opacity group-hover:opacity-100 text-[10px] text-muted-foreground/70">
                Coming soon
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* ----------------- HERO SECTION ----------------- */}
      <section className="relative z-10 pt-20 pb-16 lg:pt-32 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* LEFT COLUMN - Content */}
            <div className="space-y-8 lg:space-y-10">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.03] px-3.5 py-1.5 text-xs font-medium text-primary">
                <Smartphone className="h-3.5 w-3.5" />
                <span>WhatsApp-Native Finance Agent</span>
              </div>

              {/* Headline */}
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95]">
                  Your Finance Gee
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-brand-yellow/90">
                    Lives on WhatsApp
                  </span>
                </h1>
                
                <div className="h-1 w-24 bg-gradient-to-r from-primary to-brand-yellow rounded-full" />
              </div>

              {/* Subheadline */}
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl">
                Stop drowning in receipts and spreadsheets. 
                <span className="text-foreground font-semibold"> PrymAgent</span> handles invoicing, 
                transaction tracking, and financial reports—
                <span className="text-foreground font-semibold"> all through chat</span>.
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-2.5">
                {[
                  { icon: Receipt, label: "Smart Invoicing" },
                  { icon: BarChart3, label: "Sales Tracking" },
                  { icon: FileText, label: "Financial Reports" },
                ].map((feature, i) => (
                  <div 
                    key={i}
                    className="flex items-center gap-2 rounded-lg border border-border/60 bg-background/60 backdrop-blur-sm px-3.5 py-2 text-sm font-medium text-foreground/80"
                  >
                    <feature.icon className="h-4 w-4 text-primary" />
                    <span>{feature.label}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <a 
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2.5 rounded-xl bg-primary px-7 py-4 text-base font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Talk to Your Agent</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  
                  {/* Pulse */}
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-yellow opacity-75"></span>
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-brand-yellow"></span>
                  </span>
                </a>

                {/* Trust line */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <div className="h-1 w-1 rounded-full bg-primary" />
                    No app needed
                  </span>
                  <span className="flex items-center gap-1.5">
                    <div className="h-1 w-1 rounded-full bg-brand-yellow" />
                    10 free credits
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - Video Demo */}
            <div className="relative lg:pl-8">
              
              {/* Decorative elements around video */}
              <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-primary/5 blur-2xl -z-10" />
              <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full bg-brand-yellow/5 blur-3xl -z-10" />
              
              {/* Video container with sophisticated border treatment */}
              <div className="relative group">
                
                {/* Outer glow on hover */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-primary/20 via-transparent to-brand-yellow/20 opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
                
                {/* Main video frame */}
                <div className="relative rounded-2xl border border-border/60 bg-background/80 backdrop-blur-sm p-2 shadow-2xl overflow-hidden">
                  
                  {/* Inner border accent */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-brand-yellow/10 pointer-events-none" />
                  
                  {/* Video embed */}
                  <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-muted/20">
                    <iframe
                      src="https://www.youtube.com/embed/IjBJ_sn0bCQ"
                      title="PrymAgent Demo"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                  
                  {/* Caption */}
                  <div className="mt-3 px-2 pb-1">
                    <p className="text-xs font-medium text-muted-foreground text-center">
                      See PrymAgent in action → Real conversations, real results
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating stat card - Desktop only */}
              <div className="hidden lg:block absolute -left-12 bottom-12 animate-[float_6s_ease-in-out_infinite]">
                <div className="rounded-xl border border-border/60 bg-background/90 backdrop-blur-md p-4 shadow-xl w-44">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    Avg Response
                  </div>
                  <div className="text-2xl font-black text-foreground">
                    &lt; 2 sec
                  </div>
                  <div className="mt-1.5 flex items-center gap-1 text-xs text-primary font-medium">
                    <div className="h-1 w-1 rounded-full bg-primary animate-pulse" />
                    <span>Lightning fast</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- FOOTER ----------------- */}
      <footer className="relative z-50 mt-auto border-t border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-6">
          <p className="text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} PrymAgent · Built for African Hustlers
          </p>
        </div>
      </footer>

      {/* Custom keyframes in style tag */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </main>
  )
}