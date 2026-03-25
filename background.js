/**
 * Service Desk AI Assistant — Background Service Worker
 * v13.0.0 — Full Feature Architecture
 * 
 * Features: Secure API proxy, context menus, keyboard shortcuts,
 * multi-turn conversation support, token usage tracking.
 */
'use strict';

// ═══════════════════════════════════════════
// --- INITIALISATION ---
// ═══════════════════════════════════════════
chrome.runtime.onInstalled.addListener((details) => {


  // Context menu
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: 'sdw-parent',
      title: '🤖 Service Desk AI',
      contexts: ['selection']
    });
    chrome.contextMenus.create({ id: 'sdw-correct', parentId: 'sdw-parent', title: '🔍 Corriger', contexts: ['selection'] });
    chrome.contextMenus.create({ id: 'sdw-rephrase', parentId: 'sdw-parent', title: '🔄 Reformuler', contexts: ['selection'] });
    chrome.contextMenus.create({ id: 'sdw-formal', parentId: 'sdw-parent', title: '🏢 Ton professionnel', contexts: ['selection'] });
    chrome.contextMenus.create({ id: 'sdw-friendly', parentId: 'sdw-parent', title: '😊 Ton amical', contexts: ['selection'] });
    chrome.contextMenus.create({ id: 'sdw-summary', parentId: 'sdw-parent', title: '💡 Points clés', contexts: ['selection'] });
  });

  if (details.reason === 'install') {
    chrome.storage.local.set({
      sdw_quantum_v13: {
        apiKey: '', model: 'llama-3.3-70b-versatile', theme: 'midnight', lang: 'fr',
        globalInstruction: '', buttons: null, onboarded: false,
        useScraping: false, useRag: false, ragUrl: '', scrapUrl: '',
        history: [], tokenUsage: { total: 0, month: new Date().getMonth() }
      }
    });
  }
});

// ═══════════════════════════════════════════
// --- CONTEXT MENU HANDLER ---
// ═══════════════════════════════════════════
const CTX_PROMPTS = {
  'sdw-correct': 'Fix spelling and grammar. Keep the same meaning and tone. Reply in the same language as the input.',
  'sdw-rephrase': 'Rephrase to improve clarity and readability. Reply in the same language as the input.',
  'sdw-formal': 'Rewrite in a formal, professional style. Reply in the same language as the input.',
  'sdw-friendly': 'Rewrite with a friendly and approachable tone. Reply in the same language as the input.',
  'sdw-summary': 'Summarize in 5 to 7 concise key points. Reply in the same language as the input.'
};

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (!CTX_PROMPTS[info.menuItemId] || !tab?.id) return;
  chrome.tabs.sendMessage(tab.id, {
    action: 'context_menu_action',
    prompt: CTX_PROMPTS[info.menuItemId],
    text: info.selectionText
  });
});

// ═══════════════════════════════════════════
// --- KEYBOARD SHORTCUT ---
// ═══════════════════════════════════════════
chrome.commands.onCommand.addListener((command, tab) => {
  if (command === 'toggle-panel' && tab?.id) {
    chrome.tabs.sendMessage(tab.id, { action: 'toggle_panel' });
  }
});

// ═══════════════════════════════════════════
// --- MESSAGE ROUTER ---
// ═══════════════════════════════════════════
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  switch (msg.action) {
    case 'inject':
      handleInject(sendResponse);
      return true;
    case 'groq_request':
      handleGroqRequest(msg, sendResponse);
      return true;
    case 'test_api':
      handleTestApi(msg, sendResponse);
      return true;
    case 'scrape_url':
      handleScrapeUrl(msg, sendResponse);
      return true;
    default:
      return false;
  }
});

// ═══════════════════════════════════════════
// --- INJECTION MANUELLE ---
// ═══════════════════════════════════════════
function handleInject(sendResponse) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0]?.id) { sendResponse({ ok: false, err: 'No active tab' }); return; }
    const url = tabs[0].url || '';
    if (url.startsWith('chrome://') || url.startsWith('chrome-extension://') || url.startsWith('about:')) {
      sendResponse({ ok: false, err: 'Cannot inject on system pages' }); return;
    }
    chrome.scripting.executeScript({ target: { tabId: tabs[0].id }, files: ['content.js'] })
      .then(() => sendResponse({ ok: true }))
      .catch(err => sendResponse({ ok: false, err: err.message }));
  });
  return true;
}

