// pages-index.mjs — the one list of every page the site builds.
//
// Extracted from build.mjs so the OG-card generator (scripts/og-cards.mjs) walks
// exactly the same set. Two copies of this list would drift the first time a page
// was added, and the failure would be silent: a new page with no social card.

export { ogSlug } from "./seo.mjs";

import { home } from "./pages/home.mjs";
import { servicesPage } from "./pages/services.mjs";
import { servicePages } from "./pages/service.mjs";
import { solutionsPage } from "./pages/solutions.mjs";
import { examplesPage } from "./pages/examples.mjs";
import { industryLandingPages, conceptDetailPages } from "./pages/industry.mjs";
import { workPage } from "./pages/work.mjs";
import { aboutPage } from "./pages/about.mjs";
import { contactPage } from "./pages/contact.mjs";

export const pages = [
  home,
  servicesPage,
  ...servicePages,
  solutionsPage,
  examplesPage,
  ...industryLandingPages,
  ...conceptDetailPages,
  workPage,
  aboutPage,
  contactPage,
];
