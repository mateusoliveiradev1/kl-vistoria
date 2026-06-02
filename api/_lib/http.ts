export type ApiRequest = {
  method?: string;
  body?: unknown;
  query?: Record<string, string | string[] | undefined>;
  headers: Record<string, string | string[] | undefined>;
};

export type ApiResponse = {
  status: (statusCode: number) => ApiResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string | string[]) => void;
};

export function allowOnly(req: ApiRequest, res: ApiResponse, methods: string[]) {
  if (req.method && methods.includes(req.method)) return false;

  res.status(405).json({ ok: false, error: 'method_not_allowed' });
  return true;
}

export function getBody(req: ApiRequest) {
  if (!req.body) return {};
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body) as Record<string, unknown>;
    } catch {
      return {};
    }
  }
  return req.body as Record<string, unknown>;
}

export function getClientCookie(req: ApiRequest, name: string) {
  const raw = req.headers.cookie;
  const cookie = Array.isArray(raw) ? raw.join('; ') : raw || '';
  const match = cookie
    .split(';')
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${name}=`));

  return match ? decodeURIComponent(match.slice(name.length + 1)) : '';
}

export function setJsonHeaders(res: ApiResponse) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
}

export function toText(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

