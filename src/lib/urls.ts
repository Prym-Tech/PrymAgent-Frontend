const DEFAULT_BACKEND_ORIGIN = "http://localhost:8000"

function trimTrailingSlashes(value: string) {
  return value.replace(/\/+$/, "")
}

export function getBackendOrigin() {
  const raw = process.env.NEXT_PUBLIC_API_URL || DEFAULT_BACKEND_ORIGIN
  const trimmed = trimTrailingSlashes(raw)
  return trimmed.endsWith("/api") ? trimmed.slice(0, -4) : trimmed
}

export function getApiBaseUrl() {
  return `${getBackendOrigin()}/api`
}

export function buildBackendUrl(path: string) {
  const cleanPath = path.startsWith("/") ? path : `/${path}`
  return `${getBackendOrigin()}${cleanPath}`
}

export function buildApiUrl(path: string) {
  const cleanPath = path.startsWith("/") ? path : `/${path}`
  return `${getApiBaseUrl()}${cleanPath}`
}
