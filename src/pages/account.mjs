import { heroGlow } from "../ui.mjs";

// Log in and sign up. The accounts are Phansora's: these pages post to /api/auth/*, and
// "Continue with Google" goes to /auth/google, both of which nginx forwards to Phansora's
// app — so one account works on both sites, and a sign-up here is recorded as a Skylanex
// one. assets/js/account.js drives both forms. Kept out of search: nobody needs a login
// form in their results, and the sitemap and social cards skip `noindex` pages.

const field =
  "w-full rounded-xl border border-surface-700 bg-surface-950/80 px-4 py-3 text-base text-fg placeholder:text-fg-muted outline-none transition-colors focus:border-primary-400";

// Google's own mark, in Google's colours: its sign-in guidelines ask for exactly this in a
// "Continue with Google" button, so these four are the one place the palette is not ours.
const GOOGLE_MARK = `<svg class="h-5 w-5 shrink-0" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z"/></svg>`;

function label(text, input) {
  return `<label class="block">
          <span class="mb-1.5 block text-sm font-medium text-fg-secondary">${text}</span>
          ${input}
        </label>`;
}

function accountPage({ mode, title, lead, fields, submit, switchText, switchLabel, switchHref, footnote }) {
  return heroGlow(`
    <div class="mx-auto max-w-md px-5 pb-20 pt-12 sm:px-8 sm:pt-16">
      <h1 class="text-3xl font-extrabold tracking-tight text-fg sm:text-4xl">${title}</h1>
      <p class="mt-3 leading-relaxed text-fg-secondary">${lead}</p>

      <div class="mt-8 rounded-3xl border border-surface-800 bg-surface-900/80 p-6 shadow-xl sm:p-8">
        <a href="/auth/google" data-google class="btn btn-ghost min-h-[3rem] w-full gap-3 text-base">${GOOGLE_MARK} Continue with Google</a>

        <div class="my-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-fg-muted" aria-hidden="true">
          <span class="h-px flex-1 bg-surface-800"></span>or<span class="h-px flex-1 bg-surface-800"></span>
        </div>

        <form id="account-form" data-mode="${mode}" class="space-y-4" novalidate>
          ${fields}
          <p id="account-error" class="text-sm text-rose-300" role="alert" hidden></p>
          <button type="submit" class="btn btn-primary min-h-[3rem] w-full text-base"><span data-label>${submit}</span></button>
        </form>
      </div>

      <p class="mt-6 text-center text-sm text-fg-secondary">${switchText} <a data-switch href="${switchHref}" class="font-semibold text-primary-200 hover:underline">${switchLabel}</a></p>
      <p class="mt-3 text-center text-xs leading-relaxed text-fg-muted">${footnote}</p>
    </div>
  `);
}

export const loginPage = {
  path: "/login",
  file: "login.html",
  title: "Log in",
  description: "Log in to Skylanex to use Shot Matrix.",
  noindex: true,
  scripts: ["/js/account.js"],
  render: () =>
    accountPage({
      mode: "login",
      title: "Log in",
      lead: "To use Shot Matrix, our free screenshot tool.",
      fields: [
        label("Email", `<input name="email" type="email" inputmode="email" autocomplete="email username" autocapitalize="off" spellcheck="false" required class="${field}" />`),
        label("Password", `<input name="password" type="password" autocomplete="current-password" required class="${field}" />`),
      ].join("\n          "),
      submit: "Log in",
      switchText: "New here?",
      switchLabel: "Create an account",
      switchHref: "/signup/",
      footnote: "Already use Phansora? Log in with that account — it works here too.",
    }),
};

export const signupPage = {
  path: "/signup",
  file: "signup.html",
  title: "Create an account",
  description: "Create a free Skylanex account to use Shot Matrix.",
  noindex: true,
  scripts: ["/js/account.js"],
  render: () =>
    accountPage({
      mode: "signup",
      title: "Create an account",
      lead: "Free. It’s what lets you use Shot Matrix, and it keeps the tool free for everyone.",
      fields: [
        label("Email", `<input name="email" type="email" inputmode="email" autocomplete="email username" autocapitalize="off" spellcheck="false" required class="${field}" />`),
        label("Password", `<input name="password" type="password" autocomplete="new-password" aria-describedby="password-rules" required class="${field}" />
          <span id="password-rules" class="mt-1.5 block text-xs leading-relaxed text-fg-muted">At least 8 characters, with an uppercase letter, a lowercase letter, a number and a symbol.</span>`),
        label("Confirm password", `<input name="password_confirm" type="password" autocomplete="new-password" required class="${field}" />`),
      ].join("\n          "),
      submit: "Create account",
      switchText: "Already have an account?",
      switchLabel: "Log in",
      switchHref: "/login/",
      footnote: `By creating an account you agree to the <a href="/terms" class="underline hover:text-fg">Terms</a> and the <a href="/privacy" class="underline hover:text-fg">Privacy Policy</a>. One account works on Skylanex and Phansora.`,
    }),
};
