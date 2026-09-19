// shotmatrix.js — the free tool on /products/shot-matrix.
//
// Talks to the Shot Matrix service at /api/shotmatrix (same origin, through nginx), which
// answers only a signed-in account: nginx asks Phansora's app, where the accounts live,
// before it lets a request through. The page solves the service's proof-of-work challenge
// in a worker, starts a run and polls it, then downloads the zip — the only delivery
// there is. The service deletes its copy the moment the zip has been sent, so the page
// keeps the file it received, and "Save zip" saves that rather than asking again.
//
// Everything the service or a visitor supplies — the address, the host, error messages,
// the list of failed requests — is written with textContent or as an attribute, never as
// HTML. The page is showing strangers' input back to strangers.
(function () {
  "use strict";

  var form = document.getElementById("sm-form");
  var section = document.getElementById("sm-results");
  if (!form || !section) return;

  var API = form.getAttribute("data-api");
  var LOGIN = form.getAttribute("data-login") || "/login/";
  var POW_WORKER = form.getAttribute("data-pow") || "/js/shotmatrix-pow.js";
  var ENGINES = JSON.parse(form.getAttribute("data-engines"));
  var VIEWPORTS = JSON.parse(form.getAttribute("data-viewports"));
  var input = document.getElementById("sm-url");
  var button = document.getElementById("sm-go");
  var buttonLabel = button.querySelector("[data-label]");
  var note = document.getElementById("sm-note");
  var noteDefault = note.textContent.trim();
  var accountLine = document.getElementById("sm-account");
  var honeypot = form.querySelector('input[name="website"]');
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var ui = {
    host: section.querySelector("[data-host]"),
    status: section.querySelector("[data-status]"),
    actions: section.querySelector("[data-actions]"),
    save: section.querySelector("[data-save]"),
    bar: section.querySelector("[data-bar]"),
    fill: section.querySelector("[data-fill]"),
    download: section.querySelector("[data-download]"),
    report: section.querySelector("[data-report]"),
  };

  var engineLabel = {};
  ENGINES.forEach(function (e) { engineLabel[e.key] = e.label; });
  var viewportByKey = {};
  VIEWPORTS.forEach(function (v) { viewportByKey[v.key] = v; });

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }
  function plural(n, one, many) { return n + " " + (n === 1 ? one : many); }
  function size(bytes) {
    return bytes >= 1048576 ? (bytes / 1048576).toFixed(1) + " MB" : Math.max(1, Math.round(bytes / 1024)) + " KB";
  }
  function clock(ms) { return new Date(ms).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }); }
  function link(text, onClick) {
    var b = el("button", "font-semibold text-primary-200 hover:underline", text);
    b.type = "button";
    b.addEventListener("click", onClick);
    return b;
  }

  // ── the line under the form ────────────────────────────────────────────────
  var NOTE_TONES = { error: "text-rose-300", info: "text-fg-secondary" };
  function say(text, tone) {
    note.textContent = text || noteDefault;
    note.className = "mt-4 min-h-[1.5rem] text-sm " + (NOTE_TONES[tone] || "text-fg-muted");
  }

  var running = false;
  function setRunning(on, label) {
    running = on;
    button.disabled = on;
    button.classList.toggle("opacity-70", on);
    button.classList.toggle("cursor-wait", on);
    buttonLabel.textContent = label || (account === null && accountChecked ? "Log in to capture" : "Capture screenshots");
  }

  // ── the account ────────────────────────────────────────────────────────────
  // Unknown until /api/auth/me answers. The button waits on the answer rather than guess,
  // and a signed-out press goes to the login page with this page — and the address typed
  // into it — as the way back, so nothing has to be typed twice.
  var account = null;
  var accountChecked = false;
  var known = fetch("/api/auth/me", { cache: "no-store", credentials: "same-origin" })
    .then(function (r) { return r.ok ? r.json() : null; })
    .catch(function () { return null; })
    .then(function (d) {
      account = d && d.ok ? d.user : null;
      accountChecked = true;
      showAccount();
    });

  function back() {
    var url = input.value.trim();
    return location.pathname + (url ? "?url=" + encodeURIComponent(url) : "");
  }
  function toLogin(page) { location.assign((page || LOGIN) + "?next=" + encodeURIComponent(back())); }

  function showAccount() {
    accountLine.textContent = "";
    accountLine.hidden = false;
    if (account) {
      accountLine.appendChild(document.createTextNode("Signed in as " + (account.name || account.email) + " · "));
      accountLine.appendChild(link("Log out", logOut));
    } else {
      accountLine.appendChild(link("Log in", function () { toLogin(); }));
      accountLine.appendChild(document.createTextNode(" or "));
      accountLine.appendChild(link("create a free account", function () { toLogin("/signup/"); }));
      accountLine.appendChild(document.createTextNode(" to capture screenshots."));
    }
    if (!running) setRunning(false);
  }

  function logOut() {
    fetch("/api/auth/logout", { method: "POST", credentials: "same-origin" })
      .catch(function () { /* signed out locally either way */ })
      .then(function () { account = null; proof = null; showAccount(); say(); });
  }

  // The session ended while the page was open — a day of inactivity, or signed out in
  // another tab. Said plainly, with the way back.
  function sessionEnded() {
    account = null;
    showAccount();
    setRunning(false);
    say("You’ve been signed out. Log in again to capture.", "error");
  }

  // Back from the login page: the address they had typed rides in ?url=.
  var preset = new URLSearchParams(location.search).get("url");
  if (preset && !input.value) input.value = preset;
  if (preset) {
    try { history.replaceState(null, "", location.pathname + location.hash); } catch (err) { /* sandboxed */ }
  }

  // ── proof of work ──────────────────────────────────────────────────────────
  // Started the moment someone signed in shows intent — focusing the field, typing,
  // pasting — so it is normally finished before they press the button. One solution per
  // run, spent on submit; the next is only started when they come back to the form.
  var proof = null;
  function solve() {
    return fetch(API + "/challenge", { cache: "no-store", credentials: "same-origin" })
      .then(function (r) {
        if (r.status === 401) throw { login: true };
        if (!r.ok) throw new Error("challenge " + r.status);
        return r.json();
      })
      .then(function (c) {
        return new Promise(function (resolve, reject) {
          var worker = new Worker(POW_WORKER);
          worker.onmessage = function (e) {
            worker.terminate();
            resolve({ token: c.token, nonce: e.data.nonce, at: Date.now() });
          };
          worker.onerror = function (err) { worker.terminate(); reject(err); };
          worker.postMessage({ salt: c.salt, bits: c.bits });
        });
      });
  }
  function prime() {
    if (proof || running || !account) return;
    proof = solve();
    proof.catch(function () { proof = null; });
  }
  function takeProof() {
    var pending = proof || solve();
    proof = null;
    return pending.then(function (s) {
      // A challenge lasts ten minutes. One close to that is re-solved rather than sent
      // off to be refused.
      return Date.now() - s.at > 8 * 60 * 1000 ? solve() : s;
    });
  }
  ["focus", "input", "paste"].forEach(function (type) { input.addEventListener(type, prime); });
  known.then(function () { if (document.activeElement === input) prime(); });

  // ── starting a run ─────────────────────────────────────────────────────────
  function checked(name) {
    return Array.prototype.slice
      .call(form.querySelectorAll('input[name="' + name + '"]:checked'))
      .map(function (box) { return box.value; });
  }

  function jsonOf(response) {
    return response.json()
      .catch(function () { return {}; })
      .then(function (data) { return { status: response.status, data: data || {} }; });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (running) return;
    known.then(function () {
      if (!account) { toLogin(); return; }
      var url = input.value.trim();
      var engines = checked("engines");
      var viewports = checked("viewports");
      if (!url) { say("Enter the address of the page to capture.", "error"); input.focus(); return; }
      if (!engines.length) { say("Pick at least one browser.", "error"); return; }
      if (!viewports.length) { say("Pick at least one screen width.", "error"); return; }
      setRunning(true, "Starting…");
      say("Checking you’re not a bot…", "info");
      start({ url: url, engines: engines, viewports: viewports, website: honeypot ? honeypot.value : "" }, 1);
    });
  });

  function start(body, retries) {
    // Normally done before the button is pressed. Browsers running JavaScript without
    // its JIT (Edge's enhanced security mode, iOS Lockdown Mode) take a few seconds, and
    // a note that promised "a moment" should not sit there saying so.
    var slow = setTimeout(function () {
      say("Still checking. This takes a few seconds on some browsers and phones.", "info");
    }, 2500);
    takeProof()
      .then(function (p) {
        clearTimeout(slow);
        body.token = p.token;
        body.nonce = p.nonce;
        return fetch(API + "/jobs", {
          method: "POST",
          credentials: "same-origin",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }).then(jsonOf);
      })
      .then(function (res) {
        var d = res.data;
        if ((res.status === 200 || res.status === 202) && d.id) { say(); attach(d.id, true); return; }
        if (res.status === 401) { sessionEnded(); return; }
        // Already running one: that run is what they want to be looking at.
        if (res.status === 429 && d.id) { say(d.error, "info"); attach(d.id, true); return; }
        // The challenge went stale or the service restarted under it. Once, quietly.
        if (res.status === 403 && d.code === "pow" && retries > 0) { start(body, retries - 1); return; }
        setRunning(false);
        say(d.error || "Something went wrong. Try again in a moment.", "error");
        if (d.code === "url") input.focus();
      })
      .catch(function (err) {
        clearTimeout(slow);
        if (err && err.login) { sessionEnded(); return; }
        setRunning(false);
        say("Shot Matrix couldn’t be reached. Check your connection, or try again in a few minutes.", "error");
      });
  }

  // ── following a run ────────────────────────────────────────────────────────
  var current = null;
  var pollTimer = null;

  function setBar(pct) {
    ui.fill.style.width = pct + "%";
    ui.bar.setAttribute("aria-valuenow", String(pct));
  }
  function clearHash() {
    try { history.replaceState(null, "", location.pathname); } catch (err) { /* sandboxed */ }
  }

  function attach(id, scroll) {
    clearTimeout(pollTimer);
    current = { id: id, built: false, nodes: {}, seen: {}, misses: 0, finished: false };
    // The run's id rides in the address while it runs, so a reload picks it back up.
    try { history.replaceState(null, "", "#run=" + id); } catch (err) { /* sandboxed */ }
    section.hidden = false;
    ui.report.textContent = "";
    ui.actions.hidden = true;
    ui.download.textContent = "";
    ui.host.textContent = "Starting…";
    ui.status.textContent = "";
    ui.bar.hidden = false;
    setBar(0);
    setRunning(true, "Running…");
    if (scroll) section.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    poll(id);
  }

  function poll(id) {
    fetch(API + "/jobs/" + encodeURIComponent(id), { cache: "no-store", credentials: "same-origin" })
      .then(jsonOf)
      .then(function (res) {
        if (!current || current.id !== id) return;
        if (res.status === 401) { sessionEnded(); return; }
        if (res.status === 404) { gone(res.data.error); return; }
        if (res.status !== 200) throw new Error(String(res.status));
        current.misses = 0;
        render(res.data);
        if (res.data.state === "queued" || res.data.state === "running") {
          pollTimer = setTimeout(function () { poll(id); }, 1500);
        }
      })
      .catch(function () {
        if (!current || current.id !== id) return;
        // A dropped poll is not a failed run: keep asking, less often, for a couple of
        // minutes before saying so.
        current.misses += 1;
        if (current.misses > 30) {
          setRunning(false);
          ui.status.textContent = "Lost contact with Shot Matrix. Reload the page to check on this run.";
          return;
        }
        ui.status.textContent = "Lost contact with Shot Matrix. Retrying…";
        pollTimer = setTimeout(function () { poll(id); }, 4000);
      });
  }

  function gone(message) {
    setRunning(false);
    ui.host.textContent = "This run is gone";
    ui.status.textContent = message || "Screenshots are deleted once they’re downloaded, or 10 minutes after the run finishes. Start a new run above.";
    ui.report.textContent = "";
    ui.actions.hidden = true;
    ui.download.textContent = "";
    ui.bar.hidden = true;
    clearHash();
  }

  function statusLine(job) {
    if (job.state === "queued") {
      return job.ahead > 0
        ? "Waiting in line: " + plural(job.ahead, "run", "runs") + " ahead of yours."
        : "Starting the browsers…";
    }
    if (job.state === "running") return "Rendering: " + job.done + " of " + job.total + " done.";
    if (job.state === "failed") return job.error || "The page couldn’t be captured.";
    var ok = job.cells.filter(function (c) { return c.state === "done"; }).length;
    var secs = job.startedAt && job.finishedAt ? Math.round((job.finishedAt - job.startedAt) / 1000) : 0;
    var line = ok + " of " + job.total + " rendered" + (secs ? " in " + secs + " seconds" : "") + ".";
    var sideways = job.cells.filter(function (c) { return c.overflows; }).length;
    var flagged = job.cells.filter(function (c) { return c.problems > 0 || c.status >= 400; }).length;
    var missing = job.total - ok;
    var parts = [];
    if (sideways) parts.push(plural(sideways, "shot scrolls", "shots scroll") + " sideways");
    if (flagged) parts.push(plural(flagged, "shot has", "shots have") + " failed loads or errors");
    if (missing) parts.push(plural(missing, "shot", "shots") + " couldn’t be taken");
    return line + " " + (parts.length ? parts.join(", ") + "." : "No problems found.");
  }

  function render(job) {
    if (!current.built) build(job);
    ui.host.textContent = job.host;
    if (!input.value) input.value = job.url; // picked back up after a reload
    setBar(job.total ? Math.round((job.done / job.total) * 100) : 0);
    ui.status.textContent = statusLine(job);
    job.cells.forEach(function (c) { updateCell(job, c); });
    if ((job.state === "done" || job.state === "failed") && !current.finished) {
      current.finished = true;
      finish(job);
    }
  }

  // ── the report ─────────────────────────────────────────────────────────────
  // One row per width, one card per engine, in the order they were asked for: what each
  // shot found, since the shots themselves are in the zip.
  function build(job) {
    current.built = true;
    ui.report.textContent = "";
    job.viewports.forEach(function (vk) {
      var vp = viewportByKey[vk] || { key: vk, label: vk, width: 0, height: 0, mobile: false };
      var row = el("div");
      var head = el("div", "flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-surface-800 pb-3");
      head.appendChild(el("h3", "text-lg font-bold text-fg", vp.label));
      head.appendChild(el("span", "text-sm text-fg-muted", vp.width + " × " + vp.height + (vp.mobile ? " · touch" : "")));
      row.appendChild(head);
      var grid = el("div", "mt-4 grid gap-3 sm:grid-cols-3");
      job.engines.forEach(function (ek) {
        var card = el("div", "min-w-0 rounded-xl border border-surface-800 bg-surface-900/60 p-4 text-sm");
        grid.appendChild(card);
        current.nodes[vk + "|" + ek] = { card: card, vp: vp, engine: ek };
      });
      row.appendChild(grid);
      ui.report.appendChild(row);
    });
  }

  function pill(text, tone) {
    return el("span", "rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset " + tone, text);
  }
  var WARN = "bg-warning/10 text-warning ring-warning/25";
  var BAD = "bg-rose-500/10 text-rose-300 ring-rose-500/25";
  var CALM = "bg-surface-800 text-fg-secondary ring-surface-700";

  function updateCell(job, c) {
    var key = c.viewport + "|" + c.engine;
    var n = current.nodes[key];
    if (!n) return;
    var sig = c.state + "|" + (c.error || "") + "|" + c.problems + "|" + c.height;
    if (current.seen[key] === sig) return;
    current.seen[key] = sig;

    n.card.textContent = "";
    n.card.appendChild(el("p", "font-semibold text-fg", engineLabel[c.engine] || c.engine));
    var line = el("p", "mt-1");
    if (c.state === "done") {
      line.className = "mt-1 text-fg-secondary";
      line.textContent = "Captured" + (c.height ? " · " + c.height.toLocaleString() + "px tall" : "");
    } else if (c.state === "running") {
      line.className = "mt-1 animate-pulse text-fg-secondary";
      line.textContent = "Rendering…";
    } else if (c.state === "failed") {
      line.className = "mt-1 text-rose-300";
      line.textContent = c.error || "Couldn’t capture this one.";
    } else if (c.state === "skipped") {
      line.className = "mt-1 text-fg-muted";
      line.textContent = c.error || "Skipped.";
    } else {
      line.className = "mt-1 text-fg-muted";
      line.textContent = "Waiting";
    }
    n.card.appendChild(line);
    if (c.state !== "done") return;

    var flags = el("div", "mt-2 flex flex-wrap gap-1");
    if (c.status >= 400) flags.appendChild(pill("HTTP " + c.status, BAD));
    if (c.overflows) flags.appendChild(pill("Scrolls sideways", WARN));
    if (c.truncated) flags.appendChild(pill("Cut at " + job.maxHeight.toLocaleString() + "px", CALM));
    if (flags.childNodes.length) n.card.appendChild(flags);
    if (c.problems > 0) {
      var details = el("details", "mt-2 text-xs");
      details.appendChild(el("summary", "cursor-pointer text-warning", plural(c.problems, "problem", "problems")));
      var list = el("ul", "mt-1 space-y-1 break-all text-fg-secondary");
      c.problemList.forEach(function (p) { list.appendChild(el("li", null, p)); });
      if (c.problems > c.problemList.length) list.appendChild(el("li", "text-fg-muted", "…and " + (c.problems - c.problemList.length) + " more in the zip’s report.json"));
      details.appendChild(list);
      n.card.appendChild(details);
    }
  }

  // ── the zip: fetched once, kept here ───────────────────────────────────────
  var saved = null; // { blob, name } — the only copy left once the download completes

  function finish(job) {
    setRunning(false);
    if (!job.cells.some(function (c) { return c.state === "done"; })) { clearHash(); return; }
    download(job);
  }

  function download(job) {
    var name = "shotmatrix-" + job.host + ".zip";
    ui.download.textContent = "Downloading the zip…";
    fetch(API + "/runs/" + encodeURIComponent(job.id) + "/zip", { cache: "no-store", credentials: "same-origin" })
      .then(function (r) {
        if (r.status === 404) throw { gone: true };
        if (r.status === 401) throw { login: true };
        if (!r.ok) throw new Error(String(r.status));
        var total = Number(r.headers.get("Content-Length")) || 0;
        if (!total || !r.body || !r.body.getReader) return r.blob();
        // Read it in pieces for a progress figure: a full matrix is tens of megabytes,
        // and on a phone connection that is long enough to look stuck without one.
        var reader = r.body.getReader();
        var parts = [];
        var got = 0;
        var step = function () {
          return reader.read().then(function (chunk) {
            if (chunk.done) return new Blob(parts, { type: "application/zip" });
            parts.push(chunk.value);
            got += chunk.value.length;
            ui.download.textContent = "Downloading the zip… " + Math.min(100, Math.round((got / total) * 100)) + "%";
            return step();
          });
        };
        return step();
      })
      .then(function (blob) {
        saved = { blob: blob, name: name };
        save();
        ui.actions.hidden = false;
        ui.download.textContent = "Downloaded " + name + " (" + size(blob.size) + "). Nothing is kept on our server: our copy was deleted as it downloaded.";
        clearHash();
      })
      .catch(function (err) {
        if (err && err.gone) {
          ui.download.textContent = "The zip is gone: it was already downloaded, or the run expired. Start a new run above.";
          clearHash();
          return;
        }
        if (err && err.login) { sessionEnded(); return; }
        // Cut off part-way: the service keeps the run for a retry until it expires.
        ui.download.textContent = "The download didn’t finish. ";
        ui.download.appendChild(link("Try again", function () { download(job); }));
        if (job.expiresAt) ui.download.appendChild(document.createTextNode(" — it’s kept until " + clock(job.expiresAt) + "."));
      });
  }

  // Hands the file in memory to the browser's own save. Nothing is fetched: the server's
  // copy is already gone, which is the point.
  function save() {
    if (!saved) return;
    var href = URL.createObjectURL(saved.blob);
    var a = document.createElement("a");
    a.href = href;
    a.download = saved.name;
    a.hidden = true;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(href); }, 60000);
  }
  ui.save.addEventListener("click", save);

  // Reloaded mid-run: pick it back up.
  var linked = /^#run=([\w-]{22})$/.exec(location.hash);
  if (linked) known.then(function () { if (account) attach(linked[1], true); else clearHash(); });
})();
