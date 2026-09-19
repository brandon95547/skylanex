// shotmatrix.js — the free tool on /products/shot-matrix.
//
// Talks to the Shot Matrix service at /api/shotmatrix (same origin, through nginx). It
// solves the service's proof-of-work challenge in a worker, starts a run, then polls it
// and fills the matrix in as each screenshot lands.
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
  var ENGINES = JSON.parse(form.getAttribute("data-engines"));
  var VIEWPORTS = JSON.parse(form.getAttribute("data-viewports"));
  var input = document.getElementById("sm-url");
  var button = document.getElementById("sm-go");
  var buttonLabel = button.querySelector("[data-label]");
  var note = document.getElementById("sm-note");
  var noteDefault = note.textContent.trim();
  var honeypot = form.querySelector('input[name="website"]');
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var ui = {
    host: section.querySelector("[data-host]"),
    status: section.querySelector("[data-status]"),
    actions: section.querySelector("[data-actions]"),
    zip: section.querySelector("[data-zip]"),
    copy: section.querySelector("[data-copy]"),
    bar: section.querySelector("[data-bar]"),
    fill: section.querySelector("[data-fill]"),
    expiry: section.querySelector("[data-expiry]"),
    matrix: section.querySelector("[data-matrix]"),
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
  function runFile(id, name) {
    return API + "/runs/" + encodeURIComponent(id) + "/" + encodeURIComponent(name);
  }
  function plural(n, one, many) { return n + " " + (n === 1 ? one : many); }

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
    buttonLabel.textContent = label || "Capture screenshots";
  }

  // ── proof of work ──────────────────────────────────────────────────────────
  // Started the moment someone shows intent — focusing the field, typing, pasting — so it
  // is normally finished before they press the button. One solution per run, spent on
  // submit; the next is only started when they come back to the form.
  var proof = null;
  function solve() {
    return fetch(API + "/challenge", { cache: "no-store" })
      .then(function (r) {
        if (!r.ok) throw new Error("challenge " + r.status);
        return r.json();
      })
      .then(function (c) {
        return new Promise(function (resolve, reject) {
          var worker = new Worker("/js/shotmatrix-pow.js");
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
    if (proof || running) return;
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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }).then(jsonOf);
      })
      .then(function (res) {
        var d = res.data;
        if ((res.status === 200 || res.status === 202) && d.id) { say(); attach(d.id, true); return; }
        // Already running one: that run is what they want to be looking at.
        if (res.status === 429 && d.id) { say(d.error, "info"); attach(d.id, true); return; }
        // The challenge went stale or the service restarted under it. Once, quietly.
        if (res.status === 403 && d.code === "pow" && retries > 0) { start(body, retries - 1); return; }
        setRunning(false);
        say(d.error || "Something went wrong. Try again in a moment.", "error");
        if (d.code === "url") input.focus();
      })
      .catch(function () {
        clearTimeout(slow);
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

  function attach(id, scroll) {
    clearTimeout(pollTimer);
    current = { id: id, built: false, nodes: {}, seen: {}, misses: 0 };
    // The address of a run is the page plus its id, so it can be reloaded or sent to
    // someone for as long as the run is kept.
    try { history.replaceState(null, "", "#run=" + id); } catch (err) { /* sandboxed */ }
    section.hidden = false;
    ui.matrix.textContent = "";
    ui.actions.hidden = true;
    ui.expiry.textContent = "";
    ui.host.textContent = "Starting…";
    ui.status.textContent = "";
    ui.bar.hidden = false;
    setBar(0);
    setRunning(true, "Running…");
    if (scroll) section.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    poll(id);
  }

  function poll(id) {
    fetch(API + "/jobs/" + encodeURIComponent(id), { cache: "no-store" })
      .then(jsonOf)
      .then(function (res) {
        if (!current || current.id !== id) return;
        if (res.status === 404) { expired(res.data.error); return; }
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

  function expired(message) {
    setRunning(false);
    ui.host.textContent = "This run has expired";
    ui.status.textContent = message || "Runs are kept for an hour. Start a new one above.";
    ui.matrix.textContent = "";
    ui.actions.hidden = true;
    ui.expiry.textContent = "";
    ui.bar.hidden = true;
    try { history.replaceState(null, "", location.pathname); } catch (err) { /* sandboxed */ }
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
    if (!input.value) input.value = job.url; // arrived by a shared link
    setBar(job.total ? Math.round((job.done / job.total) * 100) : 0);
    ui.status.textContent = statusLine(job);
    job.cells.forEach(function (c) { updateCell(job, c); });
    if (job.state === "done" || job.state === "failed") finish(job);
  }

  // One row per width, one column per engine, in the order they were asked for. Each
  // frame takes its viewport's shape before its picture arrives, so nothing jumps as the
  // shots land. Phone frames are capped in height and centred in their column; a 390×844
  // shot at full column width would be taller than the screen showing it.
  function build(job) {
    current.built = true;
    ui.matrix.textContent = "";
    job.viewports.forEach(function (vk) {
      var vp = viewportByKey[vk] || { key: vk, label: vk, width: 16, height: 9, mobile: false };
      var row = el("div");
      var head = el("div", "flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-surface-800 pb-3");
      head.appendChild(el("h3", "text-lg font-bold text-fg", vp.label));
      head.appendChild(el("span", "text-sm text-fg-muted", vp.width + " × " + vp.height + (vp.mobile ? " · touch" : "")));
      row.appendChild(head);
      var grid = el("div", "mt-4 grid gap-2 sm:gap-5");
      grid.style.gridTemplateColumns = "repeat(" + job.engines.length + ", minmax(0, 1fr))";
      job.engines.forEach(function (ek) {
        var fig = el("figure", "min-w-0");
        var frame = el("div", "relative mx-auto w-full overflow-hidden rounded-xl border border-surface-800 bg-surface-950");
        frame.style.aspectRatio = vp.width + " / " + vp.height;
        frame.style.maxWidth = "calc(26rem * " + vp.width + " / " + vp.height + ")";
        var cap = el("figcaption", "mx-auto mt-2 space-y-1 text-sm");
        cap.style.maxWidth = frame.style.maxWidth;
        fig.appendChild(frame);
        fig.appendChild(cap);
        grid.appendChild(fig);
        current.nodes[vk + "|" + ek] = { frame: frame, cap: cap, vp: vp, engine: ek };
      });
      row.appendChild(grid);
      ui.matrix.appendChild(row);
    });
  }

  function placeholder(frame, text, tone) {
    frame.textContent = "";
    frame.appendChild(el("div", "absolute inset-0 grid place-items-center p-2 text-center text-xs sm:text-sm " + (tone || "text-fg-muted"), text));
  }

  function pill(text, tone) {
    return el("span", "rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset " + tone, text);
  }
  var WARN = "bg-warning/10 text-warning ring-warning/25";
  var BAD = "bg-rose-500/10 text-rose-300 ring-rose-500/25";

  function updateCell(job, c) {
    var key = c.viewport + "|" + c.engine;
    var n = current.nodes[key];
    if (!n) return;
    var sig = c.state + "|" + (c.fold || "") + "|" + (c.error || "");
    if (current.seen[key] === sig) return;
    current.seen[key] = sig;
    var name = engineLabel[c.engine] || c.engine;

    // The picture.
    if (c.state === "done" && c.fold) {
      n.frame.textContent = "";
      var link = el("a", "block h-full w-full focus-visible:outline-offset-0");
      link.href = runFile(job.id, c.full || c.fold);
      link.target = "_blank";
      link.rel = "noopener";
      link.setAttribute("aria-label", name + ", " + n.vp.label + ": open the full-page screenshot");
      var img = el("img", "block h-full w-full object-cover object-top");
      img.src = runFile(job.id, c.fold);
      img.alt = name + " at " + n.vp.width + " × " + n.vp.height + ", above the fold";
      img.width = n.vp.width;
      img.height = n.vp.height;
      img.loading = "lazy";
      img.decoding = "async";
      link.appendChild(img);
      n.frame.appendChild(link);
    } else if (c.state === "running") {
      placeholder(n.frame, "Rendering…", "text-fg-secondary animate-pulse");
    } else if (c.state === "failed") {
      placeholder(n.frame, c.error || "Couldn’t capture this one.", "text-rose-300");
    } else if (c.state === "skipped") {
      placeholder(n.frame, c.error || "Skipped.");
    } else {
      placeholder(n.frame, "Waiting");
    }

    // The caption, always the same two lines so a row of them lines up: which engine and
    // the way to the full page, then how tall the page is and anything worth knowing.
    // Under a phone-sized frame there is no room for all of that on one line, and letting
    // it wrap made one column's caption a line taller than its neighbours'.
    n.cap.textContent = "";
    var top = el("div", "flex w-full items-baseline justify-between gap-2");
    top.appendChild(el("span", "font-medium text-fg", name));
    // The text link is for wide screens. In a phone's three narrow columns it wrapped onto
    // two lines of its own, and the thumbnail above it opens the same file anyway.
    if (c.state === "done" && c.full) {
      var full = el("a", "hidden whitespace-nowrap text-primary-200 hover:underline sm:inline", "Full page");
      full.href = runFile(job.id, c.full);
      full.target = "_blank";
      full.rel = "noopener";
      top.appendChild(full);
    }
    n.cap.appendChild(top);
    if (c.state !== "done") return;
    var meta = el("div", "flex w-full flex-wrap items-center gap-1 text-xs text-fg-muted");
    if (c.height) meta.appendChild(el("span", "mr-1", c.height.toLocaleString() + "px tall"));
    if (c.status >= 400) meta.appendChild(pill("HTTP " + c.status, BAD));
    if (c.overflows) meta.appendChild(pill("Scrolls sideways", WARN));
    if (c.truncated) meta.appendChild(pill("Cut at " + job.maxHeight.toLocaleString() + "px", "bg-surface-800 text-fg-secondary ring-surface-700"));
    n.cap.appendChild(meta);
    if (c.problems > 0) {
      var details = el("details", "w-full text-xs");
      var summary = el("summary", "cursor-pointer text-warning", plural(c.problems, "problem", "problems"));
      details.appendChild(summary);
      var list = el("ul", "mt-1 space-y-1 break-all text-fg-secondary");
      c.problemList.forEach(function (p) { list.appendChild(el("li", null, p)); });
      if (c.problems > c.problemList.length) list.appendChild(el("li", "text-fg-muted", "…and " + (c.problems - c.problemList.length) + " more in the zip’s report.json"));
      details.appendChild(list);
      n.cap.appendChild(details);
    }
  }

  function finish(job) {
    setRunning(false);
    var any = job.cells.some(function (c) { return c.state === "done"; });
    ui.actions.hidden = !any;
    if (any) ui.zip.href = API + "/runs/" + encodeURIComponent(job.id) + "/zip";
    if (job.expiresAt) {
      var until = new Date(job.expiresAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
      ui.expiry.textContent = "This run and its link are kept until " + until + ".";
    }
  }

  ui.copy.addEventListener("click", function () {
    var label = ui.copy.querySelector("span");
    var show = function (text) {
      label.textContent = text;
      setTimeout(function () { label.textContent = "Copy link"; }, 2000);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(location.href).then(function () { show("Copied"); }, function () { show("Couldn’t copy"); });
    } else {
      show("Couldn’t copy");
    }
  });

  // Arriving by a run's link.
  var linked = /^#run=([\w-]{22})$/.exec(location.hash);
  if (linked) attach(linked[1], true);
})();
