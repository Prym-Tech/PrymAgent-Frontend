"use client"

import Image from "next/image"
import { ArrowRight, MessageCircle, Sparkles, TrendingUp, Receipt, CircleDollarSign } from "lucide-react"

export default function Home() {
  const WHATSAPP_NUMBER = "2349032879124" 
  const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20PrymAgent,%20I%20want%20to%20start.`

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 text-foreground">
      
      {/* ----------------- GRADIENT MESH BACKGROUND ----------------- */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Radial gradient overlay for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(46,114,70,0.08),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(250,187,20,0.06),transparent_50%)]" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        {/* Noise texture for grain effect */}
        <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
      </div>

      {/* ----------------- FLOATING ORBS ----------------- */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Primary Green Orb - Subtle */}
        <div className="absolute top-[10%] right-[15%] h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px] animate-[float_8s_ease-in-out_infinite]" />
        
        {/* Yellow Orb - Even more subtle */}
        <div className="absolute bottom-[15%] left-[10%] h-[350px] w-[350px] rounded-full bg-brand-yellow/4 blur-[90px] animate-[float_10s_ease-in-out_infinite_2s]" />
      </div>

      {/* ----------------- NAVIGATION ----------------- */}
      <nav className="absolute top-0 left-0 right-0 z-50 border-b border-border/40 backdrop-blur-xl bg-background/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
          <div className="flex items-center gap-2">
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
            className="group relative flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-2 text-xs font-medium text-muted-foreground backdrop-blur-sm transition-all hover:bg-muted cursor-not-allowed"
          >
            <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
            <span>Dashboard</span>
            <span className="absolute -bottom-10 right-0 w-max opacity-0 transition-opacity group-hover:opacity-100 text-[10px] text-muted-foreground bg-background/90 backdrop-blur-sm border border-border rounded px-2 py-1">
              Coming soon
            </span>
          </button>
        </div>
      </nav>

      {/* ----------------- HERO CONTENT ----------------- */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center text-center px-4 pt-20 pb-32">
        
        {/* Status Badge */}
        <div className="group mb-8 inline-flex animate-in fade-in slide-in-from-bottom-3 duration-700 items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-primary/10">
          <Sparkles className="h-3.5 w-3.5" />
          <span>AI-Powered Finance for African SMEs</span>
          <div className="h-1 w-1 rounded-full bg-primary animate-pulse" />
        </div>

        {/* Main Headline */}
        <h1 className="mb-6 max-w-5xl text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl animate-in fade-in zoom-in-95 duration-700 delay-100">
          Your Finance Gee
          <br />
          <span className="relative inline-block mt-2">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-brand-yellow">
              Lives on WhatsApp
            </span>
            {/* Subtle underline accent */}
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mb-12 max-w-2xl text-lg text-muted-foreground md:text-xl lg:text-2xl animate-in fade-in slide-in-from-bottom-3 duration-700 delay-200 leading-relaxed">
          Stop drowning in receipts and spreadsheets. 
          <span className="text-foreground font-medium"> MyBizAgent</span> tracks sales, 
          sends invoices, and checks loan eligibility—
          <span className="text-foreground font-medium"> instantly</span>.
        </p>

        {/* CTA Section */}
        <div className="flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-3 duration-700 delay-300">
          <a 
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98]"
          >
            <MessageCircle className="h-5 w-5 transition-transform group-hover:rotate-12" />
            <span>Start on WhatsApp</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            
            {/* Pulse indicator */}
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-yellow opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-brand-yellow"></span>
            </span>
          </a>

          {/* Trust indicators */}
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <div className="h-1 w-1 rounded-full bg-primary" />
              No app needed
            </span>
            <span className="flex items-center gap-1.5">
              <div className="h-1 w-1 rounded-full bg-primary" />
              Works on 2G
            </span>
            <span className="flex items-center gap-1.5">
              <div className="h-1 w-1 rounded-full bg-brand-yellow" />
              10 free credits
            </span>
          </div>
        </div>

        {/* Social Proof / Stats Row - COMMENTED OUT FOR NOW */}
        {/* <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-3 animate-in fade-in duration-700 delay-500">
          {[
            { icon: TrendingUp, label: "Tracked", value: "₦2.4M+", color: "text-primary" },
            { icon: Receipt, label: "Invoices Sent", value: "1,247", color: "text-foreground" },
            { icon: CircleDollarSign, label: "Avg. Time Saved", value: "4hrs/day", color: "text-brand-yellow" },
          ].map((stat, i) => (
            <div 
              key={i} 
              className="group relative overflow-hidden rounded-2xl border border-border bg-background/50 backdrop-blur-sm p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex flex-col items-start gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-muted ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
              
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div> */}
      </div>

      {/* ----------------- FLOATING CARDS (Desktop) ----------------- */}
      <div className="pointer-events-none absolute inset-0 z-0 hidden lg:block overflow-hidden">
        
        {/* Card 1: Revenue Update */}
        <div className="absolute top-[20%] left-[8%] animate-[float_6s_ease-in-out_infinite]">
          <div className="w-64 rounded-2xl border border-border bg-background/80 backdrop-blur-xl p-5 shadow-2xl">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Today's Revenue</span>
              <div className="flex h-2 w-2 rounded-full bg-brand-yellow animate-pulse" />
            </div>
            <div className="mb-4">
              <div className="text-3xl font-bold text-foreground">₦154,000</div>
              <div className="mt-1 flex items-center gap-1 text-xs text-primary">
                <TrendingUp className="h-3 w-3" />
                <span className="font-medium">+23% from yesterday</span>
              </div>
            </div>
            {/* Mini chart bars */}
            <div className="flex items-end gap-1 h-12">
              {[40, 60, 45, 75, 55, 80, 100].map((height, i) => (
                <div 
                  key={i} 
                  className="flex-1 rounded-t bg-gradient-to-t from-primary/20 to-primary/40"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Card 2: Quick Action Toast */}
        <div className="absolute bottom-[20%] right-[17.5%] animate-[float_7s_ease-in-out_infinite_1.5s]">
          <div className="flex items-start gap-4 rounded-2xl border border-border bg-background/80 backdrop-blur-xl px-6 py-4 shadow-2xl">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Receipt className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold text-foreground">Invoice #INV-0428</div>
              <div className="mt-0.5 text-sm text-muted-foreground">Sent to Chidi Okeke</div>
              <div className="mt-2 flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-brand-yellow" />
                <span className="text-xs text-brand-yellow font-medium">Just now</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Insight Badge */}
        <div className="absolute top-[55%] right-[8%] animate-[float_8s_ease-in-out_infinite_3s]">
          <div className="w-56 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-brand-yellow/5 backdrop-blur-xl p-4 shadow-2xl">
            <div className="mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">AI Insight</span>
            </div>
            <p className="text-sm text-foreground/90 leading-relaxed">
              You're eligible for a <span className="font-bold text-primary">₦500K loan</span> based on your sales pattern
            </p>
          </div>
        </div>
      </div>

      {/* ----------------- MOBILE FLOATING ELEMENTS (Mobile & Tablet) ----------------- */}
      <div className="pointer-events-none absolute inset-0 z-0 block lg:hidden overflow-hidden">
        
        {/* Mobile Card 1: Mini Revenue Card - Top Right */}
        {/* <div className="absolute top-[10%] right-[5%] animate-[float_5s_ease-in-out_infinite]">
          <div className="w-40 sm:w-48 rounded-xl border border-border bg-background/90 backdrop-blur-xl p-3 sm:p-4 shadow-xl">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Revenue</span>
              <div className="flex h-1.5 w-1.5 rounded-full bg-brand-yellow animate-pulse" />
            </div>
            <div className="text-lg sm:text-lg font-bold text-foreground">₦154K</div>
            <div className="mt-1 flex items-center gap-1 text-[10px] text-primary">
              <TrendingUp className="h-2.5 w-2.5" />
              <span className="font-medium">+23% today</span>
            </div>
          </div>
        </div> */}

        {/* Mobile Card 2: Invoice Notification - Left Side */}
        {/* <div className="absolute bottom-[30%] sm:bottom-[30%] left-[5%] animate-[float_6s_ease-in-out_infinite_2s]">
          <div className="flex items-center gap-3 rounded-xl border border-border bg-background/90 backdrop-blur-xl px-4 py-3 shadow-xl max-w-[200px] sm:max-w-none">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Receipt className="h-4 w-4" />
            </div>
            <div className="overflow-hidden">
              <div className="text-xs sm:text-sm font-semibold text-foreground truncate">Invoice sent!</div>
              <div className="mt-0.5 flex items-center gap-1.5">
                <div className="h-1 w-1 rounded-full bg-brand-yellow" />
                <span className="text-[10px] text-brand-yellow font-medium">Just now</span>
              </div>
            </div>
          </div>
        </div> */}

        {/* Mobile Card 3: AI Insight Badge - Bottom Right */}
        {/* <div className="absolute bottom-[35%] sm:bottom-[30%] right-[5%] animate-[float_7s_ease-in-out_infinite_4s]">
          <div className="w-44 sm:w-52 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-brand-yellow/5 backdrop-blur-xl p-3 shadow-xl">
            <div className="mb-1.5 flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-primary" />
              <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">AI Insight</span>
            </div>
            <p className="text-xs text-foreground/90 leading-relaxed">
              Eligible for <span className="font-bold text-primary">₦500K</span> loan
            </p>
          </div>
        </div> */}

        {/* Mobile Only: Floating Currency Icons for extra pizzazz */}
        <div className="absolute top-[28%] left-[8%] opacity-30 animate-[float_9s_ease-in-out_infinite_1s]">
          <CircleDollarSign className="h-8 w-8 text-primary" />
        </div>
        
        <div className="absolute bottom-[45%] right-[12%] opacity-20 animate-[float_10s_ease-in-out_infinite_3s]">
          <TrendingUp className="h-10 w-10 text-brand-yellow" />
        </div>
      </div>

      {/* ----------------- FOOTER ----------------- */}
      <footer className="absolute bottom-0 left-0 right-0 z-50 border-t border-border/40 backdrop-blur-xl bg-background/80">
        <div className="mx-auto max-w-7xl px-6 py-4 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} PrymAgent · Built for African Hustlers
          </p>
        </div>
      </footer>
    </main>
  )
}