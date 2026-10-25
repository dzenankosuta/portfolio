export const person = {
  name: 'Dženan Košuta',
  firstName: 'Dženan',
  lastName: 'Košuta',
  role: 'Software Engineer',
  roleLong: 'Software Engineer (React Native & full-stack)',
  location: 'Novi Pazar, Serbia',
  employer: 'Agile Software Design GmbH',
  email: 'dzenan_kosuta@hotmail.com',
  phone: '+381 65 686 8348',
  phoneHref: 'tel:+381656868348',
  cv: 'Dzenan-Kosuta-CV.pdf',
  links: {
    github: 'https://github.com/dzenankosuta',
    linkedin: 'https://www.linkedin.com/in/dzenan-kosuta/',
    instagram: 'https://www.instagram.com/dzenan.kosuta/',
  },
};

export const meta = {
  title: 'Dženan Košuta — Software Engineer (React Native & full-stack)',
  description:
    'Software engineer from Novi Pazar, Serbia. I design, build and ship mobile apps and multi-tenant web platforms end to end — 17 products, 8 of them live on the App Store and Google Play.',
};

export const hero = {
  eyebrow: 'Software Engineer — Novi Pazar, Serbia',
  headline: ['Mobile apps &', 'multi-tenant platforms.', 'Designed, built, shipped.'],
  subline:
    'Software engineer focused on cross-platform mobile development with React Native, with solid full-stack experience across React, Next.js, Node.js and Python. From API and AI integrations to release on the App Store and Google Play.',
  stats: [
    { value: '2021', count: 2021, label: 'shipping software professionally since' },
    { value: '17', count: 17, label: 'independent products built & shipped' },
    { value: '8', count: 8, label: 'apps live on the App Store & Google Play' },
    { value: '10,000s', count: 10000, suffix: 's', label: 'users reached by the IoT app I build at work' },
  ],
  marquee: [
    'React Native', 'Expo', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'Django', 'Flask', 'PostgreSQL',
    'Supabase', 'Firebase', 'AWS Amplify', 'Electron', 'OpenAI', 'Gemini', 'Tailwind', 'Turborepo',
  ],
};

