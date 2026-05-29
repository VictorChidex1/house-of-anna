import fs from "fs";
import path from "path";
import http from "http";
import puppeteer from "puppeteer";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "../dist");

// Basic MIME types for the static server
const MIME_TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

// 1. Create a minimal static server to serve the Vite build
const server = http.createServer((req, res) => {
  const cleanUrl = req.url.split("?")[0];
  let filePath = path.join(
    distDir,
    cleanUrl === "/" ? "/index.html" : cleanUrl
  );

  // SPA fallback
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(distDir, "index.html");
  }

  const ext = path.extname(filePath);
  const contentType = MIME_TYPES[ext] || "application/octet-stream";

  try {
    const content = fs.readFileSync(filePath);
    res.writeHead(200, { "Content-Type": contentType });
    res.end(content);
  } catch (err) {
    res.writeHead(500);
    res.end("Error loading file");
  }
});

const PORT = 4173;

async function run() {
  server.listen(PORT);
  console.log(`[Prerender] Static server running on http://localhost:${PORT}`);

  // 2. Launch Puppeteer (headless Chrome)
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // 3. Define the public routes to pre-render
  const routes = [
    "/",
    "/portfolio",
    "/services",
    "/about",
    "/contact",
    "/terms",
    "/privacy",
  ];

  for (const route of routes) {
    const url = `http://localhost:${PORT}${route}`;
    console.log(`[Prerender] Rendering ${route}...`);

    // Navigate and wait for network (use networkidle2 to ignore Firestore WebSockets)
    await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });

    // Additional wait to ensure framer-motion animations, React-Helmet, and Firestore data have settled
    await new Promise((r) => setTimeout(r, 4000));

    // Capture the full HTML
    const html = await page.content();

    // 4. Save the pre-rendered HTML to the dist directory
    if (route !== "/") {
      const dirPath = path.join(distDir, route);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      fs.writeFileSync(path.join(dirPath, "index.html"), html);
    } else {
      // Overwrite the root index.html
      fs.writeFileSync(path.join(distDir, "index.html"), html);
    }

    console.log(
      `[Prerender] ✅ Saved dist${
        route === "/" ? "/index.html" : route + "/index.html"
      }`
    );
  }

  await browser.close();
  server.close();
  console.log("[Prerender] 🎉 All pages pre-rendered successfully!");
}

run().catch((err) => {
  console.error("[Prerender] Fatal Error:", err);
  process.exit(1);
});
