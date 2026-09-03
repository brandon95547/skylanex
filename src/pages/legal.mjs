import { heroGlow, afterHero } from "../ui.mjs";
import { site } from "../../site.config.mjs";

// Privacy and Terms, because the footer links to them.
//
// WRITTEN FROM WHAT THE SITE ACTUALLY DOES, not from a template. This is a static site
// with no analytics, no cookies, no local storage and no third-party fonts — verified by
// grepping for every one of those before writing a word. The only personal data it ever
// receives is whatever someone types into the contact form. Saying more than that would be
// inventing obligations; saying less would be hiding the one thing that matters.
//
// NOT LEGAL ADVICE, and it should be read by someone before it stands as the site's
// policy. It is accurate, which is the part a template cannot give you.

function legalPage({ path, file, title, description, updated, body }) {
  return {
    path,
    file,
    title,
    description,
    render: () => `
  ${heroGlow(`
    <div class="mx-auto max-w-3xl px-5 pb-10 pt-20 sm:px-8 sm:pt-24">
      <p class="eyebrow mb-3 text-primary-200">Legal</p>
      <h1 class="text-4xl font-extrabold tracking-tight text-fg sm:text-5xl">${title}</h1>
      <p class="mt-4 text-sm text-fg-muted">Last updated ${updated}</p>
    </div>
  `)}
  <section class="px-5 ${afterHero} pb-24 sm:px-8">
    <div class="prose-legal mx-auto max-w-3xl space-y-8">${body}</div>
  </section>
  `,
  };
}

const h = (t) => `<h2 class="text-xl font-bold text-fg">${t}</h2>`;
const p = (t) => `<p class="mt-3 leading-relaxed text-fg-secondary">${t}</p>`;
const ul = (items) =>
  `<ul class="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-fg-secondary">${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;

export const privacyPage = legalPage({
  path: "/privacy",
  file: "privacy.html",
  title: "Privacy Policy",
  description: "What " + site.name + " collects, what it does not, and how to reach us about it.",
  updated: "September 2026",
  body: [
    `<div>${h("The short version")}${p(
      `This site sets no cookies, runs no analytics, and loads nothing from a third party. The only personal information ${site.name} receives is what you choose to type into the contact form.`
    )}</div>`,
    `<div>${h("What we collect")}${p("Only what you send us:")}${ul([
      "<strong>Contact form.</strong> Your name, email address, and message. It is delivered to us as email so we can reply.",
      "<strong>Server logs.</strong> Our web server records the standard request line — IP address, page requested, timestamp, browser user agent — as every web server does. These are used to keep the site running and secure, and are not linked to anything else.",
    ])}</div>`,
    `<div>${h("What we do not collect")}${ul([
      "No cookies of any kind, including analytics or advertising cookies.",
      "No analytics or tracking scripts.",
      "No browser storage. Nothing is written to local or session storage.",
      "No third-party fonts, embeds, or content delivery networks — fonts are served from this domain, so no other company sees your visit.",
      "No accounts, and no profiles built about you.",
    ])}</div>`,
    `<div>${h("How we use it")}${p(
      "Contact form messages are used to answer you and to discuss work you have asked about. They are not sold, rented, or shared for marketing, and we do not add you to a mailing list you did not ask for."
    )}</div>`,
    `<div>${h("How long we keep it")}${p(
      "Correspondence is kept for as long as it is useful to the working relationship. Ask us to delete yours and we will."
    )}</div>`,
    `<div>${h("Your choices")}${p(
      `Email <a class="text-primary-200 hover:text-primary-200" href="mailto:${site.email}">${site.email}</a> to ask what we hold about you, to correct it, or to have it deleted. There is no form to fill in and no account to close.`
    )}</div>`,
    `<div>${h("Children")}${p("This site is aimed at businesses and is not directed at children under 13.")}</div>`,
    `<div>${h("Changes")}${p(
      "If this policy changes, the date at the top changes with it. There is no separate archive; the current version is the one that applies."
    )}</div>`,
    `<div>${h("Contact")}${p(
      `${site.name}, ${site.location}. <a class="text-primary-200 hover:text-primary-200" href="mailto:${site.email}">${site.email}</a>`
    )}</div>`,
  ].join(""),
});

export const termsPage = legalPage({
  path: "/terms",
  file: "terms.html",
  title: "Terms of Service",
  description: "The terms that apply to using the " + site.name + " website.",
  updated: "September 2026",
  body: [
    `<div>${h("What these cover")}${p(
      `These terms apply to this website. They do not govern any project we do together — that is covered by the written agreement for that engagement, and where the two differ, the agreement wins.`
    )}</div>`,
    `<div>${h("Using the site")}${p(
      "You may read, share, and link to anything here. You may not attempt to disrupt the site, access parts of it that are not public, or use automated means to overload it."
    )}</div>`,
    `<div>${h("Our content")}${p(
      `The words, design, code, and marks on this site belong to ${site.name} unless stated otherwise. Client names and logos are the property of their owners and appear to describe work, not to imply endorsement.`
    )}</div>`,
    `<div>${h("Design concepts")}${p(
      "Some pages show design concepts for fictional firms. They are illustrations of an approach, not past client work, and the firms shown do not exist. They are labelled as such where they appear."
    )}</div>`,
    `<div>${h("Accuracy")}${p(
      "We keep this site current, but it describes services and capabilities in general terms. Nothing here is a quote, a commitment, or professional advice for your particular situation."
    )}</div>`,
    `<div>${h("Links out")}${p(
      "Where we link to another site, we do not control it and are not responsible for what it does with your information. Its terms apply once you are there."
    )}</div>`,
    `<div>${h("Liability")}${p(
      "The site is provided as it is. To the extent the law allows, we are not liable for loss arising from using it or from being unable to. Nothing here limits liability that cannot lawfully be limited."
    )}</div>`,
    `<div>${h("Changes")}${p(
      "These terms may change; the date at the top says when they last did. Continuing to use the site means the current version applies."
    )}</div>`,
    `<div>${h("Contact")}${p(
      `${site.name}, ${site.location}. <a class="text-primary-200 hover:text-primary-200" href="mailto:${site.email}">${site.email}</a>`
    )}</div>`,
  ].join(""),
});
