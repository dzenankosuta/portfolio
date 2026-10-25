// Progressive enhancement only: every section is readable without this file.

const root = document.documentElement;
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
const $ = <T extends Element = HTMLElement>(sel: string, el: ParentNode = document) => el.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, el: ParentNode = document) => [...el.querySelectorAll<T>(sel)];

// ── theme (Ink default, Paper optional), animated with a view transition where available
function setTheme(theme: 'ink' | 'paper') {
  if (theme === 'paper') root.dataset.theme = 'paper';
  else delete root.dataset.theme;
  try {
    localStorage.setItem('theme', theme);
  } catch {}
  $('meta[name="theme-color"]')?.setAttribute('content', theme === 'paper' ? '#f2efe8' : '#0c0c0b');
  syncThemeButtons();
}

function syncThemeButtons() {
  const paper = root.dataset.theme === 'paper';
  $$('[data-theme-toggle]').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(paper));
    btn.setAttribute('aria-label', paper ? 'Switch to dark theme' : 'Switch to light theme');
  });
}

function initTheme() {
  syncThemeButtons();
  $$('[data-theme-toggle]').forEach((btn) =>
    btn.addEventListener('click', (e) => {
      const next = root.dataset.theme === 'paper' ? 'ink' : 'paper';
      const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
      if (!doc.startViewTransition || reduced.matches) return setTheme(next);
      const { clientX: x, clientY: y } = e as MouseEvent;
      const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      const t = doc.startViewTransition(() => setTheme(next));
      t.ready.then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
          { duration: 520, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', pseudoElement: '::view-transition-new(root)' },
        );
      });
    }),
  );
}

// ── mobile menu: focus trap, Esc, scroll lock
function initMenu() {
  const menu = $('#menu');
  const openBtn = $('[data-menu-open]');
  if (!menu || !openBtn) return;
  let lastFocus: HTMLElement | null = null;

  const focusables = () => $$<HTMLElement>('a[href], button:not([disabled])', menu).filter((el) => el.offsetParent !== null);

  const open = () => {
    lastFocus = document.activeElement as HTMLElement;
    menu.hidden = false;
    requestAnimationFrame(() => menu.setAttribute('data-open', ''));
    document.body.setAttribute('data-menu-open', '');
    openBtn.setAttribute('aria-expanded', 'true');
    setTimeout(() => focusables()[0]?.focus(), 60);
  };
  const close = (restore = true) => {
    menu.removeAttribute('data-open');
    document.body.removeAttribute('data-menu-open');
    openBtn.setAttribute('aria-expanded', 'false');
    setTimeout(() => (menu.hidden = true), 230);
    if (restore) lastFocus?.focus();
  };

  openBtn.addEventListener('click', open);
  $('[data-menu-close]', menu)?.addEventListener('click', () => close());
  $$('.menu__item', menu).forEach((a) => a.addEventListener('click', () => close(false)));
  menu.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') return close();
    if (e.key !== 'Tab') return;
    const items = focusables();
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
  matchMedia('(min-width: 1024px)').addEventListener('change', (m) => m.matches && menu.hasAttribute('data-open') && close(false));
}

// ── live clock for Novi Pazar (CET / CEST)
function initClock() {
  const el = $<HTMLTimeElement>('[data-clock]');
  if (!el) return;
  const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Belgrade', hour: '2-digit', minute: '2-digit', hour12: false });
  const zone = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Belgrade', timeZoneName: 'short' });
  const tick = () => {
    const now = new Date();
    const offset = zone.formatToParts(now).find((p) => p.type === 'timeZoneName')?.value ?? '';
    const abbr = /CEST|\+2/.test(offset) ? 'CEST' : 'CET';
    el.textContent = `${fmt.format(now)} ${abbr}`;
    el.dateTime = now.toISOString();
  };
  tick();
  setInterval(tick, 15_000);
}

// ── stat counters (once, when visible)
function initCounters() {
  const els = $$('[data-count]');
  if (!els.length || reduced.matches) return;
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        io.unobserve(entry.target);
        const el = entry.target as HTMLElement;
        const final = el.textContent ?? '';
        const target = Number(el.dataset.count);
        const suffix = el.dataset.suffix ?? '';
        const from = target > 1000 && target < 3000 ? target - 30 : 0; // years count up the last stretch
        const start = performance.now();
        const dur = 1100;
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - t, 4);
          const value = Math.round(from + (target - from) * eased);
          el.textContent = (target >= 10000 ? value.toLocaleString('en-US') : String(value)) + suffix;
          if (t < 1) requestAnimationFrame(step);
          else el.textContent = final;
        };
        requestAnimationFrame(step);
      }),
    { threshold: 0.6 },
  );
  els.forEach((el) => io.observe(el));
}

