/* ===== Extras: team bubbles (click to feature), Υπηρεσίες pop-out toggle, team title panel ===== */
/* TEAM bubbles: click a portrait to bring it to the centre */
(function () {
  var team = document.querySelector("[data-dgn-team]"); if (!team) return;
  var SL = [[46, 58, 42], [20, 20, 21], [44, 12, 18], [66, 11, 18.5], [80, 40, 23], [97, 58, 16.5], [79, 83, 22]];
  var SLD = [[33.7, 66.5, 46], [14.4, 25.7, 27.4], [43.8, 22.6, 24.2], [70, 9, 22], [68.7, 45.5, 27.8], [95, 62, 21], [72.6, 82.7, 27.8]];
  var start = [0, 6, 4, 3, 5, 1, 2];
  var mem = Array.prototype.slice.call(team.querySelectorAll(".dgn-tm")), who = team.querySelector(".dgn-team__who"), nm = team.querySelector("[data-dgn-team-name]"), rl = team.querySelector("[data-dgn-team-role]"), tmr = 0;
  function put(m, i) { m.dataset.slot = i; var P = (window.matchMedia && window.matchMedia("(min-width:1034px)").matches) ? SLD : SL; m.style.setProperty("--x", P[i][0] + "%"); m.style.setProperty("--y", P[i][1] + "%"); m.style.setProperty("--s", P[i][2] + "%"); var main = i === 0; m.classList.toggle("is-main", main); if (m.tagName === "BUTTON") m.setAttribute("aria-pressed", main ? "true" : "false"); }
  mem.forEach(function (m, k) { put(m, start[k] || 0); });
  mem.forEach(function (m) {
    if (m.tagName !== "BUTTON") return;
    m.addEventListener("click", function () {
      if (m.classList.contains("is-main")) return;
      team.classList.add("is-live");
      var cur = mem.filter(function (x) { return x.classList.contains("is-main"); })[0], from = +m.dataset.slot;
      put(m, 0); if (cur) put(cur, from);
      who.classList.add("is-swap"); clearTimeout(tmr);
      tmr = setTimeout(function () { nm.textContent = m.dataset.name; rl.textContent = m.dataset.role; var ar = team.querySelector("[data-dgn-team-art]"); if (ar) ar.textContent = m.dataset.art || ""; who.classList.remove("is-swap"); }, 380);
    });
  });
})();
(function () {
  var sec = document.querySelector(".dgn-crew"), svg = sec && sec.querySelector(".dgn-crew__panel"); if (!svg) return;
  var stage = sec.querySelector(".dgn-crew__stage"), word = sec.querySelector(".dgn-gs__word"), team = sec.querySelector(".dgn-team");
  var pt = svg.querySelectorAll(".dgn-pn-t"), pa = svg.querySelectorAll(".dgn-pn-a"), pi = svg.querySelector(".dgn-pn-i"), pf = svg.querySelector(".dgn-pn-f");
  function f(n) { return n.toFixed(1); }
  function rrect(x0, y0, x1, y1, r) { return "M" + f(x0) + " " + f(y0 + r) + "Q" + f(x0) + " " + f(y0) + " " + f(x0 + r) + " " + f(y0) + "L" + f(x1 - r) + " " + f(y0) + "Q" + f(x1) + " " + f(y0) + " " + f(x1) + " " + f(y0 + r) + "L" + f(x1) + " " + f(y1 - r) + "Q" + f(x1) + " " + f(y1) + " " + f(x1 - r) + " " + f(y1) + "L" + f(x0 + r) + " " + f(y1) + "Q" + f(x0) + " " + f(y1) + " " + f(x0) + " " + f(y1 - r) + "Z"; }
  function arch(x0, x1, top, ah, by, R) { var cx = (x0 + x1) / 2, hw = (x1 - x0) / 2, k = 0.5523, sy = top + ah;
    return "M" + f(x0) + " " + f(by - R) + "L" + f(x0) + " " + f(sy) + "C" + f(x0) + " " + f(sy - ah * k) + " " + f(cx - hw * k) + " " + f(top) + " " + f(cx) + " " + f(top) + "C" + f(cx + hw * k) + " " + f(top) + " " + f(x1) + " " + f(sy - ah * k) + " " + f(x1) + " " + f(sy) +
      "L" + f(x1) + " " + f(by - R) + "Q" + f(x1) + " " + f(by) + " " + f(x1 - R) + " " + f(by) + "L" + f(x0 + R) + " " + f(by) + "Q" + f(x0) + " " + f(by) + " " + f(x0) + " " + f(by - R) + "Z"; }
  function set(list, d) { Array.prototype.forEach.call(list, function (p) { p.setAttribute("d", d); }); }
  function draw() {
    var sr = sec.getBoundingClientRect(), W = sr.width, H = sr.height; if (!W || !stage || !word || !team) return;
    var st = stage.getBoundingClientRect(), wls = word.querySelectorAll(".dgn-dslot, .dgn-gs__l"), wa = (wls[0] || word).getBoundingClientRect(), wb = (wls[wls.length - 1] || word).getBoundingClientRect(), tr = team.getBoundingClientRect();
    var sm = W < 1034, gut = W < 768 ? 12 : sm ? 20 : 40, pw = Math.min(W - 2 * gut, 1360), p0 = (W - pw) / 2, p1 = p0 + pw;
    var tw = Math.min(pw, wb.right - wa.left + (W < 768 ? 40 : 110)), t0 = (W - tw) / 2, t1 = t0 + tw;
    var y0 = Math.max(0, st.top - sr.top - (sm ? 28 : 56)), th = st.bottom - sr.top + (sm ? 22 : 30);
    var top = th + (sm ? 16 : 22), ah = Math.min(pw * 0.3, sm ? 150 : 330), by = Math.min(H - 12, tr.bottom - sr.top + (sm ? 36 : 48)), R = Math.min(36, pw / 10);
    svg.setAttribute("viewBox", "0 0 " + f(W) + " " + f(H));
    set(pt, rrect(t0, y0, t1, th, Math.min(28, tw / 8)));
    set(pa, arch(p0, p1, top, ah, by, R));
    var ins = sm ? 9 : 14, ins2 = sm ? 18 : 28; pf.setAttribute("d", arch(p0 + ins, p1 - ins, top + ins, ah - ins * 0.4, by - ins, Math.max(8, R - ins))); pi.setAttribute("d", arch(p0 + ins2, p1 - ins2, top + ins2, ah - ins2 * 0.4, by - ins2, Math.max(8, R - ins2)));
    sec.style.setProperty("--dgn-arch", f(ah) + "px");
    sec.classList.add("dgn-pnl");
  }
  var raf = 0; function req() { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); }
  if (window.ResizeObserver) new ResizeObserver(req).observe(sec); else window.addEventListener("resize", req);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(req);
  if (window.MutationObserver && stage) new MutationObserver(function () { req(); setTimeout(req, 900); }).observe(stage, { attributes: true, attributeFilter: ["class"] });
  window.addEventListener("load", req);
  req();
})();
/* Υπηρεσίες pop-out toggle (header menu + footer) */
(function () {
  var groups = document.querySelectorAll("[data-dg-svc]");
  function set(g, open) {
    g.classList.toggle("is-open", open);
    var b = g.querySelector("[data-dg-svc-btn]");
    if (b) b.setAttribute("aria-expanded", open ? "true" : "false");
    g.querySelectorAll(".dg-svc__inner a").forEach(function (a) { a.tabIndex = open ? 0 : -1; });
  }
  groups.forEach(function (g) {
    set(g, !!g.querySelector(".dg-svc__inner a.is-current"));
    var b = g.querySelector("[data-dg-svc-btn]");
    if (b) b.addEventListener("click", function () { set(g, !g.classList.contains("is-open")); });
    g.addEventListener("keydown", function (e) { if (e.key === "Escape" && g.classList.contains("is-open")) { e.stopPropagation(); set(g, false); if (b) b.focus(); } });
  });
})();
