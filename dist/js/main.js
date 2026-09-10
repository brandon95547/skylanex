// main.js — mobile menu, sticky-nav shadow, reveal-on-scroll, contact form.
(function () {
  "use strict";

  /* ---- Mobile menu ---- */
  var toggle = document.getElementById("menu-toggle");
  var menu = document.getElementById("mobile-menu");
  if (toggle && menu) {
    var setOpen = function (open) {
      menu.classList.toggle("is-open", open);
      toggle.classList.toggle("is-open", open);
      document.body.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
    toggle.addEventListener("click", function () {
      setOpen(!menu.classList.contains("is-open"));
    });
    // close when a link is tapped
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setOpen(false); });
    });
    // close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("is-open")) setOpen(false);
    });
  }

  /* ---- Sticky nav shadow after scroll ---- */
  var navEl = document.getElementById("site-nav");
  if (navEl) {
    var onScroll = function () {
      navEl.classList.toggle("scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- Reveal on scroll ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Contact form: POST to the API, mailto only if it is unreachable ---- */
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = document.getElementById("form-note");
      var data = new FormData(form);
      var name = (data.get("name") || "").toString().trim();
      var email = (data.get("email") || "").toString().trim();
      var topic = (data.get("topic") || "").toString().trim();
      var message = (data.get("message") || "").toString().trim();

      function say(text, tone) {
        if (!note) { return; }
        note.textContent = text;
        note.className = "mt-3 text-sm " + tone;
      }
      // Contact-form status text, on the same ladder as everything else — rose-400 read
      // 7.34 and surface-400 read 4.09 against the page, both under the 8.2 caption floor
      // the design system sets. These clear it: rose-300 10.45, emerald-400 10.27,
      // fg-muted 8.50.
      var BAD = "text-rose-300", OK = "text-emerald-400", MUTED = "text-fg-muted";

      if (!name || !email || !message) {
        say("Please add your name, email, and a short message.", BAD);
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        say("That email address doesn't look right — please check it.", BAD);
        return;
      }

      var to = form.getAttribute("data-email") || "info@skylanex.com";
      var endpoint = form.getAttribute("data-endpoint") || "/api/contact";
      var subject = "Skylanex inquiry" + (topic ? " — " + topic : "") + " — " + name;
      var body =
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        (topic ? "Service: " + topic + "\n" : "") +
        "\n" + message + "\n";

      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) { submitBtn.disabled = true; }
      say("Sending…", MUTED);

      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: subject,
          message: body,
          reply_to: email,
          // Hidden field — a real visitor never sees it, so anything here is a bot.
          website: (data.get("website") || "").toString()
        })
      })
        .then(function (res) {
          if (res.ok) { return null; }
          // The server answered — that is a verdict, not an outage. Report it as
          // one instead of dumping the visitor into a mail client they may not have.
          return res.json().catch(function () { return null; }).then(function (json) {
            var e = new Error("http");
            e.answered = true;
            e.status = res.status;
            e.detail = json && (json.detail || json.message);
            throw e;
          });
        })
        .then(function () {
          form.reset();
          say("Thanks — your message has been sent.", OK);
        })
        .catch(function (err) {
          if (err && err.answered) {
            if (err.status === 429) {
              say("You've sent a few messages already — please try again later, or email " + to + ".", BAD);
            } else {
              say((err.detail || "That didn't go through.") + " You can also email " + to + ".", BAD);
            }
            return;
          }
          // Genuinely unreachable — fall back to the visitor's email client.
          window.location.href =
            "mailto:" + to + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
          say("Opening your email app instead… or email " + to + " directly.", MUTED);
        })
        .finally(function () {
          if (submitBtn) { submitBtn.disabled = false; }
        });
    });
  }

  // ── product filter ─────────────────────────────────────────────────────────
  // Filters the grid that is already on the page. No URL changes and no fetching, which
  // is why the controls are buttons rather than links.
  //
  // The cards are hidden with the `hidden` attribute rather than a class, so a card that
  // is filtered out is genuinely out of the accessibility tree and out of tab order —
  // `display:none` via a class would do the same, but the attribute says so in the markup
  // where anyone reading it can see the state.
  var filterChips = document.querySelectorAll("[data-filter]");
  if (filterChips.length) {
    var cards = document.querySelectorAll(".product-card");
    var empty = document.getElementById("product-empty");
    var apply = function (want) {
      var shown = 0;
      cards.forEach(function (card) {
        var match = want === "all" || card.getAttribute("data-category") === want;
        card.hidden = !match;
        if (match) { shown += 1; }
      });
      filterChips.forEach(function (chip) {
        chip.setAttribute("aria-pressed", chip.getAttribute("data-filter") === want ? "true" : "false");
      });
      if (empty) { empty.classList.toggle("hidden", shown > 0); }
    };
    filterChips.forEach(function (chip) {
      chip.addEventListener("click", function () { apply(chip.getAttribute("data-filter")); });
    });
  }

  // ── One media element at a time, page-wide ────────────────────────────────
  //
  // The films and the course sessions sit a screen apart and neither knows the
  // other exists, so the registry that keeps them from talking over each other
  // lives out here rather than inside either. Whoever starts playing hands in the
  // function that stops it again.
  var stopPlaying = null;
  function claimPlayback(stop) {
    if (stopPlaying && stopPlaying !== stop) { stopPlaying(); }
    stopPlaying = stop;
  }
  function releasePlayback(stop) {
    if (stopPlaying === stop) { stopPlaying = null; }
  }

  function clock(seconds) {
    if (!isFinite(seconds) || seconds < 0) { seconds = 0; }
    var whole = Math.floor(seconds);
    var secs = whole % 60;
    return Math.floor(whole / 60) + ":" + (secs < 10 ? "0" : "") + secs;
  }

  // ── Films: poster now, video only on request ──────────────────────────────
  //
  // The short films are 6-13 MB each and there are six on the page. Marking them
  // preload="none" would still cost a request apiece and give the browser a
  // decision to second-guess, so there is no <video> at all until someone asks
  // for one: the poster is a button, and the button builds the player.
  var films = document.querySelectorAll(".film[data-video]");
  films.forEach(function (btn) {
    // The poster and its overlays stay in the DOM so closing is just a matter of
    // dropping the video back off the top of them.
    function stop() {
      var v = btn.querySelector("video");
      if (v) { v.pause(); v.remove(); }
      btn.classList.remove("is-playing");
      releasePlayback(stop);
    }
    btn.addEventListener("click", function () {
      claimPlayback(stop);
      if (btn.querySelector("video")) { return; }

      var video = document.createElement("video");
      video.src = btn.getAttribute("data-video");
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      video.setAttribute("aria-label", btn.getAttribute("data-title") || "Film");
      video.className = "absolute inset-0 h-full w-full bg-surface-950 object-contain";
      btn.appendChild(video);
      btn.classList.add("is-playing");
      video.addEventListener("ended", stop);
    });
  });

  // ── Audio rows: one player per card ───────────────────────────────────────
  //
  // The waveform is already in the HTML, seeded by src/pages/phansora.mjs, so a
  // card looks like audio the moment it paints. The real peaks replace it on the
  // first play — the first moment the file has to be fetched anyway. Decoding all
  // of them up front would pull the whole panel down the wire to draw pictures
  // nobody has looked at yet.
  document.querySelectorAll(".audio-row[data-src]").forEach(function (row) {
    var btn = row.querySelector(".session-play");
    var wave = row.querySelector(".wave");
    var bars = wave.children;
    var title = row.getAttribute("data-title") || "this clip";
    var known = Number(row.getAttribute("data-seconds")) || 0;
    var audio = null;
    var pending = 0; // where to start, while there is no element to seek yet
    var lit = 0;     // how many bars are currently on
    var asked = false;

    function duration() {
      return (audio && isFinite(audio.duration) && audio.duration) || known;
    }
    function position() {
      return audio ? audio.currentTime : pending;
    }

    function paint() {
      var d = duration();
      var p = d ? Math.min(1, position() / d) : 0;
      var want = Math.round(p * bars.length);
      // Only the bars that changed state since the last tick, which is normally
      // one of them — repainting all 56 four times a second is work for nothing.
      if (want !== lit) {
        for (var i = Math.min(want, lit), end = Math.max(want, lit); i < end; i++) {
          bars[i].classList.toggle("on", i < want);
        }
        lit = want;
      }
      wave.style.setProperty("--p", p);
      wave.style.setProperty("--head", p > 0 ? 1 : 0);
      wave.setAttribute("aria-valuenow", Math.round(p * 100));
      wave.setAttribute("aria-valuetext", clock(p * d) + " of " + clock(d));
    }

    function stop() {
      if (audio) { audio.pause(); }
      row.classList.remove("is-playing");
      btn.setAttribute("aria-label", "Play " + title);
      releasePlayback(stop);
    }

    function start() {
      claimPlayback(stop);
      if (!audio) {
        audio = new Audio();
        audio.preload = "none";
        audio.src = row.getAttribute("data-src");
        audio.addEventListener("timeupdate", paint);
        audio.addEventListener("loadedmetadata", function () {
          // currentTime before metadata is either ignored or an exception
          // depending on the browser, so a seek made while the row was idle is
          // applied here instead.
          if (pending) { audio.currentTime = pending; pending = 0; }
          paint();
        });
        audio.addEventListener("ended", function () {
          audio.currentTime = 0;
          stop();
          paint();
        });
        peaks();
      }
      var started = audio.play();
      if (started && started.catch) { started.catch(function () { stop(); }); }
      row.classList.add("is-playing");
      btn.setAttribute("aria-label", "Pause " + title);
    }

    btn.addEventListener("click", function () {
      if (row.classList.contains("is-playing")) { stop(); } else { start(); }
    });

    function seek(fraction) {
      var f = Math.max(0, Math.min(1, fraction));
      var d = duration();
      if (audio && isFinite(audio.duration)) { audio.currentTime = f * d; }
      else { pending = f * d; }
      paint();
    }
    function seekAt(clientX) {
      var box = wave.getBoundingClientRect();
      if (box.width) { seek((clientX - box.left) / box.width); }
    }

    wave.addEventListener("pointerdown", function (e) {
      wave.setPointerCapture(e.pointerId);
      seekAt(e.clientX);
    });
    wave.addEventListener("pointermove", function (e) {
      if (wave.hasPointerCapture(e.pointerId)) { seekAt(e.clientX); }
    });

    // A row of divs cannot take focus and has no value. role="slider" plus these
    // keys is what stops the scrubber being mouse-only.
    wave.addEventListener("keydown", function (e) {
      var d = duration();
      if (!d) { return; }
      var step = (e.shiftKey ? 30 : 5) / d;
      var at = position() / d;
      var moves = {
        ArrowRight: at + step, ArrowUp: at + step,
        ArrowLeft: at - step, ArrowDown: at - step,
        Home: 0, End: 1,
      };
      if (!(e.key in moves)) { return; }
      e.preventDefault();
      seek(moves[e.key]);
    });

    // Real peaks mean downloading and decoding the whole file, so this waits for
    // the first play. Decoding into an 8kHz context rather than the file's own
    // rate costs a sixth of the memory and loses nothing anyone could see: one
    // bar here is well over a second of audio wide.
    function peaks() {
      if (asked) { return; }
      asked = true;
      var Ctx = window.OfflineAudioContext || window.webkitOfflineAudioContext;
      if (!Ctx || !window.fetch) { return; }
      window.fetch(row.getAttribute("data-src"))
        .then(function (r) { return r.arrayBuffer(); })
        .then(function (raw) { return new Ctx(1, 1, 8000).decodeAudioData(raw); })
        .then(function (pcm) {
          var data = pcm.getChannelData(0);
          var n = bars.length;
          var per = Math.floor(data.length / n);
          if (!per) { return; }
          var shape = [];
          var top = 0;
          for (var b = 0; b < n; b++) {
            var max = 0;
            for (var i = b * per, end = i + per; i < end; i++) {
              var v = data[i] < 0 ? -data[i] : data[i];
              if (v > max) { max = v; }
            }
            shape.push(max);
            if (max > top) { top = max; }
          }
          // Normalised against the file's own loudest moment. Absolute levels
          // would draw a quietly recorded clip as a flat line, which is the one
          // shape that reads as a bad render.
          if (!top) { return; }
          for (var j = 0; j < n; j++) {
            bars[j].style.height = (10 + 90 * (shape[j] / top)) + "%";
          }
        })
        .catch(function () { /* the seeded shape stands; nothing else needs this */ });
    }
  });
})();
