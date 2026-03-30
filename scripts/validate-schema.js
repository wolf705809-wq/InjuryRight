/**
 * Schema JSON-LD validation script
 * Usage: node scripts/validate-schema.js
 * Or via: npm run validate:schema
 *
 * Checks that key pages have valid JSON-LD by parsing the build output.
 * For a running server, set BASE_URL env var.
 */

const https = require('https')
const http = require('http')

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

const TEST_PAGES = [
  { path: '/', expectedTypes: ['WebSite'] },
  { path: '/calculator', expectedTypes: ['WebApplication', 'HowTo'] },
  { path: '/workers-comp-statistics', expectedTypes: ['Dataset'] },
  { path: '/california', expectedTypes: ['LegalService', 'FAQPage', 'BreadcrumbList'] },
  { path: '/california/construction/back-injury', expectedTypes: ['FAQPage', 'BreadcrumbList', 'Article'] },
]

function fetch(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http
    client.get(url, (res) => {
      let data = ''
      res.on('data', chunk => (data += chunk))
      res.on('end', () => resolve({ status: res.statusCode, body: data }))
    }).on('error', reject)
  })
}

function extractJsonLd(html) {
  const schemas = []
  const regex = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi
  let match
  while ((match = regex.exec(html)) !== null) {
    try {
      const parsed = JSON.parse(match[1])
      if (Array.isArray(parsed)) {
        schemas.push(...parsed)
      } else {
        schemas.push(parsed)
      }
    } catch {
      // skip malformed
    }
  }
  return schemas
}

async function validatePage({ path, expectedTypes }) {
  const url = `${BASE_URL}${path}`
  let res
  try {
    res = await fetch(url)
  } catch (err) {
    console.error(`  ✗ FETCH ERROR ${url}: ${err.message}`)
    return false
  }

  if (res.status !== 200) {
    console.error(`  ✗ HTTP ${res.status} for ${url}`)
    return false
  }

  const schemas = extractJsonLd(res.body)
  const foundTypes = schemas.map(s => s['@type']).filter(Boolean)

  let ok = true
  for (const type of expectedTypes) {
    if (foundTypes.includes(type)) {
      console.log(`  ✓ ${type} found on ${path}`)
    } else {
      console.error(`  ✗ MISSING ${type} on ${path} (found: ${foundTypes.join(', ') || 'none'})`)
      ok = false
    }
  }
  return ok
}

async function main() {
  console.log(`\nValidating JSON-LD schemas against ${BASE_URL}\n`)
  let allOk = true

  for (const page of TEST_PAGES) {
    console.log(`Checking ${page.path}:`)
    const ok = await validatePage(page)
    if (!ok) allOk = false
  }

  if (allOk) {
    console.log('\n✓ All schema validations passed.\n')
    process.exit(0)
  } else {
    console.error('\n✗ Some schema validations failed. Fix before deploying.\n')
    process.exit(1)
  }
}

main()
