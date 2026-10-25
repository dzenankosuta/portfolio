# Dženan Košuta — portfolio

Personal portfolio of Dženan Košuta, software engineer (React Native & full-stack): 16 independent products, the company roles behind them, and a case study for every project.

**Live:** https://dzenankosuta.github.io/portfolio/

## Stack

- [Astro](https://astro.build) 7, static output: one page per project under `/work/<slug>/`
- SCSS with design tokens exported from the FigCraft design (direction B, Ink / Paper themes)
- Vanilla TypeScript for progressive enhancements: theme switch, menu, filters, cursor preview, counters, lightbox
- Self-hosted fonts (Inter, JetBrains Mono, Instrument Serif, Amiri) via Fontsource
- `astro:assets` for responsive WebP images, `@astrojs/sitemap` for the sitemap

## Develop

Requires Node ≥ 22.23.4.

```sh
npm install
npm run dev       # http://localhost:4321/portfolio/
npm run build     # static site in dist/
npm run preview
```

## Content

- `src/data/site.ts`: hero, experience, stack, about, contact
- `src/data/projects.ts`: every project (copy, links, media for cards and case studies)
- `src/assets/projects/<slug>/`: optimized screenshots, icons and graphics
- `public/Dzenan-Kosuta-CV.pdf`: the downloadable CV

## Deploy

Every push to `main` builds and deploys to GitHub Pages (`.github/workflows/deploy.yml`).
For a custom domain, build with `SITE_URL=https://your-domain` and `SITE_BASE=/`, and add a `public/CNAME` file.
