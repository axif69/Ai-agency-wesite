import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// ─── File logging (Bug 9 fix) ─────────────────────────────────────────────────
// Streams ALL console output to daily rotating log files under ./logs while keeping
// terminal output intact. Every worker + the server import this module, so installing
// the console patch here (at import time) captures the whole engine in one place.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOG_DIR = path.join(__dirname, 'logs');
const LOG_RETENTION_DAYS = 14;

function ensureLogDir() {
  try {
    if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });
  } catch { /* best effort */ }
}

function todayStamp() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function appendToLog(line) {
  ensureLogDir();
  const file = path.join(LOG_DIR, `engine-${todayStamp()}.log`);
  try {
    fs.appendFileSync(file, line + '\n');
  } catch { /* best effort — never crash a worker on log failure */ }
}

function pruneOldLogs() {
  ensureLogDir();
  try {
    const cutoff = Date.now() - LOG_RETENTION_DAYS * 86400000;
    for (const name of fs.readdirSync(LOG_DIR)) {
      if (!/^engine-\d{4}-\d{2}-\d{2}\.log$/.test(name)) continue;
      const m = name.match(/^engine-(\d{4})-(\d{2})-(\d{2})\.log$/);
      const ts = Date.parse(`${m[1]}-${m[2]}-${m[3]}T00:00:00Z`);
      if (Number.isFinite(ts) && ts < cutoff) {
        try { fs.unlinkSync(path.join(LOG_DIR, name)); } catch { /* ignore */ }
      }
    }
  } catch { /* best effort */ }
}

function safeStringify(arg) {
  try {
    const s = JSON.stringify(arg);
    return s === undefined ? String(arg) : s;
  } catch {
    return String(arg);
  }
}

function installConsoleFileLogging() {
  const originals = {
    log: console.log.bind(console),
    error: console.error.bind(console),
    warn: console.warn.bind(console),
    info: console.info.bind(console),
    debug: console.debug.bind(console),
  };

  const wrap = (method, level) => (...args) => {
    try {
      const msg = args.map((a) => (typeof a === 'string' ? a : safeStringify(a))).join(' ');
      appendToLog(`[${new Date().toISOString()}] [${level}] [pid:${process.pid}] ${msg}`);
    } catch { /* never let logging break the caller */ }
    return originals[method](...args);
  };

  console.log = wrap('log', 'LOG');
  console.error = wrap('error', 'ERROR');
  console.warn = wrap('warn', 'WARN');
  console.info = wrap('info', 'INFO');
  console.debug = wrap('debug', 'DEBUG');

  ensureLogDir();
  pruneOldLogs();
}

installConsoleFileLogging();

// ─── Helpers ──────────────────────────────────────────────────────────────────
export function sanitizeText(text) {
  if (!text) return '';
  return String(text).trim().replace(/\s+/g, ' ');
}

export function isValidEmailSyntax(email) {
  if (!email || typeof email !== 'string') return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function logToDashboard(msg, level = 'info') {
  const timestamp = new Date().toISOString().substring(11, 19);
  console.log(`[${timestamp}] [${level.toUpperCase()}] ${msg}`);
}

export function randomUA() {
  const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
  ];
  return userAgents[Math.floor(Math.random() * userAgents.length)];
}
