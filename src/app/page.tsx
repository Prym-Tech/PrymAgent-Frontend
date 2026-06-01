"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardList,
  FileText,
  Menu,
  MessageCircle,
  Play,
  Receipt,
  UsersRound,
  WalletCards,
  X,
} from "lucide-react"

const WHATSAPP_NUMBER = "2349032879124"
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi!%20I%27d%20like%20to%20get%20started%20with%20PrymAgent`
const TEAM_DEMO_URL = "mailto:hello@prymtech.xyz?subject=PrymAgent%20Flow%20demo"
const DEMO_VIDEO_URL = "https://www.youtube.com/embed/IjBJ_sn0bCQ?autoplay=1"

type Mode = "providers" | "teams"

const providerCanDo = [
  "Send professional quotes",
  "Generate branded invoices",
  "Add bank details or payment links",
  "Track who has paid",
  "Generate receipts",
  "Keep client records",
  "See simple earnings summaries",
]

const providerFeatures = [
  {
    icon: FileText,
    title: "Generate professional quotes",
    copy:
      "Create clean quotes or proforma invoices before a client pays. Useful for project pricing, service packages, retainers, deposits, and milestones.",
    example: "Create a quote for website design: ₦250,000, 60% upfront and 40% after delivery.",
    accent: "bg-[#f0f3eb]",
  },
  {
    icon: ClipboardList,
    title: "Generate branded invoices",
    copy:
      "Create PDF invoices with your business name, logo, brand color, client details, invoice number, service description, due date, bank details, and optional payment link.",
    accent: "bg-[#f6eef5]",
  },
  {
    icon: Receipt,
    title: "Generate payment receipts",
    copy:
      "Once a client pays, generate a receipt with client name, amount paid, payment date, payment method, invoice reference, and your branding.",
    accent: "bg-[#e9f1f2]",
  },
  {
    icon: WalletCards,
    title: "Track payment status",
    copy:
      "Mark invoices as unpaid, paid, part-paid, or overdue so you know who has paid and who still owes you.",
    accent: "bg-[#f4f0e8]",
  },
  {
    icon: UsersRound,
    title: "Keep client records",
    copy:
      "Check quotes sent, invoices issued, receipts generated, total paid, and outstanding balances for each client.",
    accent: "bg-[#edf3ea]",
  },
  {
    icon: BarChart3,
    title: "Ask earnings questions",
    copy:
      "Ask who still owes you, how much you made this month, unpaid invoices, or how much a specific client paid this year.",
    accent: "bg-[#f3ece8]",
  },
]

const providerSteps = [
  "Tell PrymAgent what you need on WhatsApp.",
  "PrymAgent asks only for missing details.",
  "Your quote, invoice, or receipt is generated.",
  "Share the PDF by WhatsApp, email, or download.",
  "Track the payment as paid, unpaid, part-paid, or overdue.",
]

const providerBundles = [
  ["10 credits", "₦1,500"],
  ["25 credits", "₦3,000"],
  ["60 credits", "₦6,000"],
]

const providerCreditUsage = [
  ["Generate branded quote", "2 credits"],
  ["Generate branded invoice", "3 credits"],
  ["Generate receipt", "1 credit"],
  ["Export annual PDF report", "5 credits"],
  ["Add or update client profile", "Free"],
  ["Mark invoice paid/unpaid", "Free"],
  ["View earnings summary", "Free"],
  ["Log payment status", "Free"],
]

const providerBestFor = [
  "freelancers",
  "consultants",
  "designers",
  "developers",
  "photographers",
  "writers",
  "tutors",
  "creators",
  "vendors",
  "agencies",
  "independent professionals",
]

const teamCapabilities = [
  "quotations",
  "invoices",
  "approvals",
  "payment status",
  "receipts",
  "client records",
  "vendor invoices",
  "recurring billing",
  "reports",
  "audit trails",
  "compliance-ready records",
]

const teamBenefits = [
  {
    title: "One shared billing source",
    copy:
      "Sales, finance, managers, and operations can work from the same client, invoice, receipt, and payment history instead of scattered chats.",
  },
  {
    title: "Approvals before documents go out",
    copy:
      "Teams can route quotes, invoices, discounts, and payment terms for review before clients receive final documents.",
  },
  {
    title: "Payment visibility for everyone",
    copy:
      "See what is pending, paid, overdue, or waiting for a receipt without asking three people for status updates.",
  },
  {
    title: "Cleaner records for reporting",
    copy:
      "Keep billing documents, client activity, vendor bills, and audit trails organized for management, tax, and finance reviews.",
  },
]

const workflowPacks = [
  {
    title: "Quote-to-Cash Pack",
    price: "₦30,000/month",
    copy: "For companies that start with quotes or proposals before billing.",
    flow: "Quote -> Approval -> Client accepts -> Invoice -> Payment tracking -> Receipt",
    bestFor: "agencies, consultants, construction firms, training companies, project-based businesses, professional service firms",
    items: [
      "branded quote generation",
      "quote validity/expiry",
      "client acceptance logging",
      "quote approval support",
      "quote-to-invoice conversion",
      "invoice generation",
      "payment tracking",
      "receipt linking",
    ],
    accent: "bg-[#e9f1f2]",
  },
  {
    title: "Invoice-to-Cash Pack",
    price: "₦25,000/month",
    copy: "For companies that issue invoices directly.",
    flow: "Invoice -> Send/approve -> Track payment -> Receipt",
    bestFor: "law firms, clinics, logistics companies, schools, B2B vendors, service companies",
    items: [
      "branded invoice generation",
      "invoice numbering",
      "VAT/WHT fields",
      "bank details/payment instructions",
      "invoice sending",
      "payment status tracking",
      "receipt linking",
    ],
    accent: "bg-[#f3ece8]",
  },
  {
    title: "Recurring Billing Pack",
    price: "₦20,000/month",
    copy: "For companies that bill clients on a schedule.",
    flow: "Set schedule -> Invoice generated -> Payment tracked -> Receipt",
    bestFor: "schools, clinics, retainers, property managers, subscription-like services, maintenance companies",
    items: [
      "recurring billing schedules",
      "auto-generation",
      "optional approval before sending",
      "outstanding balance tracking",
      "recurring billing history",
      "receipt linking",
    ],
    accent: "bg-[#f0f3eb]",
  },
  {
    title: "Vendor Payables Pack",
    price: "₦30,000/month",
    copy: "For companies that manage supplier or vendor invoices.",
    flow: "Vendor invoice received -> Extract -> Approve -> Track payment -> Report",
    bestFor: "construction, logistics, distribution, events, procurement-heavy companies",
    items: [
      "vendor invoice upload",
      "AI extraction from PDF/photo",
      "vendor approval routing",
      "vendor payment due dates",
      "payables tracking",
      "vendor history",
      "payables report",
    ],
    accent: "bg-[#f6eef5]",
  },
]

const addOns = [
  {
    title: "Advanced Approval",
    price: "₦15,000/month",
    items: ["up to 3 approval levels", "amount-based approval routing", "approve/reject with reason", "escalation rules", "approval logs"],
  },
  {
    title: "Advanced Reporting",
    price: "₦15,000/month",
    items: ["receivables aging", "revenue by client", "revenue by department", "revenue by staff", "quote conversion report", "CSV/PDF export"],
  },
  {
    title: "Payment Integration",
    price: "₦15,000/month",
    items: ["Paystack confirmation", "payment reference matching", "paid/unpaid sync", "payment webhook tracking"],
  },
  {
    title: "Compliance Readiness",
    price: "₦25,000/month",
    items: ["VAT/TIN enforcement", "structured invoice data", "tax invoice export", "audit-ready records", "e-invoicing readiness documentation"],
  },
]

const setupOptions = [
  ["Self-setup", "Free"],
  ["Basic assisted setup", "₦75,000"],
  ["Custom workflow setup", "₦200,000"],
  ["Enterprise implementation", "₦500,000+"],
]

const examplePackages = [
  ["Small Agency", "₦80,000/month", "Base Workspace + Quote-to-Cash + Advanced Approval + Advanced Reporting"],
  ["Law Firm", "₦100,000/month", "Base Workspace + Invoice-to-Cash + Advanced Approval + Advanced Reporting + Compliance Readiness"],
  ["Private School", "₦55,000/month", "Base Workspace + Recurring Billing + Advanced Reporting"],
  ["Construction Supplier", "₦135,000/month", "Base Workspace + Quote-to-Cash + Vendor Payables + Advanced Approval + Advanced Reporting + Compliance Readiness"],
]

const teamSteps = [
  "Tell us your current billing flow.",
  "PrymAgent recommends your setup.",
  "We configure templates, users, roles, and workflow.",
  "Your team starts creating, approving, tracking, and reporting from WhatsApp and web.",
]

const teamBestFor = [
  "agencies",
  "consulting firms",
  "law firms",
  "schools",
  "clinics",
  "logistics companies",
  "construction suppliers",
  "real estate firms",
  "training companies",
  "B2B service companies",
]

const faqs = [
  {
    question: "What is PrymAgent?",
    answer: [
      "PrymAgent is a billing and payment workflow assistant for service providers and business teams.",
      "It helps you create quotes, invoices, receipts, track payments, keep client records, and manage simple billing workflows from WhatsApp and web.",
    ],
  },
  {
    question: "Who is PrymAgent for?",
    answer: [
      "PrymAgent is built for service providers like freelancers, consultants, creatives, vendors, tutors, photographers, developers, and independent professionals.",
      "It is also built for teams and companies like agencies, schools, clinics, law firms, logistics companies, construction suppliers, real estate firms, and businesses that manage billing across multiple people.",
    ],
  },
  {
    question: "Is PrymAgent an accounting software?",
    answer: [
      "No. PrymAgent is not a full accounting system.",
      "It focuses on billing workflows: quotes, invoices, receipts, payment tracking, approvals, client records, vendor bills, and simple reports.",
    ],
  },
  {
    question: "Can I use PrymAgent on WhatsApp?",
    answer: [
      "Yes. PrymAgent is designed to work through WhatsApp for simple actions like creating quotes, generating invoices, checking payment status, and asking for summaries.",
      "For teams, some setup and records may also be managed through a simple web view.",
    ],
  },
  {
    question: "Can PrymAgent generate invoices, receipts, and quotations?",
    answer: [
      "Yes. PrymAgent can generate professional PDF invoices, branded receipts, and quotes or proforma invoices before a client pays.",
      "Invoices can include your business name, logo, brand color, invoice number, client details, amount, due date, bank details, and optional payment link.",
    ],
  },
  {
    question: "Can I customize my invoice with my logo and brand color?",
    answer: [
      "Yes. You can add your business logo, brand color, payment details, terms, and other branding elements.",
      "Custom template setup is also available if you want your documents to match your existing company format.",
    ],
  },
  {
    question: "Does PrymAgent support payment links?",
    answer: [
      "Yes. You can add payment links where needed. You can also use only bank details, or both bank details and a payment link.",
      "Payment links are optional.",
    ],
  },
  {
    question: "Does PrymAgent track payments automatically?",
    answer: [
      "For service providers, payment tracking can be done manually by marking an invoice as paid, unpaid, part-paid, or overdue.",
      "For teams, payment integration can be added to support Paystack confirmation and payment reference matching.",
    ],
  },
  {
    question: "What is PrymAgent Solo?",
    answer: [
      "PrymAgent Solo is for individual service providers who need to create quotes, invoices, receipts, track payment status, and keep simple client records.",
    ],
  },
  {
    question: "What is PrymAgent Flow?",
    answer: [
      "PrymAgent Flow is for teams and companies that need structured billing workflows across staff, finance, managers, clients, and vendors.",
      "It supports quote-to-cash, invoice-to-cash, recurring billing, vendor payables, approvals, reports, and compliance readiness.",
    ],
  },
  {
    question: "Can my company choose only the workflow it needs?",
    answer: [
      "Yes. PrymAgent Flow is built around modular workflow packs: Quote-to-Cash, Invoice-to-Cash, Recurring Billing, and Vendor Payables.",
      "You can also add approvals, reporting, payment integration, and compliance readiness where needed.",
    ],
  },
  {
    question: "Does PrymAgent support approval workflows?",
    answer: [
      "Yes. Teams can add approval workflows so invoices, quotes, or vendor bills can be reviewed before they are sent or marked for payment.",
      "Advanced approval rules can include amount-based approvals, multiple approval levels, rejection reasons, and approval logs.",
    ],
  },
  {
    question: "Does PrymAgent handle tax or FIRS e-invoicing?",
    answer: [
      "PrymAgent can support structured invoice data, VAT/TIN fields, tax invoice exports, and compliance-ready records.",
      "Direct FIRS/NRS submission is on our roadmap. For now, PrymAgent helps your team keep the structured billing records needed to move faster when those integrations are ready.",
    ],
  },
  {
    question: "Is there a free trial?",
    answer: [
      "For service providers, your first complete billing workflow is free: one quote, one invoice, one receipt, one client record, and payment status tracking.",
      "For teams, setup depends on the workflow required. A demo or guided setup can be provided before activation.",
    ],
  },
  {
    question: "How much does PrymAgent Solo cost?",
    answer: [
      "Service providers can use credit bundles: 10 credits for ₦1,500, 25 credits for ₦3,000, or 60 credits for ₦6,000.",
      "Credit usage starts at 2 credits for branded quotes, 3 credits for branded invoices, 1 credit for receipts, and 5 credits for annual PDF reports. Client profile updates, payment status logs, and earnings summaries are free.",
    ],
  },
  {
    question: "How much does PrymAgent Flow cost for teams?",
    answer: [
      "PrymAgent Flow starts with the Base Workspace at ₦20,000/month.",
      "Companies can then add workflow packs and add-ons based on their needs. Extra users cost ₦1,000/user/month after the first 5 users.",
    ],
  },
  {
    question: "Can PrymAgent replace Paystack or my accountant?",
    answer: [
      "No. PrymAgent does not replace Paystack. It helps manage billing workflows, invoice records, payment tracking, receipts, approvals, and reports. Paystack can be used for payment collection where needed.",
      "PrymAgent also does not replace your accountant. It helps you keep cleaner billing records, which can make your accountant's work easier.",
    ],
  },
  {
    question: "How do I get started?",
    answer: [
      "Service providers can start directly on WhatsApp.",
      "Teams and companies can book a workflow demo so PrymAgent can recommend the right setup based on their billing process.",
    ],
  },
]

export default function Home() {
  const [isDemoOpen, setIsDemoOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeMode, setActiveMode] = useState<Mode>("providers")
  const isTeams = activeMode === "teams"

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24)

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className={`min-h-screen ${isTeams ? "bg-[#eef3f4]" : "bg-[#f8f8f8]"} text-[#090c13]`}>
      <section id="top" className="relative min-h-screen overflow-hidden bg-[#1b0015] text-white">
        <header
          className={`${
            isScrolled ? "fixed left-0 right-0 top-0 z-50 py-3" : "relative z-30 py-4"
          } px-4 transition-all duration-500 ease-out sm:px-6 lg:px-8`}
        >
          <div
            className={`mx-auto flex items-center justify-between gap-4 rounded-full border bg-white/94 px-3 text-[#090c13] backdrop-blur-xl transition-all duration-500 ease-out ${
              isScrolled
                ? "max-w-6xl border-black/10 py-1.5 shadow-2xl shadow-black/18"
                : "max-w-7xl border-white/12 py-2 shadow-2xl shadow-black/20"
            }`}
          >
            <a href="#top" className="flex items-center gap-2 rounded-full px-2 py-1">
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

            <nav className="hidden items-center gap-1 rounded-full bg-[#f4f5f1] p-1 text-sm font-bold text-[#090c13] lg:flex">
              <a
                href="#top"
                onClick={() => setActiveMode("providers")}
                className={`rounded-full px-5 py-2.5 transition ${
                  activeMode === "providers" ? "bg-white shadow-sm" : "hover:bg-white"
                }`}
              >
                For Individuals
              </a>
              <a
                href="#top"
                onClick={() => setActiveMode("teams")}
                className={`rounded-full px-5 py-2.5 transition ${
                  activeMode === "teams" ? "bg-white shadow-sm" : "hover:bg-white"
                }`}
              >
                For Teams
              </a>
              <a href="#features" className="rounded-full px-5 py-2.5 transition hover:bg-white">
                Features
              </a>
              <a href="#pricing" className="rounded-full px-5 py-2.5 transition hover:bg-white">
                Pricing
              </a>
              <a href="#faq" className="rounded-full px-5 py-2.5 transition hover:bg-white">
                FAQ
              </a>
            </nav>

            <div className="hidden items-center gap-2 lg:flex">
              <button
                type="button"
                onClick={() => setIsDemoOpen(true)}
                className="rounded-full px-5 py-3 text-sm font-black transition hover:bg-[#f4f5f1]"
              >
                Watch demo
              </button>
              <a
                href={isTeams ? TEAM_DEMO_URL : WHATSAPP_URL}
                target={isTeams ? undefined : "_blank"}
                rel={isTeams ? undefined : "noopener noreferrer"}
                className="rounded-full bg-[#090c13] px-5 py-3 text-sm font-black text-white transition hover:bg-[#2b2f37]"
              >
                {isTeams ? "Book demo" : "Start on WhatsApp"}
              </a>
            </div>

            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#090c13] text-white lg:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="mx-auto mt-3 max-w-7xl rounded-[28px] border border-white/12 bg-white p-3 text-[#090c13] shadow-2xl shadow-black/20 lg:hidden">
              <nav className="grid gap-1 text-base font-black">
                <a
                  href="#top"
                  onClick={() => {
                    setActiveMode("providers")
                    setIsMenuOpen(false)
                  }}
                  className="rounded-[20px] bg-[#f8f8f8] px-5 py-4"
                >
                  For Individuals
                </a>
                <a
                  href="#top"
                  onClick={() => {
                    setActiveMode("teams")
                    setIsMenuOpen(false)
                  }}
                  className="rounded-[20px] bg-[#f8f8f8] px-5 py-4"
                >
                  For Teams & Companies
                </a>
                {["features", "pricing", "faq"].map((item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-[20px] bg-[#f8f8f8] px-5 py-4 uppercase"
                  >
                    {item}
                  </a>
                ))}
              </nav>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false)
                    setIsDemoOpen(true)
                  }}
                  className="rounded-[20px] bg-[#f0f3eb] px-5 py-4 text-left font-black"
                >
                  Watch demo
                </button>
                <a
                  href={isTeams ? TEAM_DEMO_URL : WHATSAPP_URL}
                  target={isTeams ? undefined : "_blank"}
                  rel={isTeams ? undefined : "noopener noreferrer"}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-[20px] bg-[#b9ff66] px-5 py-4 font-black"
                >
                  {isTeams ? "Book demo" : "Start on WhatsApp"}
                </a>
              </div>
            </div>
          )}
        </header>
        {isScrolled && <div className="h-[76px]" />}

        <div className="relative z-10 flex min-h-[calc(100vh-92px)] flex-col justify-center px-5 pb-8 pt-8 sm:px-8 lg:px-10 lg:pb-8 lg:pt-10">
          <div className="mx-auto w-full max-w-7xl">
            <div className="mx-auto max-w-6xl text-center">
              <h1 className="text-[clamp(2.45rem,11vw,6.8rem)] font-black leading-[0.92] text-white">
                Business billing, payments, and records made simple.
              </h1>

              <p className="mx-auto mt-6 max-w-4xl text-base leading-7 text-white/78 sm:text-xl sm:leading-8">
                PrymAgent helps independent professionals and business teams create quotes, invoices, receipts,
                track payments, and keep clean records from one simple workflow.
              </p>

              <div className="mx-auto mt-7 max-w-3xl rounded-[26px] bg-white p-2 text-left shadow-2xl shadow-black/30">
                <p className="px-3 pb-2 pt-1 text-center text-xs font-black text-[#7b7f88]">
                  Choose who you are using PrymAgent for. The page updates below.
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                <ModeTab
                  title="For Service Providers"
                  subtitle="Professional billing on WhatsApp."
                  active={activeMode === "providers"}
                  onClick={() => setActiveMode("providers")}
                />
                <ModeTab
                  title="For Teams & Companies"
                  subtitle="Custom billing workflows for Nigerian teams."
                  active={activeMode === "teams"}
                  onClick={() => setActiveMode("teams")}
                />
                </div>
              </div>

              <div className="mx-auto mt-6 flex max-w-2xl flex-col gap-3 rounded-[28px] bg-white/10 p-2 ring-1 ring-white/12 sm:flex-row">
                <a
                  href={isTeams ? TEAM_DEMO_URL : WHATSAPP_URL}
                  target={isTeams ? undefined : "_blank"}
                  rel={isTeams ? undefined : "noopener noreferrer"}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-[22px] bg-[#b9ff66] px-6 py-4 text-base font-black text-[#090c13] transition hover:bg-white"
                >
                  {isTeams ? "Book a workflow demo" : "Start on WhatsApp"}
                  <ArrowRight className="h-5 w-5" />
                </a>
                <a
                  href={isTeams ? "#packages" : "#pricing"}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-[22px] bg-white px-6 py-4 text-base font-black text-[#090c13] transition hover:bg-[#f0f3eb]"
                >
                  {isTeams ? "Build your package" : "See pricing"}
                </a>
              </div>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-[0.85fr_1.3fr_0.85fr] lg:items-end">
              <div className="rounded-[30px] bg-white/10 p-5 ring-1 ring-white/10">
                <p className="text-sm font-semibold text-white/60">{isTeams ? "Team workflow" : "Natural message"}</p>
                <p className="mt-3 rounded-[22px] bg-white p-4 text-xl font-black leading-snug text-[#090c13]">
                  {isTeams
                    ? "Quote approved -> Invoice sent -> Payment tracked -> Receipt linked."
                    : "Create an invoice for Ada Ventures, branding project, ₦450,000."}
                </p>
              </div>

              <div className="relative overflow-hidden rounded-[34px] bg-[#f8f8f8] p-4 text-[#090c13] shadow-2xl shadow-black/35">
                <div className={`rounded-[26px] p-5 ${isTeams ? "bg-[#e9f1f2]" : "bg-white"}`}>
                  <div className="flex items-center justify-between gap-4 border-b border-[#dfe6e8] pb-5">
                    <div>
                      <p className="text-sm font-bold text-[#7b7f88]">{isTeams ? "PrymAgent Flow" : "PrymAgent"}</p>
                      <h2 className="mt-1 text-2xl font-black sm:text-3xl">
                        {isTeams ? "Billing runs in one workflow." : "Professional billing on WhatsApp."}
                      </h2>
                    </div>
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#1b0015] text-white">
                      {isTeams ? <Building2 className="h-7 w-7" /> : <MessageCircle className="h-7 w-7" />}
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {(isTeams
                      ? ["Quotes", "Approvals", "Invoices", "Reports"]
                      : ["Quotes", "Invoices", "Receipts", "Payment records"]
                    ).map((signal, index) => (
                      <div
                        key={signal}
                        className={`rounded-[22px] p-4 ${
                          index === 0
                            ? "bg-[#b9ff66]"
                            : index === 1
                              ? "bg-[#f6eef5]"
                              : index === 2
                                ? "bg-white"
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
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#b9ff66]">
                  {isTeams ? <UsersRound className="h-7 w-7" /> : <FileText className="h-7 w-7" />}
                </div>
                <h2 className="mt-6 text-2xl font-black leading-none sm:text-3xl">
                  {isTeams ? "Built for Nigerian teams." : "Built for service providers."}
                </h2>
                <p className="mt-4 text-sm leading-6 text-[#5f636d]">
                  {isTeams
                    ? "For companies that need structure, speed, approvals, and visibility across billing operations."
                    : "For freelancers, consultants, creatives, agencies, vendors, and independent professionals."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isTeams ? <TeamsContent /> : <ProviderContent />}

      <FaqSection />

      <FinalSection setActiveMode={setActiveMode} />

      <SiteFooter setActiveMode={setActiveMode} />

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

function ModeTab({
  title,
  subtitle,
  active,
  onClick,
}: {
  title: string
  subtitle: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-[24px] p-5 transition ${
        active ? "bg-[#090c13] text-white" : "bg-[#f4f5f1] text-[#090c13] hover:bg-[#e9f1f2]"
      }`}
    >
      <span className="block text-lg font-black">{title}</span>
      <span className={`mt-1 block text-sm font-semibold ${active ? "text-white/70" : "text-[#5f636d]"}`}>
        {subtitle}
      </span>
    </button>
  )
}

function ProviderContent() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-base font-black text-[#557a2d]">Professional billing on WhatsApp</p>
            <h2 className="mt-4 max-w-3xl text-[clamp(2.2rem,9vw,4.8rem)] font-black leading-[0.92]">
              Stop sending rough payment details.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#5f636d]">
              Create quotes, invoices, receipts, and client payment records without spreadsheets, design tools,
              or accounting software.
            </p>
          </div>

          <div className="rounded-[28px] bg-[#f0f3eb] p-4 sm:rounded-[34px] sm:p-7">
            <div className="grid gap-3 sm:grid-cols-2">
              {providerCanDo.map((point) => (
                <div key={point} className="rounded-[22px] bg-white px-5 py-4 text-lg font-black">
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-[1500px] px-2 py-2 sm:px-5 sm:py-3">
        <div className="rounded-[30px] bg-white px-4 py-12 sm:rounded-[38px] sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
              <div>
                <p className="text-base font-black text-[#557a2d]">What you can do</p>
                <h2 className="mt-4 max-w-3xl text-[clamp(2.2rem,9vw,4.8rem)] font-black leading-[0.92]">
                  Cleaner billing from first quote to final receipt.
                </h2>
              </div>
              <p className="max-w-lg text-lg leading-8 text-[#5f636d]">
                PrymAgent helps service providers look organized, follow up better, and keep client records clean.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {providerFeatures.map((item) => (
                <article key={item.title} className={`${item.accent} rounded-[26px] p-4 sm:rounded-[30px] sm:p-6`}>
                  <div className="mb-8 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#090c13] text-white sm:mb-10">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-black leading-none sm:text-3xl">{item.title}</h3>
                  <p className="mt-5 text-base leading-7 text-[#4f545d]">{item.copy}</p>
                  {item.example && (
                    <p className="mt-5 rounded-[20px] bg-white/75 p-4 text-sm font-bold leading-6 text-[#090c13]">
                      Example: "{item.example}"
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="how" className="mx-auto max-w-7xl px-4 py-12 sm:px-8 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-stretch">
          <div className="rounded-[30px] bg-[#1b0015] p-5 text-white sm:rounded-[36px] sm:p-8 lg:p-10">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#b9ff66] text-[#090c13]">
              <MessageCircle className="h-8 w-8" />
            </div>
            <h2 className="mt-8 max-w-3xl text-[clamp(2.15rem,8.5vw,4.6rem)] font-black leading-[0.94] sm:mt-10">
              Tell PrymAgent what you need.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/72">
              Type naturally, and PrymAgent turns your request into a quote, invoice, receipt, or payment record.
            </p>
            <div className="mt-10 rounded-[28px] bg-white p-4 text-[#090c13]">
              <p className="rounded-[22px] bg-[#f0f3eb] p-5 text-2xl font-black leading-tight">
                Create an invoice for Ada Ventures, branding project, ₦450,000.
              </p>
            </div>
          </div>

          <div className="rounded-[36px] bg-[#e9f1f2] p-6 sm:p-8 lg:p-10">
            <p className="text-base font-black text-[#557a2d]">How it works</p>
            <div className="mt-8 space-y-4">
              {providerSteps.map((step, index) => (
                <StepCard key={step} index={index} step={step} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-[1500px] px-2 py-2 sm:px-5 sm:py-3">
        <div className="rounded-[30px] bg-[#f6eef5] px-4 py-12 sm:rounded-[38px] sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <p className="text-base font-black text-[#7a3c69]">Pricing for service providers</p>
                <h2 className="mt-4 text-[clamp(2.2rem,9vw,4.8rem)] font-black leading-[0.92]">
                  Start free. Upgrade when billing grows.
                </h2>
                <p className="mt-6 text-lg leading-8 text-[#5f636d]">
                  Try the full billing flow first. After that, continue with credit bundles or PrymAgent Pro.
                </p>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[30px] bg-[#1b0015] p-6 text-white shadow-xl shadow-[#1b0015]/10">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-black text-[#b9ff66]">Free trial</p>
                      <h3 className="mt-3 text-3xl font-black leading-none sm:text-4xl">Your first billing workflow is free.</h3>
                      <p className="mt-4 max-w-xl text-sm leading-7 text-white/72">
                        Create one quote, one invoice, one receipt, one client record, and track the payment status before buying credits.
                      </p>
                    </div>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#b9ff66] px-5 py-3 text-sm font-black text-[#090c13] transition hover:bg-white"
                    >
                      Start free
                    </a>
                  </div>
                </div>
                <PricingPanel title="Credit bundles" rows={providerBundles} />
                <PricingPanel title="Credit usage" rows={providerCreditUsage} />
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <div className="rounded-[30px] bg-[#1b0015] p-6 text-white">
                <p className="text-base font-black text-[#b9ff66]">PrymAgent Pro</p>
                <h3 className="mt-4 text-4xl font-black sm:text-5xl">₦4,000/month</h3>
                <p className="mt-4 text-white/70">For active service providers.</p>
                <FeatureList
                  dark
                  items={[
                    "unlimited reasonable quotes",
                    "unlimited reasonable invoices",
                    "unlimited reasonable receipts",
                    "custom invoice and receipt templates",
                    "client database",
                    "monthly, quarterly, and annual reports",
                    "no watermark",
                    "priority support",
                  ]}
                />
              </div>

              <div className="rounded-[30px] bg-white p-6">
                <p className="text-base font-black text-[#557a2d]">Custom template setup</p>
                <h3 className="mt-4 text-4xl font-black sm:text-5xl">₦5,000-₦20,000</h3>
                <p className="mt-4 text-[#5f636d]">One-time setup for documents that match your brand exactly.</p>
                <FeatureList
                  items={[
                    "invoice template setup",
                    "receipt template setup",
                    "logo placement",
                    "brand color setup",
                    "payment terms",
                    "signature or stamp section",
                    "saved bank/payment details",
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <BestForSection items={providerBestFor} title="Best for independent professionals." />
    </>
  )
}

function TeamsContent() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-base font-black text-[#315d63]">PrymAgent Flow</p>
            <h2 className="mt-4 max-w-3xl text-[clamp(2.2rem,9vw,4.8rem)] font-black leading-[0.92]">
              Your company billing workflow, automated around how you already work.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#5f636d]">
              Manage quotes, invoices, approvals, payment tracking, receipts, vendor bills, and reports without forcing everyone into a heavy accounting system.
            </p>
          </div>

          <div className="rounded-[28px] bg-[#dfeaec] p-4 sm:rounded-[34px] sm:p-7">
            <div className="grid gap-3 sm:grid-cols-2">
              {teamCapabilities.map((point) => (
                <div key={point} className="rounded-[22px] bg-white px-5 py-4 text-lg font-black">
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-[1500px] px-2 py-2 sm:px-5 sm:py-3">
        <div className="rounded-[30px] bg-white px-4 py-12 sm:rounded-[38px] sm:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="text-base font-black text-[#315d63]">What PrymAgent Flow changes</p>
              <h2 className="mt-4 max-w-3xl text-[clamp(2.2rem,9vw,4.8rem)] font-black leading-[0.92]">
                Billing work becomes easier to see, approve, and complete.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#5f636d]">
                PrymAgent Flow is for teams that already have people involved in billing, but need one clear system
                for documents, approvals, payment status, and records.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {teamBenefits.map((benefit) => (
                <article key={benefit.title} className="rounded-[28px] bg-[#e9f1f2] p-5">
                  <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-[#1b0015] text-white">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-black leading-none">{benefit.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-[#4f545d]">{benefit.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-2 py-2 sm:px-5 sm:py-3">
        <div className="rounded-[30px] bg-[#1b0015] px-4 py-12 text-white sm:rounded-[38px] sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
              <div>
                <p className="text-base font-black text-[#b9ff66]">Build only what your company needs</p>
                <h2 className="mt-4 max-w-4xl text-[clamp(2.2rem,9vw,4.8rem)] font-black leading-[0.92]">
                  Pick the workflow your team actually uses.
                </h2>
              </div>
              <p className="max-w-lg text-lg leading-8 text-white/72">
                Some companies start with quotations. Some invoice directly. Some bill monthly. Some need vendor approvals. PrymAgent Flow adapts.
              </p>
            </div>

            <div className="rounded-[34px] bg-white p-6 text-[#090c13]">
              <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
                <div>
                  <p className="text-base font-black text-[#315d63]">Base Workspace</p>
                  <h3 className="mt-4 text-4xl font-black sm:text-5xl">₦20,000/month</h3>
                  <p className="mt-4 text-[#5f636d]">Includes up to 5 users. Extra users: ₦1,000/user/month.</p>
                </div>
                <FeatureList
                  items={[
                    "company profile",
                    "logo and brand colors",
                    "one quote or invoice template",
                    "client/vendor database",
                    "staff roles",
                    "basic audit trail",
                    "WhatsApp and web access",
                    "PDF generation and sharing",
                    "paid/unpaid/overdue tracking",
                    "receipt generation",
                    "basic monthly summary",
                    "document storage",
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-4 py-12 sm:px-8 lg:py-24">
        <div className="mb-10">
          <p className="text-base font-black text-[#315d63]">Workflow packs</p>
          <h2 className="mt-4 max-w-4xl text-[clamp(2.2rem,9vw,4.8rem)] font-black leading-[0.92]">
            Add the billing engine your company needs.
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {workflowPacks.map((pack) => (
            <article key={pack.title} className={`${pack.accent} rounded-[30px] p-6`}>
              <p className="text-base font-black text-[#315d63]">{pack.price}</p>
              <h3 className="mt-3 text-3xl font-black leading-none sm:text-4xl">{pack.title}</h3>
              <p className="mt-4 text-[#4f545d]">{pack.copy}</p>
              <FeatureList items={pack.items} />
              <p className="mt-5 rounded-[20px] bg-white/75 p-4 text-sm font-bold leading-6">Flow: {pack.flow}</p>
              <p className="mt-3 text-sm leading-6 text-[#4f545d]">Best for: {pack.bestFor}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-2 py-2 sm:px-5 sm:py-3">
        <div className="rounded-[30px] bg-[#e9f1f2] px-4 py-12 sm:rounded-[38px] sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10">
              <p className="text-base font-black text-[#315d63]">Add-ons and setup</p>
              <h2 className="mt-4 max-w-4xl text-[clamp(2.2rem,9vw,4.8rem)] font-black leading-[0.92]">
                Extend the workflow without bloating the software.
              </h2>
            </div>

            <div className="grid gap-4 lg:grid-cols-4">
              {addOns.map((addon) => (
                <article key={addon.title} className="rounded-[28px] bg-white p-5">
                  <p className="text-sm font-black text-[#315d63]">{addon.price}</p>
                  <h3 className="mt-3 text-2xl font-black leading-none">{addon.title}</h3>
                  <FeatureList items={addon.items} compact />
                </article>
              ))}
            </div>

            <div className="mt-6 rounded-[30px] bg-white p-6">
              <PricingPanel title="Setup options" rows={setupOptions} />
              <p className="mt-5 text-sm leading-6 text-[#5f636d]">
                Setup can include company profile setup, branding, template replication, staff onboarding, approval rules,
                workflow configuration, and a walkthrough session.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="packages" className="mx-auto max-w-7xl px-4 py-12 sm:px-8 lg:py-24">
        <div className="mb-10">
          <p className="text-base font-black text-[#315d63]">Example packages</p>
          <h2 className="mt-4 max-w-4xl text-[clamp(2.2rem,9vw,4.8rem)] font-black leading-[0.92]">
            Choose a starting point, then tailor it.
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {examplePackages.map(([name, price, description]) => (
            <article key={name} className="rounded-[30px] bg-white p-6 shadow-sm">
              <p className="text-base font-black text-[#315d63]">{price}</p>
              <h3 className="mt-3 text-3xl font-black leading-none sm:text-4xl">{name}</h3>
              <p className="mt-4 text-[#5f636d]">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="how" className="mx-auto max-w-[1500px] px-2 py-2 sm:px-5 sm:py-3">
        <div className="rounded-[30px] bg-[#f3ece8] px-4 py-12 sm:rounded-[38px] sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-start">
            <div>
              <p className="text-base font-black text-[#8a563f]">How onboarding works</p>
              <h2 className="mt-4 max-w-4xl text-[clamp(2.2rem,9vw,4.8rem)] font-black leading-[0.92]">
                From scattered process to clear workflow.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#5f636d]">
                We ask simple questions about quotes, approvals, recurring billing, vendor invoices, and reporting needs.
              </p>
            </div>
            <div className="space-y-4">
              {teamSteps.map((step, index) => (
                <StepCard key={step} index={index} step={step} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8 lg:py-24">
        <div className="rounded-[30px] bg-white p-6">
          <p className="text-base font-black text-[#315d63]">Compliance-ready, with more coming</p>
          <p className="mt-3 text-lg leading-8 text-[#5f636d]">
            PrymAgent helps you keep structured invoice data, VAT/TIN fields, tax exports, and audit-ready records today.
            Direct FIRS/NRS submission is on our roadmap as the required integrations and compliance pathways become available.
          </p>
        </div>
      </section>

      <BestForSection items={teamBestFor} title="Best for Nigerian teams and companies." team />
    </>
  )
}

function FinalSection({ setActiveMode }: { setActiveMode: (mode: Mode) => void }) {
  return (
    <section className="mx-auto max-w-[1500px] px-2 pb-2 sm:px-5 sm:pb-5">
      <div className="rounded-[30px] bg-[#090c13] px-4 py-12 text-center text-white sm:rounded-[38px] sm:px-8 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="text-base font-black text-[#b9ff66]">One product. Two ways to work.</p>
          <h2 className="mt-4 text-[clamp(2.3rem,10vw,5.6rem)] font-black leading-[0.92]">
            Build only the billing workflow you need.
          </h2>
          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-white/72">
            Use PrymAgent Solo if you are an independent service provider. Use PrymAgent Flow if you manage billing across a team.
            Either way, PrymAgent helps you create cleaner billing documents, track payments, and keep better records.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setActiveMode("providers")}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#b9ff66] px-7 py-4 text-base font-black text-[#090c13] transition hover:bg-white"
            >
              Start on WhatsApp
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href={TEAM_DEMO_URL}
              onClick={() => setActiveMode("teams")}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-4 text-base font-black text-white transition hover:bg-white hover:text-[#090c13]"
            >
              Book a Team Demo
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function FaqSection() {
  return (
    <section id="faq" className="mx-auto max-w-[1500px] px-2 py-2 sm:px-5 sm:py-3">
      <div className="rounded-[30px] bg-[#f0f3eb] px-4 py-12 sm:rounded-[38px] sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-base font-black text-[#557a2d]">FAQ</p>
              <h2 className="mt-4 text-[clamp(2.2rem,9vw,4.8rem)] font-black leading-[0.92]">
                Questions people ask before choosing PrymAgent.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-[#5f636d]">
              Clear answers on WhatsApp use, quotes, invoices, receipts, payment links, team workflows,
              approvals, pricing, setup, and reporting.
            </p>
          </div>

          <div className="grid items-start gap-3 lg:grid-cols-2">
            {faqs.map((faq, index) => (
              <details
                key={faq.question}
                open={index < 2}
                className="group self-start rounded-[26px] bg-white p-5 shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-lg font-black leading-tight sm:text-xl">
                  {faq.question}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#090c13] text-sm text-white transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="mt-4 space-y-3 border-t border-[#ececec] pt-4">
                  {faq.answer.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-7 text-[#4f545d]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function SiteFooter({ setActiveMode }: { setActiveMode: (mode: Mode) => void }) {
  return (
    <footer className="bg-white px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr_0.85fr_0.85fr]">
          <div>
            <div className="flex items-center gap-2">
              <Image
                src="/assets/icons/logohead.png"
                alt="PrymAgent logo"
                width={38}
                height={38}
                className="h-9 w-9"
              />
              <span className="text-2xl font-black">PrymAgent</span>
            </div>
            <p className="mt-5 max-w-sm text-base leading-7 text-[#5f636d]">
              Business billing, payment tracking, and records made simple for service providers and Nigerian teams.
            </p>
            <p className="mt-5 text-sm font-bold text-[#090c13]">A product of Prym Technologies Limited.</p>
          </div>

          <FooterColumn
            title="Product"
            links={[
              { label: "For Service Providers", href: "#top", onClick: () => setActiveMode("providers") },
              { label: "For Teams & Companies", href: "#top", onClick: () => setActiveMode("teams") },
              { label: "FAQ", href: "#faq" },
            ]}
          />

          <FooterColumn
            title="Explore"
            links={[
              { label: "Features", href: "#features" },
              { label: "How it works", href: "#how" },
              { label: "Pricing", href: "#pricing" },
              { label: "Packages", href: "#packages" },
            ]}
          />

          <div>
            <h3 className="text-sm font-black text-[#090c13]">Get started</h3>
            <div className="mt-4 grid gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setActiveMode("providers")}
                className="rounded-full bg-[#b9ff66] px-5 py-3 text-center text-sm font-black text-[#090c13] transition hover:bg-[#d5ff99]"
              >
                Start on WhatsApp
              </a>
              <a
                href={TEAM_DEMO_URL}
                onClick={() => setActiveMode("teams")}
                className="rounded-full bg-[#090c13] px-5 py-3 text-center text-sm font-black text-white transition hover:bg-[#2b2f37]"
              >
                Book a Team Demo
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[#ececec] pt-6 text-sm text-[#7b7f88] sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright 2026 PrymAgent.</p>
          <p>Built for cleaner billing workflows.</p>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string; onClick?: () => void }[]
}) {
  return (
    <div>
      <h3 className="text-sm font-black text-[#090c13]">{title}</h3>
      <div className="mt-4 grid gap-3">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={link.onClick}
            className="text-sm font-bold text-[#5f636d] transition hover:text-[#090c13]"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  )
}

function StepCard({ index, step }: { index: number; step: string }) {
  return (
    <div className="flex gap-4 rounded-[24px] bg-white p-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#090c13] text-sm font-black text-white">
        {index + 1}
      </div>
      <p className="text-lg font-black leading-7">{step}</p>
    </div>
  )
}

function PricingPanel({ title, rows }: { title: string; rows: string[][] }) {
  return (
    <div className="rounded-[30px] bg-white p-6">
      <h3 className="text-2xl font-black">{title}</h3>
      <div className="mt-5 overflow-hidden rounded-[22px] border border-[#e8e8e8]">
        {rows.map(([label, value]) => (
          <div key={label} className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 border-b border-[#e8e8e8] px-4 py-4 last:border-b-0 sm:gap-4 sm:px-5">
            <span className="min-w-0 break-words font-bold text-[#4f545d]">{label}</span>
            <span className="whitespace-nowrap text-right font-black text-[#090c13]">{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function FeatureList({ items, dark = false, compact = false }: { items: string[]; dark?: boolean; compact?: boolean }) {
  return (
    <div className={`mt-6 grid gap-3 ${compact ? "" : "sm:grid-cols-2"}`}>
      {items.map((item) => (
        <div key={item} className="flex items-start gap-2">
          <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${dark ? "text-[#b9ff66]" : "text-[#557a2d]"}`} />
          <p className={`text-sm leading-6 ${dark ? "text-white/78" : "text-[#4f545d]"}`}>{item}</p>
        </div>
      ))}
    </div>
  )
}

function BestForSection({ items, title, team = false }: { items: string[]; title: string; team?: boolean }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8 lg:py-24">
      <div className={`rounded-[28px] p-5 sm:rounded-[34px] sm:p-8 ${team ? "bg-[#dfeaec]" : "bg-[#f0f3eb]"}`}>
        <p className={`text-base font-black ${team ? "text-[#315d63]" : "text-[#557a2d]"}`}>Best for</p>
        <h2 className="mt-4 text-[clamp(2.15rem,8.5vw,4.8rem)] font-black leading-[0.92]">{title}</h2>
        <div className="mt-8 flex flex-wrap gap-3">
          {items.map((item) => (
            <span key={item} className="rounded-full bg-white px-5 py-3 text-sm font-black">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
