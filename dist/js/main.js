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
      var BAD = "text-rose-400", OK = "text-emerald-400", MUTED = "text-surface-400";

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
          say("Thanks — your message has been sent. I'll reply within a day.", OK);
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
})();
