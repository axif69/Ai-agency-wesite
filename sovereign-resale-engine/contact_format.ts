export function normalizePhone(raw: string): string | null {
  if (!raw) return null;
  const digits = raw.replace(/\D/g, '');
  if (digits.length < 8) return null;
  if (digits.startsWith('971')) return `+${digits}`;
  if (digits.startsWith('05') || digits.startsWith('04') || digits.startsWith('02') || digits.startsWith('06')) {
    return `+971${digits.slice(1)}`;
  }
  return `+${digits}`;
}

export function websiteHostname(rawUrl: string): string {
  if (!rawUrl) return '';
  try {
    const url = new URL(rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`);
    return url.hostname.replace(/^www\./, '').toLowerCase();
  } catch {
    return String(rawUrl || '').trim().toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
  }
}

export function whatsappUrl(phone: string): string {
  const norm = normalizePhone(phone);
  if (!norm) return '';
  return `https://wa.me/${norm.replace(/\D/g, '')}`;
}
