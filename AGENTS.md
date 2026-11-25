# Project: Toolontips (toolontips.com)

Toolontips is an all-in-one website of free online tools across many domains: PDF and documents, images, finance and business, text/dev utilities, and more over time (health, education, career, etc.). Visitors open any tool and use it instantly on the same site, with no sign-up and no redirects.
Monetization: Google AdSense first; a Pro plan (no limits, no ads) comes later. Keep code ready for Pro but do not build it now.
Audience: worldwide. Launch language: English. Build translation-ready (i18n) from day one.
Tool list and build waves: see docs/TOOLS.md

## About the owner (IMPORTANT)
- The owner is NOT a programmer. Explain everything in simple, plain language.
- Run commands yourself where possible. When I must do something, give me the exact command or click-by-click steps.
- If you hit an error, fix it yourself and explain in one or two sentences. Never leave the project in a broken state.
- Before each phase, tell me in plain words what you are about to do. After each phase, tell me exactly how to see it in Chrome (usually: run `npm run dev`, open http://localhost:3000) and what I should check.
- Keep it simple. Prefer standard, popular, well-documented libraries over clever solutions.

## Hub architecture
- Every tool belongs to exactly ONE category. Every category has its own page, original intro, and tool grid.
- A category appears in the main navigation only when it has at least 5 working tools.
- New domains are added by config only: a category entry plus tool entries in a registry. Never hard-code categories in the layout.
- Global search across all tools, one consistent tool layout, "related tools" links (cross-category allowed).
- URLs: /[tool-slug] for tools, /category/[category-slug] for categories, /guides/[slug] for guides.

## Stack
- Next.js (App Router), TypeScript, Tailwind CSS, static generation (SSG) wherever possible
- Process files CLIENT-SIDE in the browser (pdf-lib, pdf.js, Canvas, browser-image-compression, heic2any, qrcode). Use Web Workers for heavy work.
- Each tool = one registry entry + one component + one content file.

## Working rules
- Work in phases. At the end of each phase: summarize what was built, how to run it, a test checklist, known limitations. Then stop and wait for my approval.
- Ask before adding dependencies or changing architecture.
- Never publish a page for a tool that does not work. No placeholder pages live.
- Run lint, typecheck, and build before declaring anything done.
- No console errors. No TODOs left in shipped code.

## Every tool page must have
- Unique H1, meta title, meta description
- The working tool above the fold with empty, loading, success, and error states; no sign-up wall
- Original written content below the tool (500-900 words, unique, written for humans): what it does, step-by-step usage, tips and limitations, 5-8 tool-specific FAQs; for calculators, the formula explained plus 1-2 worked examples
- Related tools and breadcrumbs
- JSON-LD (WebApplication, FAQPage, BreadcrumbList)
- A privacy note that is TRUE (say "processed in your browser" only if the tool really does that)
- Responsive, accessible, fast

## Required site pages
Home (search + category grid + popular tools), category pages, About, Contact, Privacy Policy (cookies and Google ads/vendor disclosure), Terms, Disclaimer (finance, tax, and health tools are informational only), 10+ original guides, custom 404. All linked from header and footer.

## Worldwide requirements
- i18n: all UI text in translation files, locale-aware number/date/currency formatting, RTL-ready layout, hreflang-ready structure. Launch English only.
- Universal tools (PDF, image, text/dev, QR, password) work identically everywhere.
- Country-dependent calculators (tax, salary, VAT/GST, mortgage, loans) use a country selector backed by a data file. Launch countries: US, UK, Canada, Australia, India, and EU VAT. Each entry states its source, tax year, and a "last updated" date. Do not add a country without a verifiable source.
- Disclaimers: results are estimates and rules vary by country and over time.
- Consent: a Google-certified CMP applying regional rules automatically (EEA/UK/Switzerland, California, others). Privacy Policy covers GDPR and CCPA rights.
- Never auto-redirect by IP; offer a visible country/language switcher.

## AdSense compliance (hard rules)
- No thin, duplicated, scraped, or spun content. Every page needs real original value.
- Ads only on pages with substantial content. NEVER on 404/error pages, loading/processing screens, download-only screens, empty states, or low-content pages.
- Reusable <AdSlot> component: fixed reserved size (no layout shift), lazy loaded, switchable by an env flag, OFF by default in development. Placeholder publisher ID ca-pub-XXXXXXXXXXXXXXXX.
- Max 2-3 ad units per page on desktop, 2 on mobile. Ads never exceed content, never inside the tool's working area, never next to buttons or controls, never overlaying content.
- No popups, interstitials, auto-redirects, sticky ads covering content, or fake download/start buttons.
- Ad labels, if any, only "Advertisement" or "Sponsored". Never encourage ad clicks.
- public/ads.txt: google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
- Consent banner: no personalized ad tracking before consent where required; footer link to change choices.
- No prohibited content or tools: nothing illegal, copyrighted, adult, deceptive, or DRM/paywall-bypassing; no streaming-site downloaders.
- Finance, tax, and health content must be accurate, state assumptions and sources, include the disclaimer, and make no guarantee-style claims, fake testimonials, or fake user counts.

## Performance and SEO
- Lighthouse 90+ on mobile; LCP < 2.5s, CLS < 0.1, INP < 200ms
- Canonical tags, auto sitemap.xml, robots.txt, Open Graph tags
- Variation pages (e.g. /compress-pdf-to-200kb) only if each has genuinely distinct content; otherwise do not create them

## Security
- Files processed client-side must never be sent to a server (verify in code)
- Validate file types and sizes, sanitize inputs, add security headers (CSP compatible with AdSense domains, X-Content-Type-Options, Referrer-Policy)

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
