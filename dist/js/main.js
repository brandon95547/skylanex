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

  /* ---- Video lightbox ----
     The <video> is created on open and destroyed on close, so no media is
     fetched until a visitor actually asks for it. */
  var lightbox = document.getElementById("video-lightbox");
  if (lightbox) {
    var stage = lightbox.querySelector(".video-lightbox__stage");
    var panel = lightbox.querySelector(".video-lightbox__panel");
    var titleEl = lightbox.querySelector(".video-lightbox__title");
    var lastFocused = null;

    var closeVideo = function () {
      if (!lightbox.classList.contains("is-open")) return;
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("lightbox-open");
      var v = stage.querySelector("video");
      if (v) { v.pause(); v.removeAttribute("src"); v.load(); }
      stage.innerHTML = "";
      if (lastFocused) { lastFocused.focus(); lastFocused = null; }
    };

    var openVideo = function (card) {
      lastFocused = card;
      var src = card.getAttribute("data-video");
      var poster = card.getAttribute("data-poster");
      var title = card.getAttribute("data-title") || "";
      var wide = card.getAttribute("data-aspect") === "16/9";

      panel.classList.toggle("is-wide", wide);
      titleEl.textContent = title;

      var v = document.createElement("video");
      v.setAttribute("controls", "");
      v.setAttribute("autoplay", "");
      v.setAttribute("playsinline", "");
      v.setAttribute("preload", "auto");
      if (poster) v.setAttribute("poster", poster);
      v.src = src;
      stage.appendChild(v);

      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("lightbox-open");

      var closeBtn = lightbox.querySelector(".video-lightbox__close");
      if (closeBtn) closeBtn.focus();
    };

    document.querySelectorAll(".video-card").forEach(function (card) {
      card.addEventListener("click", function () { openVideo(card); });
    });

    lightbox.querySelectorAll("[data-close]").forEach(function (el) {
      el.addEventListener("click", closeVideo);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeVideo();
    });

    // Keep Tab inside the panel while it's open.
    lightbox.addEventListener("keydown", function (e) {
      if (e.key !== "Tab" || !lightbox.classList.contains("is-open")) return;
      var focusable = lightbox.querySelectorAll("button, video, [href]");
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
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

  // ── Films: poster now, video only on request ──────────────────────────────
  //
  // The short films are 6-13 MB each and there are six on the page. Marking them
  // preload="none" would still cost a request apiece and give the browser a
  // decision to second-guess, so there is no <video> at all until someone asks
  // for one: the poster is a button, and the button builds the player.
  //
  // Only one plays at a time. Two films talking over each other is the sort of
  // thing that only shows up once it is live.
  var films = document.querySelectorAll(".film[data-video]");
  if (films.length) {
    var playing = null;
    films.forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (playing && playing !== btn) { restore(playing); }
        if (btn.querySelector("video")) { return; }

        var video = document.createElement("video");
        video.src = btn.getAttribute("data-video");
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true;
        video.setAttribute("aria-label", btn.getAttribute("data-title") || "Film");
        video.className = "absolute inset-0 h-full w-full bg-surface-950 object-contain";
        // The poster and its overlays stay in the DOM so closing is just a matter
        // of dropping the video back off the top of them.
        btn.appendChild(video);
        btn.classList.add("is-playing");
        playing = btn;
        video.addEventListener("ended", function () { restore(btn); });
      });
    });
    function restore(btn) {
      var v = btn.querySelector("video");
      if (v) { v.pause(); v.remove(); }
      btn.classList.remove("is-playing");
      if (playing === btn) { playing = null; }
    }
  }
})();