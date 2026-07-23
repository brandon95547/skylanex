// seo.mjs — structured data (JSON-LD) generation.
import { site, services, faqs, work, designSolutions, industryPages } from "../site.config.mjs";

const ORG = `${site.domain}/#org`;
const WEBSITE = `${site.domain}/#website`;

export function absUrl(p) {
  if (!p || p === "/") return `${site.domain}/`;
  return `${site.domain}${p}`;
}

// Sitewide graph: Organization (a professional services business) + WebSite.
// Included on every page so search engines always resolve the brand entity.
export function orgGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": ORG,
        name: site.name,
        url: `${site.domain}/`,
        logo: `${site.domain}/images/skylanex-logo.svg`,
        image: `${site.domain}/images/skylanex-logo.svg`,
        description: site.description,
        email: site.email,
        telephone: site.phone,
        founder: { "@type": "Person", name: site.owner },
        areaServed: "Worldwide",
        knowsAbout: [
          "Artificial Intelligence",
          "Machine Learning",
          "Natural Language Processing",
          "Computer Vision",
          "AI Application Development",
          "Large Language Models",
        ],
        sameAs: [site.phansoraUrl],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE,
        url: `${site.domain}/`,
        name: site.name,
        publisher: { "@id": ORG },
      },
    ],
  };
}

function breadcrumb(trail) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: absUrl(t.path),
    })),
  };
}

function faqPage(list = faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: list.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

// Per-page structured data (array). Sitewide orgGraph is added separately.
export function jsonLdForPage(page) {
  const home = { name: "Home", path: "/" };
  const svc = services.find((s) => `/${s.slug}` === page.path);

  if (page.path === "/") {
    return [faqPage()];
  }
  if (page.path === "/services") {
    return [
      breadcrumb([home, { name: "Services", path: "/services" }]),
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "AI services",
        itemListElement: services.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: s.eyebrow,
          url: absUrl(`/${s.slug}`),
        })),
      },
    ];
  }
  if (svc) {
    return [
      breadcrumb([home, { name: "Services", path: "/services" }, { name: svc.eyebrow, path: page.path }]),
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: svc.eyebrow,
        serviceType: svc.eyebrow,
        description: svc.summary,
        url: absUrl(page.path),
        provider: { "@id": ORG },
        areaServed: "Worldwide",
        offers: svc.deliverables.map((d) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: d } })),
      },
    ];
  }
  if (page.path === "/solutions") {
    return [
      breadcrumb([home, { name: "Solutions", path: "/solutions" }]),
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Design & build solutions",
        itemListElement: designSolutions.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: s.name,
          url: `${absUrl("/solutions")}#${s.slug}`,
        })),
      },
    ];
  }
  if (page.path === "/website-solutions") {
    return [
      breadcrumb([
        home,
        { name: "Solutions", path: "/solutions" },
        { name: "Website Solutions", path: "/website-solutions" },
      ]),
    ];
  }
  // Industry landing pages carry their own Service + FAQPage so each can earn a
  // rich result on its own terms rather than leaning on the /solutions parent.
  const industry = industryPages.find((p) => `/solutions/${p.slug}` === page.path);
  if (industry) {
    return [
      breadcrumb([
        home,
        { name: "Solutions", path: "/solutions" },
        { name: industry.eyebrow, path: page.path },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: industry.eyebrow,
        serviceType: industry.eyebrow,
        description: industry.description,
        url: absUrl(page.path),
        provider: { "@id": ORG },
        areaServed: "United States",
        offers: industry.included.map((i) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: i.t, description: i.d },
        })),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${industry.eyebrow} — practice areas`,
          itemListElement: industry.segments.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s },
          })),
        },
      },
      faqPage(industry.faqs),
    ];
  }
  // Concept detail pages: /solutions/<industry>/<concept>.
  for (const ind of industryPages) {
    const c = ind.showcase.find((x) => `/solutions/${ind.slug}/${x.slug}` === page.path);
    if (!c) continue;
    return [
      breadcrumb([
        home,
        { name: "Solutions", path: "/solutions" },
        { name: ind.eyebrow, path: `/solutions/${ind.slug}` },
        { name: c.firm, path: page.path },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "ImageObject",
        name: `${c.firm} — ${c.label} website design concept`,
        description: c.blurb,
        contentUrl: absUrl(`/images/concepts/${c.slug}.webp`),
        url: absUrl(page.path),
        width: 1200,
        height: 675,
        creator: { "@id": ORG },
      },
    ];
  }
  if (page.path === "/work") {
    // ISO-8601 duration from the "M:SS" display string.
    const iso = (d) => {
      const [m, s] = String(d).split(":").map(Number);
      return `PT${m ? m + "M" : ""}${s}S`;
    };
    return [
      breadcrumb([home, { name: "Work", path: "/work" }]),
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Music videos & short films",
        itemListElement: work.creative.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "VideoObject",
            name: c.name,
            description: c.blurb,
            genre: c.kind,
            duration: iso(c.duration),
            thumbnailUrl: absUrl(`/images/videos/${c.slug}.webp`),
            contentUrl: absUrl(`/videos/${c.slug}.mp4`),
            embedUrl: absUrl("/work"),
            uploadDate: "2026-01-27",
            creator: { "@id": ORG },
          },
        })),
      },
    ];
  }
  if (page.path === "/about") {
    return [
      breadcrumb([home, { name: "About", path: "/about" }]),
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        mainEntity: {
          "@type": "Person",
          name: site.owner,
          jobTitle: "AI Software Developer & Founder",
          worksFor: { "@id": ORG },
          url: absUrl("/about"),
        },
      },
    ];
  }
  if (page.path === "/contact") {
    return [
      breadcrumb([home, { name: "Contact", path: "/contact" }]),
      { "@context": "https://schema.org", "@type": "ContactPage", url: absUrl("/contact") },
    ];
  }
  return [];
}
