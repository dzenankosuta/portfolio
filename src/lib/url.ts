const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix an internal path with the configured base (GitHub Pages serves under /portfolio). */
export function url(path = '/'): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}

export const projectUrl = (slug: string) => url(`/work/${slug}/`);

/** "https://www.eskolar.app" → "eskolar.app" */
export const host = (href: string) => href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
