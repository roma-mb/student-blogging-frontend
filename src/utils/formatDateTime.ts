export function formatDateTime(iso: string, locale = 'pt-BR'): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) {
    return iso
  }
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(d)
}