// ── the name decodes from mono noise once (drawing title block feel)
function initScramble() {
  if (reduced.matches) return;
  const glyphs = 'ABCDEFGHIJKLMNOPRSTUVZŠĐČĆŽ0123456789/<>_#';
  $$('[data-scramble]').forEach((el, wordIndex) => {
    const final = el.textContent ?? '';
    const start = performance.now() + wordIndex * 120;
    const dur = 900;
    const frame = (now: number) => {
      const t = Math.max(0, (now - start) / dur);
      const settled = Math.floor(t * final.length);
      let out = '';
      for (let i = 0; i < final.length; i++) {
        out += i < settled ? final[i] : glyphs[(Math.random() * glyphs.length) | 0];
      }
      el.textContent = out;
      if (settled < final.length) requestAnimationFrame(frame);
      else el.textContent = final;
    };
    requestAnimationFrame(frame);
  });
}

// ── reveal on scroll
function initReveal() {
  const els = $$('[data-reveal]');
  if (!('IntersectionObserver' in window) || reduced.matches) {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      }),
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
  );
  els.forEach((el) => io.observe(el));
}

// ── work index filters
function initFilters() {
  const bar = $('.filters');
  if (!bar) return;
  const rows = $$('.index li');
  const label = $('[data-count-label]');
  const total = rows.length;
  let chapter = 'all';
  const platforms = new Set<string>();

  const apply = () => {
    let shown = 0;
    rows.forEach((li) => {
      const okChapter = chapter === 'all' || li.dataset.chapter === chapter;
      const okPlatform = [...platforms].every((p) => li.dataset[p] === '1');
      const show = okChapter && okPlatform;
      li.toggleAttribute('data-filtered', !show);
      if (show) shown++;
    });
    if (label) label.textContent = shown === total ? `${total} independent products built & shipped` : `Showing ${shown} of ${total}`;
  };

  $$<HTMLButtonElement>('[data-filter]', bar).forEach((btn) =>
    btn.addEventListener('click', () => {
      chapter = btn.dataset.filter ?? 'all';
      $$('[data-filter]', bar).forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      apply();
    }),
  );
  $$<HTMLButtonElement>('[data-platform]', bar).forEach((btn) =>
    btn.addEventListener('click', () => {
      const key = btn.dataset.platform!;
      const on = !platforms.has(key);
      if (on) platforms.add(key);
      else platforms.delete(key);
      btn.setAttribute('aria-pressed', String(on));
      apply();
    }),
  );
}

// ── cursor-follow preview on the work index
function initPreview() {
  const box = $('.preview');
  const image = box ? $<HTMLImageElement>('img', box) : null;
  if (!box || !image || !finePointer.matches) return;
  let raf = 0;
  let x = 0;
  let y = 0;
  const move = () => {
    raf = 0;
    const w = box.offsetWidth;
    const h = box.offsetHeight;
    const px = Math.min(innerWidth - w - 16, x + 24);
    const py = Math.min(innerHeight - h - 16, Math.max(16, y - h / 2));
    box.style.setProperty('--x', `${px}px`);
    box.style.setProperty('--y', `${py}px`);
  };
  $$<HTMLAnchorElement>('.index-row[data-preview]').forEach((row) => {
    row.addEventListener('pointerenter', (e) => {
      if (image.getAttribute('src') !== row.dataset.preview) image.src = row.dataset.preview!;
      x = e.clientX;
      y = e.clientY;
      move();
      box.setAttribute('data-on', '');
    });
    row.addEventListener('pointermove', (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(move);
    });
    row.addEventListener('pointerleave', () => box.removeAttribute('data-on'));
  });
  addEventListener('scroll', () => box.removeAttribute('data-on'), { passive: true });
}

// ── copy email
function initCopy() {
  const toast = $('.toast');
  let timer = 0;
  $$<HTMLButtonElement>('[data-copy]').forEach((btn) =>
    btn.addEventListener('click', async () => {
      const value = btn.dataset.copy!;
      try {
        await navigator.clipboard.writeText(value);
        if (toast) toast.textContent = 'Email copied';
      } catch {
        if (toast) toast.textContent = value;
      }
      const original = btn.textContent;
      btn.textContent = 'Copied ✓';
      toast?.setAttribute('data-on', '');
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        toast?.removeAttribute('data-on');
        btn.textContent = original;
      }, 2200);
    }),
  );
}

// ── nav: highlight the section in view (home page only)
function initActiveNav() {
  const links = $$<HTMLAnchorElement>('[data-nav]');
  const ids = [...new Set(links.map((a) => a.dataset.nav!))];
  const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
  if (!sections.length || !links.some((a) => a.getAttribute('href')?.startsWith('#'))) return;
  const setCurrent = (id: string | null) =>
    links.forEach((a) => {
      if (a.dataset.nav === id) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setCurrent(entry.target.id);
      });
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  sections.forEach((s) => io.observe(s));
  // the experience chapter belongs to "Work" in the nav
  const exp = document.getElementById('experience');
  if (exp) {
    new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setCurrent('work')), {
      rootMargin: '-45% 0px -50% 0px',
    }).observe(exp);
  }
  const hero = document.getElementById('top');
  if (hero) {
    new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setCurrent(null)), {
      rootMargin: '-45% 0px -50% 0px',
    }).observe(hero);
  }
}

