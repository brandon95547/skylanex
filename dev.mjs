// dev.mjs — local dev server with live reload (zero dependencies).
// Serves dist/ with clean-URL routing, rebuilds HTML + CSS when source changes,
// and pushes a browser reload over SSE.
//
//   node dev.mjs   (or: npm run dev)

import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, "dist");
const PORT = Number(process.env.PORT) || 3001;
const TW_BIN = path.join(__dirname, "node_modules", ".bin", "tailwindcss");

// --- live-reload plumbing ------------------------------------------------
const clients = new Set();
function notifyReload() {
  for (const res of clients) res.write("data: reload\n\n");
}
const RELOAD_SNIPPET = `<script>
(() => {
  const es = new EventSource("/__livereload");
  es.onmessage = () => location.reload();
  es.onerror = () => { es.close(); setTimeout(() => location.reload(), 1000); };
})();
</script>`;

// --- rebuild: render HTML (build.mjs) then compile Tailwind CSS (~150ms) ------
// full=true does a clean build + copies all assets (startup only). Incremental
// rebuilds run in SKYLANEX_DEV mode: no rmrf, no video copy. Running the CSS as
// a one-shot each time avoids tailwind --watch's flaky detached initial build.
let building = false, queued = false;
function rebuild(full = false) {
  if (building) { queued = true; return; }
  building = true;
  try {
    execFileSync("node", ["build.mjs"], {
      cwd: __dirname,
      stdio: "inherit",
      env: full ? process.env : { ...process.env, SKYLANEX_DEV: "1" },
    });
    execFileSync(TW_BIN, ["-i", "./src/styles/app.css", "-o", "./dist/css/app.css"], {
      cwd: __dirname,
      stdio: "inherit",
    });
    notifyReload();
  } catch (err) {
    console.error("✗ build failed:", err.message);
  } finally {
    building = false;
    if (queued) { queued = false; rebuild(); }
  }
}

// --- watch source, debounced --------------------------------------------
const WATCH = ["src", "site.config.mjs", "assets"];
let debounce;
for (const target of WATCH) {
  const p = path.join(__dirname, target);
  if (!fs.existsSync(p)) continue;
  fs.watch(p, { recursive: true }, () => {
    clearTimeout(debounce);
    debounce = setTimeout(rebuild, 120);
  });
}

// --- static file server with clean-URL routing ---------------------------
const MIME = {
  ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".webp": "image/webp", ".ico": "image/x-icon", ".json": "application/json",
  ".mp4": "video/mp4", ".webm": "video/webm", ".txt": "text/plain", ".xml": "application/xml",
  ".woff": "font/woff", ".woff2": "font/woff2",
};

function resolveFile(urlPath) {
  let rel = decodeURIComponent(urlPath.split("?")[0]);
  let fp = path.join(DIST, rel);
  if (fs.existsSync(fp) && fs.statSync(fp).isFile()) return fp;
  // clean URL → directory index
  const idx = path.join(fp, "index.html");
  if (fs.existsSync(idx)) return idx;
  return null;
}

// --- the two services behind this site, the way nginx reaches them in prod ---
//
// /api/shotmatrix → the Shot Matrix service (`npm run serve` in ../shotmatrix).
// /api/auth, /auth/google → Phansora's app (`npm run dev` in ../phansora), which owns the
// accounts. It is told the request is for www.skylanex.com, because that is what decides
// the site an account is created on and the Google client it signs in with.
//
// A run needs an account, and in prod nginx asks Phansora's /api/auth/check first and
// hands the service the answer as X-Shotmatrix-User. This does the same. With Phansora not
// running, the header is left off: run the service with REQUIRE_LOGIN=0 to work without it.
const SHOTMATRIX = new URL(process.env.SHOTMATRIX_API || "http://127.0.0.1:4700");
const PHANSORA = new URL(process.env.PHANSORA_APP || "http://127.0.0.1:3000");
const SITE_HOST = "www.skylanex.com";

function proxy(target, req, res, headers, notRunning) {
  const upstream = http.request(
    { host: target.hostname, port: target.port, method: req.method, path: req.url, headers },
    (up) => {
      res.writeHead(up.statusCode, up.headers);
      up.pipe(res);
    }
  );
  upstream.on("error", () => {
    if (res.headersSent) return res.destroy();
    res.writeHead(502, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: notRunning }));
  });
  req.pipe(upstream);
}

// nginx's auth_request, in miniature: the signed-in account's id, or null.
function accountOf(req) {
  return new Promise((resolve) => {
    const check = http.request(
      { host: PHANSORA.hostname, port: PHANSORA.port, path: "/api/auth/check",
        headers: { host: SITE_HOST, cookie: req.headers.cookie || "" } },
      (up) => { up.resume(); resolve(up.statusCode === 204 ? up.headers["x-auth-user"] || null : null); }
    );
    check.on("error", () => resolve(null));
    check.end();
  });
}

async function proxyShotMatrix(req, res) {
  const { "x-shotmatrix-user": _ignored, ...headers } = req.headers;
  const user = await accountOf(req);
  proxy(SHOTMATRIX, req, res, { ...headers, "x-real-ip": req.socket.remoteAddress, ...(user ? { "x-shotmatrix-user": user } : {}) },
    "The Shot Matrix service isn't running here. Start it with `npm run serve` in ../shotmatrix.");
}

function proxyAccounts(req, res) {
  proxy(PHANSORA, req, res, { ...req.headers, host: SITE_HOST, "x-forwarded-for": req.socket.remoteAddress },
    "Phansora's app isn't running here, and it holds the accounts. Start it with `npm run dev` in ../phansora.");
}

const server = http.createServer((req, res) => {
  if (req.url.startsWith("/api/shotmatrix/")) return proxyShotMatrix(req, res);
  if (req.url.startsWith("/api/auth/") || /^\/auth\/google(\/callback)?(\?|$)/.test(req.url)) return proxyAccounts(req, res);
  if (req.url === "/__livereload") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });
    res.write("retry: 1000\n\n");
    clients.add(res);
    req.on("close", () => clients.delete(res));
    return;
  }

  const fp = resolveFile(req.url) || path.join(DIST, "404.html");
  const ext = path.extname(fp).toLowerCase();
  const found = fs.existsSync(fp);
  const status = resolveFile(req.url) ? 200 : 404;

  if (ext === ".html") {
    let html = found ? fs.readFileSync(fp, "utf8") : "<h1>404</h1>";
    html = html.includes("</body>")
      ? html.replace("</body>", `${RELOAD_SNIPPET}\n</body>`)
      : html + RELOAD_SNIPPET;
    res.writeHead(status, { "Content-Type": MIME[".html"], "Cache-Control": "no-store" });
    res.end(html);
    return;
  }

  res.writeHead(found ? 200 : 404, {
    "Content-Type": MIME[ext] || "application/octet-stream",
    "Cache-Control": "no-store",
  });
  res.end(found ? fs.readFileSync(fp) : "Not found");
});

// --- boot ----------------------------------------------------------------
rebuild(true); // full clean build once (copies videos, builds all assets + CSS)

server.listen(PORT, () => {
  console.log(`\n🚀 Dev server with live reload → http://localhost:${PORT}`);
  console.log("   Watching src/, site.config.mjs, assets/\n");
});
