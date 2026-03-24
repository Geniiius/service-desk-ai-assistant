# Contributing

Thank you for your interest in Service Desk AI Assistant.

## Setup

1. Fork and clone the repo
2. `chrome://extensions/` → Developer Mode → Load unpacked
3. Get a free Groq API key at [console.groq.com](https://console.groq.com)

No build tools needed — the extension runs directly from source.

## Architecture

| File | Role |
|------|------|
| `manifest.json` | Extension config, commands, permissions |
| `background.js` | Service Worker — API proxy, context menus, shortcuts |
| `content.js` | Injected UI — panel, agents, i18n, history, iteration |
| `popup.html` | Manual injection fallback |

## Conventions

- **JS:** ES6+, strict mode, zero dependencies
- **CSS:** Custom properties for theming, no preprocessors
- **DOM IDs:** `sdw-` prefix (avoids host page conflicts)
- **Storage:** `chrome.storage.local` only
- **Security:** API calls through Service Worker, all content escaped

## Adding a Language

1. Add key to `I18N` object in `content.js` (reference: `I18N.fr`)
2. Add `<option>` in language selector
3. Test all UI labels switch correctly

## Commits

[Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add German language support
fix: panel overflow on small screens
docs: update installation guide
```

## PR Checklist

- [ ] Follows existing code style
- [ ] No new dependencies
- [ ] Tested on 3+ different websites
- [ ] No `console.log` in production
- [ ] API key never exposed to page context
- [ ] i18n: translations exist for FR, EN, ES
