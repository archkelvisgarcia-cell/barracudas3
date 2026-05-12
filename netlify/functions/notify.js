// Netlify Function: OneSignal notification sender
// Required env vars: ONESIGNAL_APP_ID, ONESIGNAL_API_KEY
// Get these from onesignal.com after creating your app

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const appId  = process.env.ONESIGNAL_APP_ID;
  const apiKey = process.env.ONESIGNAL_API_KEY;

  if (!appId || !apiKey) {
    return {
      statusCode: 503,
      body: JSON.stringify({ error: 'ONESIGNAL_APP_ID or ONESIGNAL_API_KEY not configured' }),
    };
  }

  let body;
  try { body = JSON.parse(event.body); } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const { title, message, url } = body;
  if (!title || !message) {
    return { statusCode: 400, body: JSON.stringify({ error: 'title and message required' }) };
  }

  try {
    const payload = {
      app_id: appId,
      included_segments: ['All'],
      headings: { en: title },
      contents: { en: message },
      ...(url && { url }),
    };

    const res = await fetch('https://onesignal.com/api/v1/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.errors?.[0] || 'OneSignal error');

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, recipients: data.recipients }),
    };
  } catch (e) {
    return {
      statusCode: 502,
      body: JSON.stringify({ error: e.message }),
    };
  }
};
