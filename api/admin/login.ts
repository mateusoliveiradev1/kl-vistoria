import { createSessionCookie, isAdminConfigured } from '../_lib/auth.js';
import { allowOnly, getBody, setJsonHeaders, toText } from '../_lib/http.js';
import type { ApiRequest, ApiResponse } from '../_lib/http.js';

export default function handler(req: ApiRequest, res: ApiResponse) {
  setJsonHeaders(res);
  if (allowOnly(req, res, ['POST'])) return;

  if (!isAdminConfigured()) {
    res.status(503).json({ ok: false, error: 'admin_not_configured' });
    return;
  }

  const body = getBody(req);
  const password = toText(body.password);

  if (password !== process.env.ADMIN_PASSWORD) {
    res.status(401).json({ ok: false, error: 'invalid_credentials' });
    return;
  }

  res.setHeader('Set-Cookie', createSessionCookie());
  res.status(200).json({ ok: true });
}
