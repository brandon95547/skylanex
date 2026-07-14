// site.config.mjs — single source of truth for nav, services, and work.

export const site = {
  name: "My New AI",
  tagline: "AI software studio",
  domain: "https://mynewai.example", // TODO: set real domain when chosen
  email: "hello@mynewai.example",
  phone: "(864) 437-9301",
  owner: "Brandon Sanders",
  description:
    "My New AI is an independent AI software studio — we design, build, and ship intelligent applications, from custom AI apps to machine learning, NLP, and computer vision.",
  phansoraUrl: "https://www.phansora.com",
};

// Top navigation (order matters). `path` is the built file's route.
export const nav = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
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
  clients: [
    { name: "T-Mobile", kind: "Enterprise web app", blurb: "Data-capture application for field teams." },
    { name: "WastePay", kind: "Payments platform", blurb: "Payments platform for the waste industry." },
    { name: "Lanmark360", kind: "Mobile application", blurb: "Cross-platform mobile app build." },
    { name: "160over90", kind: "Agency web project", blurb: "Web project delivered for a global agency." },
  ],
  creative: [
    { name: "God is Real", kind: "Music video" },
    { name: "Can't Stop the Rain", kind: "Music video" },
    { name: "The Teacher", kind: "Short film" },
    { name: "Yeshua", kind: "Short film" },
  ],
};

export const stats = [
  { value: "14", label: "Years building software" },
  { value: "50+", label: "Projects shipped" },
  { value: "50+", label: "Happy clients" },
  { value: "25+", label: "Technologies mastered" },
];
