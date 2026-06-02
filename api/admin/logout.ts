import { clearSessionCookie } from '../_lib/auth.js';
import { allowOnly, setJsonHeaders } from '../_lib/http.js';
import type { ApiRequest, ApiResponse } from '../_lib/http.js';

export default function handler(req: ApiRequest, res: ApiResponse) {
  setJsonHeaders(res);
  if (allowOnly(req, res, ['POST'])) return;

  res.setHeader('Set-Cookie', clearSessionCookie());
  res.status(200).json({ ok: true });
}
