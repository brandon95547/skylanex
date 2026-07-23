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

const server = http.createServer((req, res) => {
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
