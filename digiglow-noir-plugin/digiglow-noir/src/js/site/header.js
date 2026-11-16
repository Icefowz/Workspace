/* ===== Site header behaviour (menu, rail, language link, current page) ===== */
(() => {
  "use strict";

  function initHeader() {
    const root = document.querySelector("#dgmHeader[data-dg-wd-nav]");
    if (!root || root.dataset.dgHeaderReady) return;
    const menu = root.querySelector("[data-dg-wd-menu]");
    const openButton = root.querySelector("[data-dg-wd-menu-toggle]");
    const closeButton = root.querySelector("[data-dg-wd-menu-close]");
    const bar = root.querySelector(".dg-wd-nav__bar");
    if (!menu || !openButton || !closeButton || !bar) return;

    root.dataset.dgHeaderReady = "true";
    document.body.appendChild(root);
    document.body.classList.add("dgr-has-header");
    menu.inert = true;

    const pages = {
      home: { el: "Αρχική", en: "Home", elSlug: "", enSlug: "en", elContact: "https://digiglowmedia.gr/contact-us/", enContact: "https://digiglowmedia.gr/contact-us/" },
      reels: { el: "Reels", en: "Reels", elSlug: "service-reels", enSlug: "service-reels-en", elContact: "#reels-cta", enContact: "#reels-cta" },
      contact: { el: "Επικοινωνία", en: "Contact", elSlug: "contact-us", enSlug: "contact-us-en", elContact: "#dgc-brief", enContact: "#dgc-brief" },
      notfound: { el: "Σελίδα 404", en: "Page 404", elSlug: "", enSlug: "en", elContact: "https://digiglowmedia.gr/contact-us/", enContact: "https://digiglowmedia.gr/contact-us-en/" },
      thanks: { el: "Ευχαριστούμε", en: "Thank you", elSlug: "thank-you", enSlug: "thank-you-en", elContact: "https://digiglowmedia.gr/contact-us/", enContact: "https://digiglowmedia.gr/contact-us-en/" },
        wd: { el: "Κατασκευή Ιστοσελίδων", en: "Web Development", elSlug: "service-web-development", enSlug: "service-web-development-en", elContact: "#website-cta", enContact: "#website-cta" }
    };
    const pagePath = s => (s ? "/" + s + "/" : "/");
    const slug = window.location.pathname.split("/").filter(Boolean).pop()?.toLowerCase() || "";
    const forcedKey = root.dataset.dgPage;
    const pageKey = forcedKey && pages[forcedKey] ? forcedKey : slug === "contact.html" || slug === pages.contact.elSlug || slug === pages.contact.enSlug ? "contact" : slug === "" || slug === "index.html" || slug === pages.home.enSlug ? "home" : slug === pages.wd.elSlug || slug === pages.wd.enSlug ? "wd" : "reels";
    const page = pages[pageKey];
    const isEnglish = root.dataset.dgLocale === "en" || slug.endsWith("-en") || (pageKey === "home" && slug === pages.home.enSlug);
    const label = isEnglish ? page.en : page.el;
    const targetSlug = isEnglish ? page.elSlug : page.enSlug;
    const targetLanguage = isEnglish ? "el" : "en";
    const switcher = root.querySelector("[data-dg-language-switch]");
    root.querySelector("[data-dg-page-context]")?.replaceChildren(document.createTextNode(label.replace(/\s+/, "\n")));
    switcher?.setAttribute("href", new URL(pagePath(targetSlug), window.location.origin).href);
    switcher?.setAttribute("hreflang", targetLanguage);
    switcher?.setAttribute("lang", isEnglish ? "en" : "el");
    switcher?.setAttribute("aria-label", isEnglish ? "View this page in Greek" : "Δείτε τη σελίδα στα Αγγλικά");
    switcher?.setAttribute("title", isEnglish ? "Ελληνικά" : "English");
    switcher?.setAttribute("data-dg-language-switch", targetLanguage);
    const languageCode = switcher?.querySelector(".dg-wd-nav__language-code");
    if (languageCode) { languageCode.textContent = targetLanguage.toUpperCase(); languageCode.setAttribute("lang", targetLanguage); }
    root.querySelectorAll("[data-dg-page-contact]").forEach(link => link.setAttribute("href", isEnglish ? page.enContact : page.elContact));
      root.querySelectorAll("[data-dg-page-link]").forEach(link => {
        const key = link.dataset.dgPageLink;
        const linkedPage = pages[key];
        if (linkedPage) {
          const destinationSlug = isEnglish ? linkedPage.enSlug : linkedPage.elSlug;
          link.setAttribute("href", new URL(pagePath(destinationSlug), window.location.origin).href);
        }
        const active = key === pageKey;
        link.classList.toggle("is-current", active);
        active ? link.setAttribute("aria-current", "page") : link.removeAttribute("aria-current");
      });

    let rafId = 0, menuFocusTimer = 0;
    let lastTheme = "", menuOpen = false, railActive = false;
    let lastFocusedElement = null;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const sectionSelector = "#dgrFlow, #dgrProcess, .dgr-cards-section, .dg-clients-strip, .dgpf-section, .dg-web-footer-v2, [data-dg-nav-theme]";
    const html = document.documentElement;

    function findThemeFromPoint() {
      if (window.scrollY < 36) return "light";
      const x = Math.round(window.innerWidth * .5);
      const sampleYs = [Math.min(98, window.innerHeight * .12), Math.min(150, window.innerHeight * .18)];
      for (const y of sampleYs) {
        for (const element of document.elementsFromPoint(x, y)) {
          if (root.contains(element)) continue;
          const section = element.closest(sectionSelector);
          if (!section) continue;
          if (section.dataset.dgNavTheme) return section.dataset.dgNavTheme;
          if (section.id === "dgrFlow") {
            const merge = section.querySelector("#dgrMerge");
            const backdrop = section.querySelector(".dgr-merge-backdrop");
            return merge && backdrop && getComputedStyle(merge).visibility !== "hidden" &&
              Number(getComputedStyle(backdrop).opacity) >= .5 ? "dark" : "light";
          }
          return section.matches("#dgrProcess, .dg-clients-strip, .dg-web-footer-v2") ? "dark" : "light";
        }
      }
      return lastTheme || "light";
    }

    function updateHeaderState() {
      rafId = 0;
      const scrollTop = window.scrollY || html.scrollTop || 0;
      const maxScroll = Math.max(1, html.scrollHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(1, scrollTop / maxScroll));
      root.style.setProperty("--dg-page-progress", progress.toFixed(5));
      root.classList.toggle("is-at-top", scrollTop < 36);
      const railEnterAt = Math.max(120, Math.min(170, window.innerHeight * .15));
      const railExitAt = Math.max(44, Math.min(82, window.innerHeight * .075));
      if (window.innerWidth <= 1024) railActive = false;
      else if (!railActive && scrollTop >= railEnterAt) railActive = true;
      else if (railActive && scrollTop <= railExitAt) railActive = false;
      root.classList.toggle("is-rail", railActive);
      root.classList.toggle("is-compact", !railActive && scrollTop > 70);

      const nextTheme = findThemeFromPoint();
      if (nextTheme !== lastTheme) {
        lastTheme = nextTheme;
        root.dataset.theme = nextTheme;
      }
    }

    function requestHeaderUpdate() {
      if (!rafId) rafId = window.requestAnimationFrame(updateHeaderState);
    }

    function getMenuFocusable() {
      return Array.from(menu.querySelectorAll(focusableSelector)).filter(element =>
        !element.hasAttribute("disabled") && element.getAttribute("aria-hidden") !== "true" &&
        element.getClientRects().length > 0
      );
    }

    function setMenuState(open) {
      menuOpen = open;
      root.classList.toggle("is-menu-open", open);
      html.classList.toggle("dg-wd-menu-open", open);
      document.body.classList.toggle("dg-wd-menu-open", open);
      openButton.setAttribute("aria-expanded", String(open));
      menu.setAttribute("aria-hidden", String(!open));
      menu.inert = !open;
      bar.inert = open;
    }

    function openMenu() {
      if (menuOpen) return;
      lastFocusedElement = document.activeElement;
      setMenuState(true);
      menuFocusTimer = window.setTimeout(() => {
        menuFocusTimer = 0;
        if (menuOpen) closeButton.focus({ preventScroll: true });
      }, 80);
    }

    function closeMenu() {
      if (!menuOpen) return;
      window.clearTimeout(menuFocusTimer);
      menuFocusTimer = 0;
      setMenuState(false);
      const target = lastFocusedElement?.isConnected ? lastFocusedElement : openButton;
      target.focus({ preventScroll: true });
      requestHeaderUpdate();
    }

    openButton.addEventListener("click", openMenu);
    closeButton.addEventListener("click", closeMenu);
    menu.addEventListener("pointermove", event => {
      if (!menuOpen || event.pointerType === "touch" || reduceMotion.matches) return;
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;
      menu.style.setProperty("--dg-menu-x", Math.max(0, Math.min(100, x)).toFixed(2) + "%");
      menu.style.setProperty("--dg-menu-y", Math.max(0, Math.min(100, y)).toFixed(2) + "%");
    }, { passive: true });

    document.addEventListener("keydown", event => {
      if (!menuOpen) return;
      if (event.key === "Escape") { closeMenu(); return; }
      if (event.key !== "Tab") return;
      const focusable = getMenuFocusable();
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || !menu.contains(document.activeElement))) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !menu.contains(document.activeElement))) {
        event.preventDefault(); first.focus();
      }
    });

    menu.addEventListener("click", event => {
      if (event.target.closest("a[href]")) closeMenu();
    });
    ["scroll", "resize"].forEach(type => window.addEventListener(type, requestHeaderUpdate, { passive: true }));
    window.addEventListener("pageshow", () => { closeMenu(); requestHeaderUpdate(); });
    requestHeaderUpdate();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHeader, { once: true });
  } else {
    initHeader();
  }
  window.addEventListener("elementor/frontend/init", () => window.setTimeout(initHeader, 80));
})();
