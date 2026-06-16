const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

function buildUrl(path: string) {
  const baseUrl = API_BASE_URL.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${baseUrl}${normalizedPath}`;
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(buildUrl(path), {
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    ...init,
  });

  if (!response.ok) {
    throw new Error(`Erro ao carregar dados da API (${response.status})`);
  }

  return response.json() as Promise<T>;
}
