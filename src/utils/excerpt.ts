const DEFAULT_MAX = 180

export function excerpt(text: string, maxLength = DEFAULT_MAX): string {
  const normalized = text.replace(/\s+/g, ' ').trim()
  if (normalized.length <= maxLength) {
    return normalized
  }
  return `${normalized.slice(0, maxLength).trimEnd()}…`
}
