import crypto from 'node:crypto';
import type { ApiRequest, ApiResponse } from './http.js';
import { getClientCookie } from './http.js';

const COOKIE_NAME = 'kl_admin_session';
const SESSION_TTL_MS = 1000 * 60 * 60 * 8;

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || '';
}

function sign(payload: string) {
  return crypto.createHmac('sha256', getSecret()).update(payload).digest('base64url');
}

export function isAdminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD && getSecret());
}

export function createSessionCookie() {
  const payload = Buffer.from(
    JSON.stringify({
      role: 'admin',
      exp: Date.now() + SESSION_TTL_MS,
    })
  ).toString('base64url');
  const token = `${payload}.${sign(payload)}`;

  return `${COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=${SESSION_TTL_MS / 1000}`;
}

export function clearSessionCookie() {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=0`;
}

export function isAuthenticated(req: ApiRequest) {
  if (!isAdminConfigured()) return false;

  const token = getClientCookie(req, COOKIE_NAME);
  const [payload, signature] = token.split('.');
  if (!payload || !signature || sign(payload) !== signature) return false;

  try {
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as {
      role?: string;
      exp?: number;
    };

    return session.role === 'admin' && typeof session.exp === 'number' && session.exp > Date.now();
  } catch {
    return false;
  }
}

export function requireAdmin(req: ApiRequest, res: ApiResponse) {
  if (isAuthenticated(req)) return false;

  res.status(401).json({
    ok: false,
    error: isAdminConfigured() ? 'unauthorized' : 'admin_not_configured',
  });
  return true;
}
