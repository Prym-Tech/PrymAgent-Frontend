import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | PrymAgent",
  description: "How PrymAgent collects, uses, stores, and protects personal and business information.",
}

const sections = [
  {
    title: "1. Who We Are",
    body: [
      "PrymAgent is a product of Prym Technologies Limited. PrymAgent helps service providers and business teams create quotes, invoices, receipts, track payment status, and keep billing records through WhatsApp and web.",
      "This Privacy Policy explains how we collect, use, store, share, and protect information when you use PrymAgent, including the WhatsApp assistant, dashboard, payment pages, and related services.",
    ],
  },
  {
    title: "2. Information We Collect",
    body: [
      "Account and contact information, such as your WhatsApp number, name, business name, email address, phone number, business address, and login verification details.",
      "Business profile information, including logo, brand colour, bank details, account name, preferred payment option, terms, signature text, and document branding preferences.",
      "Billing records, including client names, client contact details, quotes, invoices, receipts, payment status updates, payment references, notes, item descriptions, taxes, discounts, and generated PDF files.",
      "Payment and subscription information, including credit purchases, Pro subscription status, payment references, Paystack transaction identifiers, and webhook confirmation data. PrymAgent does not store full card details.",
      "Conversation and support information, including WhatsApp messages you send to PrymAgent, confirmation responses, corrections, complaints, and support requests.",
      "Technical information, such as IP address, browser, device information, session cookies, security logs, and dashboard usage events needed to keep the service reliable and secure.",
    ],
  },
  {
    title: "3. How We Use Information",
    body: [
      "To provide PrymAgent features, including document generation, client records, dashboard access, payment tracking, credit billing, subscriptions, and account support.",
      "To verify bank details, create payment links where requested, process payments through payment providers, and reconcile successful or failed payment events.",
      "To operate the AI assistant. The AI helps interpret billing instructions, extract document details, detect missing fields, prepare drafts, and summarize records. Major actions still require user confirmation where the product flow requires it.",
      "To improve safety, prevent fraud, debug issues, respond to disputes, comply with legal obligations, and protect PrymAgent, merchants, clients, and payment systems.",
      "To send service messages, product updates, security notices, billing notices, and support responses. Marketing messages may be limited or stopped where applicable.",
    ],
  },
  {
    title: "4. Legal Basis and Nigerian Data Protection",
    body: [
      "We aim to process personal data in line with applicable Nigerian data protection requirements, including principles of lawful, fair, transparent, purpose-limited, accurate, secure, and retention-limited processing.",
      "Depending on the context, we process information because it is needed to provide the service, fulfill a contract, comply with legal obligations, protect legitimate business interests, prevent fraud, or because you gave consent.",
      "If you enter client information into PrymAgent, you are responsible for ensuring you have a lawful reason to provide and use that client information for billing, records, and payment communication.",
    ],
  },
  {
    title: "5. Third-Party Services",
    body: [
      "PrymAgent may use trusted service providers for hosting, storage, AI processing, WhatsApp messaging, payment processing, bank verification, analytics, email, and support operations.",
      "Payments and payment links may be processed by Paystack or another configured payment provider. These providers may process payment data under their own terms and privacy notices.",
      "WhatsApp messages are handled through Meta's WhatsApp Business Platform or approved infrastructure. Your use of WhatsApp is also subject to WhatsApp and Meta policies.",
      "We do not sell your personal data. We only share information where needed to provide the service, process payments, comply with law, protect rights, or support secure operations.",
    ],
  },
  {
    title: "6. Data Storage and Security",
    body: [
      "We use technical and organizational measures designed to protect information from unauthorized access, loss, misuse, or alteration. These may include access controls, secure sessions, encrypted transport, limited staff access, audit logs, and cloud storage safeguards.",
      "No internet service is perfectly secure. You should protect your WhatsApp account, dashboard access, devices, and business records, and tell us quickly if you suspect unauthorized use.",
    ],
  },
  {
    title: "7. Retention",
    body: [
      "We keep account, billing, payment, and document records for as long as needed to provide PrymAgent, meet legal/accounting obligations, resolve disputes, prevent fraud, and maintain reliable business records.",
      "You may request deletion of certain data, but some records may need to be retained where required for legal, tax, payment, fraud-prevention, dispute, or audit purposes.",
    ],
  },
  {
    title: "8. Your Rights and Choices",
    body: [
      "Subject to applicable law, you may request access to your personal data, correction of inaccurate data, deletion, restriction, objection to certain processing, withdrawal of consent, or information about how your data is used.",
      "You can update many business profile details from WhatsApp or the dashboard. For privacy requests, contact us at hello@prymtech.xyz.",
    ],
  },
  {
    title: "9. Children",
    body: [
      "PrymAgent is a business tool and is not intended for children. Do not use PrymAgent if you are not legally able to operate a business account or agree to these terms in your jurisdiction.",
    ],
  },
  {
    title: "10. Changes to This Policy",
    body: [
      "We may update this Privacy Policy as PrymAgent changes. If changes are material, we may notify users through the website, dashboard, WhatsApp, email, or another appropriate channel.",
    ],
  },
]

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#f7faf0] px-4 py-8 text-[#101820] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm font-black text-[#5f636d] transition hover:text-[#101820]">
          Back to PrymAgent
        </Link>

        <section className="mt-6 overflow-hidden rounded-[2rem] bg-[#101820] p-7 text-white shadow-2xl sm:p-10">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#b0d226]">Legal</p>
          <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">Privacy Policy</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-white/75">
            This page explains how PrymAgent handles the information needed to run WhatsApp billing, documents,
            payments, dashboard access, and support.
          </p>
          <p className="mt-6 text-sm font-bold text-white/60">Last updated: 22 June 2026</p>
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

        <section className="mt-6 rounded-[1.5rem] bg-[#e6ebdd] p-6">
          <h2 className="text-xl font-black">Contact</h2>
          <p className="mt-3 text-sm leading-7 text-[#4f545d]">
            For privacy questions or data requests, contact <a className="font-black text-[#101820] underline" href="mailto:hello@prymtech.xyz">hello@prymtech.xyz</a>.
          </p>
        </section>
      </div>
    </main>
  )
}
