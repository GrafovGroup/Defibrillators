// Remove only state created by the retired Defibrillators.ca analytics integration.
// This migration never loads a tag, sends a request or writes a new preference.
try {
  localStorage.removeItem('dfca-analytics-v1');
} catch {
  // Browsing and enquiries also work when browser storage is unavailable.
}
for (const cookie of document.cookie.split(';')) {
  const name = cookie.trim().split('=')[0];
  if (!/^dfca_ga(?:_|$)/.test(name)) continue;
  for (const domain of ['', location.hostname, '.' + location.hostname]) {
    document.cookie = `${name}=; Max-Age=0; Path=/; Secure; SameSite=Lax${domain ? '; Domain=' + domain : ''}`;
  }
}
