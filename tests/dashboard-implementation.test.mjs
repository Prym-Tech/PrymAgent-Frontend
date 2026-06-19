import assert from "node:assert/strict"
import { readdirSync, readFileSync, statSync } from "node:fs"
import { join } from "node:path"

const root = process.cwd()
const srcRoot = join(root, "src")
const checks = []

function test(name, fn) {
  checks.push({ name, fn })
}

function read(relativePath) {
  return readFileSync(join(root, relativePath), "utf8")
}

function walkFiles(directory) {
  const entries = readdirSync(directory)
  return entries.flatMap((entry) => {
    const path = join(directory, entry)
    return statSync(path).isDirectory() ? walkFiles(path) : [path]
  })
}

test("dashboard auth API client sends session cookies and CSRF headers", () => {
  const api = read("src/lib/api.ts")
  assert.match(api, /withCredentials:\s*true/)
  assert.match(api, /xsrfCookieName:\s*['"]csrftoken['"]/)
  assert.match(api, /xsrfHeaderName:\s*['"]X-CSRFToken['"]/)
  assert.ok(api.includes("/api/auth/csrf/"), "unsafe requests should bootstrap CSRF")
  assert.match(api, /config\._csrfRetried/)
})

test("WhatsApp login uses backend-provided link and polls status before redirecting", () => {
  const loginPage = read("src/app/login/page.tsx")
  assert.match(loginPage, /res\.data\.whatsapp_link/)
  assert.match(loginPage, /api\/auth\/whatsapp\/status/)
  assert.match(loginPage, /localStorage/)
  assert.match(loginPage, /login_id/)
  assert.match(loginPage, /poll_token/)
  assert.match(loginPage, /window\.open\(whatsappLink/)
  assert.match(loginPage, /router\.push\(["']\/dashboard["']\)/)
})

test("documents expose only view and forced download actions", () => {
  const documentsPage = read("src/app/dashboard/documents/page.tsx")
  const overviewPage = read("src/app/dashboard/page.tsx")
  assert.ok(!documentsPage.includes("Copy link"), "documents page should not expose copy link")
  assert.ok(documentsPage.includes("/finance/api/dashboard/documents/${doc.type}/${doc.number}/download/"))
  assert.ok(documentsPage.includes("doc.has_pdf"), "documents page should show download from has_pdf")
  assert.ok(documentsPage.includes(">View<"))
  assert.ok(documentsPage.includes(">Download<"))
  assert.ok(overviewPage.includes("/finance/api/dashboard/documents/${doc.type}/${doc.number}/download/"))
  assert.ok(overviewPage.includes("doc.has_pdf"), "overview should show download from has_pdf")
  assert.ok(!overviewPage.includes('target="_blank" rel="noreferrer">\\n                        <Button size="sm" variant="outline">PDF</Button>'))
})

test("dashboard routes for Solo release exist", () => {
  const routes = [
    "src/app/dashboard/page.tsx",
    "src/app/dashboard/layout.tsx",
    "src/app/dashboard/documents/page.tsx",
    "src/app/dashboard/clients/page.tsx",
    "src/app/dashboard/profile/page.tsx",
    "src/app/dashboard/billing/page.tsx",
  ]

  for (const route of routes) {
    assert.doesNotThrow(() => statSync(join(root, route)), `${route} should exist`)
  }
})

test("dashboard pages call authenticated backend endpoints", () => {
  const expectations = {
    "src/app/dashboard/layout.tsx": "/api/auth/me",
    "src/app/dashboard/page.tsx": "/finance/api/dashboard/overview/",
    "src/app/dashboard/documents/page.tsx": "/finance/api/dashboard/documents/",
    "src/app/dashboard/clients/page.tsx": "/finance/api/dashboard/clients/",
    "src/app/dashboard/profile/page.tsx": "/api/profile/",
    "src/app/dashboard/billing/page.tsx": "/finance/api/dashboard/billing/",
  }

  for (const [file, endpoint] of Object.entries(expectations)) {
    assert.ok(read(file).includes(endpoint), `${file} should call ${endpoint}`)
  }
})

test("old placeholder WhatsApp number is not present in frontend source", () => {
  const offenders = walkFiles(srcRoot)
    .filter((file) => /\.(ts|tsx|js|jsx)$/.test(file))
    .filter((file) => readFileSync(file, "utf8").includes("2348012345678"))

  assert.deepEqual(offenders, [])
})

test("dashboard layout exposes primary sections and mobile navigation", () => {
  const layout = read("src/app/dashboard/layout.tsx")
  for (const label of ["Overview", "Documents", "Clients", "Profile", "Billing"]) {
    assert.ok(layout.includes(label), `missing nav label ${label}`)
  }
  assert.match(layout, /overflow-x-auto/)
  assert.match(layout, /md:inset-y-0/)
  assert.match(layout, /hidden\s+md:flex|hidden\s+lg:flex|md:block|lg:block/)
  assert.match(layout, /md:hidden/)
})

let failed = 0
for (const { name, fn } of checks) {
  try {
    fn()
    console.log(`ok - ${name}`)
  } catch (error) {
    failed += 1
    console.error(`not ok - ${name}`)
    console.error(error)
  }
}

if (failed > 0) {
  process.exitCode = 1
} else {
  console.log(`\n${checks.length} dashboard frontend checks passed.`)
}
