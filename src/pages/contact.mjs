import { icon } from "../layout.mjs";
import { heroGlow } from "../ui.mjs";
import { site, services } from "../../site.config.mjs";

const field = "w-full rounded-xl border border-surface-700 bg-surface-950/60 px-4 py-3 text-sm text-surface-100 placeholder-surface-500 outline-none transition-colors focus:border-primary-400";

export const contactPage = {
  path: "/contact",
  file: "contact.html",
  title: "Contact",
  description: `Start a project with ${site.owner} — tell me what you’re building and I’ll get back to you.`,
  render: () => `
  ${heroGlow(`
    <div class="mx-auto max-w-5xl px-5 pb-8 pt-20 text-center sm:px-8 sm:pt-24">
      <p class="eyebrow mb-3 text-primary-400">Contact</p>
      <h1 class="mx-auto max-w-2xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Let’s talk about your project</h1>
      <p class="mx-auto mt-5 max-w-xl text-lg text-surface-300">Tell me what you’re working on. I read every message and reply personally — usually within a day.</p>
    </div>
  `)}

  <section class="px-5 pb-24 sm:px-8">
    <div class="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
      <!-- Form -->
      <form id="contact-form" data-email="${site.email}" class="reveal rounded-3xl border border-surface-800 bg-surface-900/50 p-6 sm:p-8" novalidate>
        <div class="grid gap-4 sm:grid-cols-2">
          <label class="block">
            <span class="mb-1.5 block text-sm font-medium text-surface-200">Name</span>
            <input name="name" type="text" required placeholder="Your name" class="${field}" />
          </label>
          <label class="block">
            <span class="mb-1.5 block text-sm font-medium text-surface-200">Email</span>
            <input name="email" type="email" required placeholder="you@company.com" class="${field}" />
          </label>
        </div>
        <label class="mt-4 block">
          <span class="mb-1.5 block text-sm font-medium text-surface-200">What do you need?</span>
          <select name="topic" class="${field}">
            <option value="">Select a service…</option>
            ${services.map((s) => `<option value="${s.eyebrow}">${s.eyebrow}</option>`).join("")}
            <option value="Something else">Something else</option>
          </select>
        </label>
        <label class="mt-4 block">
          <span class="mb-1.5 block text-sm font-medium text-surface-200">Project details</span>
          <textarea name="message" rows="5" required placeholder="A sentence or two about what you’re building…" class="${field}"></textarea>
        </label>
        <button type="submit" class="btn btn-primary mt-5 w-full sm:w-auto">Send message ${icon("arrow", "h-4 w-4")}</button>
        <p id="form-note" class="mt-3 text-sm text-surface-400"></p>
      </form>

      <!-- Direct -->
      <aside class="reveal space-y-4">
        <div class="rounded-2xl border border-surface-800 bg-surface-900/50 p-6">
          <h2 class="text-sm font-semibold text-white">Prefer direct?</h2>
          <div class="mt-4 space-y-3 text-sm">
            <a href="mailto:${site.email}" class="flex items-center gap-3 text-surface-200 hover:text-white">${icon("mail", "h-4 w-4 text-primary-400")} ${site.email}</a>
            <a href="tel:${site.phone.replace(/[^0-9+]/g, "")}" class="flex items-center gap-3 text-surface-200 hover:text-white">${icon("phone", "h-4 w-4 text-primary-400")} ${site.phone}</a>
          </div>
        </div>
        <div class="rounded-2xl border border-surface-800 bg-surface-900/50 p-6">
          <h2 class="text-sm font-semibold text-white">What happens next</h2>
          <ul class="mt-4 space-y-3 text-sm text-surface-300">
            <li class="flex gap-3"><span class="text-emerald-400">${icon("check", "h-4 w-4")}</span> A personal reply, usually within a day.</li>
            <li class="flex gap-3"><span class="text-emerald-400">${icon("check", "h-4 w-4")}</span> A short call to understand the problem.</li>
            <li class="flex gap-3"><span class="text-emerald-400">${icon("check", "h-4 w-4")}</span> An honest take and a clear next step.</li>
          </ul>
        </div>
      </aside>
    </div>
  </section>
  `,
};
