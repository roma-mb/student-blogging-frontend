const DEFAULT_API_BASE = 'https://api.example.com'

export function getApiBaseUrl(): string {
  const envUrl = import.meta.env.VITE_API_BASE_URL
  const raw =
    typeof envUrl === 'string' && envUrl.length > 0 ? envUrl : DEFAULT_API_BASE
  return raw.replace(/\/$/, '')
}