export const nav = [
  { id: 'work', label: 'Work' },
  { id: 'schools', label: 'Schools' },
  { id: 'faith', label: 'Faith-tech' },
  { id: 'products', label: 'Products' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export interface Role {
  company: string;
  role: string;
  period: string;
  start: string;
  end?: string;
  product: string;
  platforms: string;
  bullets: string[];
  link: { label: string; href: string };
  products?: { name: string; description: string; links: { label: string; href: string }[] }[];
}

export const experience: Role[] = [
  {
    company: 'Agile Software Design GmbH',
    role: 'Software Engineer',
    period: 'Feb 2025 — Present',
    start: '2025-02',
    product: 'ZeroMouse: an AI-powered smart cat flap (IoT hardware + mobile app)',
    platforms: 'iOS & Android',
    bullets: [
      'Build and ship the React Native app for ZeroMouse, a smart IoT/AI hardware product now reaching tens of thousands of users in early access.',
      "Own the firmware and AI-services integration, and help shape the app's architecture and state management.",
    ],
    link: { label: 'zeromouse.com', href: 'https://zeromouse.com' },
  },
  {
    company: 'Lyntel',
    role: 'Software Engineer',
    period: 'Aug 2023 — Feb 2025',
    start: '2023-08',
    end: '2025-02',
    product: 'Global eSIM & IoT connectivity platform',
    platforms: 'iOS, Android, Web',
    bullets: [
      'Delivered the React Native mobile app and React web app for a global eSIM and IoT connectivity platform.',
      'Owned the automated eSIM activation flow and built in-app chatbot support, simplifying setup for travelers.',
      'Worked with backend, design and product teams to improve cross-border connectivity.',
    ],
    link: { label: 'lyntel.com', href: 'https://lyntel.com' },
  },
  {
    company: 'Novel & Friends',
    role: 'Software Engineer',
    period: 'Sep 2021 — Aug 2023',
    start: '2021-09',
    end: '2023-08',
    product: "Personalized, AI-generated children's stories",
    platforms: 'iOS, Android, Web',
    bullets: [
      "Built and shipped mobile (React Native) and web (React, TypeScript) apps for personalized children's stories, live on both stores.",
      'Integrated the OpenAI API to generate and personalize stories, with a focus on safe, value-driven content.',
      'Designed the app architecture, state management and API integrations; optimized performance.',
    ],
    link: { label: 'novelandfriends.com', href: 'https://novelandfriends.com' },
    products: [
      {
        name: 'Beautiful Mind Stories',
        description: 'Stories built on positive psychology that help children grow emotional skills, empathy and confidence.',
        links: [
          { label: 'beautifulmindstories.com', href: 'https://beautifulmindstories.com' },
          { label: 'App Store', href: 'https://apps.apple.com/app/id6736713973' },
          { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.novelandfriends.beautifulminds' },
        ],
      },
      {
        name: 'Huda',
        description:
          'Personalized stories where the child is the hero, teaching courage, kindness and gratitude through values inspired by the Prophet ﷺ and his companions.',
        links: [
          { label: 'App Store', href: 'https://apps.apple.com/app/id6753652561' },
          { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.novelandfriends.huda' },
        ],
      },
    ],
  },
];

export const chapterIntros = {
  experience: {
    intro: "Product teams I've shipped with.",
    facts: ['Agile Software Design GmbH', 'Lyntel', 'Novel & Friends'],
  },
  schools: {
    intro:
      'Software that replaces paper, spreadsheets and manual routines in Serbian schools — from the bell in the hallway to legally binding documents. Built, deployed and maintained in production.',
    facts: ['4 systems', 'Serbian Latin & Cyrillic everywhere', 'Official templates & regulations built in', 'In daily use since 2024'],
  },
  faith: {
    accent: 'Calm, precise',
    intro:
      ' apps for Muslim communities — multilingual, offline-first, with no ads and privacy by default. Built for the Balkans and the diaspora, used around the world.',
    facts: ['6 products', '5 live on both stores', 'Up to 16 languages with right-to-left', 'Widgets, offline, no ads'],
  },
  products: {
    intro: 'Products of my own and platforms built for clients — finance, healthcare, real estate, non-profit, e-commerce and local business.',
    facts: ['Saldo', 'Ordino', 'Invest Portal', 'Udruženje „Pahulja”', 'Oud Andalous', 'DM Gebäudereinigung', '1vs1'],
  },
};

export const stack = [
  {
    group: 'Mobile',
    items:
      'React Native, Expo & EAS (Build / Submit / Update), iOS & Android widgets, push notifications, Reanimated, Skia, NativeWind, App Store & Google Play releases',
  },
  { group: 'Frontend', items: 'React, Next.js (App Router, RSC), TypeScript, Tailwind CSS, shadcn/ui, TanStack Query, next-intl' },
  {
    group: 'Backend & data',
    items:
      'Node.js, Python (Flask, Django), PostgreSQL, Supabase (RLS, Auth, Edge Functions, pg_cron, Realtime), Firebase, AWS Amplify / AppSync / Cognito, REST, GraphQL, Socket.IO',
  },
  {
    group: 'Platform work',
    items:
      'multi-tenancy (subdomains + row-level security), i18n & RTL (up to 16 languages), PDF / Word generation, Excel import/export, IPS QR payments, Electron & hardware (serial / USB relay)',
  },
  { group: 'AI', items: 'OpenAI API, Gemini API, LLM-powered product features' },
  {
    group: 'Tooling',
    items: 'Git, GitHub Actions, Vercel, Cloudflare, Turborepo + pnpm, Jest / Vitest / Playwright / Maestro, Agile (Jira / Trello)',
  },
];

export const about = {
  heading: 'Engineer by trade, mathematician by training.',
  paragraphs: [
    "I'm Dženan, a software engineer from Novi Pazar, Serbia, with an M.Sc. in Mathematics. I like owning a product from the data model to the store listing: the architecture, the details of the interface, and the release that finally reaches people's phones.",
    "By day I'm a software engineer at Agile Software Design. Outside that, I build systems that Serbian schools use every day and apps for the Muslim community, and I care about each one as if it were my only product.",
  ],
  facts: [
    { label: 'Education', value: 'M.Sc. in Mathematics (2019–2020) and B.Sc. in Mathematics (2015–2019), State University of Novi Pazar' },
    { label: 'Languages', value: 'English (fluent), Bosnian / Serbian (native)' },
    { label: 'Based in', value: 'Novi Pazar, Serbia. I work remotely with teams abroad.' },
  ],
};

export const contact = {
  heading: "Have a product to build? Let's talk.",
};