// ═══════════════════════════════════════════
// --- PROXY GROQ API (multi-turn + tokens) ---
// ═══════════════════════════════════════════
async function handleGroqRequest(msg, sendResponse) {
  try {
    const { apiKey, model, messages, systemPrompt, userContent, globalInstruction, useRag, ragUrl } = msg;

    if (!useRag && (!apiKey || typeof apiKey !== 'string' || !apiKey.startsWith('gsk_'))) {
      sendResponse({ ok: false, error: 'Invalid API key. Expected format: gsk_...' }); return;
    }

    // Build messages array — support both legacy single-shot and multi-turn
    let apiMessages = [];

    // System prompt with optional global instruction
    let sysContent = systemPrompt || '';
    if (globalInstruction) {
      sysContent = globalInstruction + '\n\n' + sysContent;
    }
    if (sysContent) {
      apiMessages.push({ role: 'system', content: sysContent });
    }

    if (messages && Array.isArray(messages)) {
      // Multi-turn: messages already contains the conversation
      apiMessages = apiMessages.concat(messages);
    } else if (userContent) {
      // Legacy single-shot
      apiMessages.push({ role: 'user', content: userContent.substring(0, 50000) });
    } else {
      sendResponse({ ok: false, error: 'No content provided.' }); return;
    }

    const endpoint = useRag && ragUrl ? ragUrl : 'https://api.groq.com/openai/v1/chat/completions';
    const authHeader = useRag && ragUrl ? `Bearer ${(apiKey || '').trim()}` : `Bearer ${apiKey.trim()}`;
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model || 'llama-3.3-70b-versatile',
        messages: apiMessages,
        temperature: 0.6,
        max_tokens: 4096
      })
    });

    if (!response.ok) {
      const errBody = await response.text();
      sendResponse({ ok: false, error: `Groq API: ${response.status} — ${parseApiError(errBody)}` }); return;
    }

    const data = await response.json();
    const result = data?.choices?.[0]?.message?.content;
    if (!result) { sendResponse({ ok: false, error: 'Empty response from model.' }); return; }

    // Token usage
    const usage = data?.usage || {};
    sendResponse({
      ok: true,
      result,
      tokens: {
        input: usage.prompt_tokens || 0,
        output: usage.completion_tokens || 0,
        total: usage.total_tokens || 0
      }
    });

  } catch (err) {
    sendResponse({ ok: false, error: `Network error: ${err.message}` });
  }
}

// ═══════════════════════════════════════════
// --- SCRAPE URL ---
// ═══════════════════════════════════════════
async function handleScrapeUrl(msg, sendResponse) {
  try {
    if (!msg.url || !msg.url.startsWith('http')) {
      sendResponse({ ok: false, error: 'Invalid URL' }); return;
    }
    const response = await fetch(msg.url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const html = await response.text();
    // Basic DOM sanitation to extract raw text safely in background
    const text = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
                     .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
                     .replace(/<[^>]+>/g, ' ')
                     .replace(/\s+/g, ' ')
                     .trim()
                     .substring(0, 15000);
    sendResponse({ ok: true, text });
  } catch (err) {
    sendResponse({ ok: false, error: err.message });
  }
}

// ═══════════════════════════════════════════
// --- TEST API ---
// ═══════════════════════════════════════════
async function handleTestApi(msg, sendResponse) {
  try {
    const { apiKey } = msg;
    if (!apiKey || !apiKey.startsWith('gsk_')) { sendResponse({ ok: false, error: 'Invalid key format' }); return; }
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey.trim()}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'llama-3.1-8b-instant', messages: [{ role: 'user', content: 'ping' }], max_tokens: 5 })
    });
    sendResponse({ ok: response.ok, status: response.status });
  } catch (err) { sendResponse({ ok: false, error: err.message }); }
}

function parseApiError(body) {
  try { return JSON.parse(body)?.error?.message || 'Unknown error'; } catch { return body.substring(0, 200); }
}
