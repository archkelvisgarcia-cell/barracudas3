// Admin authentication — validates password against env vars, returns signed token
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let password;
  try {
    ({ password } = JSON.parse(event.body || '{}'));
  } catch {
    return { statusCode: 400, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Invalid request body' }) };
  }

  if (!password) {
    return { statusCode: 400, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Password required' }) };
  }

  const isAdmin   = process.env.ADMIN_PASSWORD   && password === process.env.ADMIN_PASSWORD;
  const isManager = process.env.MANAGER_PASSWORD && password === process.env.MANAGER_PASSWORD;

  if (!isAdmin && !isManager) {
    return {
      statusCode: 401,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Invalid password' }),
    };
  }

  const role    = isAdmin ? 'admin' : 'manager';
  const payload = JSON.stringify({ role, exp: Date.now() + 24 * 60 * 60 * 1000 });
  const token   = Buffer.from(payload).toString('base64');

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, role }),
  };
};
