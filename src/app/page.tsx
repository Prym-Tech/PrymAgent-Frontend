"use client"

import Image from "next/image"
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  FileText,
  MessageCircle,
  Receipt,
  ShieldCheck,
  Smartphone,
  Sparkles,
  WalletCards,
} from "lucide-react"

const featureCards = [
  {
    icon: Receipt,
    title: "Invoice and Receipt Generation",
    copy:
      "Generate polished business documents straight from natural conversation, with branding, tax handling, payment references, and share-ready output.",
  },
  {
    icon: WalletCards,
    title: "Payment-Aware Cashflow Ops",
    copy:
      "Track payments, reconcile receipts, and keep a clean record of what was billed, what was paid, and what still needs attention.",
  },
  {
    icon: BarChart3,
    title: "Operational Finance Summaries",
    copy:
      "Turn everyday business activity into usable reports and structured records instead of scattered chats, notes, and memory.",
  },
]

const workflowSteps = [
  {
    title: "Message naturally on WhatsApp",
    body: "No dashboard dependency. Just speak the way you already run the business: 'Create invoice for Tega', 'Log 250k transfer', 'Generate receipt for that payment'.",
  },
  {
    title: "AI extracts intent and structure",
    body: "PrymAgent interprets the request, identifies the action, pulls out the business details, and keeps the interaction conversational without losing precision.",
  },
  {
    title: "Backend logic validates the work",
    body: "The system checks requirements, preserves business state, applies rules for payments and records, and produces consistent outputs instead of hallucinated guesses.",
  },
  {
    title: "You get a usable business artifact",
    body: "PDF invoices, receipts, transaction logs, and reports come out ready for real use, not just as text suggestions buried in a chat thread.",
  },
]

const technicalSignals = [
  "Intent-based AI orchestration rather than generic chatbot copy",
  "Structured extraction for invoices, receipts, payments, and updates",
  "Guardrailed backend validation before documents are generated",
  "WhatsApp-native workflow built for real SME operations",
]

