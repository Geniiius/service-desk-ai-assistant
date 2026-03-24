# Changelog

All notable changes documented here. Format: [Keep a Changelog](https://keepachangelog.com/).

## [13.0.0] — 2025-06-15

### Added — Critical (P0)
- **Onboarding wizard** — Guided first-launch: API key, language, animated welcome screen
- **Keyboard shortcut** — `Ctrl+Shift+Q` / `Cmd+Shift+Q` toggles the panel
- **Inject button** — "↩ INJECT" inserts result directly into the page's text field

### Added — High Impact (P1)
- **Generation history** — 50 entries stored locally, dedicated History tab with reload
- **Conversational iteration** — "Refine" input for multi-turn refinement ("shorter", "more formal"...)
- **Context menu** — Right-click → Service Desk AI → 5 quick agents on selected text
- **Global system instruction** — Custom instruction prepended to every agent's prompt
- **Token usage tracking** — Per-generation count + monthly total in footer
- **Multi-turn API** — Background supports full conversation history for iteration

### Changed
- Storage migrated to `sdw_quantum_v13` (auto-migration from v12)
- Settings drawer: 3 rows (API key, model + language, global instruction)
- Tab navigation: Agents + History
- Permission added: `contextMenus`
- Manifest: `commands` for keyboard shortcut
- Rebranded to **Service Desk AI Assistant** (removed all previous branding)

## [12.5.0] — 2025-06-01

### Added
- Multilingual UI (FR/EN/ES) with auto-translated default prompts
- Visual emoji picker for custom agents
- Language selector in settings

### Changed
- Universal on all pages — no domain restrictions
- Removed all domain-specific references
- Universal page reader (selection → active field → forms → main content)

## [12.0.0] — 2025-05-20

### Added
- Secure API proxy via Service Worker
- Smart page content reader
- Site badge in panel header
- XSS escaping on all content

### Changed
- API calls moved from content.js to background.js (security)
- Panel max-height with proper scroll behavior
- Edit buttons repositioned as overlay (no layout overflow)

## [11.7.5] — 2025-05-05

### Added
- Holographic FAB with scanner animation
- 4 themes: Midnight, Obsidian, Aurora, Ivory
- Edit mode toggle with CRUD operations
- Agent creation/editing modal
- API test button
- `chrome.storage.local` for MDM compatibility