// ── back to top
function initTop() {
  $$('[data-top]').forEach((a) =>
    a.addEventListener('click', (e) => {
      e.preventDefault();
      scrollTo({ top: 0, behavior: reduced.matches ? 'auto' : 'smooth' });
      ($('.monogram') as HTMLElement | null)?.focus({ preventScroll: true });
    }),
  );
}

// ── lightbox for case-study galleries
function initLightbox() {
  const dialog = $<HTMLDialogElement>('dialog.lightbox');
  const links = $$<HTMLAnchorElement>('a[data-zoom]');
  if (!dialog || !links.length) return;
  const image = $<HTMLImageElement>('[data-lb-img]', dialog)!;
  const caption = $('[data-lb-caption]', dialog)!;
  let index = 0;

  const show = (i: number) => {
    index = (i + links.length) % links.length;
    const a = links[index];
    const alt = $<HTMLImageElement>('img', a)?.alt ?? '';
    image.src = a.href;
    image.alt = alt;
    if (a.dataset.w) image.width = Number(a.dataset.w);
    if (a.dataset.h) image.height = Number(a.dataset.h);
    caption.textContent = `${String(index + 1).padStart(2, '0')} / ${String(links.length).padStart(2, '0')} · ${alt}`;
  };

  links.forEach((a, i) =>
    a.addEventListener('click', (e) => {
      e.preventDefault();
      show(i);
      dialog.showModal();
    }),
  );
  $('[data-lb-close]', dialog)?.addEventListener('click', () => dialog.close());
  $('[data-lb-prev]', dialog)?.addEventListener('click', () => show(index - 1));
  $('[data-lb-next]', dialog)?.addEventListener('click', () => show(index + 1));
  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog || (e.target as HTMLElement).classList.contains('lightbox__stage')) dialog.close();
  });
  // swipe on touch
  let sx = 0;
  dialog.addEventListener('touchstart', (e) => (sx = e.touches[0].clientX), { passive: true });
  dialog.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
  });
}

// ── videos: only play while visible (and never under reduced motion)
function initVideos() {
  const videos = $$<HTMLVideoElement>('video[autoplay]');
  if (!videos.length) return;
  if (reduced.matches) {
    videos.forEach((v) => {
      v.removeAttribute('autoplay');
      v.controls = true;
    });
    return;
  }
  const io = new IntersectionObserver((entries) =>
    entries.forEach((entry) => {
      const v = entry.target as HTMLVideoElement;
      if (entry.isIntersecting) {
        if (v.preload === 'none') v.preload = 'auto';
        v.play().catch(() => {});
      } else v.pause();
    }),
  );
  videos.forEach((v) => io.observe(v));
}

// ── horizontal device rails: keyboard-scrollable only when they actually overflow
function initRails() {
  const rails = $$('.card__media, .case__hero, .case__rail');
  if (!rails.length) return;
  // region labels must be unique per page, so name the project
  const label = (el: HTMLElement) => {
    const name = (el.closest('.card')?.querySelector('.card__name') ?? $('.case__name'))?.textContent?.trim();
    return name ? `${name} screens, scroll sideways` : 'Screens, scroll sideways';
  };
  const sync = () =>
    rails.forEach((el) => {
      const scrolls = el.scrollWidth > el.clientWidth + 2;
      if (scrolls) {
        el.tabIndex = 0;
        el.setAttribute('role', 'region');
        if (!el.classList.contains('case__rail')) el.setAttribute('aria-label', label(el));
      } else if (!el.classList.contains('case__rail')) {
        el.removeAttribute('tabindex');
        el.removeAttribute('role');
        el.removeAttribute('aria-label');
      }
    });
  sync();
  let t = 0;
  addEventListener('resize', () => {
    clearTimeout(t);
    t = window.setTimeout(sync, 150);
  });
}

// ── full-page captures scroll by hand on touch screens, so there they need keyboard focus too
function initFullPages() {
  const screens = $$('.browser--full .device__screen');
  if (!screens.length) return;
  const sync = () =>
    screens.forEach((el) => {
      if (getComputedStyle(el).overflowY === 'auto' && el.scrollHeight > el.clientHeight + 2) {
        el.tabIndex = 0;
        el.setAttribute('role', 'region');
        el.setAttribute('aria-label', 'Full page, scroll it');
      } else {
        el.removeAttribute('tabindex');
        el.removeAttribute('role');
        el.removeAttribute('aria-label');
      }
    });
  sync();
  screens.forEach((el) => $('img', el)?.addEventListener('load', sync));
  addEventListener('resize', sync);
}

initTheme();
initMenu();
initRails();
initFullPages();
initClock();
initScramble();
initCounters();
initReveal();
initFilters();
initPreview();
initCopy();
initActiveNav();
initTop();
initLightbox();
initVideos();
