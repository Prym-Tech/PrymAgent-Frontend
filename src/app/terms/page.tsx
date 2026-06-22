import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms and Conditions | PrymAgent",
  description: "Terms governing use of PrymAgent's WhatsApp billing assistant, dashboard, documents, payments, credits, and subscriptions.",
}

const sections = [
  {
    title: "1. Agreement",
    body: [
      "These Terms and Conditions govern your use of PrymAgent, a product of Prym Technologies Limited. By using PrymAgent through WhatsApp, web, dashboard, payment pages, or related services, you agree to these Terms.",
      "If you use PrymAgent for a business, company, client, or team, you confirm that you have authority to use the service and provide the information you submit.",
    ],
  },
  {
    title: "2. What PrymAgent Does",
    body: [
      "PrymAgent helps users create quotes, invoices, receipts, track payment status, keep client billing records, manage business profile details, buy credits, and access simple billing summaries.",
      "PrymAgent is not a full accounting system, bank, law firm, tax adviser, or licensed financial adviser. Any tax, compliance, accounting, or business guidance is general information and should be checked with a qualified professional where needed.",
    ],
  },
  {
    title: "3. WhatsApp and Dashboard Access",
    body: [
      "PrymAgent is WhatsApp-first. Some features may also be available through the dashboard. You are responsible for keeping your WhatsApp account, phone number, devices, and dashboard sessions secure.",
      "Dashboard login may use a WhatsApp verification flow. You must not attempt to access another user's account, documents, clients, payment records, or dashboard.",
    ],
  },
  {
    title: "4. AI-Generated Drafts and Confirmations",
    body: [
      "PrymAgent uses AI to understand billing requests and prepare drafts. AI can make mistakes, especially with names, dates, item descriptions, amounts, tax, or payment terms.",
      "Before major actions or asset generation, PrymAgent may show a confirmation draft. You are responsible for reviewing drafts carefully before approving them.",
      "When you approve a draft, you confirm that the business details, client details, item descriptions, amounts, calculations, tax, discount, payment terms, bank details, payment method, and other information are accurate enough for your intended use.",
    ],
  },
  {
    title: "5. Documents and Records",
    body: [
      "Generated quotes, invoices, receipts, summaries, and reports are based on the information you provide or approve. PrymAgent does not guarantee that any document will satisfy every legal, tax, procurement, accounting, or client requirement.",
      "You are responsible for ensuring your business identity, logo, bank details, client details, pricing, tax treatment, payment terms, receipt information, and records are accurate and lawful.",
    ],
  },
  {
    title: "6. Payments, Payment Links, and Bank Details",
    body: [
      "PrymAgent may support bank transfer details, payment links, payment tracking, and payment confirmation through third-party payment providers such as Paystack.",
      "Payment providers, banks, card networks, and telecom or mobile money providers may apply their own terms, fees, verification rules, settlement timelines, reversals, disputes, chargebacks, and compliance checks.",
      "PrymAgent is not responsible for failed bank transfers, failed card payments, customer disputes, chargebacks, wrong account details supplied by you, delays caused by third-party providers, or payments made outside the PrymAgent flow.",
    ],
  },
  {
    title: "7. Credits, Free Trial, and Subscriptions",
    body: [
      "Some PrymAgent actions may require credits or an active subscription. Pricing, free trial allowances, credit costs, Pro plan features, and available bundles may change and are controlled by current product configuration.",
      "Credits and subscriptions are for access to PrymAgent features. Unless required by law or expressly stated, used credits, generated documents, completed actions, and active billing periods may not be refundable.",
      "Subscription access may continue until the end of a paid period after cancellation, depending on the plan and payment provider behavior.",
    ],
  },
  {
    title: "8. Acceptable Use",
    body: [
      "You must not use PrymAgent for fraud, impersonation, fake receipts, false invoices, money laundering, illegal goods or services, harassment, spam, unauthorized marketing, phishing, malicious automation, or any activity that violates law or third-party rights.",
      "We may suspend, restrict, or terminate access if we reasonably believe an account is unsafe, abusive, fraudulent, illegal, harmful, or likely to damage PrymAgent, users, clients, payment providers, or third parties.",
    ],
  },
  {
    title: "9. User Content and Permissions",
    body: [
      "You retain responsibility for the business information, logos, client details, messages, notes, documents, and other content you provide. You confirm that you have the right to upload, process, and use that content in PrymAgent.",
      "You grant PrymAgent permission to host, process, transmit, display, and generate outputs from your content as needed to provide the service, secure the platform, support users, and comply with law.",
    ],
  },
  {
    title: "10. Availability and Changes",
    body: [
      "We aim to keep PrymAgent reliable, but we do not guarantee uninterrupted access. Features may be changed, limited, paused, or discontinued for maintenance, security, compliance, product, third-party provider, or business reasons.",
      "WhatsApp, AI providers, payment providers, hosting providers, banks, and other third parties may affect service availability or behavior.",
    ],
  },
  {
    title: "11. Limitation of Liability",
    body: [
      "To the maximum extent allowed by law, PrymAgent and Prym Technologies Limited will not be liable for indirect, incidental, special, consequential, punitive, or lost-profit damages arising from use of the service.",
      "Our total liability for any claim relating to PrymAgent will be limited to the amount you paid to PrymAgent for the affected service in the three months before the claim, unless applicable law requires otherwise.",
    ],
  },
  {
    title: "12. Termination",
    body: [
      "You may stop using PrymAgent at any time. We may suspend or terminate access where required for security, legal, compliance, non-payment, abuse-prevention, or product reasons.",
      "Some records may be retained after account closure where needed for legal, tax, audit, fraud-prevention, payment, dispute, or legitimate business purposes.",
    ],
  },
  {
    title: "13. Governing Law",
    body: [
      "These Terms are governed by the laws of the Federal Republic of Nigeria, unless another mandatory law applies. We will try to resolve disputes fairly and in good faith before formal proceedings where practical.",
    ],
  },
  {
    title: "14. Contact",
    body: [
      "For questions about these Terms, contact hello@prymtech.xyz.",
    ],
  },
]

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f7faf0] px-4 py-8 text-[#101820] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm font-black text-[#5f636d] transition hover:text-[#101820]">
          Back to PrymAgent
        </Link>

        <section className="mt-6 overflow-hidden rounded-[2rem] bg-[#101820] p-7 text-white shadow-2xl sm:p-10">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#b0d226]">Legal</p>
          <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">Terms and Conditions</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-white/75">
            These terms explain the rules for using PrymAgent's WhatsApp billing assistant, dashboard, documents,
            credits, subscriptions, payment links, and related services.
          </p>
          <p className="mt-6 text-sm font-bold text-white/60">Last updated: 22 June 2026</p>
        </section>

        <section className="mt-6 rounded-[1.5rem] border border-[#dfe6d8] bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black">Important Business Disclaimer</h2>
          <p className="mt-4 text-sm leading-7 text-[#4f545d]">
            PrymAgent helps you prepare billing records faster, but you remain responsible for checking every draft before
            approval. For legal, tax, accounting, compliance, or financial decisions, speak with a qualified professional.
          </p>
        </section>

        <section className="mt-6 grid gap-4">
          {sections.map((section) => (
            <article key={section.title} className="rounded-[1.5rem] border border-[#dfe6d8] bg-white p-6 shadow-sm">
              <h2 className="text-xl font-black">{section.title}</h2>
              <div className="mt-4 space-y-3">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-7 text-[#4f545d]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  )
}