export default function Home() {
  const WHATSAPP_NUMBER = "2349032879124"
  const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi!%20I%27d%20like%20to%20get%20started%20with%20PrymAgent`

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(46,114,70,0.08),transparent_34%),radial-gradient(circle_at_top_right,rgba(250,187,20,0.08),transparent_28%),linear-gradient(180deg,rgba(255,255,255,1),rgba(248,249,247,1))]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 72px,
              currentColor 72px,
              currentColor 73px
            )`,
          }}
        />
        <div className="absolute left-[-8%] top-[12%] h-[360px] w-[360px] rounded-full bg-primary/10 blur-[110px]" />
        <div className="absolute bottom-[8%] right-[-6%] h-[420px] w-[420px] rounded-full bg-brand-yellow/10 blur-[120px]" />
      </div>

      <nav className="relative z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <Image
              src="/assets/icons/logohead.png"
              alt="Prym Logo"
              width={34}
              height={34}
              className="h-8 w-8 flex-shrink-0"
            />
            <span className="text-xl font-bold tracking-tight">
              PrymAgent<span className="text-primary">.</span>
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-border/70 bg-background/75 px-3 py-1.5">
            <BrainCircuit className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold tracking-wide text-muted-foreground">
              AI Finance Infrastructure on WhatsApp
            </span>
          </div>
        </div>
      </nav>

      <section className="relative z-10 pt-10 lg:pt-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="space-y-8 lg:space-y-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.05] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                <Smartphone className="h-3.5 w-3.5" />
                WhatsApp-native Pocket CFO
              </div>

              <div className="space-y-5">
                <h1 className="max-w-4xl text-5xl font-black leading-[0.92] tracking-tight sm:text-6xl lg:text-7xl">
                  Business finance workflows,
                  <br />
                  <span className="bg-gradient-to-r from-primary via-primary to-brand-yellow/90 bg-clip-text text-transparent">
                    powered by real AI systems
                  </span>
                </h1>

                <div className="h-1 w-28 rounded-full bg-gradient-to-r from-primary to-brand-yellow" />

                <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                  PrymAgent is more than a chatbot on WhatsApp. It is a structured AI operations layer for
                  small businesses: interpreting intent, validating finance workflows, and turning plain
                  language into invoices, receipts, transaction records, and actionable business outputs.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-border/60 bg-background/80 p-4 shadow-sm">
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    Guardrailed Execution
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    The AI interprets what the user wants, but deterministic backend rules decide what
                    actually gets created and sent.
                  </p>
                </div>

                <div className="rounded-2xl border border-border/60 bg-background/80 p-4 shadow-sm">
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Sparkles className="h-4 w-4 text-brand-yellow" />
                    Natural Language In, Structured Output Out
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Requests arrive as conversation, but the system turns them into business-ready records
                    and documents.
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2.5 rounded-xl bg-primary px-7 py-4 text-base font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 active:translate-y-0"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Talk to PrymAgent</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>

                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    No app install required
                  </span>
                  <span className="flex items-center gap-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-brand-yellow" />
                    10 free credits for new users
                  </span>
                </div>
              </div>
            </div>

            <div className="relative lg:pl-6">
              <div className="absolute -left-4 -top-6 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute -bottom-8 -right-6 h-40 w-40 rounded-full bg-brand-yellow/10 blur-3xl" />

              <div className="relative rounded-[28px] border border-border/60 bg-background/85 p-3 shadow-2xl backdrop-blur-sm">
                <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-primary/10 via-transparent to-brand-yellow/10 pointer-events-none" />
                <div className="relative aspect-[9/16] overflow-hidden rounded-[22px] bg-muted/20">
                  <iframe
                    src="https://www.youtube.com/embed/IjBJ_sn0bCQ"
                    title="PrymAgent Demo"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
                <div className="relative px-3 pb-2 pt-4">
                  <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Live Demo
                  </p>
                  <p className="mt-2 text-center text-sm leading-relaxed text-muted-foreground">
                    See how a conversational request becomes a structured business action without leaving
                    WhatsApp.
                  </p>
                </div>
              </div>

              <div className="absolute -left-10 bottom-10 hidden w-52 rounded-2xl border border-border/60 bg-background/90 p-4 shadow-xl backdrop-blur-md lg:block">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  AI Layer
                </p>
                <p className="mt-2 text-2xl font-black text-foreground">Intent-first</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Built to classify, extract, validate, and execute finance workflows with structure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-18 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-10 max-w-3xl space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              What It Actually Does
            </p>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              Built for serious day-to-day business operations, not just pretty AI demos
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              PrymAgent is designed to sit in the flow of how founders and operators already work, while
              introducing structure, memory, and reliable output behind the scenes.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {featureCards.map((card) => (
              <div
                key={card.title}
                className="rounded-3xl border border-border/70 bg-background/85 p-6 shadow-sm backdrop-blur-sm transition-transform hover:-translate-y-1"
              >
                <div className="mb-5 inline-flex rounded-2xl bg-primary/10 p-3 text-primary">
                  <card.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-foreground">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {card.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-18 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="rounded-[30px] border border-border/70 bg-foreground/[0.03] p-7 shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Technical Strength
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              The AI feels simple on the surface because the system underneath is not
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              PrymAgent is intentionally engineered to combine conversational ease with structured backend
              behavior. That means the product can stay friendly in chat while remaining disciplined in how
              it handles business actions.
            </p>

            <div className="mt-8 space-y-4">
              {technicalSignals.map((signal) => (
                <div
                  key={signal}
                  className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background/80 px-4 py-3"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  <p className="text-sm leading-relaxed text-foreground/85">{signal}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[30px] border border-border/70 bg-background/90 p-7 shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Workflow
            </p>
            <div className="mt-6 space-y-5">
              {workflowSteps.map((step, index) => (
                <div key={step.title} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-black text-primary-foreground">
                      {index + 1}
                    </div>
                    {index < workflowSteps.length - 1 && (
                      <div className="mt-2 h-full w-px bg-gradient-to-b from-primary/50 to-transparent" />
                    )}
                  </div>
                  <div className="pb-6">
                    <h3 className="text-lg font-bold tracking-tight text-foreground">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-[32px] border border-border/70 bg-gradient-to-br from-primary to-primary/90 p-8 text-primary-foreground shadow-2xl shadow-primary/15 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary-foreground/75">
                  Start Running It
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                  Move finance operations from scattered chats into a system that actually executes
                </h2>
                <p className="mt-4 text-base leading-relaxed text-primary-foreground/85 sm:text-lg">
                  If your business already runs on WhatsApp, PrymAgent meets you where the work is already
                  happening and adds intelligence, memory, and execution where it matters.
                </p>
              </div>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-white px-7 py-4 text-base font-bold text-primary shadow-lg transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Open WhatsApp</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-50 border-t border-border/60 bg-background/85 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <div className="flex flex-col gap-3 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              PrymAgent
            </p>
            <p className="text-sm text-muted-foreground">
              A product of Prym Technologies Limited.
            </p>
            <p className="text-xs text-muted-foreground/80">
              © {new Date().getFullYear()} PrymAgent. Built for modern African business operators.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
