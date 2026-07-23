// site.config.mjs — single source of truth for nav, services, and work.

export const site = {
  name: "Skylanex",
  tagline: "AI software studio",
  domain: "https://www.skylanex.com", // canonical is www (site forces www + https)
  email: "info@skylanex.com",
  phone: "(864) 437-9301",
  owner: "Brandon Sanders",
  description:
    "Skylanex is an independent AI software studio — we design, build, and ship intelligent applications, from custom AI apps to machine learning, NLP, and computer vision.",
  phansoraUrl: "https://www.phansora.com",
};

// Top navigation (order matters). `path` is the built file's route.
export const nav = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Solutions", path: "/solutions" },
  { label: "Work", path: "/work" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

// The six AI service areas. Each renders a detail page at /<slug>.
// slugs match the pages currently on phansora.com so the 301s line up.
export const services = [
  {
    slug: "ai-application-development",
    icon: "app",
    eyebrow: "AI Application Development",
    title: "Custom AI apps, built around your business",
    tagline: "From idea to production — intelligent applications your team and customers actually love.",
    summary:
      "We design and ship production-grade AI applications tailored to how your business really works — not a one-size-fits-all template.",
    highlights: [
      { title: "Tailored to your workflow", text: "AI features designed around your real processes and data." },
      { title: "Production-ready", text: "Secure, scalable, maintainable apps on modern infrastructure." },
      { title: "Idea to launch", text: "Strategy, design, build, and deploy — one partner across the journey." },
    ],
    deliverables: ["Product & UX strategy", "LLM / agent integration", "APIs & data pipelines", "Cloud deployment & monitoring"],
  },
  {
    slug: "machine-learning-data-science",
    icon: "network",
    eyebrow: "Machine Learning & Data Science",
    title: "Turn your data into decisions that compound",
    tagline: "Models and pipelines that surface insight, predict outcomes, and optimize decisions.",
    summary:
      "We build models and data pipelines that turn raw data into forecasts, classifications, and recommendations you can act on.",
    highlights: [
      { title: "Predictive models", text: "Forecasting, scoring, and classification tuned to your metrics." },
      { title: "Reliable pipelines", text: "Reproducible training and serving you can trust in production." },
      { title: "Measurable impact", text: "We optimize for the business outcome, not just the accuracy score." },
    ],
    deliverables: ["Data audit & feature engineering", "Model training & evaluation", "MLOps & monitoring", "Dashboards & reporting"],
  },
  {
    slug: "intelligent-process-automation",
    icon: "workflow",
    eyebrow: "Intelligent Process Automation",
    title: "Automate the busywork, keep the judgment",
    tagline: "AI-driven automation for the repetitive work that slows your team down.",
    summary:
      "We combine LLMs, rules, and integrations to automate document processing, routing, and repetitive workflows end to end.",
    highlights: [
      { title: "Document intelligence", text: "Extract, classify, and route documents automatically." },
      { title: "Workflow orchestration", text: "Connect the tools you already use into one flow." },
      { title: "Human-in-the-loop", text: "Automation with the right checkpoints for oversight." },
    ],
    deliverables: ["Process mapping", "OCR & extraction", "Workflow integration", "Exception handling & review"],
  },
  {
    slug: "ai-consulting-strategy",
    icon: "compass",
    eyebrow: "AI Consulting & Strategy",
    title: "A clear, practical AI roadmap",
    tagline: "Cut through the hype and find where AI actually moves the needle for you.",
    summary:
      "We help you identify high-value AI opportunities, assess feasibility, and build a pragmatic roadmap you can execute.",
    highlights: [
      { title: "Opportunity mapping", text: "Find the use cases with real ROI, not just novelty." },
      { title: "Feasibility & risk", text: "Honest assessment of data, cost, and effort." },
      { title: "Actionable roadmap", text: "A prioritized plan your team can actually ship." },
    ],
    deliverables: ["Discovery workshops", "Use-case prioritization", "Technical feasibility", "Implementation roadmap"],
  },
  {
    slug: "natural-language-processing",
    icon: "chat",
    eyebrow: "Natural Language Processing",
    title: "Make sense of language at scale",
    tagline: "Understand, search, and generate text — from documents to conversations.",
    summary:
      "We build NLP systems for semantic search, summarization, classification, extraction, and conversational assistants grounded in your data.",
    highlights: [
      { title: "Retrieval & search", text: "Semantic and hybrid search over your own content." },
      { title: "Extraction & summaries", text: "Pull structured facts and concise summaries from long text." },
      { title: "Grounded assistants", text: "Chat and Q&A grounded in your sources, with citations." },
    ],
    deliverables: ["RAG pipelines", "Embeddings & vector search", "Summarization & extraction", "Conversational assistants"],
  },
  {
    slug: "computer-vision-solutions",
    icon: "eye",
    eyebrow: "Computer Vision Solutions",
    title: "Teach software to see",
    tagline: "Detection, classification, and analysis for images and video.",
    summary:
      "We build computer-vision systems for detection, recognition, quality inspection, and visual analytics — on the cloud or the edge.",
    highlights: [
      { title: "Detection & recognition", text: "Find and identify objects, defects, and patterns." },
      { title: "Image & video analytics", text: "Turn visual data into structured, searchable signals." },
      { title: "Edge or cloud", text: "Deploy where latency and cost make sense for you." },
    ],
    deliverables: ["Dataset & labeling strategy", "Model training", "Inference deployment", "Monitoring & retraining"],
  },
];

// Portfolio / work. Phansora is the flagship venture; then client + creative work.
export const work = {
  ventures: [
    {
      name: "Phansora",
      kind: "Venture — AI product suite",
      blurb:
        "An independent AI product studio I founded: Book Alchemy (books → narrated audio courses), Dossier Nova (research dossiers), Chrono Origin (origin tracing), and SpokenVerse (text-to-speech).",
      href: "https://www.phansora.com",
      external: true,
      accent: "primary",
    },
  ],
  // The four Phansora products. Each links to its live landing page — slugs match
  // the routes served by phansora.com.
  products: [
    {
      name: "Chrono Origin",
      kind: "Origin tracing",
      blurb:
        "Traces any story, myth, or claim back to the earliest source the web remembers, with cited evidence at every step.",
      href: "https://www.phansora.com/chrono-origin",
    },
    {
      name: "Book Alchemy",
      kind: "Audio course builder",
      blurb:
        "Turns any book, PDF, or long document into a structured, narrated audio course of sequential lessons.",
      href: "https://www.phansora.com/book-alchemy",
    },
    {
      name: "Dossier Nova",
      kind: "AI research tool",
      blurb:
        "Organizes PDFs, documents, audio, and URLs into one searchable, source-attributed dossier.",
      href: "https://www.phansora.com/dossier-nova",
    },
    {
      name: "SpokenVerse",
      kind: "Text-to-speech",
      blurb:
        "Converts books, articles, and documents into broadcast-quality audio with realistic neural voices.",
      href: "https://www.phansora.com/spokenverse",
    },
  ],
  // Creative reel. Tiles are a uniform 9:16; `aspect` tells the lightbox whether
  // to open a wide panel, so 16:9 pieces still play uncropped. Display-only.
  creative: [
    {
      slug: "yeshua",
      name: "Yeshua",
      kind: "Short film",
      duration: "0:39",
      aspect: "9/16",
      blurb: "A wandering teacher in a land shadowed by despair.",
    },
    {
      slug: "the-teacher",
      name: "The Teacher",
      kind: "Short film",
      duration: "0:33",
      aspect: "9/16",
      blurb: "One man stands as the storm breaks over open water.",
    },
    {
      slug: "the-face-of-god",
      name: "The Face of God",
      kind: "Short film",
      duration: "0:36",
      aspect: "9/16",
      blurb: "On seeing the divine, and what it asks of the one who looks.",
    },
    {
      slug: "moses-and-the-divine-power-of-a-burning-bush",
      name: "Moses and the Burning Bush",
      kind: "Short film",
      duration: "0:54",
      aspect: "9/16",
      blurb: "The call at Horeb — fire that burns without consuming.",
    },
    {
      slug: "the-water-no-longer-matters",
      name: "The Water No Longer Matters",
      kind: "Short film",
      duration: "0:28",
      aspect: "9/16",
      blurb: "A meditation on thirst, and what finally answers it.",
    },
    {
      slug: "the-lost-prophets-essenes",
      name: "The Lost Prophets: Essenes",
      kind: "Short film",
      duration: "0:33",
      aspect: "9/16",
      blurb: "The desert sect that kept its own counsel, and its own calendar.",
    },
    {
      slug: "pauls-epistles-c50-60-ce",
      name: "Paul's Epistles",
      kind: "Short film",
      duration: "0:34",
      aspect: "9/16",
      blurb: "The letters that shaped a movement, c. 50–60 CE.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Color palettes.
//
// Each palette is a complete, ready-to-ship UI theme: the eight tokens below are
// exactly what src/mockup.mjs needs to render a live website preview in that
// scheme. `mood` drives the filter chips on /solutions/color-palettes.
// `onPrimary` is the text color that sits on a primary-filled button — it is
// stored rather than derived so contrast stays a deliberate choice.
// ---------------------------------------------------------------------------
export const palettes = [
  {
    slug: "counsel-navy",
    name: "Counsel Navy & Brass",
    mood: "dark",
    best: "Law · Finance · Wealth management",
    note: "Deep navy reads as institutional and settled; the brass accent adds age and authority without looking gilded. The safest choice when the buying decision is trust.",
    colors: { bg: "#0b1a2b", surface: "#12263a", border: "#1e3a52", text: "#eaf1f8", muted: "#9db2c6", primary: "#c8a24a", onPrimary: "#10202f", accent: "#4f86b8" },
    variant: "classic",
    demo: {
      brand: "Whitlock & Hale",
      domain: "whitlockhale.com",
      nav: ["Practice Areas", "Attorneys", "Results", "Contact"],
      eyebrow: "Trial Attorneys",
      headline: "When the stakes are highest, preparation wins",
      sub: "Four decades of courtroom results for businesses and families across the state.",
      cta: "Free consultation",
      cta2: "Case results",
      stats: [{ v: "40+", l: "Years" }, { v: "$180M", l: "Recovered" }, { v: "98%", l: "Client rating" }],
      items: [
        { t: "Personal Injury", d: "Serious injury and wrongful death claims." },
        { t: "Business Litigation", d: "Contract, partnership, and fiduciary disputes." },
        { t: "Estate Planning", d: "Wills, trusts, and succession strategy." },
      ],
    },
  },
  {
    slug: "ivory-oxblood",
    name: "Ivory & Oxblood",
    mood: "light",
    best: "Boutique law · Estate planning · Consultancies",
    note: "A warm paper background with a single deep red. Feels like letterpress stationery — premium and personal rather than corporate.",
    colors: { bg: "#faf7f2", surface: "#ffffff", border: "#e6ddd1", text: "#221a15", muted: "#6d6055", primary: "#7b2230", onPrimary: "#ffffff", accent: "#a8763e" },
    variant: "editorial",
    demo: {
      brand: "Ashcroft Legal",
      domain: "ashcroftlegal.com",
      nav: ["Services", "Approach", "Team", "Journal"],
      eyebrow: "Est. 1978",
      headline: "Counsel that stays with the family",
      sub: "Estate, trust, and succession work for people who plan in decades, not quarters.",
      cta: "Book a meeting",
      cta2: "Our approach",
      stats: [{ v: "1,400", l: "Estates" }, { v: "3", l: "Generations" }, { v: "5.0", l: "Rating" }],
      items: [
        { t: "Trusts", d: "Revocable, irrevocable, and charitable." },
        { t: "Probate", d: "Administration handled end to end." },
        { t: "Succession", d: "Passing a business to the next hands." },
      ],
    },
  },
  {
    slug: "safety-orange",
    name: "Safety Orange & Steel",
    mood: "dark",
    best: "Construction · Industrial · Trades",
    note: "Borrowed straight from the jobsite. High-visibility orange on cold steel greys signals capability and scale — and it survives being seen on a phone in daylight.",
    colors: { bg: "#14181d", surface: "#1c2229", border: "#2c343d", text: "#f2f5f8", muted: "#9aa5b1", primary: "#f26522", onPrimary: "#12161b", accent: "#ffc107" },
    variant: "bold",
    demo: {
      brand: "IRONLINE",
      domain: "ironlinebuild.com",
      nav: ["Capabilities", "Projects", "Safety", "Careers"],
      eyebrow: "Commercial General Contractor",
      headline: "WE BUILD WHAT HOLDS",
      sub: "Ground-up commercial, industrial retrofit, and design-build delivery since 1994.",
      cta: "Request a bid",
      cta2: "See projects",
      stats: [{ v: "310", l: "Projects" }, { v: "1.2M", l: "Sq. ft." }, { v: "0", l: "Lost-time" }],
      items: [
        { t: "Design-Build", d: "One contract from drawing to keys." },
        { t: "Industrial", d: "Plants, warehouses, and heavy retrofit." },
        { t: "Preconstruction", d: "Budgets you can actually hold to." },
      ],
    },
  },
  {
    slug: "concrete-blueprint",
    name: "Concrete & Blueprint",
    mood: "light",
    best: "Engineering · Architecture · General contracting",
    note: "Drafting-table blue on concrete grey, with a hazard-yellow accent for calls to action. Technical and legible — good when the site carries a lot of spec detail.",
    colors: { bg: "#f4f5f7", surface: "#ffffff", border: "#dfe3e8", text: "#1b2027", muted: "#626c78", primary: "#1f4e79", onPrimary: "#ffffff", accent: "#f59e0b" },
    variant: "split",
    demo: {
      brand: "Verge Structural",
      domain: "vergestructural.com",
      nav: ["Sectors", "Services", "Insights", "Contact"],
      eyebrow: "Structural Engineering",
      headline: "Engineering that survives the site visit",
      sub: "Structural design, forensic assessment, and permit support for builders who move fast.",
      cta: "Start a project",
      cta2: "Our sectors",
      stats: [{ v: "22", l: "States" }, { v: "4d", l: "Avg. turnaround" }, { v: "96%", l: "First-pass permits" }],
      items: [
        { t: "Design", d: "Steel, concrete, and timber systems." },
        { t: "Forensics", d: "Failure analysis and remediation." },
        { t: "Permitting", d: "Stamped drawings, submitted for you." },
      ],
    },
  },
  {
    slug: "clinical-mint",
    name: "Clinical Blue & Mint",
    mood: "light",
    best: "Medical · Dental · Veterinary",
    note: "Cool, bright, and clean without going sterile. The mint accent is the reassurance color — use it for confirmations, availability, and anything that lowers anxiety.",
    colors: { bg: "#f5fbfc", surface: "#ffffff", border: "#d9eaee", text: "#10262c", muted: "#5b7880", primary: "#0a7ea4", onPrimary: "#ffffff", accent: "#34d399" },
    variant: "split",
    demo: {
      brand: "Northbay Dental",
      domain: "northbaydental.com",
      nav: ["Services", "New Patients", "Insurance", "Book"],
      eyebrow: "Family & Cosmetic Dentistry",
      headline: "Dentistry that doesn't feel like a dentist",
      sub: "Same-week appointments, transparent pricing, and a team that explains everything first.",
      cta: "Book online",
      cta2: "New patients",
      stats: [{ v: "2 days", l: "Avg. wait" }, { v: "4.9★", l: "600 reviews" }, { v: "12", l: "Insurers" }],
      items: [
        { t: "Preventive", d: "Cleanings, sealants, and early detection." },
        { t: "Cosmetic", d: "Veneers, whitening, and alignment." },
        { t: "Emergency", d: "Same-day relief when it can't wait." },
      ],
    },
  },
  {
    slug: "sage-terracotta",
    name: "Sage & Terracotta",
    mood: "warm",
    best: "Interiors · Real estate · Wellness",
    note: "Muted, natural, and photograph-friendly — this scheme deliberately recedes so listing photography and product shots carry the page.",
    colors: { bg: "#f8f6f1", surface: "#ffffff", border: "#e4e0d5", text: "#2a2723", muted: "#6f6a5f", primary: "#7d8b6a", onPrimary: "#ffffff", accent: "#c96f4a" },
    variant: "editorial",
    demo: {
      brand: "Marlowe & Co.",
      domain: "marlowe.co",
      nav: ["Listings", "Sell", "Neighborhoods", "About"],
      eyebrow: "Residential Real Estate",
      headline: "Homes with a point of view",
      sub: "A small brokerage representing architecturally distinct property across the valley.",
      cta: "View listings",
      cta2: "Request a valuation",
      stats: [{ v: "$412M", l: "Volume" }, { v: "18", l: "Days on market" }, { v: "104%", l: "Of asking" }],
      items: [
        { t: "Buying", d: "Off-market access and honest counsel." },
        { t: "Selling", d: "Staging, film, and full-market launch." },
        { t: "Advisory", d: "Portfolio and investment strategy." },
      ],
    },
  },
  {
    slug: "midnight-amber",
    name: "Midnight & Amber",
    mood: "dark",
    best: "Automotive · Trades · Nightlife",
    note: "Near-black with a hot amber. Very high contrast, very confident, and cheap to keep consistent — one accent does all the work.",
    colors: { bg: "#0f1115", surface: "#171a21", border: "#262b35", text: "#f4f6fa", muted: "#98a1b0", primary: "#f5b301", onPrimary: "#14161a", accent: "#ff7a45" },
    variant: "bold",
    demo: {
      brand: "CARDINAL",
      domain: "cardinalhome.com",
      nav: ["Heating", "Cooling", "Plumbing", "Emergency"],
      eyebrow: "24/7 Home Services",
      headline: "SOMEONE IS ALREADY ON THE WAY",
      sub: "HVAC, plumbing, and electrical. Live dispatch, flat-rate pricing, no overtime charges.",
      cta: "Call now",
      cta2: "Book a window",
      stats: [{ v: "47m", l: "Avg. arrival" }, { v: "24/7", l: "Dispatch" }, { v: "10yr", l: "Warranty" }],
      items: [
        { t: "Heating & Cooling", d: "Repair, replace, and maintain." },
        { t: "Plumbing", d: "Leaks, water heaters, and repipes." },
        { t: "Electrical", d: "Panels, EV chargers, and rewiring." },
      ],
    },
  },
  {
    slug: "electric-violet",
    name: "Electric Violet & Cyan",
    mood: "dark",
    best: "SaaS · AI products · Startups",
    note: "The scheme this very site runs on. Violet-to-cyan gradients read as software-native — energetic without the try-hard neon of a pure cyberpunk palette.",
    colors: { bg: "#0a0b12", surface: "#151824", border: "#232838", text: "#eceef6", muted: "#8790ad", primary: "#8b5cf6", onPrimary: "#ffffff", accent: "#22d3ee" },
    variant: "minimal",
    demo: {
      brand: "Loomstack",
      domain: "loomstack.io",
      nav: ["Product", "Docs", "Pricing", "Log in"],
      eyebrow: "Workflow Infrastructure",
      headline: "Ship the pipeline, not the plumbing",
      sub: "Durable job orchestration with retries, observability, and typed contracts out of the box.",
      cta: "Start free",
      cta2: "Read the docs",
      stats: [{ v: "99.99%", l: "Uptime" }, { v: "18ms", l: "p50" }, { v: "3.1B", l: "Jobs/mo" }],
      items: [
        { t: "Durable runs", d: "Resume exactly where it failed." },
        { t: "Typed steps", d: "Schemas enforced at the boundary." },
        { t: "Live traces", d: "Every run, every retry, searchable." },
      ],
    },
  },
  {
    slug: "forest-sand",
    name: "Forest & Sand",
    mood: "dark",
    best: "Landscaping · Outdoor · Hospitality",
    note: "A dark green base is unusual enough to be memorable and calm enough to read for a long time. Sand and moss accents keep it organic.",
    colors: { bg: "#0e1a14", surface: "#14261d", border: "#21382b", text: "#eef5f0", muted: "#93ab9d", primary: "#d9c48f", onPrimary: "#0e1a14", accent: "#4ea87a" },
    variant: "editorial",
    demo: {
      brand: "Ridgefield",
      domain: "ridgefieldland.com",
      nav: ["Design", "Build", "Maintain", "Portfolio"],
      eyebrow: "Landscape Architecture",
      headline: "Ground that improves with every season",
      sub: "Design-build landscape work for estates, wineries, and hospitality grounds.",
      cta: "Start a design",
      cta2: "See portfolio",
      stats: [{ v: "260", l: "Acres" }, { v: "31", l: "Awards" }, { v: "1996", l: "Founded" }],
      items: [
        { t: "Master planning", d: "Grading, drainage, and long horizons." },
        { t: "Installation", d: "Hardscape, planting, and lighting." },
        { t: "Stewardship", d: "Year-round care by the same crew." },
      ],
    },
  },
  {
    slug: "burgundy-cream",
    name: "Burgundy & Cream",
    mood: "warm",
    best: "Fine dining · Wineries · Boutique hotels",
    note: "Cream paper, deep wine, and a soft gold rule. Reads as expensive and unhurried — pair it with a serif and a lot of empty space.",
    colors: { bg: "#fdfaf5", surface: "#ffffff", border: "#ece2d6", text: "#241a1a", muted: "#6e5c58", primary: "#6d1f2c", onPrimary: "#ffffff", accent: "#c2a15c" },
    variant: "editorial",
    demo: {
      brand: "Cellar & Vine",
      domain: "cellarandvine.com",
      nav: ["Menu", "Cellar", "Private Events", "Reserve"],
      eyebrow: "Dinner · Wed–Sun",
      headline: "A short menu, changed often",
      sub: "Seasonal tasting service and an 800-label cellar, two blocks from the river.",
      cta: "Reserve a table",
      cta2: "View the menu",
      stats: [{ v: "800", l: "Labels" }, { v: "6", l: "Courses" }, { v: "'19", l: "Opened" }],
      items: [
        { t: "The tasting", d: "Six courses, paired or unpaired." },
        { t: "The cellar", d: "Private dining for up to fourteen." },
        { t: "Events", d: "Buyouts and seasonal wine dinners." },
      ],
    },
  },
  {
    slug: "mono-ink",
    name: "Monochrome Ink",
    mood: "light",
    best: "Agencies · Portfolios · Editorial",
    note: "Pure black on white with one violent accent. Nothing dates more slowly, and it forces the typography and layout to carry the design.",
    colors: { bg: "#ffffff", surface: "#f6f6f6", border: "#e2e2e2", text: "#0d0d0d", muted: "#6b6b6b", primary: "#0d0d0d", onPrimary: "#ffffff", accent: "#ff4d1f" },
    variant: "minimal",
    demo: {
      brand: "VANTAGE",
      domain: "studiovantage.com",
      nav: ["Work", "Studio", "Journal", "Contact"],
      eyebrow: "Brand & Digital Studio",
      headline: "Fewer, better, louder",
      sub: "We take on six engagements a year and give each of them everything.",
      cta: "Start a conversation",
      cta2: "See the work",
      stats: [{ v: "6", l: "Clients/yr" }, { v: "11", l: "Years" }, { v: "2", l: "Offices" }],
      items: [
        { t: "Identity", d: "Naming, mark, and the system around it." },
        { t: "Digital", d: "Sites and products, designed and built." },
        { t: "Campaign", d: "Launches that actually get noticed." },
      ],
    },
  },
  {
    slug: "ocean-coral",
    name: "Ocean Teal & Coral",
    mood: "cool",
    best: "Travel · Nonprofits · Education",
    note: "Friendly without being childish. Teal carries the structure, coral handles the one thing you most want clicked.",
    colors: { bg: "#f3fafa", surface: "#ffffff", border: "#d6ebeb", text: "#0d2b2b", muted: "#5a7d7d", primary: "#0f766e", onPrimary: "#ffffff", accent: "#fb7185" },
    variant: "split",
    demo: {
      brand: "Tidewater",
      domain: "tidewaterfund.org",
      nav: ["Programs", "Impact", "Volunteer", "Give"],
      eyebrow: "Coastal Conservation",
      headline: "Twelve miles of shoreline, restored",
      sub: "A community fund restoring estuary habitat and teaching the kids who'll inherit it.",
      cta: "Donate",
      cta2: "Volunteer",
      stats: [{ v: "12mi", l: "Restored" }, { v: "4,100", l: "Volunteers" }, { v: "89¢", l: "Per dollar" }],
      items: [
        { t: "Restoration", d: "Marsh, oyster reef, and dune work." },
        { t: "Education", d: "Field programs for 40 local schools." },
        { t: "Advocacy", d: "Policy work at the county level." },
      ],
    },
  },
  {
    slug: "charcoal-lime",
    name: "Charcoal & Lime",
    mood: "dark",
    best: "Gyms · Esports · Logistics",
    note: "Aggressive and modern. Lime on charcoal has enormous contrast, so keep it to buttons, numbers, and rules — a lime paragraph is unreadable.",
    colors: { bg: "#101211", surface: "#191c1a", border: "#272b28", text: "#f1f4f2", muted: "#99a29c", primary: "#a3e635", onPrimary: "#101211", accent: "#22d3ee" },
    variant: "bold",
    demo: {
      brand: "FORGE",
      domain: "forgeathletic.com",
      nav: ["Programs", "Coaches", "Schedule", "Join"],
      eyebrow: "Strength & Conditioning",
      headline: "SHOW UP. GET STRONGER.",
      sub: "Coached barbell, conditioning, and recovery programming — six days a week.",
      cta: "Claim free week",
      cta2: "See schedule",
      stats: [{ v: "62", l: "Classes/wk" }, { v: "9", l: "Coaches" }, { v: "24/7", l: "Access" }],
      items: [
        { t: "Barbell", d: "Squat, press, pull — coached every rep." },
        { t: "Conditioning", d: "Engine work that carries over." },
        { t: "Recovery", d: "Sauna, plunge, and mobility." },
      ],
    },
  },
  {
    slug: "plum-blush",
    name: "Plum & Blush",
    mood: "warm",
    best: "Salons · Med-spas · Boutiques",
    note: "Soft, feminine, and premium. The blush is a tint of the plum rather than a separate hue, which is why the pairing never fights itself.",
    colors: { bg: "#fdf7fa", surface: "#ffffff", border: "#efdfe7", text: "#2a1a24", muted: "#6f5b66", primary: "#7a2e58", onPrimary: "#ffffff", accent: "#e8a0b8" },
    variant: "split",
    demo: {
      brand: "Maison Lune",
      domain: "maisonlune.com",
      nav: ["Treatments", "Team", "Membership", "Book"],
      eyebrow: "Aesthetics & Skin",
      headline: "Skin that looks like you, rested",
      sub: "Medical-grade facials, injectables, and laser — planned as a course, not a one-off.",
      cta: "Book a consult",
      cta2: "Membership",
      stats: [{ v: "4.9★", l: "1.2k reviews" }, { v: "8", l: "Injectors" }, { v: "3", l: "Locations" }],
      items: [
        { t: "Facials", d: "Medical-grade, results in a series." },
        { t: "Injectables", d: "Conservative, natural-looking work." },
        { t: "Laser", d: "Resurfacing, pigment, and hair." },
      ],
    },
  },
  {
    slug: "slate-copper",
    name: "Slate & Copper",
    mood: "dark",
    best: "Manufacturing · B2B services · Energy",
    note: "Industrial but not loud. Copper is warm enough to feel human against slate, and a cold sky-blue secondary keeps data and links legible.",
    colors: { bg: "#131518", surface: "#1b1e23", border: "#2a2f36", text: "#eef1f5", muted: "#97a0ac", primary: "#c1703c", onPrimary: "#ffffff", accent: "#7dd3fc" },
    variant: "split",
    demo: {
      brand: "Halden Industrial",
      domain: "haldenind.com",
      nav: ["Capabilities", "Industries", "Quality", "Quote"],
      eyebrow: "Precision Manufacturing",
      headline: "Tolerances held, lead times met",
      sub: "Five-axis machining, fabrication, and finishing for aerospace and energy programs.",
      cta: "Request a quote",
      cta2: "Capabilities",
      stats: [{ v: "±.0002", l: "Tolerance" }, { v: "AS9100", l: "Certified" }, { v: "99.4%", l: "On time" }],
      items: [
        { t: "Machining", d: "Five-axis, lights-out capable." },
        { t: "Fabrication", d: "Weldments and sheet metal." },
        { t: "Quality", d: "CMM inspection and full traceability." },
      ],
    },
  },
  {
    slug: "arctic-indigo",
    name: "Arctic & Indigo",
    mood: "cool",
    best: "Fintech · Insurance · Accounting",
    note: "The default for anything handling money. Indigo is trusted and unexciting in the best way; the cyan accent keeps charts and dashboards from going flat.",
    colors: { bg: "#f7f9fc", surface: "#ffffff", border: "#e2e8f2", text: "#10172a", muted: "#5b6780", primary: "#3730a3", onPrimary: "#ffffff", accent: "#06b6d4" },
    variant: "minimal",
    demo: {
      brand: "Halcyon",
      domain: "halcyoncpa.com",
      nav: ["Services", "Industries", "Resources", "Client login"],
      eyebrow: "CPAs & Advisors",
      headline: "Books you can close the month on",
      sub: "Outsourced accounting, tax strategy, and CFO advisory for companies from $2M to $80M.",
      cta: "Talk to an advisor",
      cta2: "Our services",
      stats: [{ v: "410", l: "Clients" }, { v: "$1.9B", l: "Under advisory" }, { v: "5d", l: "Close" }],
      items: [
        { t: "Accounting", d: "Monthly close, clean and on time." },
        { t: "Tax", d: "Planning that starts before December." },
        { t: "Advisory", d: "Forecasting, pricing, and capital." },
      ],
    },
  },
];

// ---------------------------------------------------------------------------
// Legal schemes.
//
// Deliberately NOT part of `palettes` above: these exist to dress the law-firm
// concepts on /solutions/law-firms, not to be browsed as a gallery, and folding
// six more into a page that promises sixteen would dilute it. `listed: false`
// tells src/pages/industry.mjs not to link a caption to the palette page.
//
// Two extra tokens beyond the standard eight, used only by the `legal` layout
// variant's figure: `figure` is the suit tone and must read against `bg` on
// both dark and light schemes; `skin` is the head.
//
// The direction of each is drawn from the conventions of the legal-template
// genre — dark ground, metallic accent, serif display — not from any one
// product's composition.
// ---------------------------------------------------------------------------
export const legalPalettes = [
  {
    slug: "casewright",
    name: "Charcoal & Crimson",
    listed: false,
    colors: {
      bg: "#14151a", surface: "#1e2027", border: "#2c2f38", text: "#f5f6f8", muted: "#9aa0ad",
      primary: "#c8102e", onPrimary: "#ffffff", accent: "#e04156", figure: "#2b2f38", skin: "#b98e73",
    },
  },
  {
    slug: "thornbury",
    name: "Sepia & Amber",
    listed: false,
    colors: {
      bg: "#211a12", surface: "#2d2418", border: "#3d3120", text: "#f7f1e6", muted: "#b8a68c",
      primary: "#e0a13a", onPrimary: "#211a12", accent: "#f0c274", figure: "#3a2f1f", skin: "#c9a184",
    },
  },
  {
    slug: "ambersby",
    name: "Cream & Gold",
    listed: false,
    colors: {
      bg: "#f7f3ec", surface: "#ffffff", border: "#e6dccb", text: "#221d16", muted: "#7a6f5e",
      primary: "#b08d57", onPrimary: "#ffffff", accent: "#8c6d3f", figure: "#3b3428", skin: "#c9a184",
    },
  },
  {
    slug: "hollowell",
    name: "Navy & Camel",
    listed: false,
    colors: {
      bg: "#0d1b2e", surface: "#142339", border: "#1f3350", text: "#eef3f9", muted: "#9ab0c8",
      primary: "#c19a6b", onPrimary: "#0d1b2e", accent: "#e0c39b", figure: "#1a2b44", skin: "#c9a184",
    },
  },
  {
    slug: "kestrel",
    name: "Slate & Brass",
    listed: false,
    colors: {
      bg: "#16283c", surface: "#1e3348", border: "#2b4358", text: "#f1f5f9", muted: "#a3b6c7",
      primary: "#c8a06a", onPrimary: "#16283c", accent: "#e3c79a", figure: "#223b52", skin: "#c9a184",
    },
  },
  {
    slug: "stonecourt",
    name: "Plum & Pale Gold",
    listed: false,
    colors: {
      bg: "#1b1b2e", surface: "#24243c", border: "#33334f", text: "#f2f2f7", muted: "#a0a0b8",
      primary: "#d9c98c", onPrimary: "#1b1b2e", accent: "#b9a86a", figure: "#2b2b45", skin: "#c9a184",
    },
  },
];

// ---------------------------------------------------------------------------
// Industry solutions. Each card on /solutions renders a live mockup using the
// referenced palette, so `palette` must match a slug above.
// ---------------------------------------------------------------------------
export const solutions = [
  {
    slug: "attorneys",
    icon: "scale",
    // `landing` points at an industryPages[] slug. When present the /solutions
    // chip and card link to that dedicated page instead of an on-page anchor.
    landing: "law-firms",
    name: "Attorneys & Law Firms",
    tagline: "Authority in the first three seconds",
    summary:
      "Prospects arrive anxious and comparison-shopping. The site's job is to look established, name the practice area they searched for, and make contact a single tap.",
    outcomes: ["Practice-area landing pages that rank", "Case results and credentials up front", "Click-to-call and intake forms that route", "Bar-compliant disclaimers handled"],
    palette: "counsel-navy",
    noun: "law firm",
  },
  {
    slug: "construction",
    icon: "hardhat",
    name: "Construction & Contracting",
    tagline: "Built to win the bid",
    summary:
      "Buyers are checking whether you can handle their scale. Big project photography, hard numbers, safety record, and a bid request that takes thirty seconds.",
    outcomes: ["Project portfolio with scope and square footage", "Safety and certification credibility", "Bid-request and subcontractor intake", "Careers page that actually fills roles"],
    palette: "safety-orange",
    noun: "contractor",
  },
  {
    slug: "medical-dental",
    icon: "pulse",
    name: "Medical & Dental",
    tagline: "Booked before they close the tab",
    summary:
      "Patients decide on availability, insurance, and nerves. Surface all three immediately and connect the booking button to the system you already run.",
    outcomes: ["Online scheduling integration", "Insurance and pricing transparency", "New-patient forms before the visit", "Reviews surfaced where they matter"],
    palette: "clinical-mint",
    noun: "dental practice",
  },
  {
    slug: "home-services",
    icon: "wrench",
    name: "Home Services & Trades",
    tagline: "The call happens on mobile, now",
    summary:
      "HVAC, plumbing, electrical, roofing — almost every visit is an urgent mobile search. Speed, a sticky call button, and service-area pages win the job.",
    outcomes: ["Sub-second mobile load", "Sticky click-to-call on every screen", "Service-area pages for local search", "Emergency vs. scheduled paths split"],
    palette: "midnight-amber",
    noun: "home services",
  },
  {
    slug: "real-estate",
    icon: "home",
    name: "Real Estate & Property",
    tagline: "Let the photography do the selling",
    summary:
      "A restrained, editorial layout that gets out of the way of listing photos and film, with valuation capture as the primary conversion.",
    outcomes: ["IDX / listing feed integration", "Neighborhood guides for organic search", "Valuation and seller lead capture", "Agent profiles that build trust"],
    palette: "sage-terracotta",
    noun: "real estate",
  },
  {
    slug: "restaurants",
    icon: "utensils",
    name: "Restaurants & Hospitality",
    tagline: "Menu, hours, table — nothing else",
    summary:
      "Ninety percent of visitors want one of three things. Everything else is decoration, and decoration that slows the page costs covers.",
    outcomes: ["Reservation platform integration", "Menus as real text, not PDFs", "Private events and buyout inquiry", "Local and map listings kept in sync"],
    palette: "burgundy-cream",
    noun: "restaurant",
  },
  {
    slug: "professional-services",
    icon: "briefcase",
    name: "Accounting & Professional Services",
    tagline: "Credibility, then a calendar link",
    summary:
      "Long consideration cycles reward substance. Publish real expertise, gate almost nothing, and make booking the advisor frictionless.",
    outcomes: ["Service and industry landing pages", "Insight library that compounds in search", "Calendar booking and client portal links", "Structured data for firm and people"],
    palette: "arctic-indigo",
    noun: "professional services",
  },
  {
    slug: "fitness-wellness",
    icon: "dumbbell",
    name: "Fitness & Wellness",
    tagline: "Free week, one tap away",
    summary:
      "Momentum sells memberships. Show the schedule, show the coaches, and make the trial offer impossible to miss on a phone.",
    outcomes: ["Live class schedule embed", "Trial and membership signup flows", "Coach bios and transformation proof", "Retention email and SMS hooks"],
    palette: "charcoal-lime",
    noun: "fitness",
  },
];

// ---------------------------------------------------------------------------
// Design solutions — the kinds of products Skylanex designs and builds, shown
// on /solutions. Each renders a section with a static, modern WebP demo
// (assets/images/solutions/<slug>.webp, 1200×675) plus copy. This is the
// product-type view of the studio; the AI-specific work lives under /services.
// `example` (optional) links a solution to a deeper, real example page.
// ---------------------------------------------------------------------------
export const designSolutions = [
  {
    slug: "website",
    icon: "browser",
    name: "Website Design",
    tagline: "A site built to convert, not just exist",
    summary:
      "Fast, modern marketing sites designed around the one action your business needs a visitor to take — with the credibility to earn it in the first three seconds.",
    outcomes: ["Conversion-first layout & messaging", "Core Web Vitals green on mobile", "SEO-ready structure & schema", "A design system, not a template"],
    image: "/images/solutions/website.webp",
    example: { href: "/solutions/law-firms", label: "See a full example — law firm websites" },
  },
  {
    slug: "app",
    icon: "app",
    name: "App Design & Development",
    tagline: "Web and mobile apps people love to use",
    summary:
      "From dashboards to full SaaS products and native-feel mobile apps — designed around real workflows and built production-grade on modern infrastructure.",
    outcomes: ["Web & mobile product design", "Design systems & component libraries", "Auth, billing & integrations", "Scalable, maintainable builds"],
    image: "/images/solutions/app.webp",
  },
  {
    slug: "crm",
    icon: "users",
    name: "CRM & Customer Platforms",
    tagline: "Your pipeline, your rules — not off-the-shelf",
    summary:
      "Custom CRMs, sales pipelines, and client portals shaped to how you actually sell and serve — wired to the tools you already run.",
    outcomes: ["Pipelines & deal tracking", "Contact & account 360° views", "Automations & reminders", "Integrations with your stack"],
    image: "/images/solutions/crm.webp",
  },
  {
    slug: "dashboard",
    icon: "chart",
    name: "Dashboards & Analytics",
    tagline: "Decisions from data, at a glance",
    summary:
      "BI dashboards, admin panels, and reporting interfaces that turn scattered numbers into the handful of metrics that actually move the business.",
    outcomes: ["KPI & metric dashboards", "Interactive charts & filters", "Role-based admin panels", "Live data & scheduled reports"],
    image: "/images/solutions/dashboard.webp",
  },
  {
    slug: "ai-chat",
    icon: "chat",
    name: "AI Assistants & Chat",
    tagline: "Copilots grounded in your own data",
    summary:
      "Conversational assistants and copilots that answer from your content with citations — embedded in your product or standing on their own.",
    outcomes: ["Grounded RAG assistants", "In-product copilots", "Support & intake bots", "Cited, trustworthy answers"],
    image: "/images/solutions/ai-chat.webp",
  },
  {
    slug: "ecommerce",
    icon: "cart",
    name: "E-commerce Storefronts",
    tagline: "Storefronts that turn browsers into buyers",
    summary:
      "Fast, beautiful storefronts with frictionless catalog, cart, and checkout — built to sell on mobile and keep customers coming back.",
    outcomes: ["Catalog & product pages", "Streamlined cart & checkout", "Payments & inventory sync", "Built for mobile conversion"],
    image: "/images/solutions/ecommerce.webp",
  },
];

// ---------------------------------------------------------------------------
// Industry landing pages — one dedicated, search-targeted page per category,
// rendered by src/pages/industry.mjs at /solutions/<slug>.
//
// This is the deep version of a /solutions card: it targets the term a buyer
// actually searches ("law firm web design"), covers the sub-segments, and
// carries its own FAQ so the page can earn a rich result on its own.
//
// Adding the next category is a data edit — append an entry here and set
// `landing` on the matching solutions[] card. Nothing else needs to change.
//
// NOTE ON THE SHOWCASE: these are original design concepts rendered live from
// the palette system, not photographs of delivered client sites. The firms are
// fictional and the page says so — presenting invented work as a client
// portfolio would be a lie, and the concepts sell the capability anyway.
// ---------------------------------------------------------------------------
export const industryPages = [
  {
    slug: "law-firms",
    solution: "attorneys",
    icon: "scale",
    eyebrow: "Law Firm Web Design",
    h1: "Law firm websites built to turn a search into a signed client",
    metaTitle: "Law Firm Web Design & Development · Skylanex",
    description:
      "Custom law firm website design and development — practice-area architecture, intake that routes, bar-compliant disclaimers, and local SEO. See six original law firm design concepts.",
    lede:
      "Someone searching for an attorney is usually having a bad week. They are anxious, comparing three firms in three tabs, and deciding in seconds whether yours looks like it can handle their problem. Everything below is built around that moment.",
    heroStats: [
      { v: "14", l: "Years building software" },
      { v: "6", l: "Design concepts below" },
      { v: "1", l: "Developer you talk to" },
    ],

    // Six original concepts, labelled by the practice area whose buyer each is
    // pitched at. These render as static WebP in assets/images/concepts/ rather
    // than live palette mockups: the designs carry their own type and colour,
    // which the eight-token palette system can't reproduce. `slug` is both the
    // image filename and the key — see src/pages/industry.mjs.
    // Each concept gets a dedicated detail page at /solutions/<slug>/<concept>
    // with a larger render, the design rationale, and a "design mine" CTA.
    // `firm` is the name shown in the design itself (it becomes the page H1);
    // `blurb` is the one-line pitch (also the detail page's meta description);
    // `points` are what the direction does; `palette` is the colour direction
    // shown on the detail page — its swatches are sampled from the actual image
    // so the panel matches what the visitor is looking at.
    showcase: [
      {
        slug: "hawthorne",
        firm: "Hawthorne Law Group",
        label: "Business & corporate litigation",
        palette: {
          name: "Charcoal & Gold",
          colors: { bg: "#14161a", surface: "#1f232b", primary: "#c9a24a", accent: "#e2c584", text: "#f5f6f8" },
        },
        blurb:
          "A restrained, boardroom-grade layout for a firm used to high-stakes commercial disputes — proof of results before any pitch.",
        points: [
          "Representative matters and results lead the page, so a general counsel doing due diligence sees the track record first.",
          "A charcoal-and-gold palette that reads as institutional and established, not flashy.",
          "Attorney credentials structured for search and for the buyer who is comparing firms tab by tab.",
        ],
      },
      {
        slug: "lexford",
        firm: "Lexford Law",
        label: "Personal injury & civil rights",
        palette: {
          name: "Deep Navy & Gold",
          colors: { bg: "#142231", surface: "#1e3149", primary: "#c6a45c", accent: "#e0c78c", text: "#f2f5f9" },
        },
        blurb:
          "Built for the anxious mobile searcher after an accident — bold, urgent, and impossible to misread, with the next step always a thumb away.",
        points: [
          "Click-to-call fixed to the screen; the phone number is never more than one tap from anywhere on the page.",
          "Warm gold accents on deep navy that pull the eye straight to the action.",
          "Results and testimonials framed to respect personal-injury advertising rules.",
        ],
      },
      {
        slug: "westbridge",
        firm: "Westbridge Law Group",
        label: "Estate planning & appellate",
        palette: {
          name: "Navy, Ivory & Gold",
          colors: { bg: "#151d27", surface: "#f5f2ec", primary: "#bd9354", accent: "#d8bd82", text: "#1b2430" },
        },
        blurb:
          "A quiet, editorial layout for a practice built on trust and discretion — it reads like a private bank, not a billboard.",
        points: [
          "A navy, ivory, and gold palette and serif display that signal permanence and care.",
          "A long-form content architecture for the questions estate clients actually research.",
          "Appellate credentials and published work given room to breathe.",
        ],
      },
      {
        slug: "clarion",
        firm: "Greg & Abbot",
        label: "Family law & divorce",
        palette: {
          name: "Royal Navy & Gold",
          colors: { bg: "#0e273e", surface: "#f4f6f9", primary: "#c6993f", accent: "#e0be79", text: "#12283f" },
        },
        blurb:
          "Warm and human without losing authority — for clients making one of the hardest decisions of their life. Calm, clear, and never cold.",
        points: [
          "A confident royal-navy-and-gold palette with generous spacing that steadies a hard moment.",
          "A confidential intake path designed for a sensitive first contact.",
          "Plain-language answers to the questions clients are often afraid to ask.",
        ],
      },
      {
        slug: "harbor",
        firm: "Grand Oak Law Group",
        label: "Criminal defense",
        palette: {
          name: "Sandstone & Navy",
          colors: { bg: "#20303f", surface: "#f6f2ea", primary: "#c1a05d", accent: "#e0c890", text: "#1d2c3b" },
        },
        blurb:
          "Grounded and serious, built for someone searching at 2 a.m. after an arrest — it projects steadiness and moves fast.",
        points: [
          "Emergency and 24/7 contact paths surfaced above everything else.",
          "A warm sandstone-and-navy palette that reads as composed, not alarming.",
          "Case dispositions and defense record presented within bar rules.",
        ],
      },
      {
        slug: "apex",
        firm: "Apex Legal",
        label: "Immigration & business",
        palette: {
          name: "Espresso & Amber",
          colors: { bg: "#1b1612", surface: "#2a2119", primary: "#d99a3c", accent: "#edc37c", text: "#f6efe4" },
        },
        blurb:
          "Welcoming and modern for a practice serving clients across languages and borders — approachable, but unmistakably professional.",
        points: [
          "A warm espresso-and-amber palette and open layout that reads as inviting, not intimidating.",
          "Structured for multilingual content and cross-border service pages.",
          "Clear, separate pathways for individual and business immigration matters.",
        ],
      },
    ],

    // Practice areas get their own page each — this is the search unit.
    segments: [
      "Personal Injury",
      "Criminal Defense",
      "Family Law & Divorce",
      "Estate Planning & Probate",
      "Business & Corporate",
      "Immigration",
      "Employment & Labor",
      "Real Estate",
      "Bankruptcy",
      "Intellectual Property",
      "Medical Malpractice",
      "Workers' Compensation",
    ],

    // What actually ships.
    included: [
      { t: "Practice-area architecture", d: "One page per practice area, per location — the unit people actually search for." },
      { t: "Attorney profiles", d: "Bios, bar admissions, education, and published work, all structured for search." },
      { t: "Case results module", d: "Verdicts and settlements with the disclaimers your state requires." },
      { t: "Intake that routes", d: "Forms and click-to-call wired to your case management or inbox, not a black hole." },
      { t: "Compliance handled", d: "Disclaimers, no-guarantee language, and prior-results notices reviewed against your bar rules." },
      { t: "Accessibility", d: "WCAG 2.1 AA — a real risk area for public-facing legal sites." },
      { t: "Structured data", d: "LegalService, Attorney, and FAQ schema so search engines can read the firm." },
      { t: "Speed & mobile", d: "Core Web Vitals green on a phone, on cell service, which is where the calls come from." },
    ],

    // Why this vertical is genuinely different from a generic business site.
    differentiators: [
      {
        icon: "shield",
        t: "The visitor is in crisis",
        d: "They are not browsing. Injury, arrest, divorce, a death in the family — the page has to be calm, obvious, and fast, with the next step never more than one tap away.",
      },
      {
        icon: "scale",
        t: "Bar rules are not optional",
        d: "Advertising rules, testimonial restrictions, and prior-results disclaimers vary by state. I build to your jurisdiction's rules and hand you the language for your compliance review.",
      },
      {
        icon: "layers",
        t: "Practice area is the search unit",
        d: "Nobody searches for 'law firm.' They search 'car accident lawyer Greenville.' The site is structured as one strong page per practice area and market, not one page about everything.",
      },
      {
        icon: "bolt",
        t: "Intake is the conversion",
        d: "A form that lands in an unwatched inbox is a lost client. Submissions route to the right person, with the confidentiality notice the form legally needs to carry.",
      },
    ],

    seoPoints: [
      { t: "Practice area × location pages", d: "The page architecture that captures how legal searches are actually typed." },
      { t: "LegalService & Attorney schema", d: "Structured data for the firm, each attorney, and each practice area." },
      { t: "Local presence", d: "Google Business Profile, consistent citations, and location pages for each office." },
      { t: "Answer-first content", d: "The questions clients ask before hiring — written to be found, and to be useful." },
      { t: "Migration without loss", d: "Redesigns ship with a redirect map so existing rankings survive the launch." },
      { t: "Reviews within the rules", d: "A review strategy that respects the testimonial restrictions in your state." },
    ],

    faqs: [
      {
        q: "How much does a law firm website cost?",
        a: "Scope drives it. A focused site for a solo practice is a very different build than a multi-office firm with twelve practice areas and case-management integration. You get a fixed number after a short scoping call — not an hourly meter, and not a number I made up before understanding the firm.",
      },
      {
        q: "How long does it take?",
        a: "A focused practice site typically runs 3–5 weeks from kickoff; a larger multi-practice build usually runs 8–12. You see working pages every week rather than waiting for a single reveal at the end.",
      },
      {
        q: "Do you handle bar compliance and disclaimers?",
        a: "I build to your state's advertising rules and include the standard disclaimers, prior-results notices, and no-attorney-client-relationship language in the right places. I am a developer, not your ethics counsel — the final language goes to you or your compliance reviewer before launch.",
      },
      {
        q: "Can you integrate with our case management software?",
        a: "Yes. Intake forms can route into Clio, MyCase, Filevine, Smokeball, or plain email and your CRM. If the tool has an API or a webhook, it can be wired up.",
      },
      {
        q: "Do you do the SEO too, or just the site?",
        a: "The site ships SEO-ready: practice-area architecture, structured data, clean technical foundation, and a content plan for the pages that will earn traffic next. Ongoing content and link work is a separate engagement if you want it.",
      },
      {
        q: "We already have a site. Can you redesign it without losing our rankings?",
        a: "Yes, and that planning happens before anything is built. Existing URLs get mapped and redirected, high-performing pages are identified and preserved, and rankings are watched through the launch window.",
      },
      {
        q: "Who owns the website when it's done?",
        a: "You do — the code, the content, the domain, and the accounts. No proprietary platform you can only leave by starting over.",
      },
      {
        q: "Do you work with solo attorneys and small firms?",
        a: "Yes. A solo practice with one sharp practice-area page often outperforms a regional firm with a neglected site. The engagement scales to the firm.",
      },
    ],
  },
];

export const stats = [
  { value: "14", label: "Years building software" },
  { value: "50+", label: "Projects shipped" },
  { value: "50+", label: "Happy clients" },
  { value: "25+", label: "Technologies mastered" },
];

// Social proof — real names of teams/products worked with (logos can replace text later).
export const trustedBy = ["T-Mobile", "WastePay", "Lanmark360", "160over90", "Phansora"];

// FAQ — buyer questions (drives the FAQ section + FAQPage structured data / rich results).
export const faqs = [
  {
    q: "What kinds of AI projects do you take on?",
    a: "Everything from LLM-powered apps and agents, RAG and semantic search, and document automation to predictive machine-learning models and computer vision. If it involves shipping real, production AI software, it's in scope.",
  },
  {
    q: "Do you work with startups, or only enterprises?",
    a: "Both. I've delivered for enterprises like T-Mobile and for lean startups. The engagement scales to the problem — a focused prototype for a startup or a production system for an enterprise team.",
  },
  {
    q: "Is AI actually the right fit for my problem?",
    a: "Sometimes it isn't — and I'll tell you honestly. Every engagement starts with discovery to confirm AI adds real value before any build. If a simpler tool wins, that's the recommendation.",
  },
  {
    q: "How long does a typical project take?",
    a: "A validated prototype often takes 2–4 weeks; a production-ready system typically runs 6–12 weeks depending on scope, data, and integrations. You see working software every week either way.",
  },
  {
    q: "Can you work with our existing team and tech stack?",
    a: "Yes. I integrate with your engineers, tools, and infrastructure — Python, TypeScript, React, cloud, your data warehouse — rather than forcing a rewrite.",
  },
  {
    q: "How do we get started?",
    a: "Send a short note about what you're building via the contact page. You'll get a personal reply, usually within a day, and a short call to scope it.",
  },
];
