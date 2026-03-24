# Security Policy

## Supported Versions

| Version | Status |
|---------|--------|
| 13.x | ✅ Active |
| < 13 | ❌ EOL |

## Reporting Vulnerabilities

**Do not create a public issue.** Contact the maintainer directly:

- **Email:** activaa.ya@gmail.com
- **Subject:** `[SECURITY] Service Desk AI — Brief description`

Response: acknowledgment within 48h, fix within 14 days for critical issues.

## Security Architecture

1. **Zero-trust content script** — The content script never handles secrets or makes external requests
2. **Service Worker proxy** — All Groq API calls go through `background.js`, which validates inputs and manages the API key
3. **DOM escaping** — All user content is HTML-escaped via `textContent` before insertion
4. **Minimal permissions** — Only `activeTab`, `scripting`, `storage`, `contextMenus`
5. **CSP enforced** — `script-src 'self'` on extension pages
6. **Input limits** — Content truncated to 50K characters, API key format validated (`gsk_*`)
