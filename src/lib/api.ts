import func2url from "../../backend/func2url.json";

const AUTH_URL = func2url.auth;
const TOKEN_KEY = "family_token";

export interface User {
  id: number;
  name: string;
  phone: string;
  avatar: string;
  status_text: string;
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

async function authCall(body: object): Promise<{ data?: unknown; error?: string; status: number }> {
  const token = getToken();
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["X-Session-Token"] = token;

  const res = await fetch(AUTH_URL, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return { data, status: res.status };
}

export async function login(phone: string, password: string): Promise<{ user?: User; error?: string }> {
  const res = await authCall({ action: "login", phone, password });
  if (res.status === 200 && (res.data as { token: string }).token) {
    const d = res.data as { token: string; user: User };
    setToken(d.token);
    return { user: d.user };
  }
  return { error: (res.data as { error: string }).error || "Ошибка входа" };
}

export async function register(name: string, phone: string, password: string, avatar: string): Promise<{ user?: User; error?: string }> {
  const res = await authCall({ action: "register", name, phone, password, avatar });
  if (res.status === 200 && (res.data as { token: string }).token) {
    const d = res.data as { token: string; user: User };
    setToken(d.token);
    return { user: d.user };
  }
  return { error: (res.data as { error: string }).error || "Ошибка регистрации" };
}

export async function checkSession(): Promise<{ user?: User; error?: string }> {
  const token = getToken();
  if (!token) return { error: "no token" };
  const res = await authCall({ action: "me" });
  if (res.status === 200) {
    return { user: (res.data as { user: User }).user };
  }
  clearToken();
  return { error: "session expired" };
}

export async function logout(): Promise<void> {
  await authCall({ action: "logout" });
  clearToken();
}
