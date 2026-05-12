// Netlify Function: Instagram Basic Display API proxy
// Set INSTAGRAM_TOKEN in Netlify Environment Variables
// Token expires every 60 days — use /api/refresh-instagram to renew

exports.handler = async () => {
  const token = process.env.INSTAGRAM_TOKEN;

  if (!token) {
    return {
      statusCode: 503,
      body: JSON.stringify({ error: 'INSTAGRAM_TOKEN not configured' }),
    };
  }

  try {
    const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp';
    const url = `https://graph.instagram.com/me/media?fields=${fields}&limit=6&access_token=${token}`;

    const res = await fetch(url);
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error?.message || 'Instagram API error');
    }

    const data = await res.json();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600', // cache 1 hour
      },
      body: JSON.stringify(data),
    };
  } catch (e) {
    return {
      statusCode: 502,
      body: JSON.stringify({ error: e.message }),
    };
  }
};
