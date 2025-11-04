export class ApiError extends Error {
  constructor(public status: number, msg: string) {
    super(msg);
  }
}

function getApiBaseUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl || !baseUrl.trim()) {
    throw new Error("Missing NEXT_PUBLIC_API_BASE_URL environment variable");
  }
  return baseUrl.replace(/\/$/, "");
}

export function buildApiUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const url = buildApiUrl(path);
  const res = await fetch(url, init);
  if (!res.ok) throw new ApiError(res.status, res.statusText);
  return res.json() as Promise<T>;
}
