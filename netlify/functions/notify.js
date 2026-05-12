// OneSignal notification sender
// App ID is public — hardcoded here.
// REST API Key must be set: ONESIGNAL_REST_API_KEY in Netlify env vars
// Get it from: onesignal.com → Settings → Keys & IDs → REST API Key

const APP_ID = 'd367a901-afe3-4035-9417-794e6e80fcd4';
const BASE_URL = 'https://barracudas3.netlify.app';

async function sendOneSignal({ title, message, url, type }) {
  const apiKey = process.env.ONESIGNAL_REST_API_KEY || process.env.ONESIGNAL_API_KEY;
  if (!apiKey) throw new Error('ONESIGNAL_REST_API_KEY not configured');

  const payload = {
    app_id:            APP_ID,
    included_segments: ['All'],
    headings:          { en: title },
    contents:          { en: message },
    url:               url ? (url.startsWith('http') ? url : BASE_URL + url) : BASE_URL,
    chrome_web_icon:   BASE_URL + '/assets/logo.png',
    ...(type && { data: { type } }),
  };

  const res  = await fetch('https://onesignal.com/api/v1/notifications', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Basic ${apiKey}` },
    body:    JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.errors?.[0] || `OneSignal HTTP ${res.status}`);
  return data;
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  let body;
  try { body = JSON.parse(event.body); } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const { title, message, url, type } = body;
  if (!title || !message) {
    return { statusCode: 400, body: JSON.stringify({ error: 'title and message required' }) };
  }

  try {
    const data = await sendOneSignal({ title, message, url, type });
    return { statusCode: 200, body: JSON.stringify({ success: true, recipients: data.recipients }) };
  } catch (e) {
    return { statusCode: 502, body: JSON.stringify({ error: e.message }) };
  }
};

// Export helper so other functions can import it
exports.sendOneSignal = sendOneSignal;
