// Cloudflare Pages Function: POST /api/ai
// Reads receipt photos and plans baskets with Google Gemini. Only signed-in SastaCheck users may call it.
// Environment variables (Cloudflare Pages > Settings > Variables and Secrets):
//   GEMINI_API_KEY (secret), SUPABASE_URL, SUPABASE_ANON_KEY, optional GEMINI_MODEL.

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

async function signedIn(request, env) {
  const auth = request.headers.get('authorization') || '';
  if (!auth.startsWith('Bearer ')) return false;
  const r = await fetch(`${env.SUPABASE_URL}/auth/v1/user`, {
    headers: { authorization: auth, apikey: env.SUPABASE_ANON_KEY },
  });
  return r.ok;
}

export async function onRequestPost({ request, env }) {
  if (!env.GEMINI_API_KEY) return json({ error: 'AI is not set up yet.' }, 503);
  if (!(await signedIn(request, env))) return json({ error: 'Sign in to use AI features.' }, 401);

  let body;
  try { body = await request.json(); } catch { return json({ error: 'Bad request.' }, 400); }
  const { prompt, image, mimeType } = body || {};
  if (typeof prompt !== 'string' || prompt.length > 20000) return json({ error: 'Bad request.' }, 400);
  if (image && (typeof image !== 'string' || image.length > 7_000_000)) return json({ error: 'Photo is too large. Use one under 5 MB.' }, 413);

  const parts = [{ text: prompt }];
  if (image) parts.push({ inline_data: { mime_type: mimeType || 'image/jpeg', data: image } });

  const model = env.GEMINI_MODEL || 'gemini-2.5-flash';
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY },
    body: JSON.stringify({ contents: [{ parts }], generationConfig: { responseMimeType: 'application/json', temperature: 0.2 } }),
  });
  if (r.status === 429) return json({ error: 'The free AI limit for today is used up. Try again tomorrow.' }, 429);
  if (!r.ok) return json({ error: 'The AI service did not answer. Try again.' }, 502);

  const data = await r.json();
  const text = data?.candidates?.[0]?.content?.parts?.map(p => p.text || '').join('') || '';
  try { return json({ result: JSON.parse(text) }); }
  catch { return json({ error: 'The AI reply could not be read. Try again.' }, 502); }
}
