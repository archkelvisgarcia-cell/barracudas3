// OneSignal push notification sender
// Uses ONESIGNAL_REST_API_KEY from Netlify environment variables.
// App ID is public — hardcoded here.
//
// POST body: { title, message, url?, type? }
// Called by: admin panel, auto-triggers (live score, new result, new article)

const APP_ID  = 'd367a901-afe3-4035-9417-794e6e80fcd4';
const SITE    = 'https://barracudas3.netlify.app';
const API_URL = 'https://onesignal.com/api/v1/notifications';

async function sendPush({ title, message, url, type }) {
  const apiKey = process.env.ONESIGNAL_REST_API_KEY;
  if (!apiKey) throw new Error('ONESIGNAL_REST_API_KEY not configured in Netlify env vars');

  const res = await fetch(API_URL, {
    method:  'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization:  `Basic ${apiKey}`,
    },
    body: JSON.stringify({
      app_id:            APP_ID,
      included_segments: ['All'],
      headings:          { en: title },
      contents:          { en: message },
      url:               url ? (url.startsWith('http') ? url : SITE + url) : SITE,
      chrome_web_icon:   `${SITE}/assets/logo.png`,
      ...(type && { data: { type } }),
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.errors?.[0] || `OneSignal HTTP ${res.status}`);
  return data;
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let body;
  try { body = JSON.parse(event.body); } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }

  const { title, message, url, type } = body;
  if (!title || !message) {
    return { statusCode: 400, body: JSON.stringify({ error: 'title and message are required' }) };
  }

  try {
    const result = await sendPush({ title, message, url, type });
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, recipients: result.recipients }),
    };
  } catch (e) {
    return {
      statusCode: 502,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: e.message }),
    };
  }
};

// Exported for use by other Netlify functions
exports.sendPush = sendPush;
