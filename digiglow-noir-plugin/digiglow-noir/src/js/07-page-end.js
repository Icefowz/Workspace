/* ===== Page end: copy email, custom cursor, grain, ScrollTrigger refresh, #debug panel ===== */
  var cp = q(".dgn-copy");
  if (cp) cp.addEventListener("click", function () {
    var done = function () { cp.textContent = "Αντιγράφηκε"; setTimeout(function () { cp.textContent = "Αντιγραφή email"; }, 1800); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText("digi@digiglowmedia.gr").then(done, done); else done();
  });

  if (heavy && fine) {
    qa(".dgn-intro .dgn-hero__acts > *").forEach(function (b) {
      var bx = gsap.quickTo(b, "x", { duration: 0.6, ease: "elastic.out(1, 0.45)" }), by = gsap.quickTo(b, "y", { duration: 0.6, ease: "elastic.out(1, 0.45)" });
      window.addEventListener("pointermove", function (e) { var rc = b.getBoundingClientRect(), dx = e.clientX - (rc.left + rc.width / 2), dy = e.clientY - (rc.top + rc.height / 2), dd = Math.sqrt(dx * dx + dy * dy), k = Math.max(0, 1 - dd / 170); bx(dx * 0.28 * k); by(dy * 0.28 * k); }, { passive: true });
    });
    qa(".dgn-mag").forEach(function (b) {
      var bx = gsap.quickTo(b, "x", { duration: 0.5, ease: "elastic.out(1, 0.4)" }), by = gsap.quickTo(b, "y", { duration: 0.5, ease: "elastic.out(1, 0.4)" });
      b.addEventListener("pointermove", function (e) { var rc = b.getBoundingClientRect(); bx((e.clientX - rc.left - rc.width / 2) * 0.3); by((e.clientY - rc.top - rc.height / 2) * 0.3); });
      b.addEventListener("pointerleave", function () { bx(0); by(0); });
    });
    var cur = q(".dgn-cur"), cx = gsap.quickTo(cur, "x", { duration: 0.35, ease: "power3" }), cy = gsap.quickTo(cur, "y", { duration: 0.35, ease: "power3" });
    window.addEventListener("pointermove", function (e) { var inside = root.contains(e.target); cur.style.opacity = inside ? 1 : 0; cx(e.clientX); cy(e.clientY); cur.classList.toggle("big", !!(e.target.closest && e.target.closest("a, button, .dgn-spine canvas"))); }, { passive: true });
  }

  var grain = q(".dgn-grain"); seen(root, function (v) { grain.style.display = v ? "" : "none"; });
  if (G) { if (document.readyState === "complete") setTimeout(function () { ScrollTrigger.refresh(); }, 150); else window.addEventListener("load", function () { ScrollTrigger.refresh(); }); }
  if (/debug/.test(location.hash)) setTimeout(function () { var d = document.createElement("pre"); d.style.cssText = "position:fixed;left:10px;bottom:10px;z-index:99999;max-width:90vw;max-height:40vh;overflow:auto;padding:12px;background:#000;color:#0f0;font:12px monospace;white-space:pre-wrap"; d.textContent = "GL " + GL + "  GSAP " + G + "  hero3D " + root.classList.contains("dgn-gl") + "  width " + window.innerWidth + "\n" + ((window.__dgnErr || []).join("\n") || "no errors"); document.body.appendChild(d); }, 4000);
