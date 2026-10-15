/**
 * Redirect-Auth (SSO ringan) ekosistem Ngolab.
 *
 * Aplikasi mitra (mis. Ngolab-Gami) mengarahkan pengguna ke halaman login resmi
 * PointLab dengan parameter `redirect` (URL aplikasi asal) dan `mode`
 * (login | register). Setelah login/daftar berhasil, PointLab mengembalikan
 * pengguna ke URL asal sambil membawa token JWT pada fragment URL:
 *
 *   https://point.ngolab.online/auth?redirect=https%3A%2F%2Fgami.ngolab.online%2F&mode=login
 *   -> (setelah login) https://gami.ngolab.online/#token=<JWT>
 *
 * Aplikasi asal memvalidasi token itu ke GET /api/users/profile lalu membuat
 * sesinya sendiri. Hanya host di daftar izin yang boleh menjadi tujuan
 * redirect, mencegah pembajakan open-redirect.
 */

const ALLOWED_REDIRECT_HOSTS = ['gami.ngolab.online', 'localhost', '127.0.0.1'];

function currentSearch() {
  return typeof window !== 'undefined' && window.location ? window.location.search : '';
}

export function readRedirectParam(search = currentSearch()) {
  try {
    return new URLSearchParams(search).get('redirect') || '';
  } catch {
    return '';
  }
}

export function readModeParam(search = currentSearch()) {
  try {
    return new URLSearchParams(search).get('mode') === 'register' ? 'register' : 'login';
  } catch {
    return 'login';
  }
}

/**
 * `prompt=login` dipakai aplikasi mitra saat penggunanya menekan tombol login:
 * paksa PointLab menampilkan form kredensial (dan membuang sesi lama yang
 * tersimpan) walau token `pointlab_token` masih ada — mirip OAuth prompt=login.
 */
export function readPromptParam(search = currentSearch()) {
  try {
    const prompt = new URLSearchParams(search).get('prompt');
    return prompt === 'login' || prompt === 'select_account' ? prompt : null;
  } catch {
    return null;
  }
}

export function isAllowedRedirect(url) {
  if (!url || typeof url !== 'string') return false;
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return false;
  }
  if (!ALLOWED_REDIRECT_HOSTS.includes(parsed.hostname)) return false;
  const isLocal = parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1';
  // localhost boleh http (dev); host produksi wajib https.
  if (isLocal) return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  return parsed.protocol === 'https:';
}

/** URL kembali ke aplikasi asal dengan token di fragment (tidak dikirim ke server/log). */
export function buildReturnUrl(redirect, token) {
  const base = String(redirect || '').replace(/#.*$/, '');
  return `${base}#token=${encodeURIComponent(token)}`;
}
