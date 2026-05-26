export const config = {
  matcher: ["/((?!api|_next|_static|_vercel|assets|favicon).*)"],
};

const CRAWLERS = [
  "facebookexternalhit",
  "twitterbot",
  "whatsapp",
  "linkedinbot",
  "slackbot",
  "discordbot",
  "telegrambot",
  "googlebot",
  "bingbot",
  "baiduspider",
  "yandexbot",
  "duckduckbot",
  "pinterestbot",
  "applebot",
  "slurp",
  "ia_archiver",
  "metainspector",
  "curl",
  "wget",
];

function isCrawler(ua: string): boolean {
  const lower = ua.toLowerCase();
  return CRAWLERS.some((c) => lower.includes(c));
}

interface SeoMeta {
  title: string;
  description: string;
  image: string;
}

const PAGE_META: Record<string, SeoMeta> = {
  "/": {
    title: "House of Anna — Bespoke Tailoring & Fashion Design",
    description:
      "Discover the art of bespoke fashion with House of Anna. Nigeria's premier atelier for custom gowns, bridal wear, and luxury tailoring by Anna Peter.",
    image: "/assets/hero-image.webp",
  },
  "/portfolio": {
    title: "Portfolio — House of Anna",
    description:
      "Browse our curated collection of bespoke gowns, bridal wear, corporate styles, and Ankara creations. Each piece tells a story of craftsmanship.",
    image: "/assets/portfolio8.jpeg",
  },
  "/services": {
    title: "Services — House of Anna",
    description:
      "From bespoke bridal gowns to corporate wear and traditional couture. Explore our full range of tailoring and fashion design services.",
    image: "/assets/portfolio1.jpg",
  },
  "/about": {
    title: "About Anna — House of Anna",
    description:
      "Meet Anna Peter, the visionary behind House of Anna. Discover the story, craft, and passion behind Nigeria's most esteemed tailoring atelier.",
    image: "/assets/anna.jpg",
  },
  "/contact": {
    title: "Contact — House of Anna",
    description:
      "Ready to begin your bespoke journey? Contact House of Anna for consultations, inquiries, and appointments.",
    image: "/assets/logo.webp",
  },
  "/terms": {
    title: "Terms of Service — House of Anna",
    description:
      "House of Anna terms and conditions for services, appointments, and garment commissions.",
    image: "/assets/hero-image.webp",
  },
  "/privacy": {
    title: "Privacy Policy — House of Anna",
    description:
      "House of Anna privacy policy. Learn how we handle your personal information and data.",
    image: "/assets/hero-image.webp",
  },
};

function getPageMeta(pathname: string): SeoMeta {
  const cleaned = pathname.toLowerCase().replace(/\/$/, "") || "/";
  return PAGE_META[cleaned] ?? PAGE_META["/"];
}

function buildHtml(meta: SeoMeta, pathname: string, baseUrl: string): string {
  const imageUrl = `${baseUrl}${meta.image}`;
  const pageUrl = `${baseUrl}${pathname}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<link rel="icon" href="${baseUrl}/assets/logo.webp" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${meta.title}</title>
<meta name="description" content="${meta.description}" />
<meta property="og:title" content="${meta.title}" />
<meta property="og:description" content="${meta.description}" />
<meta property="og:image" content="${imageUrl}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:url" content="${pageUrl}" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="House of Anna" />
<meta property="og:locale" content="en_NG" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${meta.title}" />
<meta name="twitter:description" content="${meta.description}" />
<meta name="twitter:image" content="${imageUrl}" />
</head>
<body>
<div id="root"></div>
</body>
</html>`;
}

export default function middleware(request: Request): Response | undefined {
  const ua = request.headers.get("user-agent") || "";
  if (!isCrawler(ua)) return;

  const url = new URL(request.url);
  const proto = request.headers.get("x-forwarded-proto") || "https";
  const host = request.headers.get("host") || url.host;
  const baseUrl = `${proto}://${host}`;

  // Block admin routes from being indexed
  if (url.pathname.startsWith("/admin")) {
    return new Response(
      `<!DOCTYPE html><html><head><meta name="robots" content="noindex, nofollow"><title>Admin — House of Anna</title></head><body></body></html>`,
      {
        headers: {
          "Content-Type": "text/html;charset=UTF-8",
          "X-Robots-Tag": "noindex, nofollow",
        },
      },
    );
  }

  const meta = getPageMeta(url.pathname);
  const html = buildHtml(meta, url.pathname, baseUrl);

  return new Response(html, {
    headers: {
      "Content-Type": "text/html;charset=UTF-8",
      "Cache-Control": "public, s-maxage=86400, max-age=3600",
    },
  });
}
