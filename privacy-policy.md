# Privacy Policy — Service Desk AI Assistant

**Last updated:** June 2025

## Summary

Service Desk AI Assistant does **not** collect, store, or transmit any personal data. All data stays in your browser.

## What Data We Access

| Data | Where it stays | Purpose |
|------|---------------|---------|
| **Groq API key** | Your browser (`chrome.storage.local`) | Authenticate API calls you initiate |
| **Text you select/paste** | Your browser → Groq API (your key) | Generate AI responses you request |
| **Agent configurations** | Your browser (`chrome.storage.local`) | Save your custom AI agents |
| **Settings** (theme, language) | Your browser (`chrome.storage.local`) | Remember your preferences |
| **Generation history** | Your browser (`chrome.storage.local`) | Let you review past results |

## What We Do NOT Do

- ❌ We do **not** collect analytics or telemetry
- ❌ We do **not** have a backend server — there is no server to send data to
- ❌ We do **not** track browsing behavior or page visits
- ❌ We do **not** sell, share, or transfer any data to third parties
- ❌ We do **not** use cookies
- ❌ We do **not** require account creation

## Third-Party Services

The only external service used is **Groq API** (`api.groq.com`), which processes the text you submit using your own API key. Groq's privacy policy applies to data sent to their API: [groq.com/privacy-policy](https://groq.com/privacy-policy)

The extension communicates **only** with `api.groq.com`. No other external requests are made.

## Data Storage

All data is stored locally in your browser using `chrome.storage.local`. This storage:
- Is not synced to any cloud service
- Is not accessible by other extensions
- Is deleted when you uninstall the extension
- Can be cleared manually from the extension settings

## Open Source

This extension is fully open source under the MIT license. You can audit every line of code at the GitHub repository. There are no obfuscated scripts, no hidden network calls, no tracking pixels.

## Permissions Explained

| Permission | Why |
|-----------|-----|
| `activeTab` | Read text from the current page when you click "Read Page" |
| `scripting` | Inject the floating panel UI into web pages |
| `storage` | Save your settings, agents, and history locally |
| `contextMenus` | Add "Service Desk AI" to the right-click menu |
| `host_permissions: api.groq.com` | Send your text to Groq API for AI generation |

## Contact

For questions about this privacy policy, open an issue on the [GitHub repository](https://github.com/YOUR_USER/service-desk-ai-assistant).

## Changes

If this privacy policy changes, the update date at the top will reflect the change. Significant changes will be noted in the CHANGELOG.
