type FetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
  query?: Record<string, string | number | boolean | undefined>;
};

// PUBLIC_INTERFACE
export function useApi() {
  /**
   * Wrapper around $fetch with base URL from runtime config.
   * Use this from components when backend is available.
   */
  const config = useRuntimeConfig();
  const baseURL = config.public.apiBase || '';

  // PUBLIC_INTERFACE
  async function apiFetch<T = any>(path: string, opts: FetchOptions = {}): Promise<T> {
    const url = `${baseURL}${path}`;
    const headers = { 'Content-Type': 'application/json', ...(opts.headers || {}) };
    const query = opts.query || undefined;
    const method = opts.method || 'GET';
    const body = opts.body ? JSON.stringify(opts.body) : undefined;

    return await $fetch<T>(url, { method, headers, query, body });
  }

  return { apiFetch, baseURL };
}
