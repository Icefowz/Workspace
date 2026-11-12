/* ===== D landing stage + bento: card entrances, Q&A toggles ===== */
  var crew = q(".dgn-crew");
  if (crew) {
    var stage = q(".dgn-crew__stage", crew);
    if (stage && (!GL || lite || !root.classList.contains("dgn-d3"))) seen(stage, function (v) { if (v) stage.classList.add("hit"); });
  }
  var bento = q(".dgn-bento");
  if (bento) {
    qa(".dgn-bq", bento).forEach(function (b) { b.addEventListener("click", function () { b.setAttribute("aria-expanded", b.getAttribute("aria-expanded") === "true" ? "false" : "true"); }); });    if (G) {
      qa(".dgn-bc--q, .dgn-bc--go, .dgn-bc--loc", bento).forEach(function (c) {
        gsap.fromTo(c, { y: 140, opacity: 0, scale: 0.94, rotateX: lite ? 0 : 9 }, { y: 0, opacity: 1, scale: 1, rotateX: 0, ease: "none", scrollTrigger: { trigger: c, start: "top 100%", end: "top 62%", scrub: 0.7 } });
      });
      qa(".dgn-bc__media", bento).forEach(function (im) { if (!lite) gsap.fromTo(im, { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: im.parentNode, start: "top bottom", end: "bottom top", scrub: true } }); });
      function bst(el, end) { return { trigger: el, start: "top 100%", end: end || "top 42%", scrub: 0.8 }; }
      function bfx(el, cls) { var d = document.createElement("div"); d.className = "dgn-bc__fx " + cls; d.setAttribute("aria-hidden", "true"); var m = q(".dgn-bc__media", el); el.insertBefore(d, m ? m.nextSibling : el.firstChild); return d; }
      var cA = q(".dgn-bc--a", bento), cB = q(".dgn-bc--b", bento), cC = q(".dgn-bc--c", bento), cD = q(".dgn-bc--d", bento);
      if (cA) { var bars = bfx(cA, "dgn-bc__bars"); for (var bi = 0; bi < 18; bi++) bars.appendChild(document.createElement("i"));
        gsap.timeline({ scrollTrigger: bst(cA) }).fromTo(cA, { opacity: 0, y: 70 }, { opacity: 1, y: 0, duration: 0.25, ease: "none" })
          .fromTo(bars.children, { scaleY: 1 }, { scaleY: 0, duration: 0.5, ease: "power2.inOut", stagger: { each: 0.03, from: "center" } }, 0.1)
          .fromTo(q(".dgn-bc__tag", cA), { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.2 }, 0.45)
          .fromTo(q(".dgn-bc__body", cA), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.3 }, 0.55); }
      if (cB) { var bp = bfx(cB, "dgn-bc__bp");
        gsap.timeline({ scrollTrigger: bst(cB) }).fromTo(cB, { opacity: 0, y: 70 }, { opacity: 1, y: 0, duration: 0.25, ease: "none" })
          .fromTo(bp, { clipPath: "inset(0% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 100%)", duration: 0.5, ease: "power1.inOut" }, 0.3)
          .fromTo(q(".dgn-bc__tag", cB), { opacity: 0 }, { opacity: 1, duration: 0.15 }, 0.25)
          .fromTo(q(".dgn-bc__panel", cB), { opacity: 0, y: 70 }, { opacity: 1, y: 0, duration: 0.25 }, 0.75); }
      if (cC) { var pt = bfx(cC, "dgn-bc__paint"), cm = q(".dgn-bc__media", cC);
        gsap.timeline({ scrollTrigger: bst(cC) }).fromTo(cC, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.2, ease: "none" })
          .fromTo(cm, { filter: "blur(16px) grayscale(1) brightness(0.6)", scale: 1.3 }, { filter: "blur(0px) grayscale(0) brightness(1)", scale: 1, duration: 0.75, ease: "power1.out" }, 0)
          .fromTo(pt, { yPercent: 100, opacity: 1 }, { yPercent: -100, opacity: 0.2, duration: 0.6, ease: "power1.inOut" }, 0.1)
          .fromTo(q(".dgn-bc__tag", cC), { opacity: 0 }, { opacity: 1, duration: 0.15 }, 0.45)
          .fromTo(q(".dgn-bc__body", cC), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.3 }, 0.55); }
      if (cD) { var go = q(".dgn-bc__go", cD);
        gsap.timeline({ scrollTrigger: bst(cD, "top 50%") }).fromTo(cD, { opacity: 0, y: 320, scaleY: 1.12, filter: "blur(8px)" }, { opacity: 1, y: 0, scaleY: 1, filter: "blur(0px)", duration: 0.75, ease: "back.out(1.3)" })
          .fromTo(q(".dgn-bc__media", cD), { y: -140 }, { y: 0, duration: 0.75, ease: "power2.out" }, 0)
          .fromTo(q(".dgn-bc__body", cD), { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.3 }, 0.5)
          .fromTo(go, { "--gs": 0 }, { "--gs": 1, duration: 0.25, ease: "back.out(3)" }, 0.75);
        if (go) ScrollTrigger.create({ trigger: cD, start: "top 50%", onEnter: function () { go.classList.remove("pulse"); void go.offsetWidth; go.classList.add("pulse"); } }); }
    }
  }
