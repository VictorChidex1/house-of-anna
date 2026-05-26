import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * SEO Debug Endpoint
 * Usage: /api/og?path=/about
 *
 * Returns the exact HTML that social media crawlers receive
 * for the given path. Useful for testing OG tags without
 * needing external debugger tools.
 */

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

export default function handler(req: VercelRequest, res: VercelResponse) {
  const path = (req.query.path as string) || "/";
  const proto = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers.host || "house-of-anna.vercel.app";
  const baseUrl = `${proto}://${host}`;

  // Admin routes — noindex
  if (path.startsWith("/admin")) {
    res.setHeader("Content-Type", "text/html;charset=UTF-8");
    res.setHeader("X-Robots-Tag", "noindex, nofollow");
    return res.status(200).send(
      `<!DOCTYPE html><html><head><meta name="robots" content="noindex, nofollow"><title>Admin — House of Anna</title></head><body><p>Admin routes are not indexed.</p></body></html>`,
    );
  }

  const meta = getPageMeta(path);
  const imageUrl = `${baseUrl}${meta.image}`;
  const pageUrl = `${baseUrl}${path}`;

  const html = `<!DOCTYPE html>
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
<h1>${meta.title}</h1>
<p>${meta.description}</p>
<p><strong>OG Image:</strong> <a href="${imageUrl}">${imageUrl}</a></p>
<p><strong>Page URL:</strong> <a href="${pageUrl}">${pageUrl}</a></p>
<hr />
<p><em>This is the SEO debug view. Social media crawlers see this HTML.</em></p>
</body>
</html>`;

  res.setHeader("Content-Type", "text/html;charset=UTF-8");
  res.setHeader("Cache-Control", "public, s-maxage=86400, max-age=3600");
  return res.status(200).send(html);
}
