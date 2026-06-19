"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import {
  ArrowLeft,
  Banknote,
  BarChart3,
  CheckCircle2,
  ClipboardList,
  FileText,
  LayoutDashboard,
  MessageCircle,
  Palette,
  Receipt,
  Search,
  UserRound,
  WalletCards,
} from "lucide-react"

const WHATSAPP_NUMBER = "2349032879124"
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi!%20I%20need%20help%20using%20PrymAgent`

type GuideSection = {
  id: string
  label: string
  eyebrow: string
  title: string
  summary: string
  icon: typeof MessageCircle
  color: string
  examples: {
    title: string
    user: string
    agent: string
    tip?: string
  }[]
}

const guideSections: GuideSection[] = [
  {
    id: "start",
    label: "Getting started",
    eyebrow: "First setup",
    title: "Start with your business identity.",
    summary:
      "Tell PrymAgent your business name, contact details, bank details, logo, brand color, and preferred payment method. These details can be reused on quotes, invoices, receipts, and payment pages.",
    icon: Palette,
    color: "bg-[#f4f0e8]",
    examples: [
      {
        title: "Set your business name",
        user: "My business name is Israel Creative Studio.",
        agent: "I will update your business profile and show you the draft before saving it.",
      },
      {
        title: "Add bank details",
        user: "Update my bank details: Opay, 9030332656, account name Israel Temitope Philips.",
        agent: "PrymAgent checks the bank details, confirms the verified account name, and saves them after confirmation.",
      },
      {
        title: "Add branding",
        user: "I want to upload my logo.",
        agent: "PrymAgent asks you to send the logo image, then uses it on future quotes, invoices, receipts, and payment pages.",
      },
      {
        title: "Set brand color",
        user: "Use navy blue as my brand color.",
        agent: "PrymAgent saves the color and applies it to your documents.",
      },
      {
        title: "Set payment preference",
        user: "Use bank transfer by default for my invoices.",
        agent: "PrymAgent updates your preferred payment method. You can still request payment links when needed.",
      },
    ],
  },
  {
    id: "quotes",
    label: "Quotes",
    eyebrow: "Before payment",
    title: "Create professional quotes before a client commits.",
    summary:
      "Use quotes for estimates, proforma invoices, packages, deposits, retainers, and project pricing. PrymAgent asks for missing details before generating the PDF.",
    icon: ClipboardList,
    color: "bg-[#e9f1f2]",
    examples: [
      {
        title: "Simple quote",
        user: "Create a quote for Ada Ventures for logo design, NGN75,000, valid for 14 days.",
        agent: "PrymAgent drafts the quote with client name, service, amount, and validity date for you to confirm.",
      },
      {
        title: "Quote with milestones",
        user: "Create a quote for website design: NGN250,000, 60% upfront and 40% after delivery.",
        agent: "PrymAgent separates the contract total, upfront amount, and balance due later.",
      },
      {
        title: "Correct a quote draft",
        user: "Change the validity to 30 days and make hosting setup NGN45,000.",
        agent: "PrymAgent updates the draft, recalculates totals, and asks you to confirm again.",
      },
      {
        title: "Convert quote to invoice",
        user: "Convert quote Q-0009 to an invoice.",
        agent: "PrymAgent carries over the client, items, terms, and asks only for missing invoice-specific details.",
      },
    ],
  },
  {
    id: "invoices",
    label: "Invoices",
    eyebrow: "Request payment",
    title: "Generate branded invoices with the right payment method.",
    summary:
      "Create invoices directly or from quotes. Choose bank transfer, payment link, both, or no payment method. If the invoice is for a deposit, PrymAgent should show amount due now and balance later.",
    icon: FileText,
    color: "bg-[#f6eef5]",
    examples: [
      {
        title: "Direct invoice",
        user: "Create an invoice for Ada Ventures, branding project, NGN450,000, due next Friday, using bank details.",
        agent: "PrymAgent drafts the invoice, calculates totals, shows payment method, and asks for confirmation before the PDF is created.",
      },
      {
        title: "Invoice with payment link",
        user: "Create an invoice for Mrs Ogunala using a payment link, no tax.",
        agent: "PrymAgent checks that payment-link setup is ready before creating a link. If anything is missing, it tells you what to fix.",
      },
      {
        title: "Deposit invoice",
        user: "Invoice Kemi for NGN500,000, 50% deposit and 50% on completion.",
        agent: "PrymAgent confirms whether to request the full amount, the deposit amount, or a custom milestone amount.",
      },
      {
        title: "Correct item quantity",
        user: "Update DC MCCB breaker quantity to 3.",
        agent: "PrymAgent updates the item, recalculates the invoice, and shows a fresh confirmation draft.",
      },
      {
        title: "Change payment method",
        user: "Make the payment method bank transfer or payment link.",
        agent: "PrymAgent updates the payment method label and only generates a link if your setup is verified.",
      },
    ],
  },
  {
    id: "payments",
    label: "Payments",
    eyebrow: "Track status",
    title: "Mark invoices paid, part-paid, overdue, or cancelled.",
    summary:
      "PrymAgent keeps payment events as records, so each part-payment can be tracked and receipted without confusing it with the full invoice total.",
    icon: Banknote,
    color: "bg-[#eef4d8]",
    examples: [
      {
        title: "Mark fully paid",
        user: "Mark invoice INV-002 as paid by transfer today.",
        agent: "PrymAgent shows the outstanding balance, payment method, and expected new status before saving.",
      },
      {
        title: "Record part-payment",
        user: "Kemi paid NGN100,000 out of invoice INV-004 by POS.",
        agent: "PrymAgent records NGN100,000 as a payment event, updates the balance, and can generate a receipt for that exact payment.",
      },
      {
        title: "Final balance payment",
        user: "Kemi paid the remaining balance for INV-004 today.",
        agent: "PrymAgent calculates the outstanding balance and confirms before marking the invoice paid.",
      },
      {
        title: "List unpaid invoices",
        user: "Show my unpaid invoices.",
        agent: "PrymAgent lists unpaid, part-paid, and overdue invoices with amounts and balances.",
      },
      {
        title: "Overdue invoice",
        user: "Mark INV-010 as overdue.",
        agent: "PrymAgent updates the status after confirmation without charging document credits.",
      },
    ],
  },
  {
    id: "receipts",
    label: "Receipts",
    eyebrow: "Proof of payment",
    title: "Issue receipts for direct payments or exact invoice payments.",
    summary:
      "Receipts can be standalone or linked to an invoice payment. For part-payments, the receipt should represent one exact payment, not the whole invoice.",
    icon: Receipt,
    color: "bg-[#fff3d8]",
    examples: [
      {
        title: "Direct receipt",
        user: "Create a receipt for Ada Ventures for logo design, NGN75,000, paid by transfer today.",
        agent: "PrymAgent drafts a standalone receipt with customer, amount, date, method, and item summary.",
      },
      {
        title: "Receipt from paid invoice",
        user: "Generate a receipt for invoice INV-002.",
        agent: "PrymAgent checks the invoice payment status, links the receipt, and asks you to confirm before generating the PDF.",
      },
      {
        title: "Receipt for part-payment",
        user: "Create a receipt for the latest payment on INV-004.",
        agent: "PrymAgent selects the latest unreceipted payment or asks which payment to use if there is more than one.",
      },
      {
        title: "Correct receipt date",
        user: "Set receipt date to 17 July 2026.",
        agent: "PrymAgent updates the draft date and asks you to confirm again.",
      },
      {
        title: "Add reference",
        user: "Add reference TRF-94820.",
        agent: "PrymAgent adds the payment reference to the receipt draft.",
      },
    ],
  },
  {
    id: "clients",
    label: "Clients",
    eyebrow: "Records",
    title: "Keep client details and billing history clean.",
    summary:
      "Save client contacts and ask for their billing history. PrymAgent can show quotes, invoices, receipts, payments, total paid, and outstanding balance.",
    icon: UserRound,
    color: "bg-[#eef3ea]",
    examples: [
      {
        title: "Add a client",
        user: "Add client Ada Ventures, ada@example.com, 08031234567, 14 Admiralty Way, notes: prefers email copies.",
        agent: "PrymAgent shows a draft with name, email, phone, address, and notes before saving.",
      },
      {
        title: "Update a client",
        user: "Update Ada Ventures address to 22 Marina Road.",
        agent: "PrymAgent finds the client, merges the new address with existing details, and asks you to confirm.",
      },
      {
        title: "Avoid duplicates",
        user: "Add Ada Venture.",
        agent: "If PrymAgent finds a close match like Ada Ventures, it asks whether to update the existing client or create a new one.",
      },
      {
        title: "Client history",
        user: "Show Ada Ventures history.",
        agent: "PrymAgent returns recent quotes, invoices, payments, receipts, total paid, and outstanding balance.",
      },
    ],
  },
  {
    id: "summaries",
    label: "Summaries",
    eyebrow: "Quick answers",
    title: "Ask for simple earnings and payment summaries.",
    summary:
      "Use plain questions to understand money received, outstanding balances, overdue invoices, recent billing activity, and client-specific totals.",
    icon: BarChart3,
    color: "bg-[#e9edf8]",
    examples: [
      {
        title: "Monthly earnings",
        user: "How much have I made this month?",
        agent: "PrymAgent summarizes confirmed payments for the month and shows outstanding amounts separately.",
      },
      {
        title: "Client payments",
        user: "How much did Kemi pay me this year?",
        agent: "PrymAgent checks Kemi's confirmed payment records and returns the total.",
      },
      {
        title: "Outstanding balance",
        user: "Who still owes me?",
        agent: "PrymAgent lists clients and invoices with unpaid or part-paid balances.",
      },
      {
        title: "Recent activity",
        user: "Show my recent billing activity.",
        agent: "PrymAgent summarizes recent quotes, invoices, payments, and receipts.",
      },
      {
        title: "Export report",
        user: "Export my annual report.",
        agent: "PrymAgent shows a confirmation draft and credit charge before generating the file.",
      },
    ],
  },
  {
    id: "dashboard",
    label: "Dashboard",
    eyebrow: "Web view",
    title: "Use the dashboard for visibility, downloads, and profile edits.",
    summary:
      "WhatsApp remains the main creation flow. The dashboard gives you a clear place to review documents, download PDFs, manage clients, update profile details, check credits, and view Pro status.",
    icon: LayoutDashboard,
    color: "bg-[#f0f3eb]",
    examples: [
      {
        title: "Open dashboard",
        user: "I want to log in to my dashboard.",
        agent: "PrymAgent sends a secure login flow through WhatsApp. After verification, you can open the dashboard.",
      },
      {
        title: "Download documents",
        user: "Where can I download my invoice?",
        agent: "Open the dashboard, go to Documents, then use Download on the quote, invoice, or receipt.",
      },
      {
        title: "Check credits",
        user: "How many credits do I have?",
        agent: "PrymAgent can answer in chat, and the dashboard Billing page also shows your balance and bundles.",
      },
      {
        title: "Buy credits",
        user: "I want to buy credits.",
        agent: "PrymAgent shows the current admin-configured bundles and starts checkout only after you choose one.",
      },
    ],
  },
  {
    id: "fixes",
    label: "Corrections",
    eyebrow: "Before approval",
    title: "Correct drafts before anything is generated.",
    summary:
      "PrymAgent should not create PDFs, charge credits, or change major records until you approve the confirmation draft. You can correct details, confirm, or cancel.",
    icon: CheckCircle2,
    color: "bg-[#f7faf0]",
    examples: [
      {
        title: "Approve a draft",
        user: "Confirm.",
        agent: "PrymAgent creates the PDF or saves the update exactly from the confirmed draft.",
      },
      {
        title: "Cancel a draft",
        user: "Cancel.",
        agent: "PrymAgent clears the pending draft and does not generate anything.",
      },
      {
        title: "Change amount",
        user: "Change workmanship to NGN150,000.",
        agent: "PrymAgent updates the matching item, recalculates totals, and asks for confirmation again.",
      },
      {
        title: "Change date",
        user: "Set due date to Friday.",
        agent: "PrymAgent parses the date, updates the draft, and shows the new due date.",
      },
      {
        title: "Change client",
        user: "This is for Ada Ventures, not Ada Rendezvous.",
        agent: "PrymAgent updates the client field and regenerates the confirmation draft.",
      },
    ],
  },
]

const quickTips = [
  "Be specific with the client name, item, amount, date, and payment method when you can.",
  "If PrymAgent asks for confirmation, review the draft before replying confirm.",
  "Send corrections naturally, but include the field and new value clearly.",
  "Use invoice numbers, quote numbers, or receipt numbers when referring to old records.",
  "Payment links require verified bank/payment setup. Bank transfer can still be used without a link.",
]

function ChatExample({ example }: { example: GuideSection["examples"][number] }) {
  return (
    <article className="rounded-[28px] border border-[#dfe7da] bg-white p-4 shadow-sm sm:p-5">
      <h3 className="text-lg font-black text-[#101820]">{example.title}</h3>
      <div className="mt-4 space-y-3">
        <div className="flex justify-end">
          <div className="max-w-[92%] rounded-[22px] rounded-br-md bg-[#dcf8c6] px-4 py-3 text-sm font-bold leading-6 text-[#101820]">
            {example.user}
          </div>
        </div>
        <div className="flex justify-start">
          <div className="max-w-[92%] rounded-[22px] rounded-bl-md bg-[#f4f7ef] px-4 py-3 text-sm font-bold leading-6 text-[#101820]">
            {example.agent}
          </div>
        </div>
      </div>
      {example.tip && <p className="mt-4 text-sm font-semibold leading-6 text-[#68706a]">{example.tip}</p>}
    </article>
  )
}

export default function HowToPage() {
  const [activeId, setActiveId] = useState(guideSections[0].id)
  const activeSection = useMemo(
    () => guideSections.find((section) => section.id === activeId) || guideSections[0],
    [activeId],
  )
  const Icon = activeSection.icon

  return (
    <main className="min-h-screen bg-[#f7faf0] text-[#101820]">
      <section className="relative overflow-hidden bg-[#101820] px-4 py-6 text-white sm:px-8 lg:px-10">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 14% 10%, rgba(176,210,38,.75), transparent 18rem), radial-gradient(circle at 90% 25%, rgba(72,215,255,.28), transparent 24rem)",
          }}
        />
        <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4">
          <a href="/" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-3 text-sm font-black ring-1 ring-white/15 transition hover:bg-white/16">
            <ArrowLeft className="h-4 w-4" />
            Back home
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-[#b0d226] px-5 py-3 text-sm font-black text-[#101820] transition hover:bg-white sm:inline-flex"
          >
            Ask on WhatsApp
          </a>
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-10 pb-8 pt-14 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <div>
            <Image
              src="/assets/prymagent/logos/prymagent-lockup-reverse.png"
              alt="PrymAgent"
              width={220}
              height={62}
              className="mb-8 h-auto w-44 sm:w-56"
              priority
            />
            <p className="text-sm font-black uppercase tracking-[0.32em] text-[#b0d226]">How to use PrymAgent</p>
            <h1 className="mt-5 max-w-4xl text-[clamp(2.7rem,10vw,6rem)] font-black leading-[0.92]">
              Say it naturally. PrymAgent handles the billing workflow.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-7 text-white/76 sm:text-xl sm:leading-8">
              Use this page when you are unsure what to type. Pick a category, copy the pattern, and adapt it to your client, amount, or document.
            </p>
          </div>

          <div className="rounded-[34px] bg-white/10 p-3 ring-1 ring-white/12">
            <div className="rounded-[28px] bg-[#eef3ea] p-4 text-[#101820] sm:p-5">
              <div className="flex items-center gap-3 border-b border-[#d5dfd3] pb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#075e54] text-white">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-base font-black">Example interaction</p>
                  <p className="text-xs font-bold text-[#68706a]">WhatsApp-first, confirmation-led</p>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                <div className="ml-auto max-w-[88%] rounded-[22px] rounded-br-md bg-[#dcf8c6] px-4 py-3 text-sm font-bold leading-6">
                  Create an invoice for Ada Ventures, design work, NGN250,000, 50% deposit.
                </div>
                <div className="max-w-[88%] rounded-[22px] rounded-bl-md bg-white px-4 py-3 text-sm font-bold leading-6">
                  I will draft the invoice and separate contract total, amount due now, and balance due later before generating the PDF.
                </div>
                <div className="ml-auto max-w-[88%] rounded-[22px] rounded-br-md bg-[#dcf8c6] px-4 py-3 text-sm font-bold leading-6">
                  Confirm.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-8 lg:px-10">
        <div className="sticky top-4 z-20 -mx-1 overflow-x-auto rounded-[28px] bg-[#101820] p-2 shadow-2xl shadow-[#101820]/15">
          <div className="flex min-w-max gap-2">
            {guideSections.map((section) => {
              const TabIcon = section.icon
              const active = section.id === activeId
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveId(section.id)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-black transition ${
                    active ? "bg-[#b0d226] text-[#101820]" : "bg-white/8 text-white/78 hover:bg-white/14"
                  }`}
                >
                  <TabIcon className="h-4 w-4" />
                  {section.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <aside className={`${activeSection.color} rounded-[34px] p-6 sm:p-8 lg:sticky lg:top-28`}>
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#101820] text-white">
              <Icon className="h-7 w-7" />
            </div>
            <p className="mt-8 text-sm font-black uppercase tracking-[0.24em] text-[#60713d]">{activeSection.eyebrow}</p>
            <h2 className="mt-4 text-[clamp(2rem,7vw,4rem)] font-black leading-[0.95]">{activeSection.title}</h2>
            <p className="mt-5 text-base font-semibold leading-7 text-[#5f636d]">{activeSection.summary}</p>

            <div className="mt-8 rounded-[24px] bg-white/70 p-4">
              <div className="mb-3 flex items-center gap-2">
                <Search className="h-5 w-5" />
                <p className="font-black">Quick tips</p>
              </div>
              <ul className="space-y-3 text-sm font-bold leading-6 text-[#50575f]">
                {quickTips.map((tip) => (
                  <li key={tip} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#557a2d]" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="grid gap-4 md:grid-cols-2">
            {activeSection.examples.map((example) => (
              <ChatExample key={`${activeSection.id}-${example.title}`} example={example} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-8 lg:px-10">
        <div className="grid gap-4 rounded-[34px] bg-[#101820] p-5 text-white sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#b0d226]">Still unsure?</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">Ask PrymAgent exactly what you want to do.</h2>
            <p className="mt-3 max-w-2xl text-base font-semibold leading-7 text-white/70">
              You can start with: "Help me create an invoice", "How do I add my logo?", or "Show me my unpaid invoices."
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:flex">
            <a
              href="/login"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-base font-black text-[#101820]"
            >
              <LayoutDashboard className="h-5 w-5" />
              Open dashboard
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#b0d226] px-6 py-4 text-base font-black text-[#101820]"
            >
              <WalletCards className="h-5 w-5" />
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
