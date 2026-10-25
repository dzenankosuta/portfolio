// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages project site: https://dzenankosuta.github.io/portfolio/
// With a custom domain, build with SITE_URL=https://dzenankosuta.com SITE_BASE=/
const site = process.env.SITE_URL ?? 'https://dzenankosuta.github.io';
const base = process.env.SITE_BASE ?? '/portfolio';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap()],
  image: {
    responsiveStyles: false,
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
});
