# House of Anna — SEO Architecture Documentation

> A comprehensive deep-dive into the full SEO infrastructure powering the House of Anna portfolio website.

---

## Table of Contents

1. [The Core Problem: Why SPAs Need SEO Work](#1-the-core-problem)
2. [Upgrade 1: Dynamic Head Management (react-helmet-async)](#2-upgrade-1-dynamic-head-management)
3. [Upgrade 2: XML Sitemap](#3-upgrade-2-xml-sitemap)
4. [Upgrade 3: robots.txt](#4-upgrade-3-robotstxt)
5. [Upgrade 4: JSON-LD Structured Data](#5-upgrade-4-json-ld-structured-data)
6. [The Vercel Edge Middleware (The Interceptor)](#6-the-vercel-edge-middleware)
7. [Upgrade 5: Build-Time Pre-Rendering — Why We Need It](#7-upgrade-5-build-time-pre-rendering)

---

## 1. The Core Problem

### What is a Single Page Application (SPA)?

House of Anna is built with **React + Vite**. This means the entire website is a Single Page Application. When Vite builds the project, it produces one single `index.html` file and a bundle of JavaScript files.

Every route — `/`, `/about`, `/portfolio`, `/contact` — all serve the **exact same** `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>House of Anna — Bespoke Tailoring & Fashion Design</title>
    <meta name="description" content="Discover the art of bespoke fashion..." />
    <meta property="og:title" content="House of Anna — Bespoke Tailoring..." />
    <!-- These NEVER change no matter which page you visit -->
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

React Router then reads the URL in the browser and renders the correct page component **inside** `<div id="root">`. But here's the critical problem:

### What Search Engines and Social Media See

When you share `house-of-anna.vercel.app/about` on WhatsApp, this is what happens:

```
WhatsApp Bot → Requests /about
Server → Returns index.html (same file for ALL routes)
WhatsApp Bot → Reads <title> tag → "House of Anna — Bespoke Tailoring"
WhatsApp Bot → Reads og:description → "Discover the art of bespoke fashion..."
WhatsApp Bot → Shows HOME PAGE info for the ABOUT page link ❌
```

**Why?** Because WhatsApp, Facebook, Twitter, LinkedIn, Google — none of them execute JavaScript. They only read the raw HTML that comes back from the server. Since every route returns the same `index.html`, every shared link shows the same preview card.

### How Next.js Solves This

Next.js solves this by **Server-Side Rendering (SSR)** — when a request comes in for `/about`, the server runs the React code, generates the full HTML with the correct `<title>` and `<meta>` tags, and sends it back. The bot receives a complete, page-specific HTML document.

### Our Multi-Layer Solution

Since we can't use SSR with Vite (without a full framework migration), we built a **4-layer defense system** plus an **Edge Middleware interceptor**:

```
Layer 1: react-helmet-async  → Fixes browser tab titles for REAL users
Layer 2: sitemap.xml         → Tells Google which pages exist
Layer 3: robots.txt          → Tells Google what to index/ignore
Layer 4: JSON-LD             → Gives Google rich structured data
Layer 5: Edge Middleware      → Intercepts bots and serves correct meta tags
```

---

## 2. Upgrade 1: Dynamic Head Management

### What It Does

`react-helmet-async` is a React library that lets each page component control what appears in the `<head>` of the HTML document — the `<title>`, `<meta>` tags, `<link>` tags, and `<script>` tags.

Without it, no matter which page the user navigates to, the browser tab always says:
> "House of Anna — Bespoke Tailoring & Fashion Design"

With it, each page shows its own title:
- Home tab → "House of Anna — Bespoke Tailoring & Fashion Design"
- About tab → "About Anna — House of Anna"
- Portfolio tab → "Portfolio — House of Anna"
- Contact tab → "Contact The Atelier — House of Anna"

### How It Works (Architecture)

```
main.tsx
  └── <HelmetProvider>          ← Wraps entire app
        └── <BrowserRouter>
              └── <App />
                    └── <HomePage />
                          └── <PageSeo />  ← Injects head tags
                    └── <AboutPage />
                          └── <PageSeo />  ← Different head tags
```

### The Code: `src/main.tsx`

```tsx
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>        {/* ← Provider wraps everything */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
```

**Why `HelmetProvider`?** React Helmet needs a context provider at the top of the component tree to collect all the `<Helmet>` declarations from child components and merge them into the actual document `<head>`. Without it, the `<Helmet>` components would silently do nothing.

### The Code: `src/components/seo/PageSeo.tsx`

```tsx
import { Helmet } from "react-helmet-async";

const BASE_URL = "https://house-of-anna.vercel.app";

interface PageSeoProps {
  title: string;          // Browser tab title
  description: string;    // Meta description for search results
  path: string;           // Route path like "/about"
  image?: string;         // OG image (defaults to hero-image.webp)
  type?: string;          // OG type (defaults to "website")
  noindex?: boolean;      // Block from search engines?
  jsonLd?: Record<string, unknown>;  // Structured data
}
```

**What each prop does:**

| Prop | Purpose | Example |
|------|---------|---------|
| `title` | Sets `<title>` tag + `og:title` + `twitter:title` | "About Anna — House of Anna" |
| `description` | Sets `<meta description>` + `og:description` + `twitter:description` | "Meet Anna Peter..." |
| `path` | Builds the canonical URL: `BASE_URL + path` | "/about" → `https://house-of-anna.vercel.app/about` |
| `image` | Sets `og:image` + `twitter:image` with absolute URL | "/assets/anna.jpg" |
| `noindex` | Adds `<meta name="robots" content="noindex">` | `true` for admin pages |
| `jsonLd` | Injects `<script type="application/ld+json">` | Organization schema |

**The Canonical URL** (`<link rel="canonical">`):

```tsx
<link rel="canonical" href={canonicalUrl} />
```

This tells Google: "This is the ONE true URL for this page." If your site is accessible at both `house-of-anna.vercel.app/about` and `house-of-anna.web.app/about`, Google might think they're duplicate pages and penalize you. The canonical tag says "this is the real one."

### How It's Used in Each Page

```tsx
// AboutPage.tsx
<PageSeo
  title="About Anna — House of Anna"
  description="Meet Anna Peter, the visionary behind House of Anna..."
  path="/about"
  image="/assets/anna.jpg"
  jsonLd={breadcrumbSchema}
/>
```

When the user navigates to `/about`, react-helmet-async:
1. Changes `document.title` to "About Anna — House of Anna"
2. Updates/creates the `<meta name="description">` tag
3. Updates/creates all `og:*` and `twitter:*` meta tags
4. Sets the canonical URL
5. Injects the JSON-LD script

### Why This Matters

| Without react-helmet-async | With react-helmet-async |
|---|---|
| Browser tab always says "House of Anna" | Tab updates to show current page name |
| Bookmarking any page saves the same title | Bookmarks have unique, descriptive titles |
| Browser history shows identical entries | Each entry has the correct page title |
| Accessibility tools can't distinguish pages | Screen readers announce the correct page |

---

## 3. Upgrade 2: XML Sitemap

### What It Does

A sitemap is a file that tells search engines **exactly which pages exist** on your website, how important they are relative to each other, and how often they change.

Without a sitemap, Google has to discover your pages by following links. With a sitemap, you're handing Google a complete map of your site on a silver platter.

### The File: `public/sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://house-of-anna.vercel.app/</loc>
    <lastmod>2026-05-26</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- ... more pages ... -->
</urlset>
```

**Each tag explained:**

| Tag | Purpose | Example |
|-----|---------|---------|
| `<loc>` | The full, absolute URL of the page | `https://house-of-anna.vercel.app/about` |
| `<lastmod>` | When the page was last modified | `2026-05-26` |
| `<changefreq>` | How often the content changes | `weekly`, `monthly`, `yearly` |
| `<priority>` | How important this page is relative to others (0.0 to 1.0) | Home = `1.0`, Legal = `0.3` |

### Priority Strategy

```
1.0  →  Home (most important landing page)
0.9  →  Portfolio (showcases the work — key for conversions)
0.8  →  Services (drives business inquiries)
0.7  →  About, Contact (important but secondary)
0.3  →  Terms, Privacy (legal pages — lowest priority)
```

### Why It's in `public/`

Files in the `public/` directory are copied as-is to the `dist/` folder during build. This means `sitemap.xml` is accessible at:
- `https://house-of-anna.vercel.app/sitemap.xml`
- `https://house-of-anna.web.app/sitemap.xml`

### Why This Matters

- **Google Search Console** allows you to submit your sitemap URL directly, which triggers immediate crawling
- Without a sitemap, Google may never discover pages that aren't linked prominently
- Sitemaps help Google understand your site hierarchy and prioritize crawling

---

## 4. Upgrade 3: robots.txt

### What It Does

`robots.txt` is the **first file** any search engine crawler reads when it visits your website. It's a set of rules that tells crawlers:
1. Which pages they **can** crawl
2. Which pages they **cannot** crawl
3. Where the sitemap is located

### The File: `public/robots.txt`

```txt
# House of Anna — robots.txt
User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/
Disallow: /api/

Sitemap: https://house-of-anna.vercel.app/sitemap.xml
```

**Line-by-line breakdown:**

| Line | Meaning |
|------|---------|
| `User-agent: *` | These rules apply to ALL crawlers (Google, Bing, Facebook, etc.) |
| `Allow: /` | You are allowed to crawl the entire site starting from the root |
| `Disallow: /admin` | Do NOT crawl the admin dashboard |
| `Disallow: /admin/` | Do NOT crawl any sub-pages under /admin/ |
| `Disallow: /api/` | Do NOT crawl the API debug endpoint |
| `Sitemap: ...` | Here is where our sitemap lives — go read it |

### Why Both `/admin` and `/admin/`?

- `Disallow: /admin` blocks the exact path `/admin`
- `Disallow: /admin/` blocks everything under `/admin/` like `/admin/inquiries`, `/admin/login`

Together, they ensure the entire admin area is invisible to search engines.

### Why This Matters

- Without `robots.txt`, Google might index your admin login page and show it in search results
- The `Sitemap` directive ensures Google automatically finds and processes your sitemap
- It's an industry standard — every professional website has one
- Google specifically looks for this file at `yourdomain.com/robots.txt`

---

## 5. Upgrade 4: JSON-LD Structured Data

### What It Does

JSON-LD (JavaScript Object Notation for Linked Data) is a way to tell Google **structured, machine-readable information** about your business. This is what enables **Rich Snippets** — enhanced search results that show extra information like your business address, phone number, logo, and star ratings directly in Google's search results page.

### Normal Google Result vs Rich Result

**Without JSON-LD (basic result):**
```
House of Anna — Bespoke Tailoring & Fashion Design
https://house-of-anna.vercel.app
Discover the art of bespoke fashion with House of Anna...
```

**With JSON-LD (rich result):**
```
House of Anna — Bespoke Tailoring & Fashion Design ⭐⭐⭐⭐⭐
📍 Port Harcourt, Nigeria  |  📞 +234 706 665 9660
💰 Price range: $$
Discover the art of bespoke fashion with House of Anna...
```

### The Code: Organization + LocalBusiness Schema (Home Page)

```tsx
const HOME_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "House of Anna",
      url: "https://house-of-anna.vercel.app",
      logo: "https://house-of-anna.vercel.app/assets/logo.webp",
      description: "Bespoke tailoring and fashion design...",
      sameAs: [
        "https://www.instagram.com/house_of_anna_/",
        "https://wa.me/2347066659660",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+234-706-665-9660",
        contactType: "customer service",
        availableLanguage: "English",
      },
    },
    {
      "@type": "LocalBusiness",
      name: "House of Anna",
      image: "https://house-of-anna.vercel.app/assets/hero-image.webp",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Port Harcourt",
        addressCountry: "NG",
      },
      telephone: "+234-706-665-9660",
      priceRange: "$$",
    },
  ],
};
```

**Key properties explained:**

| Property | Purpose |
|----------|---------|
| `@context` | Tells Google this uses the Schema.org vocabulary |
| `@graph` | Contains multiple related schemas in one block |
| `@type: "Organization"` | Defines House of Anna as a registered organization |
| `sameAs` | Links to official social media profiles (Google verifies these) |
| `contactPoint` | Provides the official customer service contact method |
| `@type: "LocalBusiness"` | Tells Google this is a physical business with a location |
| `priceRange` | Shows the price tier in search results ("$" to "$$$$") |

### The Code: BreadcrumbList Schema (All Other Pages)

```tsx
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://house-of-anna.vercel.app/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "About",
      item: "https://house-of-anna.vercel.app/about",
    },
  ],
};
```

**What BreadcrumbList does:**

In Google search results, instead of showing the raw URL:
```
https://house-of-anna.vercel.app/about
```

Google shows a navigable breadcrumb trail:
```
House of Anna > About
```

This makes the search result look more professional and helps users understand the site hierarchy before clicking.

### How JSON-LD is Injected

Inside `PageSeo.tsx`:

```tsx
{jsonLd && (
  <script type="application/ld+json">
    {JSON.stringify(jsonLd)}
  </script>
)}
```

`react-helmet-async` injects this `<script>` tag into the `<head>` of the document. Google's crawler reads `<script type="application/ld+json">` tags specifically and parses the JSON inside them.

### Why This Matters

- JSON-LD is Google's **preferred** method of receiving structured data
- Rich snippets dramatically increase click-through rates (CTR) — studies show 20-30% higher CTR
- It's the only way to show business info (address, phone, hours) directly in search results
- Schema.org vocabulary is a collaboration between Google, Microsoft, Yahoo, and Yandex

---

## 6. The Vercel Edge Middleware

### How It Works (Recap)

The Edge Middleware (`middleware.ts`) is our **bot interceptor**. It runs at the network edge before any static files are served:

```
1. Request comes in for /about
2. Middleware checks User-Agent header
3. If bot (Facebook, Twitter, Google, WhatsApp, etc.):
   → Build custom HTML with correct meta tags for /about
   → Return that HTML directly (bot never sees the SPA)
4. If human:
   → Pass through to the normal SPA (React loads as usual)
```

This means:
- **Real users** experience zero performance impact — the middleware returns `undefined` and the SPA loads normally
- **Bots** receive perfect, page-specific HTML with the correct OG tags, descriptions, and titles

---

## 7. Upgrade 5: Build-Time Pre-Rendering — Why We Need It

### The Gap That Still Exists

Even with all 4 upgrades + the Edge Middleware, there is still one fundamental gap compared to Next.js:

**Google's main crawler (Googlebot) DOES execute JavaScript** — but it takes time. Here's the process:

```
Googlebot visits /about
       │
       ▼
Phase 1: "Initial Crawl"
  → Googlebot downloads index.html
  → Sees <div id="root"></div> (empty)
  → Reads meta tags from react-helmet-async? NO — JavaScript hasn't run yet
  → Queues the page for "rendering"
       │
       ▼
Phase 2: "Rendering Queue" (can take DAYS or WEEKS)
  → Googlebot's rendering service executes the JavaScript
  → React finally runs and renders the page
  → NOW it reads the actual content and react-helmet-async tags
  → Indexes the page properly
```

**The problem:** Between Phase 1 and Phase 2, Google might index your page with EMPTY content. This is called the **"rendering delay"** — and for new websites, it can take days to weeks before Google properly renders your JavaScript pages.

### What Build-Time Pre-Rendering Does

Pre-rendering generates **real, complete HTML files** for each route at build time:

```
npm run build
       │
       ▼
Vite builds the SPA as usual
       │
       ▼
Pre-render plugin visits each route:
  /           → dist/index.html        (full HTML with content)
  /about      → dist/about/index.html  (full HTML with content)
  /portfolio  → dist/portfolio/index.html
  /services   → dist/services/index.html
  /contact    → dist/contact/index.html
  /terms      → dist/terms/index.html
  /privacy    → dist/privacy/index.html
```

Now when Googlebot requests `/about`, it receives:

```html
<!DOCTYPE html>
<html>
<head>
  <title>About Anna — House of Anna</title>
  <meta name="description" content="Meet Anna Peter..." />
  <meta property="og:title" content="About Anna — House of Anna" />
  <script type="application/ld+json">{ "@type": "BreadcrumbList", ... }</script>
</head>
<body>
  <div id="root">
    <!-- FULL rendered HTML content is HERE -->
    <section class="relative py-32...">
      <h1>The Story Behind the Stitch</h1>
      ...
    </section>
  </div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```

**This is exactly what Next.js does with Static Site Generation (SSG).**

### Why It's The Nuclear Option

| Feature | Without Pre-Rendering | With Pre-Rendering |
|---------|----------------------|-------------------|
| Google indexing speed | Days to weeks (rendering queue) | **Instant** (content already in HTML) |
| Social media previews | Depends on middleware | **Works even without middleware** |
| First Contentful Paint (FCP) | Slow (wait for JS to load + execute) | **Instant** (HTML already has content) |
| Core Web Vitals (LCP) | Poor (large JS bundle must load) | **Excellent** (content visible immediately) |
| SEO without any middleware | ❌ Broken | ✅ Fully functional |
| Works on any hosting platform | No (needs middleware/functions) | **Yes** (pure static files) |

### The Key Benefit

With pre-rendering, the SEO works **without the Edge Middleware entirely**. The HTML files themselves contain the correct meta tags. This means:
- It works on Firebase Hosting (no Cloud Functions needed)
- It works on any static file host (Netlify, Cloudflare Pages, etc.)
- Google indexes pages immediately on first crawl
- Social media previews work everywhere by default

The Edge Middleware becomes a **nice-to-have safety net** rather than a critical dependency.

### How We'll Implement It

We will use a Vite plugin (like `vite-plugin-prerender` or a custom post-build script) that:
1. Spins up a headless browser after `vite build`
2. Visits each route defined in our route list
3. Waits for React to render the page
4. Captures the full rendered HTML
5. Saves it as a static file in the `dist/` directory

This is the final piece that brings our Vite SPA to **true Next.js-level SEO parity**.

---

## Summary: The Complete SEO Stack

```
┌─────────────────────────────────────────────────────────────┐
│                    HOUSE OF ANNA SEO                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Layer 1: react-helmet-async                                │
│  └── Dynamic <title>, <meta>, <link rel="canonical">       │
│  └── Updates in real-time as users navigate                 │
│  └── Fixes browser tabs, bookmarks, accessibility          │
│                                                             │
│  Layer 2: sitemap.xml                                       │
│  └── Lists all 7 public pages with priorities               │
│  └── Submitted to Google Search Console                     │
│  └── Auto-discovered via robots.txt                         │
│                                                             │
│  Layer 3: robots.txt                                        │
│  └── Allows public pages, blocks /admin and /api            │
│  └── Points crawlers to sitemap.xml                         │
│                                                             │
│  Layer 4: JSON-LD Structured Data                           │
│  └── Organization + LocalBusiness (Home page)               │
│  └── BreadcrumbList (all other pages)                       │
│  └── Enables rich Google search snippets                    │
│                                                             │
│  Layer 5: Vercel Edge Middleware                             │
│  └── Detects bot User-Agents                                │
│  └── Serves page-specific meta tags to crawlers             │
│  └── Zero impact on real user performance                   │
│                                                             │
│  Layer 6: Build-Time Pre-Rendering (NEXT)                   │
│  └── Generates static HTML per route at build time          │
│  └── Achieves true Next.js SSG parity                       │
│  └── Makes all other layers work without middleware         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```
