<?php defined( 'ABSPATH' ) || exit; /* Site header (shared) */ ?>
<header id="dgmHeader" class="dg-wd-nav" data-dg-wd-nav data-dg-locale="el" data-theme="light">
  <div class="dg-wd-nav__bar">

    <a
      class="dg-wd-nav__brand"
      href="https://digiglowmedia.gr/"
      aria-label="DigiGlow Media — Αρχική"
    >
      <img class="dg-wd-nav__logo" src="https://digiglowmedia.gr/wp-content/uploads/2026/09/digiglow-header-logo.webp" alt="DigiGlow Media" width="240" height="135" decoding="async" />

      <span class="dg-wd-nav__divider" aria-hidden="true"></span>

      <span class="dg-wd-nav__context" data-dg-page-context>Αρχική</span>
    </a>

    <nav class="dg-wd-nav__actions" aria-label="Κύριες επιλογές">
      <a class="dg-wd-nav__contact" href="https://digiglowmedia.gr/contact-us/" data-dg-page-contact>
        <span>ΕΠΙΚΟΙΝΩΝΙΑ</span>
        <svg class="dg-wd-icon-arrow" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M5 15L15 5M8 5H15V12"/>
        </svg>
      </a>

      <a
        class="dg-wd-nav__language"
        href="https://digiglowmedia.gr/service-reels-en/"
        hreflang="en"
        rel="alternate"
        lang="el"
        aria-label="Δείτε τη σελίδα στα Αγγλικά"
        title="English"
        data-dg-language-switch="en"
      >
        <svg class="dg-wd-nav__language-flag" viewBox="0 0 60 40" aria-hidden="true" focusable="false">
          <svg viewBox="0 0 60 30" width="60" height="40" preserveAspectRatio="none">
            <path fill="#012169" d="M0 0h60v30H0z"/>
            <path stroke="#fff" stroke-width="6" d="m0 0 60 30M60 0 0 30"/>
            <path fill="#c8102e" d="M0 0v2l26 13h4L0 0zm60 0h-4L30 13v2L60 0zM0 30h4l26-13v-2L0 30zm60 0v-2L34 15h-4l30 15z"/>
            <path stroke="#fff" stroke-width="10" d="M30 0v30M0 15h60"/>
            <path stroke="#c8102e" stroke-width="6" d="M30 0v30M0 15h60"/>
          </svg>
        </svg>
        <span class="dg-wd-nav__language-code" lang="en" aria-hidden="true">EN</span>
      </a>

      <button
        class="dg-wd-nav__menu-button"
        type="button"
        aria-expanded="false"
        aria-controls="dg-wd-menu-panel"
        data-dg-wd-menu-toggle
      >
        <span class="dg-wd-nav__menu-label">ΜΕΝΟΥ</span>

        <span class="dg-wd-nav__menu-icon" aria-hidden="true">
          <svg viewBox="0 0 24 18" role="presentation">
            <path class="dg-burger-line dg-burger-line--1" d="M2 3H22"/>
            <path class="dg-burger-line dg-burger-line--2" d="M5 9H22"/>
            <path class="dg-burger-line dg-burger-line--3" d="M9 15H22"/>
          </svg>
        </span>
      </button>
    </nav>

    <div class="dg-wd-nav__progress" aria-hidden="true">
      <span></span>
    </div>
  </div>

  <div
    class="dg-wd-menu"
    id="dg-wd-menu-panel"
    data-dg-wd-menu
    aria-hidden="true"
    role="dialog"
    aria-modal="true"
    aria-label="Μενού ιστοτόπου"
    inert
  >
    <div class="dg-wd-menu__ambient" aria-hidden="true"></div>

    <div class="dg-wd-menu__top">
      <button
        class="dg-wd-menu__close"
        type="button"
        aria-label="Κλείσιμο μενού"
        data-dg-wd-menu-close
      >
        <span>ΚΛΕΙΣΙΜΟ</span>
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="M4 4l12 12M16 4L4 16"/>
        </svg>
      </button>

      <a
        class="dg-wd-menu__brand"
        href="https://digiglowmedia.gr/"
        aria-label="DigiGlow Media — Αρχική"
      >
        <img class="dg-wd-menu__logo" src="https://digiglowmedia.gr/wp-content/uploads/2026/09/digiglow-header-logo.webp" alt="DigiGlow Media" width="240" height="135" decoding="async" />
      </a>
    </div>

    <div class="dg-wd-menu__content">
      <div class="dg-wd-menu__nav-wrap">

        <nav class="dg-wd-menu__nav" aria-label="Πλοήγηση ιστοτόπου">
          <a class="is-current" href="https://digiglowmedia.gr/" aria-current="page" data-dg-page-link="home">
            <span class="dg-wd-menu__name">Αρχική</span>
          </a>

          <div class="dg-svc" data-dg-svc>
            <button class="dg-svc__btn" type="button" aria-expanded="false" aria-controls="dgSvcMenu" data-dg-svc-btn>
              <span class="dg-wd-menu__name">Υπηρεσίες</span>
              <span class="dg-svc__chev" aria-hidden="true"></span>
            </button>
            <div class="dg-svc__panel" id="dgSvcMenu">
              <div class="dg-svc__inner">
                <a href="https://digiglowmedia.gr/service-web-development/" data-dg-page-link="wd">
                  <span class="dg-wd-menu__name">Κατασκευή Ιστοσελίδων</span>
                </a>
                <a href="https://digiglowmedia.gr/service-reels/" data-dg-page-link="reels">
                  <span class="dg-wd-menu__name">Reels</span>
                </a>
              </div>
            </div>
          </div>

          <a href="https://digiglowmedia.gr/works/">
            <span class="dg-wd-menu__name">Τα Έργα μας</span>
          </a>

          <a href="https://digiglowmedia.gr/blog/">
            <span class="dg-wd-menu__name">Blog</span>
          </a>

          <a href="https://digiglowmedia.gr/about/">
            <span class="dg-wd-menu__name">Σχετικά με εμάς</span>
          </a>

          <a href="https://digiglowmedia.gr/contact-us/" data-dg-page-contact>
            <span class="dg-wd-menu__name">Επικοινωνία</span>
          </a>
        </nav>
      </div>

      <aside class="dg-wd-menu__aside">
        <div class="dg-wd-menu__aside-glow" aria-hidden="true"></div>

        <div class="dg-wd-menu__aside-copy">
          <h2>
            Οτι χρειάζεται η επιχείρησή σου
            <em>για να ξεχωρίσει</em>
          </h2>

          <p>
            Στρατηγική, δημιουργικότητα και τεχνολογία ενώνονται για να
            μετατρέψουμε τους στόχους της επιχείρησής σου σε αποτέλεσμα
          </p>

          <a class="dg-wd-menu__cta" href="https://digiglowmedia.gr/contact-us/" data-dg-page-contact>
            Let’s make it glow
            <span class="dg-wd-menu__cta-arrow" aria-hidden="true">
              <svg viewBox="0 0 20 20" role="presentation">
                <path d="M5 15L15 5M8 5H15V12"/>
              </svg>
            </span>
          </a>
        </div>

        <div class="dg-wd-menu__contact-data">
          <a href="mailto:digi@digiglowmedia.gr">
            digi@digiglowmedia.gr
          </a>

          <span>Λεωφόρος Νίκης 1 · Θεσσαλονίκη</span>
        </div>
      </aside>
    </div>

  </div>
</header>
