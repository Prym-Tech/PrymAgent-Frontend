"use client"

import { useState } from "react"
import Image from "next/image"
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  CircleDollarSign,
  ClipboardList,
  FileText,
  Landmark,
  MessageCircle,
  Palette,
  Play,
  Receipt,
  Smartphone,
  WalletCards,
  X,
} from "lucide-react"

const WHATSAPP_NUMBER = "2349032879124"
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi!%20I%27d%20like%20to%20get%20started%20with%20PrymAgent`
const DEMO_VIDEO_URL = "https://www.youtube.com/embed/IjBJ_sn0bCQ?autoplay=1"

const painPoints = [
  "Forgetting expenses",
  "Unprofessional invoices",
  "Unclear profit and cash flow",
  "Tax confusion",
  "Scattered payment records",
  "Weak funding records",
]

const heroSignals = [
  "Invoices",
  "Receipts",
  "Transactions",
  "Payment tracking",
  "Tax guidance",
]

const capabilities = [
  {
    icon: FileText,
    title: "Generate professional invoices",
    copy:
      "Create branded PDF invoices with customer details, line items, bank details, logo, brand color, and Paystack payment links when requested.",
    accent: "bg-[#f0f3eb]",
  },
  {
    icon: Receipt,
    title: "Generate payment receipts",
    copy:
      "Send clean receipts after money has been received, including customer name, receipt number, payment details, amount, and your business branding.",
    accent: "bg-[#f6eef5]",
  },
  {
    icon: WalletCards,
    title: "Track payment links",
    copy:
      "Know which invoices are paid, unpaid, or still pending so delayed customer payments do not quietly disappear.",
    accent: "bg-[#e9f1f2]",
  },
  {
    icon: ClipboardList,
    title: "Log income and expenses",
    copy:
      "Type naturally, like received 250k from client project or spent 40k on logistics, and PrymAgent records it for you.",
    accent: "bg-[#f4f0e8]",
  },
  {
    icon: BarChart3,
    title: "Understand your finances",
    copy:
      "Get simple summaries for income, expenses, cash flow, monthly performance, and downloadable CSV records.",
    accent: "bg-[#edf3ea]",
  },
  {
    icon: Landmark,
    title: "Get Nigerian business guidance",
    copy:
      "Ask simple questions about VAT, WHT, PAYE, CAC, FIRS, loan readiness, and funding opportunities without dense accounting language.",
    accent: "bg-[#f3ece8]",
  },
]

const audiences = [
  "Freelancers",
  "Creators",
  "Startup founders",
  "Online vendors",
  "Agencies",
  "Consultants",
]

const workflow = [
  "Tell PrymAgent what happened in plain English.",
  "It understands the intent and asks only for missing details.",
  "The backend validates the data and creates the right business record.",
  "You receive a usable invoice, receipt, report, or update inside WhatsApp.",
]

const pricingActions = [
  "Generating an invoice",
  "Generating a receipt",
  "Logging a transaction",
  "Creating reports",
  "Running financial checks",
]

export default function Home() {
  const [isDemoOpen, setIsDemoOpen] = useState(false)

  return (
    <main className="min-h-screen bg-[#f8f8f8] text-[#090c13]">
      <section className="mx-auto max-w-[1500px] px-3 py-3 sm:px-5 sm:py-5">
        <div className="relative overflow-hidden rounded-[34px] bg-[#1b0015] text-white sm:rounded-[46px]">
          <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <a href="#top" className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-[#090c13]">
              <Image
                src="/assets/icons/logohead.png"
                alt="PrymAgent logo"
                width={34}
                height={34}
                className="h-8 w-8"
                priority
              />
              <span className="text-lg font-black">PrymAgent</span>
            </a>

            <nav className="hidden items-center gap-2 rounded-full bg-white px-2 py-2 text-sm font-semibold text-[#090c13] shadow-sm lg:flex">
              <a href="#features" className="rounded-full px-4 py-2 hover:bg-[#f0f3eb]">
                Features
              </a>
              <a href="#how" className="rounded-full px-4 py-2 hover:bg-[#f0f3eb]">
                How it works
              </a>
              <a href="#pricing" className="rounded-full px-4 py-2 hover:bg-[#f0f3eb]">
                Pricing
              </a>
            </nav>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full bg-[#b9ff66] px-5 py-3 text-sm font-black text-[#090c13] transition hover:bg-white sm:inline-flex"
            >
              Start free
            </a>
          </header>

          <div id="top" className="relative z-10 mx-auto max-w-7xl px-5 pb-10 pt-12 sm:px-8 sm:pb-16 sm:pt-16 lg:pb-20">
            <div className="mx-auto max-w-5xl text-center">
              <div className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/85">
                <Smartphone className="h-4 w-4 text-[#b9ff66]" />
                Business finance, handled from WhatsApp
              </div>

              <h1 className="text-[clamp(3.7rem,11vw,11rem)] font-black leading-[0.82] text-white">
                Your AI Pocket CFO for Nigerian Businesses
              </h1>

              <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-white/78 sm:text-xl">
                PrymAgent helps freelancers, creators, startups, vendors, agencies, and small business owners
                create invoices, generate receipts, log transactions, track payments, understand taxes, and stay organized.
              </p>

              <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 rounded-[28px] bg-white p-2 shadow-2xl shadow-black/30 sm:flex-row">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-[22px] bg-[#090c13] px-6 py-4 text-base font-black text-white transition hover:bg-[#2b2f37]"
                >
                  Talk to PrymAgent
                  <ArrowRight className="h-5 w-5" />
                </a>
                <button
                  type="button"
                  onClick={() => setIsDemoOpen(true)}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-[22px] bg-[#b9ff66] px-6 py-4 text-base font-black text-[#090c13] transition hover:bg-[#d5ff99]"
                >
                  <Play className="h-5 w-5 fill-current" />
                  Watch demo
                </button>
              </div>
            </div>

            <div className="mt-12 grid gap-4 lg:grid-cols-[0.85fr_1.3fr_0.85fr] lg:items-end">
              <div className="rounded-[30px] bg-white/10 p-5 ring-1 ring-white/10">
                <p className="text-sm font-semibold text-white/60">Natural message</p>
                <p className="mt-3 rounded-[22px] bg-white p-4 text-xl font-black leading-snug text-[#090c13]">
                  Create an invoice for Ada Ventures, website design, 450k.
                </p>
                <p className="mt-4 text-sm leading-6 text-white/68">
                  PrymAgent extracts the intent, asks for missing details, and generates the document.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-[34px] bg-[#f8f8f8] p-4 text-[#090c13] shadow-2xl shadow-black/35">
                <div className="rounded-[26px] bg-white p-5">
                  <div className="flex items-center justify-between gap-4 border-b border-[#ececec] pb-5">
                    <div>
                      <p className="text-sm font-bold text-[#7b7f88]">Today in PrymAgent</p>
                      <h2 className="mt-1 text-3xl font-black">Business is organized.</h2>
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1b0015] text-white">
                      <CircleDollarSign className="h-7 w-7" />
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {heroSignals.map((signal, index) => (
                      <div
                        key={signal}
                        className={`rounded-[22px] p-4 ${
                          index === 0
                            ? "bg-[#b9ff66]"
                            : index === 1
                              ? "bg-[#f6eef5]"
                              : index === 2
                                ? "bg-[#e9f1f2]"
                                : "bg-[#f4f0e8]"
                        }`}
                      >
                        <CheckCircle2 className="mb-5 h-5 w-5" />
                        <p className="text-lg font-black">{signal}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-[30px] bg-white p-5 text-[#090c13]">
                <div className="flex -space-x-4">
                  {audiences.slice(0, 5).map((audience, index) => (
                    <div
                      key={audience}
                      className={`flex h-14 w-14 items-center justify-center rounded-full border-4 border-white text-sm font-black ${
                        index === 0
                          ? "bg-[#b9ff66]"
                          : index === 1
                            ? "bg-[#f6eef5]"
                            : index === 2
                              ? "bg-[#e9f1f2]"
                              : index === 3
                                ? "bg-[#f4f0e8]"
                                : "bg-[#1b0015] text-white"
                      }`}
                    >
                      {audience.charAt(0)}
                    </div>
                  ))}
                </div>
                <h2 className="mt-6 text-3xl font-black leading-none">Built for Nigerian operators.</h2>
                <p className="mt-4 text-sm leading-6 text-[#5f636d]">
                  Freelancers, founders, side hustlers, agencies, vendors, and consultants can run cleaner records without accounting stress.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-base font-black text-[#557a2d]">Finally, business finance made simple</p>
            <h2 className="mt-4 max-w-3xl text-[clamp(2.8rem,7vw,6rem)] font-black leading-[0.88]">
              No spreadsheets. No accounting panic.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#5f636d]">
              Most Nigerian SMEs are not short on effort. They are short on clean records, fast documents, and simple financial visibility.
            </p>
          </div>

          <div className="rounded-[34px] bg-[#f0f3eb] p-5 sm:p-7">
            <div className="grid gap-3 sm:grid-cols-2">
              {painPoints.map((point) => (
                <div key={point} className="rounded-[22px] bg-white px-5 py-4 text-lg font-black">
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-[1500px] px-3 py-3 sm:px-5">
        <div className="rounded-[38px] bg-white px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
              <div>
                <p className="text-base font-black text-[#557a2d]">What you can do</p>
                <h2 className="mt-4 max-w-3xl text-[clamp(2.8rem,7vw,6rem)] font-black leading-[0.88]">
                  One chat. Many business actions.
                </h2>
              </div>
              <p className="max-w-lg text-lg leading-8 text-[#5f636d]">
                PrymAgent keeps the interface simple while the backend handles validation, records, documents, and payment status.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {capabilities.map((item) => (
                <article key={item.title} className={`${item.accent} rounded-[30px] p-5 sm:p-6`}>
                  <div className="mb-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#090c13] text-white">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-3xl font-black leading-none">{item.title}</h3>
                  <p className="mt-5 text-base leading-7 text-[#4f545d]">{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="how" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-stretch">
          <div className="rounded-[36px] bg-[#1b0015] p-6 text-white sm:p-8 lg:p-10">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#b9ff66] text-[#090c13]">
              <MessageCircle className="h-8 w-8" />
            </div>
            <h2 className="mt-10 max-w-3xl text-[clamp(2.6rem,6vw,5.8rem)] font-black leading-[0.9]">
              Just chat naturally.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/72">
              PrymAgent listens for the business intent, collects only what is missing, and turns the conversation into structured finance work.
            </p>
            <div className="mt-10 rounded-[28px] bg-white p-4 text-[#090c13]">
              <p className="rounded-[22px] bg-[#f0f3eb] p-5 text-2xl font-black leading-tight">
                Spent 40k on logistics yesterday.
              </p>
              <p className="mt-3 rounded-[22px] bg-[#f6eef5] p-5 text-2xl font-black leading-tight">
                Generate a receipt for Tunde, cash, 75k today.
              </p>
            </div>
          </div>

          <div className="rounded-[36px] bg-[#e9f1f2] p-6 sm:p-8 lg:p-10">
            <p className="text-base font-black text-[#557a2d]">How it works</p>
            <div className="mt-8 space-y-4">
              {workflow.map((step, index) => (
                <div key={step} className="flex gap-4 rounded-[24px] bg-white p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#090c13] text-sm font-black text-white">
                    {index + 1}
                  </div>
                  <p className="text-lg font-black leading-7">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-3 py-3 sm:px-5">
        <div className="rounded-[38px] bg-[#f6eef5] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-base font-black text-[#7a3c69]">Professional by default</p>
              <h2 className="mt-4 text-[clamp(2.8rem,7vw,6rem)] font-black leading-[0.88]">
                Your brand belongs on every document.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#5f636d]">
                Add your logo and brand color so invoices and receipts feel like they came from a real, organized business.
              </p>
            </div>

            <div className="rounded-[34px] bg-white p-5 shadow-xl shadow-[#1b0015]/10 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#ededed] pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1b0015] text-white">
                    <Building2 className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#7b7f88]">Branded document</p>
                    <h3 className="text-2xl font-black">Invoice or receipt</h3>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-[#f0f3eb] px-4 py-2 text-sm font-black">
                  <Palette className="h-4 w-4" />
                  Brand color
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[24px] bg-[#f8f8f8] p-5 sm:col-span-2">
                  <p className="text-sm font-bold text-[#7b7f88]">Customer</p>
                  <p className="mt-2 text-3xl font-black">Ada Ventures</p>
                  <div className="mt-8 space-y-3">
                    <div className="h-4 rounded-full bg-[#d9dde1]" />
                    <div className="h-4 w-4/5 rounded-full bg-[#d9dde1]" />
                    <div className="h-4 w-3/5 rounded-full bg-[#d9dde1]" />
                  </div>
                </div>
                <div className="rounded-[24px] bg-[#b9ff66] p-5">
                  <p className="text-sm font-bold">Total paid</p>
                  <p className="mt-4 text-3xl font-black">NGN 450k</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-base font-black text-[#557a2d]">Simple pricing</p>
            <h2 className="mt-4 text-[clamp(2.8rem,7vw,6rem)] font-black leading-[0.88]">
              Pay for actions, not complexity.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#5f636d]">
              One credit powers one useful business action. It is flexible enough for small teams and simple enough for solo operators.
            </p>
          </div>

          <div className="rounded-[36px] bg-[#1b0015] p-6 text-white sm:p-8">
            <div className="rounded-[30px] bg-white p-6 text-[#090c13]">
              <p className="text-base font-black text-[#557a2d]">NGN 10 per credit</p>
              <h3 className="mt-4 text-6xl font-black leading-none">1 action = 1 credit</h3>
              <div className="mt-8 grid gap-3">
                {pricingActions.map((action) => (
                  <div key={action} className="flex items-center gap-3 rounded-[18px] bg-[#f8f8f8] px-4 py-3">
                    <CheckCircle2 className="h-5 w-5 text-[#557a2d]" />
                    <span className="font-bold">{action}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-3 pb-3 sm:px-5 sm:pb-5">
        <div className="rounded-[38px] bg-[#090c13] px-5 py-16 text-center text-white sm:px-8 lg:py-24">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-[clamp(3rem,8vw,7rem)] font-black leading-[0.86]">
              Start running your business smarter.
            </h2>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-white/72">
              Track money, generate invoices, send receipts, follow payments, and understand your numbers from your pocket.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#b9ff66] px-7 py-4 text-base font-black text-[#090c13] transition hover:bg-white"
              >
                Start on WhatsApp
                <ArrowRight className="h-5 w-5" />
              </a>
              <button
                type="button"
                onClick={() => setIsDemoOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-4 text-base font-black text-white transition hover:bg-white hover:text-[#090c13]"
              >
                <Play className="h-5 w-5 fill-current" />
                Watch demo
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="px-5 py-8 text-center sm:px-8">
        <p className="text-sm font-black">PrymAgent</p>
        <p className="mt-2 text-sm text-[#5f636d]">A product of Prym Technologies Limited.</p>
        <p className="mt-2 text-xs text-[#7b7f88]">
          Copyright {new Date().getFullYear()} PrymAgent. Built for Nigerian entrepreneurs.
        </p>
      </footer>

      {isDemoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#090c13]/85 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="PrymAgent demo video"
          onClick={() => setIsDemoOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-[30px] bg-[#090c13] p-3 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsDemoOpen(false)}
              className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#090c13] shadow-lg transition hover:bg-[#b9ff66]"
              aria-label="Close demo video"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="aspect-video overflow-hidden rounded-[24px] bg-black">
              <iframe
                src={DEMO_VIDEO_URL}
                title="PrymAgent demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
