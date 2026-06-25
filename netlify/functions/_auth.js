// Shared admin auth helper — HMAC-signed tokens (no plain base64!).
// Prefixed with "_" so Netlify does not deploy this as a public endpoint.
const crypto = require('crypto');

function getSecret() {
  // Signing secret derived from the admin/manager passwords already kept
  // in Netlify env vars — no extra env var to configure.
  const secret = process.env.ADMIN_PASSWORD || process.env.MANAGER_PASSWORD;
  if (!secret) throw new Error('ADMIN_PASSWORD/MANAGER_PASSWORD not configured');
  return secret;
}

function sign(payload) {
  // Plain base64 (not base64url) for the payload so the browser's built-in
  // atob() can decode it client-side without extra translation.
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64');
  const sig = crypto.createHmac('sha256', getSecret()).update(payloadB64).digest('base64url');
  return `${payloadB64}.${sig}`;
}

function verify(token) {
  if (!token || typeof token !== 'string' || !token.includes('.')) return null;
  const [payloadB64, sig] = token.split('.');
  if (!payloadB64 || !sig) return null;

  let expectedSig;
  try {
    expectedSig = crypto.createHmac('sha256', getSecret()).update(payloadB64).digest('base64url');
  } catch {
    return null;
  }

  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) return null;

  let payload;
  try {
    payload = JSON.parse(Buffer.from(payloadB64, 'base64').toString('utf8'));
  } catch {
    return null;
  }
  if (!payload.exp || payload.exp < Date.now()) return null;
  return payload;
}

// Reads "Authorization: Bearer <token>" from a Netlify function event and
// returns the verified payload ({role, exp}), or null if missing/invalid.
function requireAuth(event) {
  const header = (event.headers && (event.headers.authorization || event.headers.Authorization)) || '';
  const token = header.replace(/^Bearer\s+/i, '').trim();
  return verify(token);
}

// True if this invocation was triggered by Netlify's own cron scheduler
// (not a user request) — used by functions that are both scheduled AND
// manually triggerable from the admin panel.
function isScheduledInvocation(event) {
  return !!(event.headers && event.headers['x-netlify-event'] === 'schedule');
}

module.exports = { sign, verify, requireAuth, isScheduledInvocation };
