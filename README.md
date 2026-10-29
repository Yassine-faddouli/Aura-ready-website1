# Aura Acquisition — website

Production website for **Aura Acquisition** (auraacquisition.ma). Next.js 15 + TypeScript, fully **static export**: every page is pre-rendered HTML, so it is fast, crawlable and can be hosted anywhere.

## Pages (27 indexable + 1 draft + 404)

| Route | Content |
|---|---|
| `/` | Home: hero, client fit, services, method (Qualified Pipeline System), real video work, lead vs qualified opportunity, FAQ, CTA |
| `/services/` + 6 | lead-generation, meta-ads, conversion-funnels, lead-qualification, crm-whatsapp-automation, sales-conversion |
| `/industries/` + 4 | training-centers, language-centers, coaches-consultants, course-creators |
| `/results/` | 11 real client videos + publication standard. Case studies appear automatically when published |
| `/results/modele-etude-de-cas/` | **Draft template — noindex, not linked, not in sitemap** |
| `/about/` | Mission, philosophy, method, way of working, founder |
| `/insights/` + 3 articles | Blog index + article template (TOC, author, dates, FAQ, related, Article schema) |
| `/contact/` | Contact form + WhatsApp |
| `/work-with-us/` | Qualification form (all requested fields) |
| `/privacy-policy/`, `/legal-notice/`, `/cookie-policy/` | With highlighted placeholders |
| `/sitemap.xml`, `/robots.txt`, `404` | Generated |

## Run locally
```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # outputs static site to /out
npm start          # serves /out locally
```
Node 18.18+ required (tested with Node 22).

## Where to edit
- Business details (WhatsApp, email, socials): `lib/site.ts`
- Copy: `content/services.ts`, `content/industries.ts`, `content/articles.ts`, `content/home.ts`, page files in `app/`
- Videos: `public/work/` + list in `content/work.ts`
- Case studies: `content/case-studies.ts` (set `status: 'published'` only with verified data and client permission)
- Design tokens: top of `app/globals.css`

## Heading Now font — UNRESOLVED DEPENDENCY
The Heading Now font files were **not supplied**. Headings currently use **Space Grotesk** as a declared fallback.
To activate Heading Now: put licensed WOFF2 files in `public/fonts/heading-now/` named exactly as listed in `public/fonts/heading-now/README.md`, then rebuild. `@font-face` + preload are generated automatically at build time (`lib/fonts.ts`). No code change needed.

## Forms
Static hosting has no server, so forms send their JSON to an endpoint you configure:
```
NEXT_PUBLIC_FORM_ENDPOINT=https://hook.eu1.make.com/xxxx   # or Zapier / n8n / Formspree / HubSpot
NEXT_PUBLIC_BOOKING_URL=https://cal.com/aura/strategie     # optional, shown after success
```
- **If no endpoint is set** (current state), nothing is pretended: after validation the visitor is told the request is not sent yet and gets a button that opens WhatsApp with all answers pre-filled.
- Payload fields: `name, email, company, website, phone, industry, challenge, method, budget, goal, contactPref` (qualification) or `name, email, phone, company, message` (contact), plus `form, page, submittedAt`. Honeypot spam field included.
- Recommended free setup: Make.com webhook → Google Sheets row (your existing lead tracking sheet) + WhatsApp/e-mail notification.
- Endpoint must accept a cross-origin `POST` with `Content-Type: application/json` (Make, Zapier, n8n and Formspree do).

## Deploy (recommended: Vercel, free tier)
1. Push this folder to a GitHub repository.
2. vercel.com → New Project → import the repo. Framework is detected; build command `npm run build`, output `out`.
3. Add the environment variables above in Project → Settings → Environment Variables, redeploy.
Alternatives: Netlify or Cloudflare Pages (same settings), or upload the `/out` folder to any cPanel host.

## Connect the domain auraacquisition.ma
1. In Vercel: Project → Settings → Domains → add `auraacquisition.ma` and `www.auraacquisition.ma` (set one to redirect to the apex).
2. At your .ma registrar, create the DNS records Vercel shows (typically `A @ 76.76.21.21` and `CNAME www cname.vercel-dns.com`).
3. HTTPS is issued automatically. Canonical URLs already use `https://auraacquisition.ma` (change in `lib/site.ts` if needed).

## Google Search Console
1. search.google.com/search-console → Add property → **Domain** → `auraacquisition.ma` → add the TXT record at your registrar (recommended).
   (Alternative: URL-prefix property + set `NEXT_PUBLIC_GSC_VERIFICATION` to the meta-tag token and rebuild.)
2. Sitemaps → submit `https://auraacquisition.ma/sitemap.xml`.
3. URL inspection → request indexing for `/`, the 6 service pages and the 4 industry pages.
4. Create a **Google Business Profile** only if you have a verifiable address or service area — then consider adding LocalBusiness schema.

## Analytics (optional)
Set `NEXT_PUBLIC_GA_ID=G-XXXXXXX` and rebuild. GA4 loads **only after consent** through the built-in banner; the cookie policy page updates automatically. Without the variable the site sets no cookies at all.
Privacy-friendlier alternative without consent banner: Plausible or Umami (paid/self-hosted).

## SEO / GEO implemented
Static HTML, unique titles/descriptions, canonical URLs, Open Graph/Twitter cards, `/og.png`, sitemap, robots, breadcrumbs (visible + BreadcrumbList), one H1 per page, Organization + WebSite + Person (founder) schema once per page, Service schema on service pages, Article schema on articles. FAQ content is visible text (no FAQPage markup spam). Draft/404 pages are `noindex`. See `docs/keyword-map.md` and `docs/content-plan.md`.
No promise of ranking in Google, AI Overviews or ChatGPT is made.

## Still needed from Aura (blocks full launch)
1. **Heading Now** WOFF2 files (licensed for web).
2. **Confirm WhatsApp number** `+212 7 20 81 02 98` is the business line.
3. Professional **email** (e.g. contact@auraacquisition.ma) → `lib/site.ts`.
4. **Form endpoint** (Make/Zapier webhook) and optional booking link.
5. **Legal details** for the legal notice: ICE, IF, auto-entrepreneur number, address, host. **CNDP declaration** before collecting data.
6. **Client permission** for the videos on /results (written OK per client), and permission to name clients.
7. **Verified case studies** — founder notes mention 25 and 40 enrolments in 30 days: need client name, period, ad spend and source exports before publishing.
8. Founder bio + photo, social profile URLs (also feed `sameAs` in schema).
9. Review of all French copy by Yassine; Darija/English versions later.

## Not included / limitations
- No server-side form processing (by design, see Forms). No CMS: content lives in TypeScript files (simple to edit, versioned in Git). A headless CMS can be added later if non-developers need to publish often.
- Videos are self-hosted, compressed to 540×960 (~1–3 MB each), loaded only on play.
