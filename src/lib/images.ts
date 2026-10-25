import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/projects/*/*.webp', { eager: true });

/** Project image by slug and file stem, e.g. img('mektebi', 'phone-01'). */
export function img(slug: string, stem: string): ImageMetadata {
  const file = files[`../assets/projects/${slug}/${stem}.webp`];
  if (!file) throw new Error(`Missing image: ${slug}/${stem}.webp`);
  return file.default;
}

export function hasImg(slug: string, stem: string): boolean {
  return Boolean(files[`../assets/projects/${slug}/${stem}.webp`]);
}
