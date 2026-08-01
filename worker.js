const jsonHeaders = {
  'Content-Type': 'application/json;charset=UTF-8',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const method = request.method.toUpperCase();

    if (url.pathname === '/api' || url.pathname === '/api/') {
      return new Response(JSON.stringify({
        message: 'Emberstone API is ready.',
        status: 'ok'
      }), { headers: jsonHeaders });
    }

    if (url.pathname === '/api/whitelist') {
      if (method === 'OPTIONS') {
        return new Response(null, { headers: jsonHeaders });
      }

      if (method === 'POST') {
        const data = await request.json().catch(() => null);
        const name = data?.name || 'Whitelist Interessent';

        return new Response(JSON.stringify({
          message: `Danke ${name}, deine Whitelist-Anfrage wurde empfangen.`,
          success: true,
          payload: data
        }), { headers: jsonHeaders });
      }

      return new Response(JSON.stringify({ error: 'Nur POST für diesen Endpunkt erlaubt.' }), {
        status: 405,
        headers: jsonHeaders
      });
    }

    return new Response(JSON.stringify({ error: 'Nicht gefunden' }), {
      status: 404,
      headers: jsonHeaders
    });
  }
};
