/* ===== Footer links per page/language ===== */
(() => {
  const pages = {
    home: {
      elSlug: "",
      enSlug: "en",
      contact: "/contact/"
    },
    reels: {
      elSlug: "service-reels",
      enSlug: "service-reels-en",
      contact: "#reels-cta"
    },
    wd: {
      elSlug: "service-web-development",
      enSlug: "service-web-development-en",
      contact: "#website-cta"
    }
  };

  const pagePath = s => (s ? "/" + s + "/" : "/");
  const slug = window.location.pathname.split("/").filter(Boolean).pop() || "";
  const pageKey = slug === "" || slug === "index.html" ? "home" : Object.keys(pages).find(key => (
    slug === pages[key].elSlug || slug === pages[key].enSlug
  ));

  document.querySelectorAll(".dg-web-footer-v2[data-dg-footer]").forEach(root => {
    const isEnglish = slug.endsWith("-en") || root.dataset.dgFooterLocale === "en";

    root.querySelectorAll("[data-dg-footer-page]").forEach(link => {
      const key = link.dataset.dgFooterPage;
      const page = pages[key];
      if (!page) return;

      const destinationSlug = isEnglish ? page.enSlug : page.elSlug;
      link.href = new URL(pagePath(destinationSlug), window.location.origin).href;

      const active = key === pageKey;
      active ? link.setAttribute("aria-current", "page") : link.removeAttribute("aria-current");
    });

    root.querySelectorAll("[data-dg-footer-contact]").forEach(link => {
      link.href = pageKey ? pages[pageKey].contact : "/contact/";
    });
  });
})();
