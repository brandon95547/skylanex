// account.js — the log-in and sign-up forms (/login, /signup).
//
// Posts to /api/auth/login or /api/auth/register, which nginx forwards to Phansora's app —
// the accounts are Phansora's, shared with this site. On success the server says where to
// go; otherwise its message is shown as text, never as HTML.
(function () {
  "use strict";

  var form = document.getElementById("account-form");
  if (!form) return;
  var mode = form.getAttribute("data-mode");
  var endpoint = mode === "signup" ? "/api/auth/register" : "/api/auth/login";
  var error = document.getElementById("account-error");
  var submit = form.querySelector('button[type="submit"]');
  var label = submit.querySelector("[data-label]");
  var idle = label.textContent;
  var HOME = "/products/shot-matrix/";

  // Where to go afterwards: a path on this site and nowhere else — the same rule the
  // server applies, so a link to /login?next=//elsewhere cannot send anyone off-site.
  var next = new URLSearchParams(location.search).get("next") || "";
  if (!/^\/(?![/\\])/.test(next)) next = "";

  // Carry it onto the other ways in, so switching forms or using Google keeps it.
  var withNext = function (href) { return next ? href + "?next=" + encodeURIComponent(next) : href; };
  var google = document.querySelector("[data-google]");
  if (google) google.href = withNext("/auth/google");
  var other = document.querySelector("[data-switch]");
  if (other) other.href = withNext(other.getAttribute("href"));

  // Already signed in: there is nothing to do here.
  fetch("/api/auth/me", { cache: "no-store", credentials: "same-origin" })
    .then(function (r) { if (r.ok) location.replace(next || HOME); })
    .catch(function () { /* the form is still here to use */ });

  function show(text, link) {
    error.textContent = text || "";
    if (link) {
      error.appendChild(document.createTextNode(" "));
      var a = document.createElement("a");
      a.href = link.href;
      a.className = "font-semibold underline";
      a.textContent = link.text;
      error.appendChild(a);
    }
    error.hidden = !text;
  }

  function busy(on) {
    submit.disabled = on;
    submit.classList.toggle("opacity-70", on);
    label.textContent = on ? (mode === "signup" ? "Creating your account…" : "Logging in…") : idle;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    show("");
    var body = { next: next };
    new FormData(form).forEach(function (value, key) { body[key] = value; });
    if (!body.email || !body.password) { show("Enter your email and password."); return; }
    busy(true);
    fetch(endpoint, {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (d) { return { status: r.status, d: d || {} }; });
      })
      .then(function (res) {
        if (res.status === 200 && res.d.ok) { location.assign(res.d.redirect || next || HOME); return; }
        busy(false);
        if (res.status === 409) {
          // Most likely a Phansora account: the two sites share accounts.
          show("There’s already an account with that email, maybe from Phansora, which shares accounts with Skylanex.",
            { href: withNext("/login/"), text: "Log in instead" });
          return;
        }
        show(res.d.message || "Something went wrong. Try again in a moment.");
      })
      .catch(function () {
        busy(false);
        show("Couldn’t reach the server. Check your connection and try again.");
      });
  });
})();
