export function formatCurrency(amount: number | string | null | undefined) {
  const value = Number(amount || 0)
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatDate(value: string | null | undefined) {
  if (!value) return "Not set"
  return new Date(value).toLocaleDateString("en-NG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function whatsappLink(message: string) {
  const number = process.env.NEXT_PUBLIC_PRYMAGENT_WHATSAPP_NUMBER || "2348012345678"
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}
