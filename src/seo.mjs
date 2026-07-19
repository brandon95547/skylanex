// seo.mjs — structured data (JSON-LD) generation.
import { site, services, faqs, work } from "../site.config.mjs";

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

function faqPage() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
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
