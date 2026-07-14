// layout.mjs — HTML shell (head, nav, mobile menu, footer) + icon set.
import { site, nav } from "../site.config.mjs";

/* ---- inline SVG icons (stroke = currentColor) ---- */
const ICONS = {
  arrow: '<path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>',
  app: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 7h6"/><path d="M9 11h6"/><path d="M9 15h4"/>',
  network: '<circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="19" r="2.5"/><circle cx="19" cy="19" r="2.5"/><path d="M12 7.5v4M12 11.5l-5 5M12 11.5l5 5"/>',
  workflow: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><path d="M10 6.5h5a2 2 0 0 1 2 2V14"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5 5-2z"/>',
  chat: '<path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
  check: '<path d="M20 6L9 17l-5-5"/>',
  spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18"/>',
  bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/>',
  shield: '<path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z"/><path d="M9 12l2 2 4-4"/>',
  external: '<path d="M14 4h6v6"/><path d="M20 4l-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M4 7l8 6 8-6"/>',
  phone: '<path d="M4 4h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 2 6a2 2 0 0 1 2-2z"/>',
};

export function icon(name, cls = "h-5 w-5") {
  const body = ICONS[name] || ICONS.spark;
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}

function navLinks(currentPath, mobile = false) {
  return nav
    .map((item) => {
      const active = item.path === currentPath;
      if (mobile) {
        return `<a href="${item.path}" class="m-link flex items-center justify-between border-b border-surface-800 py-5 text-2xl font-semibold ${active ? "text-primary-300" : "text-surface-100"} hover:text-primary-300">
          <span>${item.label}</span>
          <span class="text-surface-500">${icon("arrow", "h-5 w-5")}</span>
        </a>`;
      }
      return `<a href="${item.path}" class="text-sm font-medium transition-colors ${active ? "text-primary-300" : "text-surface-300 hover:text-white"}">${item.label}</a>`;
    })
    .join("\n");
}

function logo() {
  return `<a href="/" class="group flex items-center gap-2.5" aria-label="${site.name} home">
    <span class="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-900/40">
      ${icon("spark", "h-5 w-5")}
    </span>
    <span class="text-base font-bold tracking-tight text-white">My New <span class="grad-text">AI</span></span>
  </a>`;
}

export function layout({ title, description, path = "/", content = "" }) {
  const pageTitle = title ? `${title} · ${site.name}` : site.name;
  const desc = description || site.description;
  return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${pageTitle}</title>
  <meta name="description" content="${desc}" />
  <meta name="theme-color" content="#0a0b12" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="${site.name}" />
  <meta property="og:title" content="${pageTitle}" />
  <meta property="og:description" content="${desc}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/css/app.css" />
</head>
<body class="min-h-screen bg-surface-950 text-surface-100 antialiased">

  <!-- ===== NAV ===== -->
  <header id="site-nav" class="sticky top-0 z-50 border-b border-transparent transition-colors">
    <nav class="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
      ${logo()}
      <div class="hidden items-center gap-8 md:flex">
        ${navLinks(path)}
      </div>
      <div class="hidden md:block">
        <a href="/contact" class="btn btn-primary">Let's talk ${icon("arrow", "h-4 w-4")}</a>
      </div>
      <!-- burger -->
      <button id="menu-toggle" class="burger relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
        <span class="block h-0.5 w-6 rounded bg-surface-100"></span>
        <span class="block h-0.5 w-6 rounded bg-surface-100"></span>
        <span class="block h-0.5 w-6 rounded bg-surface-100"></span>
      </button>
    </nav>
  </header>

  <!-- ===== MOBILE MENU ===== -->
  <div id="mobile-menu" class="fixed inset-0 z-40 flex flex-col bg-surface-950/98 px-6 pb-10 pt-24 backdrop-blur-xl md:hidden">
    <nav class="flex flex-col">
      ${navLinks(path, true)}
    </nav>
    <div class="mt-auto space-y-4 pt-8">
      <a href="/contact" class="btn btn-primary w-full">Start a project ${icon("arrow", "h-4 w-4")}</a>
      <p class="text-center text-sm text-surface-400">${site.email}</p>
    </div>
  </div>

  <main>
    ${content}
  </main>

  ${footer(path)}

  <script src="/js/main.js" defer></script>
</body>
</html>`;
}

function footer(path) {
  const cols = [
    {
      title: "Services",
      links: [
        { label: "AI App Development", href: "/ai-application-development" },
        { label: "Machine Learning", href: "/machine-learning-data-science" },
        { label: "Process Automation", href: "/intelligent-process-automation" },
        { label: "NLP", href: "/natural-language-processing" },
        { label: "Computer Vision", href: "/computer-vision-solutions" },
        { label: "AI Consulting", href: "/ai-consulting-strategy" },
      ],
    },
    {
      title: "Studio",
      links: [
        { label: "Work", href: "/work" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Phansora ↗", href: site.phansoraUrl },
      ],
    },
  ];
  return `<footer class="border-t border-surface-800 bg-surface-950">
    <div class="mx-auto max-w-6xl px-5 py-14 sm:px-8">
      <div class="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          ${logo()}
          <p class="mt-4 max-w-xs text-sm leading-relaxed text-surface-400">${site.description}</p>
          <div class="mt-5 flex flex-col gap-2 text-sm text-surface-300">
            <a href="mailto:${site.email}" class="inline-flex items-center gap-2 hover:text-white">${icon("mail", "h-4 w-4 text-primary-400")} ${site.email}</a>
            <a href="tel:${site.phone.replace(/[^0-9+]/g, "")}" class="inline-flex items-center gap-2 hover:text-white">${icon("phone", "h-4 w-4 text-primary-400")} ${site.phone}</a>
          </div>
        </div>
        ${cols
          .map(
            (c) => `<div>
          <h3 class="eyebrow text-surface-500">${c.title}</h3>
          <ul class="mt-4 space-y-2.5 text-sm">
            ${c.links.map((l) => `<li><a href="${l.href}" class="text-surface-300 hover:text-primary-300">${l.label}</a></li>`).join("")}
          </ul>
        </div>`
          )
          .join("")}
      </div>
      <div class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-surface-800 pt-6 text-xs text-surface-500 sm:flex-row">
        <p>© ${new Date().getFullYear()} ${site.name}. Built by ${site.owner}.</p>
        <p>Independent AI software studio.</p>
      </div>
    </div>
  </footer>`;
}
