/* ===== Drill: projects data (PROJ, SRC), project panel, filters, Theatre.js keyframes, 3D spine scene ===== */
  var spine = q(".dgn-spine"), PROJ = [{"n":"Avenue Restaurant","d":"Website και ψηφιακή στρατηγική που οδηγούν τον επισκέπτη στην κράτηση","cl":"Web","c":["web"]},{"n":"The Place","d":"Brand ecosystem, reels και περιεχόμενο για τα social media","cl":"Branding και reels","c":["brand","video"]},{"n":"Maxus Hellas","d":"Εταιρικό video που παρουσιάζει τη μάρκα με κινηματογραφική ματιά","cl":"Reels","c":["video"]},{"n":"Techstars Startup Weekend","d":"Website, επικοινωνία και κάλυψη ενός διεθνούς event","cl":"Events και web","c":["events","web"]},{"n":"Sugartia","d":"Website για προϊόντα ζάχαρης, συνταγές και λύσεις για επαγγελματίες","cl":"Web","c":["web"]}], SRC = [{"p":0,"u":DGN_M + "web/avenue-home.jpg","v":0},{"p":1,"u":"https://digiglowmedia.gr/wp-content/uploads/2026/08/THE-PLACE.mp4","v":1},{"p":2,"u":"https://digiglowmedia.gr/wp-content/uploads/2026/08/MAXUS.mp4","v":1},{"p":3,"u":DGN_M + "web/techstars-home.jpg","v":0},{"p":4,"u":DGN_M + "web/sugartia-moments-en.jpg","v":0},{"p":0,"u":DGN_M + "web/avenue-home.jpg","v":0},{"p":1,"u":"https://digiglowmedia.gr/wp-content/uploads/2026/08/THE-PLACE.mp4","v":1},{"p":2,"u":"https://digiglowmedia.gr/wp-content/uploads/2026/08/MAXUS.mp4","v":1},{"p":3,"u":DGN_M + "web/techstars-home.jpg","v":0},{"p":4,"u":DGN_M + "web/sugartia-moments-en.jpg","v":0},{"p":0,"u":DGN_M + "web/avenue-home.jpg","v":0},{"p":1,"u":"https://digiglowmedia.gr/wp-content/uploads/2026/08/THE-PLACE.mp4","v":1}], KF = {"Camera":{"orbit":[[0,-20],[1.6,25],[10,320]],"height":[[0,17.6],[1.6,14.6],[10,0]],"distance":[[0,12.5],[1.6,9.2],[10,9.2]],"look":[[0,-2.8],[1.6,-0.6],[10,-0.6]],"shift":[[0,-2.8],[1.6,1.5],[10,1.5]],"fov":[[0,42],[1.6,40],[10,40]]},"Scene":{"spin":[[0,0],[10,0]],"glow":[[0,0.7],[1.6,0.5],[10,0.55]],"fringe":[[0,0.3],[10,0.3]],"grain":[[0,0.035],[10,0.035]]},"Liquid":{"flow":[[0,0.3],[1.6,0.45],[10,0.9]],"amp":[[0,0.26],[1.6,0.2],[10,0.32],[12.4,0.07],[14,0.07]],"radius":[[0,1.35],[1.6,1.15],[10,1.1],[12.6,3],[14,3]],"pink":[[0,0.45],[10,0.6]]},"Focus":{"card":[[0,-1.2],[1.6,-0.55],[2.6,0],[4.4,1],[6.2,2],[8,3],[9.6,4],[10,4.35],[10.8,5.6],[14,5.6]]},"Outro":{"dive":[[0,0],[10,0],[12.6,1],[14,1]],"flash":[[0,0],[12.3,0],[12.8,1],[13.4,0],[14,0]],"swirl":[[0,0],[10.2,0],[11.6,1],[14,1]],"logo":[[0,0],[10.3,0],[11.2,1],[12.3,1],[12.9,2],[14,2]]}}, STATE = {"sheetsById":{"Journey":{"staticOverrides":{"byObject":{}},"sequence":{"subUnitsPerUnit":30,"length":14,"type":"PositionalSequence","tracksByObject":{"Camera":{"trackData":{"u8jzPde0Ig":{"type":"BasicKeyframedTrack","__debugName":"Camera:[\"orbit\"]","keyframes":[{"id":"xLd6GncfBA","position":0,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":-20},{"id":"epfJBd0Kh8","position":1.6,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":25},{"id":"oOOL8dKLzd","position":10,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":320}]},"ocJ2isAjIh":{"type":"BasicKeyframedTrack","__debugName":"Camera:[\"height\"]","keyframes":[{"id":"KtJ0RlgLKO","position":0,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":17.6},{"id":"mxgJTeKdNn","position":1.6,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":14.6},{"id":"FRIBXuDL7D","position":10,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0}]},"xtpYlSXpfK":{"type":"BasicKeyframedTrack","__debugName":"Camera:[\"distance\"]","keyframes":[{"id":"tHF4vUCsMe","position":0,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":12.5},{"id":"hGAkWvj7FA","position":1.6,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":9.2},{"id":"c9QeWJKY40","position":10,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":9.2}]},"uvSwMFLZDe":{"type":"BasicKeyframedTrack","__debugName":"Camera:[\"look\"]","keyframes":[{"id":"1f8rESQedU","position":0,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":-2.8},{"id":"StPKR0CsTy","position":1.6,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":-0.6},{"id":"4Qwb8DwkNh","position":10,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":-0.6}]},"FdnXsiVpzz":{"type":"BasicKeyframedTrack","__debugName":"Camera:[\"shift\"]","keyframes":[{"id":"63FfkCzJr4","position":0,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":-2.8},{"id":"i0B3JrTAwR","position":1.6,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":1.5},{"id":"4y9ojfljoQ","position":10,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":1.5}]},"oaF1Llqsaj":{"type":"BasicKeyframedTrack","__debugName":"Camera:[\"fov\"]","keyframes":[{"id":"AIxNKu8iS2","position":0,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":42},{"id":"G8NPRVdD53","position":1.6,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":40},{"id":"X83RZJzzzz","position":10,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":40}]}},"trackIdByPropPath":{"[\"orbit\"]":"u8jzPde0Ig","[\"height\"]":"ocJ2isAjIh","[\"distance\"]":"xtpYlSXpfK","[\"look\"]":"uvSwMFLZDe","[\"shift\"]":"FdnXsiVpzz","[\"fov\"]":"oaF1Llqsaj"}},"Scene":{"trackData":{"gEOzdmenCk":{"type":"BasicKeyframedTrack","__debugName":"Scene:[\"spin\"]","keyframes":[{"id":"hvMdgaKjIg","position":0,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0},{"id":"8xNbe3nNyj","position":10,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0}]},"Oq9wMxEhh2":{"type":"BasicKeyframedTrack","__debugName":"Scene:[\"glow\"]","keyframes":[{"id":"FDEEtfjgVv","position":0,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0.7},{"id":"VqE1SkHbn8","position":1.6,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0.5},{"id":"8HxjSI6bWH","position":10,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0.55}]},"tP3fS2qHx6":{"type":"BasicKeyframedTrack","__debugName":"Scene:[\"fringe\"]","keyframes":[{"id":"kwXoIIXGvO","position":0,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0.3},{"id":"oNZYW2mZp0","position":10,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0.3}]},"zVZomHFwUb":{"type":"BasicKeyframedTrack","__debugName":"Scene:[\"grain\"]","keyframes":[{"id":"bYrEqmSM9w","position":0,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0.06},{"id":"CZ7Uw9xfog","position":10,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0.06}]}},"trackIdByPropPath":{"[\"spin\"]":"gEOzdmenCk","[\"glow\"]":"Oq9wMxEhh2","[\"fringe\"]":"tP3fS2qHx6","[\"grain\"]":"zVZomHFwUb"}},"Liquid":{"trackData":{"oEmvnEN5N1":{"type":"BasicKeyframedTrack","__debugName":"Liquid:[\"flow\"]","keyframes":[{"id":"aE6PwZPf1Q","position":0,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0.3},{"id":"h6yYTWmE4l","position":1.6,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0.45},{"id":"BYOvfZ8UzD","position":10,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0.9}]},"zV8fUkkibj":{"type":"BasicKeyframedTrack","__debugName":"Liquid:[\"amp\"]","keyframes":[{"id":"L5DZPjN0ME","position":0,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0.26},{"id":"Q7wjJJibaZ","position":1.6,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0.2},{"id":"UPgHV7iB3m","position":10,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0.32},{"id":"03nbqnsGpW","position":12.4,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0.07},{"id":"LuqIA1id6V","position":14,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0.07}]},"w5DQL05HA0":{"type":"BasicKeyframedTrack","__debugName":"Liquid:[\"radius\"]","keyframes":[{"id":"64GiIjHGb3","position":0,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":1.35},{"id":"CXlMaXZjlj","position":1.6,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":1.15},{"id":"ENUhJduRHH","position":10,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":1.1},{"id":"JEYXg4Jdpm","position":12.6,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":3},{"id":"rcXgGCJbW5","position":14,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":3}]},"6eCuNGMGmS":{"type":"BasicKeyframedTrack","__debugName":"Liquid:[\"pink\"]","keyframes":[{"id":"rCGIZEG8pS","position":0,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0.45},{"id":"H4487q7J58","position":10,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0.6}]}},"trackIdByPropPath":{"[\"flow\"]":"oEmvnEN5N1","[\"amp\"]":"zV8fUkkibj","[\"radius\"]":"w5DQL05HA0","[\"pink\"]":"6eCuNGMGmS"}},"Focus":{"trackData":{"m1CiAhzCue":{"type":"BasicKeyframedTrack","__debugName":"Focus:[\"card\"]","keyframes":[{"id":"QpBenQtYh5","position":0,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":-1.2},{"id":"Xj8TPQxjq4","position":1.6,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":-0.55},{"id":"i9DoV8gz4F","position":2.6,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0},{"id":"kQ1okTBGzv","position":4.4,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":1},{"id":"AmwufUxbvJ","position":6.2,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":2},{"id":"DCTbyvHNsG","position":8,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":3},{"id":"9eh6Yo4gfq","position":9.6,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":4},{"id":"rc5XlrWi0B","position":10,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":4.35},{"id":"26R08qzjI6","position":10.8,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":5.6},{"id":"GKFSufrdZS","position":14,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":5.6}]}},"trackIdByPropPath":{"[\"card\"]":"m1CiAhzCue"}},"Outro":{"trackData":{"lB5er8bOfZ":{"type":"BasicKeyframedTrack","__debugName":"Outro:[\"dive\"]","keyframes":[{"id":"qfM2oeq3hD","position":0,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0},{"id":"avJA76rNic","position":10,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0},{"id":"HTp8hkqdlm","position":12.6,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":1},{"id":"7tOtHWnsCG","position":14,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":1}]},"RlrwZbqcab":{"type":"BasicKeyframedTrack","__debugName":"Outro:[\"flash\"]","keyframes":[{"id":"UGJmGEp7Cg","position":0,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0},{"id":"Q0PBQFI14z","position":12.3,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0},{"id":"GtSnovm14T","position":12.8,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":1},{"id":"UOizwd1iae","position":13.4,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0},{"id":"OV4qBkdfQ1","position":14,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0}]},"y3GQsMpSsc":{"type":"BasicKeyframedTrack","__debugName":"Outro:[\"swirl\"]","keyframes":[{"id":"DlkrCaqx9v","position":0,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0},{"id":"Jupc94tnwl","position":10.2,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0},{"id":"avyfErGPmp","position":11.6,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":1},{"id":"GXafq0fjzL","position":14,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":1}]},"czbttOofL9":{"type":"BasicKeyframedTrack","__debugName":"Outro:[\"logo\"]","keyframes":[{"id":"H2WjQ5TY4M","position":0,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0},{"id":"yWuUFjsUNP","position":10.3,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":0},{"id":"jc01T5GOBU","position":11.2,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":1},{"id":"SZGi6HWGK1","position":12.3,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":1},{"id":"0Zb0RLZ5TR","position":12.9,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":2},{"id":"9SPofbciOx","position":14,"connectedRight":true,"handles":[0.5,1,0.5,0],"type":"bezier","value":2}]}},"trackIdByPropPath":{"[\"dive\"]":"lB5er8bOfZ","[\"flash\"]":"RlrwZbqcab","[\"swirl\"]":"y3GQsMpSsc","[\"logo\"]":"czbttOofL9"}}}}}},"definitionVersion":"0.4.0","revisionHistory":["9gy1CJdObO"]}, L = 14;
  var spUI = { intro: q(".dgn-sp__intro"), head: q(".dgn-sp__head"), filt: q(".dgn-sp__filter"), proj: q(".dgn-sp__proj"), tip: q(".dgn-sp__tip"), title: q(".dgn-sp__title"), cat: q(".dgn-sp__cat"), desc: q(".dgn-sp__desc") };
  var spP = { t: 0, c: 0 }, spST = null, curCat = "all", activeJ = -2, TH = null, studio = /studio/.test(location.hash), spGo = function () {};
  var togo = q(".dgn-intro .dgn-togo");
  if (togo) togo.addEventListener("click", function (e) {
    e.preventDefault();
    if (spST) { goY(spST.start + (root.classList.contains("dgn-ipin") ? window.innerHeight : 0) + 2); return; }
    var wk = q(".dgn-work"), tg = wk && wk.offsetParent ? wk : q(".dgn-spine"); if (tg) goY(tg.getBoundingClientRect().top + window.pageYOffset);
  });
  if (motion) {
    var hsub = q(".dgn-intro .dgn-sub"), hacts = qa(".dgn-intro .dgn-hero__acts > *"), hhint = q(".dgn-intro .dgn-hint");
    if (hsub) {
      var swd = hsub.textContent.split(/\s+/).filter(Boolean); hsub.textContent = "";
      swd.forEach(function (w, i) { var s = document.createElement("span"); s.className = "dgn-sw"; s.textContent = w; hsub.appendChild(s); if (i < swd.length - 1) hsub.appendChild(document.createTextNode(" ")); });
      var srows = [], stop = null; qa(".dgn-sw", hsub).forEach(function (s) { if (s.offsetTop !== stop) { srows.push([]); stop = s.offsetTop; } srows[srows.length - 1].push(s); });
      srows.forEach(function (r, i) { gsap.from(r, { y: 20, opacity: 0, filter: "blur(6px)", duration: 0.9, ease: "power3.out", delay: 1.1 + i * 0.13, clearProps: "filter" }); });
    }
    if (hacts.length) gsap.from(hacts, { y: 26, scale: 0.86, opacity: 0, duration: 0.95, ease: "back.out(1.8)", stagger: 0.12, delay: 1.6 });
    if (hhint) gsap.from(hhint, { x: 24, opacity: 0, duration: 0.8, ease: "power3.out", delay: 1.95 });
  }
  function ease(a) { return a * a * (3 - 2 * a); }
  function kv(tr, pos) { if (pos <= tr[0][0]) return tr[0][1]; for (var i = 1; i < tr.length; i++) if (pos <= tr[i][0]) return tr[i - 1][1] + (tr[i][1] - tr[i - 1][1]) * ease((pos - tr[i - 1][0]) / (tr[i][0] - tr[i - 1][0])); return tr[tr.length - 1][1]; }
  function readVals(pos) {
    var o = {};
    if (TH) { if (!studio) TH.sheet.sequence.position = Math.max(0, Math.min(L, pos)); Object.keys(TH.objs).forEach(function (k) { o[k] = TH.objs[k].value; }); return o; }
    Object.keys(KF).forEach(function (k) { o[k] = {}; Object.keys(KF[k]).forEach(function (p) { o[k][p] = kv(KF[k][p], pos); }); });
    return o;
  }
  function scramble(el, txt) {
    if (motion && typeof ScrambleTextPlugin !== "undefined") { gsap.to(el, { duration: 0.9, scrambleText: { text: txt, chars: "ΑΒΓΔΘΛΞΠΣΦΨΩ01#%&", revealDelay: 0.15, speed: 0.6 } }); return; }
    if (!motion) { el.textContent = txt; return; }
    var ch = "ΑΒΓΔΘΛΞΠΣΦΨΩ01#%&", f = 0, id = el.dataset.sid = String(Math.random());
    (function tick() { if (el.dataset.sid !== id) return; f++; var n = Math.floor(f / 2), s = ""; for (var i = 0; i < txt.length; i++) s += i < n || txt[i] === " " ? txt[i] : ch[Math.floor(Math.random() * ch.length)]; el.textContent = s; if (n < txt.length) requestAnimationFrame(tick); })();
  }
  function match(j) { return curCat === "all" || PROJ[j].c.indexOf(curCat) >= 0; }
  function setProj(j) {
    if (j === activeJ) return; activeJ = j;
    spUI.proj.classList.toggle("on", j >= 0);
    qa(".dgn-fbtn").forEach(function (b) { b.classList.toggle("cur", j >= 0 && b.dataset.c !== "all" && PROJ[j].c.indexOf(b.dataset.c) >= 0); });
    if (j < 0) return;
    spUI.cat.textContent = PROJ[j].cl; spUI.desc.textContent = PROJ[j].d; scramble(spUI.title, PROJ[j].n);
  }
  function step(dir) {
    var j = activeJ < 0 ? (dir > 0 ? -1 : PROJ.length) : activeJ;
    for (var k = 0; k < PROJ.length; k++) { j = (j + dir + PROJ.length) % PROJ.length; if (match(j)) { spGo(j); return; } }
  }
  q(".dgn-prev").addEventListener("click", function () { step(-1); });
  q(".dgn-next2").addEventListener("click", function () { step(1); });
  qa(".dgn-fbtn").forEach(function (b) {
    b.addEventListener("click", function () {
      curCat = b.dataset.c;
      qa(".dgn-fbtn").forEach(function (x) { var on = x === b; x.classList.toggle("on", on); x.setAttribute("aria-pressed", on ? "true" : "false"); });
      if (activeJ < 0 || !match(activeJ)) step(1);
    });
  });
  function loadTheatre() {
    if (lite || still || !G || !studio) return;
    var url = "https://cdn.jsdelivr.net/npm/@theatre/browser-bundles@0.7.2/dist/" + (studio ? "core-and-studio.js" : "core-only.min.js");
    try {
      import(url).then(function () {
        var T = window.Theatre; if (!T || !T.core) return;
        if (studio && T.studio) T.studio.initialize();
        var core = T.core, project = core.getProject("DigiGlow Spine", { state: STATE }), sheet = project.sheet("Journey"), objs = {};
        Object.keys(KF).forEach(function (k) {
          var props = {};
          Object.keys(KF[k]).forEach(function (p) { var vs = KF[k][p].map(function (x) { return x[1]; }); props[p] = core.types.number(vs[0], { range: [Math.min.apply(null, vs) - 30, Math.max.apply(null, vs) + 30] }); });
          objs[k] = sheet.object(k, props);
        });
        project.ready.then(function () { TH = { sheet: sheet, objs: objs }; root.classList.add("dgn-theatre"); });
      }).catch(function () {});
    } catch (e) {}
  }

  if (GL && spine) try { (function () {
    var cv = q("canvas", spine), r = new THREE.WebGLRenderer({ canvas: cv, antialias: true, powerPreference: "high-performance" });
    r.setPixelRatio(Math.min(DPR, 1.5)); r.setClearColor(0x0b0709, 1);
    var scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(40, 1, 0.1, 200), FOG = new THREE.Color(0x0b0709);
    var world = new THREE.Group(); scene.add(world); var aur = aurora(scene, 0.34), aurIn = 0, aurP = new THREE.Vector2(0.5, 0.5), aurL = -1, aurI = 0;
    var N = lite ? 40 : 56, R = 3.6, STEP = 1.1, DY = (lite ? 150 : 230) * 0.088 / ((lite ? 40 : 56) - 1), Y0 = -4, CC = 3, CR = 3, CW = lite ? 720 : 1600, CH = lite ? 480 : 1067, P = PROJ.length;
    if (CW * CC > r.capabilities.maxTextureSize) { CW = Math.floor(r.capabilities.maxTextureSize / CC); CH = Math.round(CW * 2 / 3); }
    var atlas = document.createElement("canvas"); atlas.width = CW * CC; atlas.height = CH * CR;
    var actx = atlas.getContext("2d"), atex = new THREE.CanvasTexture(atlas); atex.anisotropy = Math.min(8, r.capabilities.getMaxAnisotropy());
    var PAL = [["#2a0016", "#ff0785"], ["#1b0615", "#9e36ff"], ["#12061c", "#8fa2ff"], ["#2a0016", "#f01eae"], ["#1b0615", "#ce0080"]];
    function proc(ctx, x, y, w, h, j, seed) {
      var g = ctx.createLinearGradient(x, y, x + w, y + h), pl = PAL[j % 5];
      g.addColorStop(0, pl[0]); g.addColorStop(1, pl[1]); ctx.fillStyle = g; ctx.fillRect(x, y, w, h);
      ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
      ctx.globalAlpha = 0.12; ctx.strokeStyle = "#fff"; ctx.lineWidth = Math.max(1, w / 400);
      for (var k = 0; k < 14; k++) { var yy = y + h * (k / 14); ctx.beginPath(); ctx.moveTo(x, yy + Math.sin(seed + k) * h * 0.06); ctx.bezierCurveTo(x + w * 0.3, y + h * ((Math.sin(seed * 3 + k) + 1) / 2), x + w * 0.7, y + h * ((Math.cos(seed + k * 2) + 1) / 2), x + w, yy); ctx.stroke(); }
      ctx.globalAlpha = 0.92; ctx.fillStyle = "#fff"; ctx.font = "800 " + Math.round(h * 0.13) + "px Manrope, sans-serif"; ctx.fillText(PROJ[j].n, x + w * 0.07, y + h * 0.86, w * 0.86);
      ctx.restore();
    }
    function cover(ctx, img, iw, ih, x, y, w, h) { var s = Math.max(w / iw, h / ih), sw = w / s, sh = h / s; ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = "high"; ctx.drawImage(img, (iw - sw) / 2, (ih - sh) / 2, sw, sh, x, y, w, h); }
    var CELLS = CC * CR, cellSrc = [];
    for (var c = 0; c < CELLS; c++) { cellSrc[c] = c % SRC.length; proc(actx, (c % CC) * CW, Math.floor(c / CC) * CH, CW, CH, SRC[cellSrc[c]].p, c * 1.7); }
    atex.needsUpdate = true;

    var tg = new THREE.PlaneGeometry(1.56, 1.02), aCell = new Float32Array(N * 4), aState = new Float32Array(N * 3);
    var TP = new Int16Array(N), TA = new Float32Array(N), TY = new Float32Array(N), HI = new Float32Array(N), DIM = new Float32Array(N), RR = new Float32Array(N), SS = new Float32Array(N), peel = new Uint8Array(N);
    for (var i = 0; i < N; i++) {
      var cc = (i * 5 + Math.floor(i / CELLS)) % CELLS, cx = cc % CC, cy = Math.floor(cc / CC);
      aCell.set([cx / CC, 1 - (cy + 1) / CR, 1 / CC, 1 / CR], i * 4);
      TP[i] = SRC[cellSrc[cc]].p; TA[i] = i * STEP; TY[i] = Y0 + i * DY; RR[i] = R; SS[i] = 1; aState[i * 3 + 2] = Math.random();
    }
    tg.setAttribute("aCell", new THREE.InstancedBufferAttribute(aCell, 4));
    var stA = new THREE.InstancedBufferAttribute(aState, 3); stA.setUsage(THREE.DynamicDrawUsage); tg.setAttribute("aState", stA);
    var tmat = new THREE.ShaderMaterial({ uniforms: { uAtlas: { value: atex }, uTime: { value: 0 }, uFog: { value: FOG }, uDen: { value: 0.03 } }, vertexShader: "attribute vec4 aCell; attribute vec3 aState; varying vec2 vUv; varying vec2 vAt; varying vec3 vS; varying float vFr; varying float vD; varying float vFc;\nvoid main(){ vUv = uv; vAt = aCell.xy + uv * aCell.zw; vS = aState;\n  vec4 wp = modelMatrix * instanceMatrix * vec4(position, 1.0);\n  vec3 n = normalize(mat3(modelMatrix * instanceMatrix) * vec3(0.0, 0.0, 1.0));\n  vFc = dot(n, normalize(cameraPosition - wp.xyz)); vFr = 1.0 - abs(vFc);\n  vec4 mv = viewMatrix * wp; vD = -mv.z; gl_Position = projectionMatrix * mv; }", fragmentShader: "uniform sampler2D uAtlas; uniform float uTime; uniform vec3 uFog; uniform float uDen;\nvarying vec2 vUv; varying vec2 vAt; varying vec3 vS; varying float vFr; varying float vD; varying float vFc;\nfloat rb(vec2 p, vec2 b, float r){ vec2 q = abs(p) - b + r; return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r; }\nvoid main(){ vec2 p = (vUv - 0.5) * vec2(1.53, 1.0); float d = rb(p, vec2(0.765, 0.5), 0.1); float aw = fwidth(d) * 1.2; if (d > aw) discard; float ca = 1.0 - smoothstep(-aw, aw, d);\n  vec3 img = texture2D(uAtlas, vAt).rgb;\n  vec3 col = img; col *= mix(1.0, 0.18, vS.y);\n  if (!gl_FrontFacing) col *= 0.3;\n  col *= mix(0.85, 1.0, smoothstep(0.0, -0.06, d)) * (1.0 + 0.04 * vS.x);\n  col *= mix(0.62, 1.0, smoothstep(-0.25, 0.55, vFc));\n  float fe = max(vFc, 0.0); col += vec3(1.0, 0.9, 0.97) * (1.0 - smoothstep(0.0, 0.022, -d)) * 0.18 * fe;\n  float swp = vUv.x + vUv.y * 0.6 - fract(uTime * 0.06 + vS.z) * 3.0 + 0.8; col += vec3(1.0, 0.95, 1.0) * exp(-swp * swp * 40.0) * 0.04 * fe; float lm = dot(col, vec3(0.299, 0.587, 0.114)); col = mix(vec3(lm), col, 1.14); col = (col - 0.5) * 1.07 + 0.5; col -= max(col - 0.84, 0.0) * 0.6; col = clamp(col, 0.0, 1.0);\n  float f = 1.0 - exp(-uDen * uDen * vD * vD);\n  gl_FragColor = vec4(mix(col, uFog, clamp(f, 0.0, 1.0)), ca); }", side: THREE.DoubleSide, alphaToCoverage: true });
    var tiles = new THREE.InstancedMesh(tg, tmat, N); tiles.frustumCulled = false; world.add(tiles);

    var LQ = { uCut: { value: 99 }, uPhase: { value: 0 }, uAmp: { value: 0.25 }, uSwell: { value: 0 }, uT: { value: 0 }, uRip: { value: [new THREE.Vector4(0, 0, -99, 0), new THREE.Vector4(0, 0, -99, 0), new THREE.Vector4(0, 0, -99, 0), new THREE.Vector4(0, 0, -99, 0)] }, uRim: { value: new THREE.Color(0xff0785) }, uRimK: { value: 0.7 } };
    LQ.uLens = { value: new THREE.Vector3(0, 0, 0) }; var lensT = 0;
    var roomEnv = null, crt = null, cubeCam = null;
    if (THREE.RoomEnvironment) { try { roomEnv = new THREE.PMREMGenerator(r).fromScene(new THREE.RoomEnvironment(), 0.04).texture; } catch (e) { roomEnv = null; } }
    function rshape(w, h, rr) { var sp = new THREE.Shape(), x = -w / 2, y = -h / 2; sp.moveTo(x + rr, y); sp.lineTo(x + w - rr, y); sp.quadraticCurveTo(x + w, y, x + w, y + rr); sp.lineTo(x + w, y + h - rr); sp.quadraticCurveTo(x + w, y + h, x + w - rr, y + h); sp.lineTo(x + rr, y + h); sp.quadraticCurveTo(x, y + h, x, y + h - rr); sp.lineTo(x, y + rr); sp.quadraticCurveTo(x, y, x + rr, y); return sp; }
    function smoothN(g, ang) { var p = g.attributes.position, n = g.attributes.normal, c = p.count, fn = new Float32Array(c * 3), ct = Math.cos(ang), key = {}, a = new THREE.Vector3(), b = new THREE.Vector3(), e = new THREE.Vector3(), i, j, k;
      for (i = 0; i < c; i += 3) { a.fromBufferAttribute(p, i); b.fromBufferAttribute(p, i + 1); e.fromBufferAttribute(p, i + 2); b.sub(a); e.sub(a); b.cross(e).normalize(); for (j = 0; j < 3; j++) { fn[(i + j) * 3] = b.x; fn[(i + j) * 3 + 1] = b.y; fn[(i + j) * 3 + 2] = b.z; } }
      for (i = 0; i < c; i++) { k = Math.round(p.getX(i) * 1e4) + "," + Math.round(p.getY(i) * 1e4) + "," + Math.round(p.getZ(i) * 1e4); (key[k] = key[k] || []).push(i); }
      for (k in key) { var L = key[k]; for (i = 0; i < L.length; i++) { var vi = L[i], sx = 0, sy = 0, sz = 0; for (j = 0; j < L.length; j++) { var vj = L[j]; if (fn[vi * 3] * fn[vj * 3] + fn[vi * 3 + 1] * fn[vj * 3 + 1] + fn[vi * 3 + 2] * fn[vj * 3 + 2] >= ct) { sx += fn[vj * 3]; sy += fn[vj * 3 + 1]; sz += fn[vj * 3 + 2]; } } a.set(sx, sy, sz).normalize(); n.setXYZ(vi, a.x, a.y, a.z); } }
      n.needsUpdate = true; return g; }
    function slab(w, h, dd, rr) { var g = new THREE.ExtrudeGeometry(rshape(w - rr * 1.2, h - rr * 1.2, rr), { depth: dd, bevelEnabled: true, bevelThickness: rr * 0.6, bevelSize: rr * 0.6, bevelSegments: 12, curveSegments: 24 }); g.center(); g.computeVertexNormals(); return smoothN(g, 1.05); }
    var gmat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0, roughness: 0.05, transmission: 1, thickness: 0.2, ior: 1.5, iridescence: 0.12, iridescenceIOR: 1.3, clearcoat: 1, clearcoatRoughness: 0.03, attenuationColor: new THREE.Color(0xffffff), attenuationDistance: 8, envMap: roomEnv, envMapIntensity: 1.5 });
    var gtiles = new THREE.InstancedMesh(slab(1.66, 1.12, 0.06, 0.1), gmat, N); gtiles.frustumCulled = false; world.add(gtiles);
    var gcol = new THREE.Color(), gW = new THREE.Color(0xffffff), gP = new THREE.Color(0xff6fb8), gD = new THREE.Color(0x3a2a33);
    for (var gi = 0; gi < N; gi++) gtiles.setColorAt(gi, gW);
    var cmat = gmat.clone(); cmat.roughness = 0.05; cmat.thickness = 0.6; cmat.attenuationDistance = 2.4; cmat.iridescence = 0.45;
    var lmat = new THREE.ShaderMaterial({ uniforms: { uAtlas: { value: atex }, uPhase: LQ.uPhase, uAmp: LQ.uAmp, uSwell: LQ.uSwell, uCut: LQ.uCut, uT: LQ.uT, uFog: { value: FOG }, uDen: { value: 0.045 } }, vertexShader: "uniform float uPhase; uniform float uAmp; uniform float uSwell; varying float vLy;\nvarying vec2 vC; varying vec3 vN; varying vec3 vV; varying float vFl; varying float vD; varying vec3 vTg; varying vec3 vBt;\nvoid main(){ float th = uv.x * 6.2831853; float y = position.y; vLy = y;\n  float F = 3.0, K = 1.9; float a = F * th + y * K + uPhase;\n  float fl = 0.5 + 0.5 * cos(a); float r = 1.0 + uAmp * (fl - 0.5) * 1.4 + uSwell;\n  vec3 rad = vec3(sin(th), 0.0, cos(th)); vec3 tng = vec3(cos(th), 0.0, -sin(th));\n  float dth = -uAmp * 0.7 * F * sin(a), dy = -uAmp * 0.7 * K * sin(a);\n  vec3 n = normalize(rad - tng * dth / r - vec3(0.0, 1.0, 0.0) * dy);\n  vec4 mv = modelViewMatrix * vec4(rad * r + vec3(0.0, y, 0.0), 1.0);\n  vN = normalize(normalMatrix * n); vV = normalize(-mv.xyz); vD = -mv.z; vFl = fl; vTg = normalize(normalMatrix * tng); vBt = normalize(normalMatrix * vec3(0.0, 1.0, 0.0));\n  vC = vec2((a / F) / 6.2831853 * 14.0, y * 2.15);\n  gl_Position = projectionMatrix * mv; }", fragmentShader: "uniform vec3 uFog; uniform float uDen; uniform float uCut; uniform float uT; varying float vLy;\nvarying vec2 vC; varying vec3 vN; varying vec3 vV; varying float vFl; varying float vD; varying vec3 vTg; varying vec3 vBt;\nfloat h21(vec2 p){ return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453); }\nfloat h21b(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }\nfloat scr(vec2 p, float ang, float dens){ float c = cos(ang), s = sin(ang); p = mat2(c, -s, s, c) * p; vec2 id = floor(p); vec2 f = fract(p); float h = h21b(id); float on = step(1.0 - dens, h); float off = h21b(id + 7.0);\n  float l = abs(f.y - 0.2 - 0.6 * off + (f.x - 0.5) * (h - 0.5) * 0.3); float len = smoothstep(0.0, 0.15, f.x) * (1.0 - smoothstep(0.85 - 0.5 * h, 1.0, f.x)); return on * len * (1.0 - smoothstep(0.0, 0.02, l)); }\n" + CIRC + "void main(){ if (vLy > uCut) discard;\n  vec3 n = normalize(vN); vec3 V = normalize(vV); if (!gl_FrontFacing) n = -n;\n  float fd = abs(dot(n, V)); float fr = pow(1.0 - fd, 2.2); vec3 r = reflect(-V, n);\n  float hl = exp(-pow((r.x - 0.5) * 6.0, 2.0)) * (0.6 + 0.4 * r.y) + exp(-pow((r.x + 0.62) * 9.0, 2.0)) * 0.5 + exp(-pow((r.y - 0.75) * 5.0, 2.0)) * 0.25;\n  float ridge = smoothstep(0.88, 1.0, vFl) * 0.8 + (1.0 - smoothstep(0.0, 0.08, vFl)) * 0.35;\n  vec2 sp = vC * vec2(0.5, 0.7);\n  float s = scr(sp * 1.3, 0.5, 0.25) + scr(sp * 2.1 + 3.1, -0.9, 0.2) + scr(sp * 0.8 + 7.7, 1.3, 0.18);\n  vec3 tint = vec3(1.0, 0.4, 0.66); float bf = gl_FrontFacing ? 1.0 : 0.45;\n  vec3 col = tint * (0.14 + 0.62 * fr) + vec3(1.0, 0.86, 0.93) * (hl * 0.32 + ridge * 0.4 * (0.4 + fr)) + vec3(1.0, 0.8, 0.9) * s * (0.25 + 0.5 * fr);\n  float a = clamp(0.2 + 0.62 * fr + hl * 0.2 + ridge * 0.25 + s * 0.35, 0.0, 0.92) * bf;\n  vec3 cc = circ(vec2(vC.x * 1.7142857, vC.y * 0.6), uT); col = col * 0.3 + vec3(0.561, 0.004, 0.365) * 1.8 * (cc.x + cc.y * 0.35) + vec3(1.0, 0.6, 0.85) * cc.z * 1.2; a = max(a, 0.6 + cc.x * 0.35);\n  float fg = clamp(1.0 - exp(-uDen * uDen * vD * vD), 0.0, 1.0);\n  gl_FragColor = vec4(mix(col, uFog, fg), a * (1.0 - fg * 0.5)); }", side: THREE.DoubleSide, extensions: { derivatives: true } });
    var liquid = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 36, lite ? 40 : 72, lite ? 120 : 240, true), lmat); liquid.position.y = 6; liquid.frustumCulled = false; world.add(liquid);
    lmat.transparent = true; lmat.depthWrite = false; liquid.renderOrder = 4;
    (function () {
      var noRay = function () {}, netG = new THREE.Group(), o3 = new THREE.Object3D(); liquid.add(netG); netG.visible = false;
      function cutPatch(m) { m.onBeforeCompile = function (sh) { sh.uniforms.uCut = LQ.uCut; sh.vertexShader = sh.vertexShader.replace("#include <common>", "#include <common>\nvarying float vBy;").replace("#include <begin_vertex>", "#include <begin_vertex>\n  vBy = (instanceMatrix * vec4(transformed, 1.0)).y;"); sh.fragmentShader = sh.fragmentShader.replace("#include <common>", "#include <common>\nuniform float uCut; varying float vBy;").replace("#include <clipping_planes_fragment>", "#include <clipping_planes_fragment>\n  if (vBy > uCut) discard;"); }; return m; }
      var NN = lite ? 60 : 110, nodes = [];
      for (var ni = 0; ni < NN; ni++) { var ny = -17.2 + ni * (34.4 / (NN - 1)) + (Math.random() - 0.5) * 0.25, na = ni * 2.05 + (Math.random() - 0.5) * 0.9, nr = 0.08 + Math.random() * 0.52; nodes.push({ p: new THREE.Vector3(Math.sin(na) * nr, ny, Math.cos(na) * nr), c: Math.random() < 0.42, s: 0.2 + Math.random() * 0.22, rx: Math.random() * 6.28, ry: Math.random() * 6.28, rz: Math.random() * 6.28 }); }
      var spc = document.createElement("canvas"); spc.width = spc.height = 128; var spx = spc.getContext("2d"); spx.fillStyle = "#000"; spx.fillRect(0, 0, 128, 128);
      for (var k = 0; k < 420; k++) { var bb = Math.random(), bz = bb > 0.85 ? 2 : 1; spx.fillStyle = "rgba(255," + Math.round(170 + 80 * bb) + "," + Math.round(200 + 55 * bb) + "," + (0.25 + 0.75 * bb * bb).toFixed(2) + ")"; spx.fillRect(Math.random() * 128, Math.random() * 128, bz, bz); }
      var sptx = new THREE.CanvasTexture(spc);
      var sgeo = new THREE.BoxGeometry(1, 1, 1, 3, 3, 3), spa = sgeo.attributes.position;
      for (var vk = 0; vk < spa.count; vk++) { var x = spa.getX(vk), y = spa.getY(vk), z = spa.getZ(vk), hh = Math.sin(x * 91.7 + y * 37.3 + z * 57.1) * 43758.5; hh -= Math.floor(hh); var ee = (Math.abs(x) > 0.49 ? 1 : 0) + (Math.abs(y) > 0.49 ? 1 : 0) + (Math.abs(z) > 0.49 ? 1 : 0), k2 = 1 - (hh * 0.12 + (ee > 1 ? 0.06 : 0)); spa.setXYZ(vk, x * k2, y * k2, z * k2); }
      sgeo.computeVertexNormals();
      var stoneM = cutPatch(new THREE.MeshStandardMaterial({ color: 0x2b2731, roughness: 0.5, metalness: 0.65, envMap: roomEnv, envMapIntensity: 0.8, emissive: 0xffc8e6, emissiveMap: sptx, emissiveIntensity: 0.9, flatShading: true }));
      var crysM = cutPatch(new THREE.MeshPhysicalMaterial({ color: 0xffa6cf, roughness: 0.04, metalness: 0, envMap: roomEnv, envMapIntensity: 1.2, clearcoat: 1, emissive: 0xff4fa0, emissiveIntensity: 0.55 }));
      var coreM = cutPatch(new THREE.MeshBasicMaterial({ color: 0xff6cc0, transparent: true, opacity: 1, blending: THREE.AdditiveBlending, depthWrite: false }));
      var goldM = cutPatch(new THREE.MeshStandardMaterial({ color: 0xc8846a, metalness: 1, roughness: 0.3, envMap: roomEnv, envMapIntensity: 0.75, emissive: 0x2a0e06, emissiveIntensity: 0.4 }));
      var beadM = cutPatch(new THREE.MeshStandardMaterial({ color: 0xf2a6bf, metalness: 0.8, roughness: 0.18, envMap: roomEnv, envMapIntensity: 1.2, emissive: 0x5a1430, emissiveIntensity: 0.5 }));
      function inst(geo, mat, list, sf, ro) { var m = new THREE.InstancedMesh(geo, mat, list.length); list.forEach(function (n, i) { o3.position.copy(n.p); o3.rotation.set(n.rx, n.ry, n.rz); o3.scale.setScalar(n.s * sf); o3.updateMatrix(); m.setMatrixAt(i, o3.matrix); }); m.frustumCulled = false; m.raycast = noRay; m.renderOrder = ro; netG.add(m); return m; }
      var stones = nodes.filter(function (n) { return !n.c; }), crys = nodes.filter(function (n) { return n.c; });
      orbGet(function () { var obm = cutPatch(ORB.m.clone()); obm.envMap = roomEnv; obm.envMapIntensity = 1.1; inst(ORB.g, obm, nodes, 0.5, 0); });
      var beads = []; for (var bi = 0; bi < (lite ? 50 : 90); bi++) { var ba = Math.random() * 6.28, br = Math.random() * 0.62; beads.push({ p: new THREE.Vector3(Math.sin(ba) * br, -17.3 + Math.random() * 34.6, Math.cos(ba) * br), s: 0.012 + Math.random() * 0.022, rx: 0, ry: 0, rz: 0 }); }
      inst(new THREE.SphereGeometry(1, 12, 8), beadM, beads, 1, 0);
      var rods = [];
      for (var ri2 = 0; ri2 < NN - 1; ri2++) { rods.push([nodes[ri2].p, nodes[ri2 + 1].p]); if (ri2 < NN - 2 && Math.random() < 0.35) rods.push([nodes[ri2].p, nodes[ri2 + 2].p]); }
      [0, 2.094, 4.189].forEach(function (a) { var x = Math.sin(a) * 0.46, z = Math.cos(a) * 0.46; rods.push([new THREE.Vector3(x, -17.5, z), new THREE.Vector3(x, 17.5, z)]); });
      var rodM = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.009, 0.009, 1, 8, 1), goldM, rods.length), upv2 = new THREE.Vector3(0, 1, 0), dv = new THREE.Vector3();
      rods.forEach(function (rd, i) { dv.subVectors(rd[1], rd[0]); var L = dv.length(); o3.position.addVectors(rd[0], rd[1]).multiplyScalar(0.5); o3.quaternion.setFromUnitVectors(upv2, dv.normalize()); o3.scale.set(1, L, 1); o3.updateMatrix(); rodM.setMatrixAt(i, o3.matrix); });
      rodM.frustumCulled = false; rodM.raycast = noRay; netG.add(rodM);
      var PN = rods.length, pa = new Float32Array(PN * 3), pb = new Float32Array(PN * 3), ps = new Float32Array(PN);
      rods.forEach(function (rd, i) { pa.set([rd[0].x, rd[0].y, rd[0].z], i * 3); pb.set([rd[1].x, rd[1].y, rd[1].z], i * 3); ps[i] = Math.random(); });
      var pg = new THREE.InstancedBufferGeometry(); pg.copy(new THREE.IcosahedronGeometry(1, 1)); pg.setAttribute("aA", new THREE.InstancedBufferAttribute(pa, 3)); pg.setAttribute("aB2", new THREE.InstancedBufferAttribute(pb, 3)); pg.setAttribute("aS", new THREE.InstancedBufferAttribute(ps, 1)); pg.instanceCount = PN;
      var pulse = new THREE.Mesh(pg, new THREE.ShaderMaterial({ uniforms: { uT: LQ.uT, uCut: LQ.uCut }, vertexShader: "attribute vec3 aA; attribute vec3 aB2; attribute float aS; uniform float uT; varying float vBy; varying float vK;\nvoid main(){ float L = length(aB2 - aA); float ph = fract(uT * (0.35 + aS * 0.4) / max(L, 0.6) + aS * 13.0); vec3 c = mix(aA, aB2, ph); vBy = c.y; vK = sin(ph * 3.14159);\n  vec4 mv = modelViewMatrix * vec4(c + position * 0.03 * (0.6 + 0.4 * vK), 1.0); gl_Position = projectionMatrix * mv; }", fragmentShader: "uniform float uCut; varying float vBy; varying float vK;\nvoid main(){ if (vBy > uCut) discard; gl_FragColor = vec4(vec3(1.0, 0.62, 0.86) * (0.6 + 1.2 * vK), 1.0); }" }));
      pulse.frustumCulled = false; pulse.raycast = noRay; pulse.renderOrder = 3; netG.add(pulse);
      pulse.onBeforeRender = function () { netG.rotation.y = LQ.uT.value * 0.1; };
      var inL = new THREE.PointLight(0xff5fb0, 2.4, 10); inL.position.set(0, 0, 0); netG.add(inL);
    })();
    if (!lite) (function () {
      var sc = document.createElement("canvas"); sc.width = 512; sc.height = 512; var sx = sc.getContext("2d"); sx.fillStyle = "#000"; sx.fillRect(0, 0, 512, 512); sx.lineCap = "round";
      for (var k = 0; k < 140; k++) { var x = Math.random() * 512, y = Math.random() * 512, a = (Math.random() < 0.6 ? 0.5 : -0.9) + (Math.random() - 0.5) * 0.5, L = 10 + Math.random() * 70; sx.strokeStyle = "rgba(255,230,240," + (0.15 + Math.random() * 0.6).toFixed(2) + ")"; sx.lineWidth = 0.5 + Math.random(); sx.beginPath(); sx.moveTo(x, y); sx.lineTo(x + Math.cos(a) * L, y + Math.sin(a) * L); sx.stroke(); }
      var stx = new THREE.CanvasTexture(sc); stx.wrapS = stx.wrapT = THREE.RepeatWrapping; stx.repeat.set(3, 18);
      var cm = new THREE.MeshPhysicalMaterial({ color: 0xe8dce4, transmission: 1, thickness: 1.0, ior: 1.5, roughness: 0.1, metalness: 0, attenuationColor: new THREE.Color(0x2a0f20), attenuationDistance: 0.55, clearcoat: 1, clearcoatRoughness: 0.03, specularIntensity: 1, envMap: roomEnv, envMapIntensity: 1.5, emissive: 0xffd6ea, emissiveMap: stx, emissiveIntensity: 0.12, iridescence: 0.05 });
      cm.onBeforeCompile = function (sh) {
        sh.uniforms.uPhase = LQ.uPhase; sh.uniforms.uAmp = LQ.uAmp; sh.uniforms.uSwell = LQ.uSwell; sh.uniforms.uCut = LQ.uCut; sh.uniforms.uT = LQ.uT; sh.uniforms.uLens = LQ.uLens;
        sh.vertexShader = sh.vertexShader.replace("#include <common>", "#include <common>\nuniform float uPhase; uniform float uAmp; uniform float uSwell; varying float vLy; vec3 dgP;").replace("#include <beginnormal_vertex>", "float dth0 = uv.x * 6.2831853; float dy0 = position.y; vLy = dy0; float dA = 3.0 * dth0 + dy0 * 1.9 + uPhase; float dfl = 0.5 + 0.5 * cos(dA); float drr = 1.0 + uAmp * (dfl - 0.5) * 1.4 + uSwell;\n  vec3 drad = vec3(sin(dth0), 0.0, cos(dth0)); vec3 dtg = vec3(cos(dth0), 0.0, -sin(dth0)); float ddth = -uAmp * 0.7 * 3.0 * sin(dA), ddy = -uAmp * 0.7 * 1.9 * sin(dA);\n  vec3 objectNormal = normalize(drad - dtg * ddth / drr - vec3(0.0, 1.0, 0.0) * ddy); dgP = drad * drr + vec3(0.0, dy0, 0.0);\n#ifdef USE_TANGENT\n  vec3 objectTangent = vec3(tangent.xyz);\n#endif").replace("#include <begin_vertex>", "vec3 transformed = dgP;");
        sh.fragmentShader = sh.fragmentShader.replace("#include <common>", "#include <common>\nuniform float uCut; uniform float uT; uniform vec3 uLens; varying float vLy;\n" + CIRC).replace("#include <clipping_planes_fragment>", "#include <clipping_planes_fragment>\n  if (vLy > uCut) discard;").replace("#include <emissivemap_fragment>", "#include <emissivemap_fragment>\n  vec3 cc = circ(vec2((vUv.x + vLy * 0.1008) * 24.0, vLy * 3.6), uT); totalEmissiveRadiance += vec3(0.561, 0.004, 0.365) * 1.0 * (cc.x + cc.y * 0.35) + vec3(1.0, 0.6, 0.85) * cc.z * 1.3;").replace("#include <output_fragment>", "  { float lAng = vUv.x * 6.2831853, dA = atan(sin(lAng - uLens.x), cos(lAng - uLens.x)); vec2 dl = vec2(dA * 1.15, vLy - uLens.y); float ld = length(dl);\n    float lm = (1.0 - smoothstep(0.5, 0.7, ld)) * uLens.z;\n    if (lm > 0.001) { vec2 c0 = vec2((uLens.x / 6.2831853 + uLens.y * 0.1008) * 24.0, uLens.y * 3.6), dp = vec2(dA / 6.2831853 * 24.0 + dl.y * 0.1008 * 24.0, dl.y * 3.6);\n      vec3 cm2 = circ(c0 + dp * 0.6, uT * 1.5); float sw = sin(dl.x * 9.0 + uT * 2.0) * sin(dl.y * 8.0 - uT * 1.6) * 0.5 + 0.5;\n      vec3 core = mix(vec3(0.35, 0.0, 0.22), vec3(1.0, 0.25, 0.7), sw * clamp(1.0 - ld * 1.1, 0.0, 1.0)) * clamp(1.3 - ld, 0.0, 1.3);\n      vec3 ins = core * 0.9 + vec3(0.561, 0.004, 0.365) * 1.2 * (cm2.x + cm2.y * 0.5) + vec3(1.0, 0.7, 0.9) * cm2.z * 1.6;\n      outgoingLight = mix(outgoingLight, ins, lm * 0.92); }\n    outgoingLight += vec3(1.0, 0.75, 0.95) * exp(-pow((ld - 0.68) * 36.0, 2.0)) * uLens.z * 0.8; }\n#include <output_fragment>");
      };
      liquid.material = cm; liquid.renderOrder = 0;
    })();
    if (aur) aur.visible = false; scene.add(cam);
    var STU = { uT: { value: 0 }, uAsp: { value: 1.6 }, uFl: { value: 0 }, uFP: { value: new THREE.Vector2(0.5, 0.7) } }, stS = { fl: 0, next: 3, card: -9, dbl: -1, lt: 0 };
    var stM = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.ShaderMaterial({ uniforms: STU, vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }", fragmentShader: "uniform float uT; uniform float uAsp; uniform float uFl; uniform vec2 uFP; varying vec2 vUv;\nfloat h21(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }\nfloat vn(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f); return mix(mix(h21(i), h21(i + vec2(1.0, 0.0)), f.x), mix(h21(i + vec2(0.0, 1.0)), h21(i + 1.0), f.x), f.y); }\nfloat fbm(vec2 p){ float s = 0.0, a = 0.5; for (int i = 0; i < 6; i++) { s += a * vn(p); p = p * 2.02 + vec2(1.7, 9.2); a *= 0.5; } return s; }\nvoid main(){ vec2 sp = vec2((vUv.x - 0.5) * uAsp, vUv.y - 0.5); float r = length(sp), a = uT * 0.02; vec2 q = mat2(cos(a), -sin(a), sin(a), cos(a)) * sp * 2.2;\n  vec2 w = vec2(fbm(q + uT * 0.03), fbm(q + 5.2 - uT * 0.025)); float d = fbm(q * 1.3 + w * 1.6 + vec2(0.0, uT * 0.01));\n  d = smoothstep(0.32, 0.85, d) * (1.0 - smoothstep(0.35, 1.05, r * 0.9));\n  vec2 fp = vec2((uFP.x - 0.5) * uAsp, uFP.y - 0.5); float fd = length(sp - fp), lit = uFl * exp(-fd * fd * 5.0);\n  vec3 col = vec3(0.02, 0.012, 0.022) + mix(vec3(0.07, 0.035, 0.08), vec3(0.26, 0.09, 0.23), d) * d * 1.7 + vec3(0.9, 0.15, 0.6) * d * lit * 1.7 + vec3(1.0, 0.75, 0.95) * pow(d, 3.0) * lit * 0.9 + vec3(0.25, 0.02, 0.15) * uFl * 0.06;\n  float by = sp.y - fp.y, bx = sp.x - fp.x - (fbm(vec2(by * 7.0, uFP.x * 40.0)) - 0.5) * 0.7 * abs(by), bm = step(by, 0.0) * step(-0.38, by) * smoothstep(0.55, 0.9, uFl) * (1.0 + by * 1.6);\n  col += vec3(1.0, 0.72, 0.95) * exp(-abs(bx) * 420.0) * bm * 1.6 + vec3(1.0, 0.2, 0.65) * exp(-abs(bx) * 60.0) * bm * 0.3;\n  gl_FragColor = vec4(col, 1.0); }", depthWrite: false }));
    stM.frustumCulled = false; stM.renderOrder = -20; stM.position.z = -150; cam.add(stM);
    function stormTick(t, focus) {
      var dt = Math.max(0, Math.min(0.1, t - stS.lt)); stS.lt = t;
      var cardNow = Math.round(focus);
      function strike(k) { stS.fl = k; STU.uFP.value.set(0.2 + Math.random() * 0.6, 0.55 + Math.random() * 0.3); stS.dbl = t + 0.09; stS.next = t + 4 + Math.random() * 5; }
      if (cardNow !== stS.card && Math.abs(focus - cardNow) < 0.2) { if (stS.card !== -9) strike(1); stS.card = cardNow; }
      if (t > stS.next) strike(0.85);
      if (stS.dbl > 0 && t > stS.dbl) { stS.fl = Math.max(stS.fl, 0.8); stS.dbl = -1; }
      stS.fl *= Math.exp(-dt * 5.5);
      var h = 2 * 150 * Math.tan(cam.fov * Math.PI / 360); stM.scale.set(h * cam.aspect, h, 1);
      STU.uT.value = t; STU.uAsp.value = cam.aspect; STU.uFl.value = stS.fl;
    }
    var dl1 = new THREE.DirectionalLight(0xffffff, 1.1); dl1.position.set(5, 12, 9); scene.add(dl1);
    var pl1 = new THREE.PointLight(0xff0785, 3, 30); pl1.position.set(-6, 4, 6); scene.add(pl1);
    var rips = LQ.uRip.value, ri = 0, lastRip = -1, liqPh = 0, lastT = 0, lastPos = 0, drillDir = 1, cardSw = 0, cubeTick = 0;
    function addRip(wp, s) { var p = liquid.worldToLocal(wp.clone()); rips[ri].set(p.y, Math.atan2(p.x, p.z), LQ.uT.value, s); ri = (ri + 1) % 4; lastRip = LQ.uT.value; }
    var hp = []; for (var k = 0; k <= 400; k++) { var u = k / 400 * (N - 1); hp.push(new THREE.Vector3(Math.sin(u * STEP) * (R - 0.2), Y0 + u * DY - 0.42, Math.cos(u * STEP) * (R - 0.2))); }
    var HU = { uT: { value: 0 }, uA: { value: 1 }, uPh: { value: 0 } }, hcv = new THREE.CatmullRomCurve3(hp);
    var HVS = "varying vec2 vUv; varying float vBh; varying float vNdv;\nvoid main(){ vUv = uv; vec4 wp = modelMatrix * vec4(position, 1.0); vec4 ap = modelMatrix * vec4(0.0, position.y, 0.0, 1.0); vBh = smoothstep(-0.6, 0.9, distance(wp.xyz, cameraPosition) - distance(ap.xyz, cameraPosition));\n  vec3 n = normalize(mat3(modelMatrix) * normal); vNdv = abs(dot(n, normalize(cameraPosition - wp.xyz))); gl_Position = projectionMatrix * viewMatrix * wp; }";
    function hMat(core) { return new THREE.ShaderMaterial({ uniforms: HU, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, vertexShader: HVS, fragmentShader: "uniform float uT; uniform float uA; uniform float uPh; varying vec2 vUv; varying float vBh; varying float vNdv;\nvec3 grad(float x){ vec3 a = vec3(1.0, 0.03, 0.52), b = vec3(0.94, 0.12, 0.68), c = vec3(0.62, 0.21, 1.0); return x < 0.5 ? mix(a, b, x * 2.0) : mix(b, c, (x - 0.5) * 2.0); }\nvoid main(){ float g = abs(fract(vUv.x * 2.5 + uT * 0.015) * 2.0 - 1.0); float sh = pow(vNdv, " + (core ? "2.5" : "1.4") + ");\n  float q = fract(vUv.x * 16.0 - uPh * 0.35 - uT * 0.05); float pu = exp(-pow((q - 0.5) * 34.0, 2.0)); float fr = 1.0 - vBh * 0.78;\n  vec3 col = grad(g) * " + (core ? "1.5" : "0.9") + " + vec3(1.0, 0.86, 0.96) * pu * " + (core ? "1.6" : "0.6") + "; float a = uA * fr * sh * (" + (core ? "0.75 + 0.5 * pu" : "0.24 + 0.4 * pu") + ");\n  gl_FragColor = vec4(col, a); }" }); }
    var helix = new THREE.Group(), hCore = new THREE.Mesh(new THREE.TubeGeometry(hcv, 1400, 0.012, 8, false), hMat(true)), hHalo = new THREE.Mesh(new THREE.TubeGeometry(hcv, 1400, 0.07, 8, false), hMat(false)); hCore.frustumCulled = false; hHalo.frustumCulled = false; helix.add(hHalo); helix.add(hCore);
    world.add(helix);

    var DN = lite ? 600 : 570, dp = new Float32Array(DN * 3), ds = new Float32Array(DN), dc = new Float32Array(DN * 3), DC = [[1, 0.78, 0.42], [1, 0.88, 0.62], [1, 0.7, 0.36], [0.74, 0.9, 0.5], [1, 0.92, 0.75], [1, 0.5, 0.72]];
    for (var d = 0; d < DN; d++) { var rad = 1.6 + Math.pow(Math.random(), 0.55) * 13, an = Math.random() * Math.PI * 2, cr = Math.random(); dp.set([Math.sin(an) * rad, -7 + Math.random() * 30, Math.cos(an) * rad], d * 3); ds[d] = Math.random(); dc.set(DC[cr < 0.3 ? 0 : cr < 0.55 ? 1 : cr < 0.72 ? 2 : cr < 0.84 ? 3 : cr < 0.93 ? 4 : 5], d * 3); }
    var dg = new THREE.BufferGeometry(); dg.setAttribute("position", new THREE.BufferAttribute(dp, 3)); dg.setAttribute("aS", new THREE.BufferAttribute(ds, 1)); dg.setAttribute("aC", new THREE.BufferAttribute(dc, 3));
    var dmat = new THREE.ShaderMaterial({ uniforms: { uTime: { value: 0 }, uPR: { value: 1 }, uFocus: { value: 9 }, uSwirl: { value: 0 } }, vertexShader: "attribute float aS; attribute vec3 aC; uniform float uTime; uniform float uPR; uniform float uFocus; uniform float uSwirl; varying vec3 vC; varying float vA; varying float vB;\nvoid main(){ vec3 p = position; float t = uTime;\n  p.y = mod(p.y + 7.0 + t * (0.05 + aS * 0.12), 30.0) - 7.0;\n  p.x += sin(t * 0.21 + aS * 31.0 + p.y * 0.35) * 0.45; p.z += cos(t * 0.17 + aS * 17.0 + p.y * 0.3) * 0.45;\n  float sr = length(p.xz), sa = uSwirl * (t * 1.6 + 3.0 / (sr + 0.4)), cs = cos(sa), sn = sin(sa);\n  p.xz = mat2(cs, -sn, sn, cs) * p.xz * mix(1.0, 0.42, uSwirl);\n  vec4 mv = modelViewMatrix * vec4(p, 1.0); float d = max(0.3, -mv.z);\n  float coc = clamp(abs(d - uFocus) / d * 2.2, 0.0, 1.0);\n  float core = (2.0 + aS * aS * 4.5) * (14.0 / d);\n  float sz = core + coc * (8.0 + aS * 30.0) * (9.0 / d + 0.3);\n  gl_PointSize = clamp(uPR * sz, 1.0, 96.0);\n  float tw = 0.55 + 0.45 * sin(t * (0.6 + aS * 1.6) + aS * 40.0);\n  vA = tw * mix(1.0, 0.12 + 0.18 * aS, smoothstep(0.0, 0.7, coc)) * smoothstep(48.0, 14.0, d) * smoothstep(0.4, 2.2, d);\n  vA = clamp(vA, 0.0, 1.0); vB = coc; vC = aC;\n  gl_Position = projectionMatrix * mv; }", fragmentShader: "varying vec3 vC; varying float vA; varying float vB;\nvoid main(){ float r = length(gl_PointCoord - 0.5) * 2.0; if (r > 1.0) discard;\n  float sharp = exp(-r * r * 9.0) + exp(-r * r * 60.0) * 0.8;\n  float disc = smoothstep(1.0, 0.8, r) * (0.72 + 0.28 * smoothstep(0.5, 0.92, r));\n  float a = mix(sharp, disc, smoothstep(0.15, 0.6, vB));\n  gl_FragColor = vec4(vC * a * vA * 1.4, 1.0); }", transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
    var dust = new THREE.Points(dg, dmat); dust.frustumCulled = false;
    var oi = 0, hOrb = lite ? null : orbs(scene, 20, function () { var k = oi++, a = k * 2.39996 + 0.4, r = 12.5 + (k % 3) * 0.6; return [Math.sin(a) * r, -7 + (k + 0.5) / 20 * 30, Math.cos(a) * r]; }, 0.16, 0.3);
    var logoG = new THREE.Group(), lmatP = null, lD = null, djv = new THREE.Vector3(), djv2 = new THREE.Vector3(); scene.add(logoG);
    function buildLogo() {
      if (lite || lmatP) return;
      var lc = document.createElement("canvas"), LW = 600, LH = 330; lc.width = LW; lc.height = LH; var lx = lc.getContext("2d");
      function sq(x, y, col) { lx.fillStyle = col; lx.beginPath(); if (lx.roundRect) lx.roundRect(x, y, 48, 40, 5); else lx.rect(x, y, 48, 40); lx.fill(); }
      sq(234, 20, "#f4ed79"); sq(320, 20, "#bee47a"); sq(196, 62, "#0ebedf"); sq(276, 62, "#e22399"); sq(354, 62, "#df1604");
      function fit(txt, w, y, weight, col) { lx.font = weight + " 100px Manrope, sans-serif"; var m = lx.measureText(txt).width, sz = 100 * w / m; lx.font = weight + " " + sz.toFixed(1) + "px Manrope, sans-serif"; lx.fillStyle = col; lx.textAlign = "center"; lx.textBaseline = "alphabetic"; lx.fillText(txt, LW / 2, y); }
      fit("DigiGlow Media", 372, 196, 800, "#f6efe9"); var dmz = lx.measureText("D"), dca = dmz.actualBoundingBoxAscent || 30; lD = { x: LW / 2 - 186 + dmz.width / 2, y: 196 - dca / 2, h: dca }; if (root.classList.contains("dgn-d3")) lx.clearRect(LW / 2 - 188, 196 - dca - 8, dmz.width + 4, dca + 16); fit("A Creative Agency", 232, 250, 700, "#ff2a9a");
      var dd = lx.getImageData(0, 0, LW, LH).data, cand = [];
      for (var y = 0; y < LH; y += 1) for (var x = 0; x < LW; x += 1) { var i = (y * LW + x) * 4; if (dd[i + 3] > 150) cand.push(i); }
      var LN = Math.min(7000, cand.length), at = new Float32Array(LN * 3), ar = new Float32Array(LN * 3), ac = new Float32Array(LN * 3), as = new Float32Array(LN), sc = 3.6 / LW;
      for (var k = 0; k < LN; k++) {
        var ci = cand[Math.floor(Math.random() * cand.length)], px = (ci / 4) % LW, py = Math.floor(ci / 4 / LW);
        at.set([(px - LW / 2) * sc, (LH / 2 - py) * sc, 0], k * 3);
        var a = Math.random() * Math.PI * 2, rr = 1.5 + Math.random() * 4.5; ar.set([Math.cos(a) * rr, Math.sin(a) * rr, (Math.random() - 0.5) * 3], k * 3);
        ac.set([dd[ci] / 255, dd[ci + 1] / 255, dd[ci + 2] / 255], k * 3); as[k] = Math.random();
      }
      var lg = new THREE.BufferGeometry(); lg.setAttribute("position", new THREE.BufferAttribute(at, 3)); lg.setAttribute("aR", new THREE.BufferAttribute(ar, 3)); lg.setAttribute("aC", new THREE.BufferAttribute(ac, 3)); lg.setAttribute("aS", new THREE.BufferAttribute(as, 1));
      lmatP = new THREE.ShaderMaterial({ uniforms: { uF: { value: 0 }, uTime: { value: 0 }, uPR: { value: dmat.uniforms.uPR.value } }, vertexShader: "attribute vec3 aR; attribute vec3 aC; attribute float aS; uniform float uF; uniform float uTime; uniform float uPR; varying vec3 vC; varying float vA;\nvoid main(){ float form = clamp(uF * 1.45 - aS * 0.45, 0.0, 1.0); form = form * form * (3.0 - 2.0 * form);\n  float burst = clamp(uF - 1.0, 0.0, 1.0);\n  float an = uTime * (0.6 + aS * 0.8) + aS * 6.2831; float cs = cos(an), sn = sin(an);\n  vec3 st = vec3(cs * aR.x - sn * aR.y, sn * aR.x + cs * aR.y, aR.z);\n  vec3 p = mix(st, position, form);\n  p.xy += vec2(sin(uTime * 2.0 + aS * 40.0), cos(uTime * 1.7 + aS * 30.0)) * 0.012 * form;\n  vec3 dir = normalize(position + vec3(aR.xy * 0.25, 0.6 + aS));\n  p += dir * burst * burst * (3.0 + aS * 5.0);\n  vec4 mv = modelViewMatrix * vec4(p, 1.0);\n  gl_PointSize = uPR * (2.2 + aS * 2.2) * (1.0 + (1.0 - form) * 1.4) * (1.0 + burst * 2.0);\n  vC = mix(vec3(1.0, 0.8, 0.45), aC, form);\n  vA = smoothstep(0.0, 0.25, uF) * (1.0 - burst) * (0.75 + 0.25 * sin(uTime * 3.0 + aS * 50.0));\n  gl_Position = projectionMatrix * mv; }", fragmentShader: "varying vec3 vC; varying float vA;\nvoid main(){ float r = length(gl_PointCoord - 0.5) * 2.0; if (r > 1.0) discard;\n  float a = exp(-r * r * 5.0) + exp(-r * r * 40.0) * 0.6;\n  gl_FragColor = vec4(vC * a * vA * 1.7, 1.0); }", transparent: true, depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending });
      var lp = new THREE.Points(lg, lmatP); lp.frustumCulled = false; lp.renderOrder = 9; logoG.add(lp); logoG.visible = false;
    }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { try { buildLogo(); } catch (e) { dbg(e); } }); else setTimeout(buildLogo, 1500);

    var cards = PROJ.map(function (pj, j) {
      var cvs = document.createElement("canvas"); cvs.width = 960; cvs.height = 640; var cx2 = cvs.getContext("2d"); proc(cx2, 0, 0, 960, 640, j, j * 3.1);
      var tex = new THREE.CanvasTexture(cvs); tex.anisotropy = Math.min(8, r.capabilities.getMaxAnisotropy());
      var m = new THREE.ShaderMaterial({ uniforms: { uTex: { value: tex }, uAmt: { value: 0 }, uTime: { value: 0 } }, vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }", fragmentShader: "uniform sampler2D uTex; uniform float uAmt; uniform float uTime; varying vec2 vUv;\nfloat rb(vec2 p, vec2 b, float r){ vec2 q = abs(p) - b + r; return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r; }\nvoid main(){ vec2 p = (vUv - 0.5) * vec2(1.543, 1.0); float d = rb(p, vec2(0.771, 0.5), 0.11); float aw = fwidth(d) * 1.2; if (d > aw) discard; float ca = 1.0 - smoothstep(-aw, aw, d);\n  vec3 col = texture2D(uTex, vUv).rgb; col *= mix(0.7, 1.0, smoothstep(0.0, -0.12, d)); col *= 0.6 + 0.4 * uAmt; float lm = dot(col, vec3(0.299, 0.587, 0.114)); col = mix(vec3(lm), col, 1.12); col = (col - 0.5) * 1.06 + 0.5; col -= max(col - 0.84, 0.0) * 0.6; col = clamp(col, 0.0, 1.0);\n  gl_FragColor = vec4(col, ca); }", side: THREE.DoubleSide, alphaToCoverage: true });
      var me = new THREE.Group(), img = new THREE.Mesh(new THREE.PlaneGeometry(2.84, 1.84), m), gl2 = new THREE.Mesh(slab(3, 2, 0.08, 0.18), cmat);
      img.frustumCulled = false; gl2.frustumCulled = false; me.add(img); me.add(gl2); me.visible = false; scene.add(me);
      return { me: me, m: m, glass: gl2, ctx: cx2, tex: tex, vid: null, has: false, anchor: -1 };
    });

    var comp = null, bloom = null, fin = null;
    if (!lite && THREE.EffectComposer && THREE.RenderPass && THREE.UnrealBloomPass && THREE.ShaderPass) {
      try {
        comp = new THREE.EffectComposer(r, new THREE.WebGLRenderTarget(4, 4, { samples: r.capabilities.isWebGL2 ? 4 : 0, type: THREE.HalfFloatType })); comp.addPass(new THREE.RenderPass(scene, cam));
        bloom = new THREE.UnrealBloomPass(new THREE.Vector2(512, 512), 0.45, 0.5, 0.66); comp.addPass(bloom);
        fin = new THREE.ShaderPass({ uniforms: { tDiffuse: { value: null }, uTime: { value: 0 }, uFringe: { value: 0.5 }, uGrain: { value: 0.035 } }, vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }", fragmentShader: "uniform sampler2D tDiffuse; uniform float uTime; uniform float uFringe; uniform float uGrain; varying vec2 vUv;\nfloat h(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }\nvoid main(){ vec2 c = vUv - 0.5; float r2 = dot(c, c); vec2 o = c * r2 * uFringe * 0.08;\n  vec3 col = vec3(texture2D(tDiffuse, vUv + o).r, texture2D(tDiffuse, vUv).g, texture2D(tDiffuse, vUv - o).b);\n  col *= 1.0 - r2 * 1.1; col += (h(vUv * 1000.0 + fract(uTime)) - 0.5) * uGrain; gl_FragColor = vec4(col, 1.0); }" }); comp.addPass(fin);
      } catch (e) { comp = null; }
    }

    var o = new THREE.Object3D(), eul = new THREE.Euler(), fwd = new THREE.Vector3(), rgt = new THREE.Vector3(), upv = new THREE.Vector3(), front = new THREE.Vector3(), anc = new THREE.Vector3(), tgt = new THREE.Vector3();
    var m4 = new THREE.Matrix4(), fq = new THREE.Quaternion(), aq = new THREE.Quaternion(), wq = new THREE.Quaternion();
    var outK = 0, flashEl = null, dEnd = new THREE.Vector3(), mx = 0, my = 0, smx = 0, smy = 0, spin = 0, vel = 0, drag = null, hov = -1, hovPending = false, lastFov = 0, ray = new THREE.Raycaster(), mv = new THREE.Vector2(), K1 = lite || still ? 1 : 0.12;

    function camFrom(v) {
      var C = v.Camera, th = C.orbit * Math.PI / 180;
      if (C.fov !== lastFov) { cam.fov = C.fov; cam.updateProjectionMatrix(); lastFov = C.fov; }
      rgt.set(Math.cos(th), 0, -Math.sin(th));
      var dv = v.Outro ? ease(Math.max(0, Math.min(1, v.Outro.dive))) : 0, fr = 1 - dv;
      cam.position.set(Math.sin(th) * C.distance, C.height - smy * 0.5 * fr, Math.cos(th) * C.distance).addScaledVector(rgt, smx * 0.6 * fr);
      tgt.set(0, C.height + C.look, 0).addScaledVector(rgt, C.shift);
      if (dv > 0) {
        cam.position.lerp(dEnd.set(Math.sin(th) * 0.02, 4, Math.cos(th) * 0.02), dv); tgt.lerp(dEnd.set(0, -6, 0), dv);
        cam.up.set(0, 1, 0).lerp(dEnd.set(-Math.sin(th), 0, -Math.cos(th)), Math.min(1, dv * 1.4)).normalize();
        var fv = C.fov + (68 - C.fov) * dv; if (fv !== lastFov) { cam.fov = fv; cam.updateProjectionMatrix(); lastFov = fv; }
      } else cam.up.set(0, 1, 0);
      cam.lookAt(tgt);
    }
    var shA = 0, shP = new THREE.Vector3(), shQ = new THREE.Vector3(), shX = 0, shY = 0, shHX = 1, shHY = 1;
    function updCards(focus, t) {
      cam.getWorldDirection(fwd); rgt.crossVectors(fwd, cam.up).normalize(); upv.crossVectors(rgt, fwd).normalize();
      front.copy(cam.position).addScaledVector(fwd, 4.2).addScaledVector(rgt, 1.128).addScaledVector(upv, 0.249);
      shA = 0; shP.copy(front).project(cam); shX = shP.x; shY = shP.y; shQ.copy(front).addScaledVector(rgt, 1.15).project(cam); shHX = Math.max(0.01, Math.abs(shQ.x - shX)); shQ.copy(front).addScaledVector(upv, 0.75).project(cam); shHY = Math.max(0.01, Math.abs(shQ.y - shY));
      m4.lookAt(cam.position, front, upv); fq.setFromRotationMatrix(m4);
      world.getWorldQuaternion(wq);
      cards.forEach(function (cd, j) {
        var a = Math.max(0, 1 - Math.abs(focus - j) * 1.6); a = ease(a); shA = Math.max(shA, a);
        cd.me.visible = a > 0.002; cardSw = Math.max(cardSw, a * (1 - a) * 4);
        if (cd.vid) { if (a > 0.3 && cd.vid.paused) { var pr = cd.vid.play(); if (pr && pr.catch) pr.catch(function () {}); } else if (a <= 0.3 && !cd.vid.paused) cd.vid.pause(); }
        if (!cd.me.visible) { cd.anchor = -1; return; }
        if (cd.anchor < 0) { var best = -1, bd = 1e9; for (var i = 0; i < N; i++) if (TP[i] === j) { var dd = Math.abs(TY[i] - cam.position.y - 0.3); if (dd < bd) { bd = dd; best = i; } } cd.anchor = best; }
        var ii = cd.anchor; if (ii < 0) return;
        anc.set(Math.sin(TA[ii]) * RR[ii], TY[ii], Math.cos(TA[ii]) * RR[ii]).applyMatrix4(world.matrixWorld);
        eul.set(0, TA[ii], 0); aq.setFromEuler(eul).premultiply(wq);
        cd.me.position.lerpVectors(anc, front, a); cd.me.quaternion.slerpQuaternions(aq, fq, a); cd.me.scale.setScalar(0.35 + 0.428 * a);
        cd.m.uniforms.uAmt.value = a; cd.m.uniforms.uTime.value = t;
        if (a > 0.04) peel[ii] = 1;
      });
    }
    function updTiles(t) {
      var filt = curCat !== "all";
      for (var i = 0; i < N; i++) {
        var ok = match(TP[i]);
        var nyd = TY[i] - cam.position.y - 0.3, nb = Math.exp(-nyd * nyd * 0.35);
        var th = Math.min(1, (i === hov ? 1 : 0) + (filt && ok ? 0.6 : 0)), td = ok ? 0 : 1, tr = R + 0.3 * nb + (filt && ok ? 0.45 : 0) + (i === hov ? 0.35 : 0) + outK * 9, ts = (peel[i] ? 0 : ok ? 1 + 0.12 * nb : 0.8) * (1 - outK);
        HI[i] += (th - HI[i]) * K1; DIM[i] += (td - DIM[i]) * K1; RR[i] += (tr - RR[i]) * K1; SS[i] += (ts - SS[i]) * (peel[i] ? 0.3 : K1);
        o.position.set(Math.sin(TA[i]) * RR[i], TY[i] + Math.sin(t * 0.8 + i * 0.3) * 0.03, Math.cos(TA[i]) * RR[i]);
        var bk = 0; if (shA > 0.01) { shQ.copy(o.position).applyMatrix4(world.matrixWorld).project(cam); var ex = Math.max(Math.abs(shQ.x - shX) / shHX, Math.abs(shQ.y - shY) / shHY); bk = shQ.z < 1 ? shA * Math.min(1, Math.max(0, (1.4 - ex) / 0.5)) : 0; }
        o.rotation.set(0, TA[i], 0); o.scale.setScalar(Math.max(0.001, SS[i]) * (1 - 0.2 * bk)); o.updateMatrix(); tiles.setMatrixAt(i, o.matrix); gtiles.setMatrixAt(i, o.matrix); gcol.copy(gW).lerp(gP, HI[i] * 0.8).lerp(gD, DIM[i] * 0.8); gtiles.setColorAt(i, gcol);
        aState[i * 3] = HI[i]; aState[i * 3 + 1] = Math.max(DIM[i], bk * 0.75);
      }
      tiles.instanceMatrix.needsUpdate = true; stA.needsUpdate = true; gtiles.instanceMatrix.needsUpdate = true; if (gtiles.instanceColor) gtiles.instanceColor.needsUpdate = true;
    }
    var shown = { intro: -1, work: -1 };
    function ui(pos, focus) {
      var io = Math.max(0, Math.min(1, 1 - (pos - 0.15) / 0.9));
      if (Math.abs(io - shown.intro) > 0.01) { shown.intro = io; spUI.intro.style.opacity = io.toFixed(2); spUI.intro.style.visibility = io < 0.02 ? "hidden" : ""; }
      var w = pos > 1.25 && pos < 10.2 ? 1 : 0;
      if (w !== shown.work) { shown.work = w; spUI.head.classList.toggle("on", !!w); spUI.filt.classList.toggle("on", !!w); }
      var j = Math.round(focus); setProj(w && j >= 0 && j < P && Math.abs(focus - j) < 0.32 ? j : -1);
    }
    function draw(v, t) {
      if (comp) { bloom.strength = v.Scene.glow; fin.uniforms.uTime.value = t; fin.uniforms.uFringe.value = v.Scene.fringe; fin.uniforms.uGrain.value = v.Scene.grain; comp.render(); }
      else r.render(scene, cam);
    }
    var dR = { p: new THREE.Vector3(), a: new THREE.Vector3(), b: new THREE.Vector3(), tg: new THREE.Vector3(), n: new THREE.Vector3(), x: new THREE.Vector3(), y: new THREE.Vector3(), up: new THREE.Vector3(0, 1, 0), zA: new THREE.Vector3(0, 0, 1), yA: new THREE.Vector3(0, 1, 0), m: new THREE.Matrix4(), q: new THREE.Quaternion(), qs: new THREE.Quaternion(), qr: new THREE.Quaternion(), e: new THREE.Euler(), lp: -1, sp: 0, dir: 1, init: false };
    DJ.dS = scene; DJ.dEnv = roomEnv;
    function dRail(v, pos) {
      var C = v.Camera, th = C.orbit * Math.PI / 180, hc = C.height + C.look;
      function at(p, o) { var u = p / 10, a = th + 0.15 + 6.2832 * u - 0.9 * Math.sin(6.2832 * u); return o.set(Math.sin(a) * 5.3, hc - 0.1 + 0.5 * Math.sin(p * 0.8), Math.cos(a) * 5.3); }
      at(pos, dR.p); at(pos + 0.05, dR.a); at(pos - 0.05, dR.b); dR.tg.subVectors(dR.a, dR.b).normalize(); if (shA > 0.01) { dR.a.copy(dR.p).project(cam); var sex = Math.max(Math.abs(dR.a.x - shX) / shHX, Math.abs(dR.a.y - shY) / shHY), spk = shA * Math.min(1, Math.max(0, (1.7 - sex) / 0.5)); if (spk > 0.001) { var scd = dR.p.distanceTo(cam.position); dR.b.subVectors(dR.p, cam.position).multiplyScalar((scd + (Math.max(scd, 5.4) - scd) * spk) / scd); dR.p.addVectors(cam.position, dR.b); } }
      var dv = dR.lp < 0 ? 0 : pos - dR.lp; dR.lp = pos; if (Math.abs(dv) > 0.0004) dR.dir += ((dv > 0 ? 1 : -1) - dR.dir) * 0.08; dR.sp += (Math.max(-0.6, Math.min(0.6, dv * 14)) - dR.sp) * 0.1;
      dR.n.subVectors(cam.position, dR.p).normalize().addScaledVector(dR.tg, 0.32 * dR.dir).normalize();
      dR.x.crossVectors(dR.up, dR.n).normalize(); dR.y.crossVectors(dR.n, dR.x); dR.m.makeBasis(dR.x, dR.y, dR.n); dR.q.setFromRotationMatrix(dR.m);
      var ek = Math.max(0, Math.min(1, pos / 1.1)); ek = ek * ek * (3 - 2 * ek);
      dR.q.multiply(dR.qr.setFromAxisAngle(dR.zA, -dR.sp * 0.9)).multiply(dR.qr.setFromAxisAngle(dR.yA, -(1 - ek) * 2.5));
      if (!dR.init || ek <= 0) { dR.qs.copy(dR.q); dR.init = true; } else dR.qs.slerp(dR.q, 0.14);
      var DI = DJ.dIn, vis = pos > 0.01 && pos < 10;
      if (DI) { DI.m.visible = vis; if (vis) { DI.m.position.copy(dR.p); DI.m.quaternion.copy(dR.qs); DI.m.scale.setScalar(Math.max(0.0001, DI.k * ek)); } }
      var dd = dR.p.distanceTo(cam.position); dR.a.copy(dR.p).project(cam); DJ.ox = dR.a.x; DJ.oy = dR.a.y; DJ.oh = 1.0 / (2 * dd * Math.tan(cam.fov * Math.PI / 360)); DJ.ob = 0;
      dR.qr.copy(cam.quaternion).invert().multiply(dR.qs); dR.e.setFromQuaternion(dR.qr); DJ.orx = dR.e.x; DJ.ory = dR.e.y; DJ.orz = dR.e.z; DJ.ov = true;
    }
    function frame(t, pos) {
      portal(pos); var v = readVals(pos); outK = v.Outro ? Math.min(1, Math.max(0, v.Outro.dive * 2)) : 0;
      smx += (mx - smx) * 0.05; smy += (my - smy) * 0.05;
      if (!drag) { spin += vel; vel *= 0.94; }
      world.rotation.y = spin + v.Scene.spin * Math.PI / 180 + t * 0.04;
      camFrom(v); world.updateMatrixWorld(true);
      if (lmatP) { var lf = v.Outro.logo; logoG.visible = lf > 0.001 && lf < 1.999; if (logoG.visible) { cam.getWorldDirection(fwd); logoG.position.copy(cam.position).addScaledVector(fwd, 3.4); logoG.quaternion.copy(cam.quaternion); lmatP.uniforms.uF.value = lf; lmatP.uniforms.uTime.value = t; lmatP.uniforms.uPR.value = dmat.uniforms.uPR.value; } } DJ.lv = !!(lmatP && logoG.visible && lD); if (DJ.lv) { logoG.updateMatrixWorld(true); djv.set((lD.x - 300) * 0.006, (165 - lD.y) * 0.006, 0).applyMatrix4(logoG.matrixWorld).project(cam); djv2.set((lD.x - 300) * 0.006, (165 - lD.y + lD.h) * 0.006, 0).applyMatrix4(logoG.matrixWorld).project(cam); DJ.lx = djv.x; DJ.ly = djv.y; DJ.lh = Math.abs(djv2.y - djv.y) / 2; }
      peel.fill(0); cardSw = 0; updCards(v.Focus.card, t);
      if (hovPending && !drag) {
        hovPending = false; ray.setFromCamera(mv, cam); var hit = ray.intersectObject(tiles), nh = hit.length && hit[0].instanceId !== undefined ? hit[0].instanceId : -1;
        if (nh !== hov) { hov = nh; spUI.tip.classList.toggle("on", hov >= 0); cv.style.cursor = hov >= 0 ? "pointer" : ""; if (hov >= 0) spUI.tip.textContent = PROJ[TP[hov]].n; }
        lensT = 0;
      }
      updTiles(t);
      tmat.uniforms.uTime.value = t; dmat.uniforms.uTime.value = t; dmat.uniforms.uFocus.value = v.Camera.distance * (1 - outK) + 5 * outK; dmat.uniforms.uSwirl.value = v.Outro.swirl; orbTick(hOrb, t, -7, 30, v.Outro.swirl, cam, 3.4);
      dRail(v, pos); var AU = aur.uniforms, amx = 0.5 + mx * 0.5, amy = 0.5 - my * 0.5, adv = Math.hypot(amx - aurP.x, amy - aurP.y); AU.uT.value = t; AU.uOff.value = pos * 0.025; AU.uA.value = cam.aspect; AU.uIn.value += (aurIn - AU.uIn.value) * 0.06; AU.uM.value.lerp(aurP.set(amx, amy), 0.08); if (aurIn && adv > 0.012 && t - aurL > 0.14) { AU.uRp.value[aurI].set(amx, amy, t, Math.min(1, adv * 18)); aurI = (aurI + 1) % 4; aurL = t; }
      LQ.uCut.value = v.Outro.dive > 0.001 ? 34 - 41 * Math.min(1, v.Outro.dive * 1.6) : 99; HU.uA.value = 1 - outK; HU.uT.value = t; HU.uPh.value = liqPh; if (flashEl) flashEl.style.opacity = Math.max(0, v.Outro.flash).toFixed(3);
      var dtt = Math.max(0, Math.min(0.1, t - lastT)), Lq = v.Liquid, dps = pos - lastPos; lastT = t; lastPos = pos;
      if (Math.abs(dps) > 0.0005) drillDir += ((dps > 0 ? 1 : -1) - drillDir) * 0.2;
      liqPh += dtt * Lq.flow * 1.6 * drillDir + dps * 2.4;
      LQ.uPhase.value = liqPh + (lite || still ? 3 : 0); LQ.uAmp.value = Lq.amp; LQ.uT.value = t; LQ.uRimK.value = Lq.pink;
      LQ.uSwell.value += (cardSw * 0.14 - LQ.uSwell.value) * (lite || still ? 1 : 0.1); liquid.scale.set(Lq.radius, 1, Lq.radius);
      if (cubeCam && cubeTick++ % 3 === 0) { liquid.visible = false; gtiles.visible = false; cards.forEach(function (cd) { cd.glass.visible = false; }); cubeCam.position.set(0, cam.position.y, 0); cubeCam.update(r, scene); liquid.visible = true; gtiles.visible = true; cards.forEach(function (cd) { cd.glass.visible = true; }); }
      stormTick(t, v.Focus.card);
      LQ.uLens.value.z += (lensT - LQ.uLens.value.z) * 0.12;
      if (!lite) ui(pos, v.Focus.card);
      draw(v, t);
    }
    function size() {
      var w = spine.clientWidth, h = spine.clientHeight; r.setSize(w, h, false); cam.aspect = w / Math.max(1, h); cam.updateProjectionMatrix();
      if (comp) { comp.setPixelRatio(DPR); comp.setSize(w, h); }
      dmat.uniforms.uPR.value = DPR * h / 900;
    }
    size();

    var redraw = function () {};
    function loadSrc(s, cb) {
      if (s.v) {
        var vd = document.createElement("video"); vd.crossOrigin = "anonymous"; vd.muted = true; vd.loop = true; vd.playsInline = true; vd.preload = "auto";
        vd.addEventListener("loadeddata", function () { try { vd.currentTime = Math.min(2, (vd.duration || 6) / 3); } catch (e) {} }, { once: true });
        vd.addEventListener("seeked", function () { cb(vd, vd.videoWidth, vd.videoHeight); }, { once: true });
        vd.src = s.u; vd.load();
      } else { var im = new Image(); im.crossOrigin = "anonymous"; im.decoding = "async"; im.onload = function () { cb(im, im.naturalWidth, im.naturalHeight); }; im.src = s.u; }
    }
    function loadAll() {
      SRC.forEach(function (s, si) {
        if (lite && s.v) return;
        loadSrc(s, function (el, iw, ih) {
          try {
            for (var c = 0; c < CELLS; c++) if (cellSrc[c] === si) cover(actx, el, iw, ih, (c % CC) * CW, Math.floor(c / CC) * CH, CW, CH);
            atex.needsUpdate = true;
            var cd = cards[s.p];
            if (!cd.has) { cd.has = true; if (s.v && !lite) { cd.vid = el; var vt = new THREE.VideoTexture(el); cd.m.uniforms.uTex.value = vt; } else { cover(cd.ctx, el, iw, ih, 0, 0, 960, 640); cd.tex.needsUpdate = true; } }
            redraw();
          } catch (e) {}
        });
      });
    }
    setTimeout(loadAll, lite ? 600 : 1200);

    if (lite || still) {
      redraw = function () { frame(3, 0); };
      redraw(); window.addEventListener("resize", function () { size(); redraw(); });
      return;
    }
    root.classList.add("dgn-gl");
    loadTheatre();

    cv.addEventListener("pointermove", function (e) {
      aurIn = 1; var b = cv.getBoundingClientRect(); mx = (e.clientX - b.left) / b.width * 2 - 1; my = (e.clientY - b.top) / b.height * 2 - 1;
      spUI.tip.style.transform = "translate(" + (e.clientX - b.left + 18) + "px," + (e.clientY - b.top + 18) + "px)";
      if (drag) { var dx = e.clientX - drag.x; drag.x = e.clientX; drag.m += Math.abs(dx); spin += dx * 0.006; vel = dx * 0.006; return; }
      mv.set(mx, -my); hovPending = true;
    });
    cv.addEventListener("pointerdown", function (e) { drag = { x: e.clientX, m: 0 }; vel = 0; cv.classList.add("grabbing"); if (cv.setPointerCapture) cv.setPointerCapture(e.pointerId); });
    function up() { if (!drag) return; var m = drag.m; drag = null; cv.classList.remove("grabbing"); if (m < 5 && hov >= 0) spGo(TP[hov]); }
    cv.addEventListener("pointerup", up); cv.addEventListener("pointercancel", up);
    cv.addEventListener("pointerleave", function () { lensT = 0; aurIn = 0; mx = 0; my = 0; hov = -1; spUI.tip.classList.remove("on"); cv.style.cursor = ""; });

    flashEl = document.createElement("div"); flashEl.setAttribute("aria-hidden", "true"); flashEl.style.cssText = "position:absolute;inset:0;z-index:2;pointer-events:none;opacity:0;background:radial-gradient(circle at 50% 50%, rgba(255,226,170,0.95), rgba(255,150,90,0.55) 32%, rgba(255,7,133,0.18) 55%, rgba(11,7,9,0) 75%)"; spine.appendChild(flashEl);
    var tunEl = root.querySelector(".dgn-tun");
    var ptRing = document.createElement("div"), ptOn = false; ptRing.setAttribute("aria-hidden", "true"); ptRing.style.cssText = "position:fixed;left:0;top:0;z-index:4;pointer-events:none;border-radius:50%;opacity:0;box-shadow:0 0 0 2px rgba(255,220,238,0.95),0 0 26px 6px rgba(255,79,174,0.75),inset 0 0 34px 4px rgba(255,79,174,0.55)"; root.appendChild(ptRing);
    var ptIn = tunEl && tunEl.querySelector(".dgn-tun__intro");
    var ptKids = tunEl ? Array.prototype.filter.call(tunEl.children, function (c) { return c.tagName === "CANVAS" || c.classList.contains("dgn-tun__veil") || c.classList.contains("dgn-tun__in"); }) : [];
    var ptTf = null;
    function ptKid(fix, clip) { if (tunEl) { if (fix && ptTf === null) { ptTf = tunEl.style.transform; tunEl.style.transform = "none"; tunEl.style.background = "transparent"; } else if (!fix && ptTf !== null) { if (tunEl.style.transform === "none") tunEl.style.transform = ptTf; tunEl.style.background = ""; ptTf = null; } } ptKids.forEach(function (c) { c.style.position = fix ? "fixed" : ""; c.style.inset = fix ? "0" : ""; c.style.clipPath = clip; }); }
    function ptClear() { ptOn = false; if (tunEl) { tunEl.style.translate = ""; tunEl.style.clipPath = ""; } ptKid(false, ""); if (ptIn) { ptIn.style.opacity = ""; ptIn.style.transition = ""; } ptRing.style.opacity = "0"; }
    DJ.ptClear = function () { if (ptOn || (tunEl && tunEl.style.clipPath) || (ptKids[0] && ptKids[0].style.position) || (ptIn && ptIn.style.opacity !== "")) { ptClear(); if (tunEl) tunEl.classList.add("dgn-show"); } };
    function portal(pos) {
      if (!tunEl || !DJ.tunST || lite) return;
      var ts = DJ.tunST.start, y = window.scrollY, W = window.innerWidth, H = window.innerHeight, k = Math.max(0, Math.min(1, (spP.t * 14 - 13.2) / 0.8));
      if (y >= ts - 1) { DJ.ptClear(); return; }
      if (k <= 0.0005) { if (ptOn) ptClear(); if (tunEl.classList.contains("dgn-show")) tunEl.classList.remove("dgn-show"); if (ptIn && ptIn.style.opacity !== "0") { ptIn.style.transition = "none"; ptIn.style.opacity = "0"; } return; }
      if (ptIn && ptIn.style.transition) ptIn.style.transition = "";
      ptOn = true; tunEl.classList.add("dgn-show");
      var ke = k * k * (3 - 2 * k), r0 = 0.11 * H, r1 = Math.hypot(W, H) * 0.56, rr = r0 + (r1 - r0) * Math.pow(ke, 2.2);
      ptKid(true, "circle(" + rr.toFixed(1) + "px at 50% 50%)"); if (ptIn) { ptIn.style.transition = "none"; ptIn.style.opacity = Math.max(0, Math.min(1, (k - 0.35) / 0.4)).toFixed(3); }
      ptRing.style.width = ptRing.style.height = (rr * 2).toFixed(1) + "px"; ptRing.style.transform = "translate(" + (W / 2 - rr).toFixed(1) + "px," + (H / 2 - rr).toFixed(1) + "px)";
      ptRing.style.opacity = (Math.min(1, k * 6) * (1 - Math.max(0, (k - 0.55) / 0.45))).toFixed(3);
    }
    if (G) spST = ScrollTrigger.create({ trigger: spine, start: "top top", end: function () { return "+=" + Math.round(window.innerHeight * (root.classList.contains("dgn-ipin") ? 9.4 : 8.4)); }, pin: true, onUpdate: function (s) { spP.t = root.classList.contains("dgn-ipin") ? Math.max(0, (s.progress * 9.4 - 1) / 8.4) : s.progress; }, onLeave: function () { if (tunEl) tunEl.classList.add("dgn-show"); } });
    spGo = function (j) {
      if (!spST) return;
      var best = 0, bd = 1e9;
      for (var p = 0; p <= L; p += 0.02) { var fv = TH ? kv(KF.Focus.card, p) : readVals(p).Focus.card, dd = Math.abs(fv - j); if (dd < bd) { bd = dd; best = p; } }
      var o2 = root.classList.contains("dgn-ipin") ? window.innerHeight : 0; goY(spST.start + o2 + (best / L) * (spST.end - spST.start - o2));
    };
    window.addEventListener("resize", size);
    var on = false, t0 = performance.now(), pf = { n: 0, acc: 0, last: 0, done: false }, bad = false;
    function perf(now) { if (pf.done) return; if (pf.last) { pf.acc += Math.min(200, now - pf.last); pf.n++; } pf.last = now; if (pf.n >= 90) { pf.done = true; if (pf.acc / pf.n > 30) { comp = null; cubeCam = null; r.setPixelRatio(1); size(); } } }
    function loop(now) { if (!on) return; perf(now); spP.c += (spP.t - spP.c) * 0.075; if (!bad) { try { frame((now - t0) / 1000, spP.c * L); } catch (e) { bad = true; dbg(e); } } requestAnimationFrame(loop); }
    seen(spine, function (v) { on = v; pf.last = 0; if (v) requestAnimationFrame(loop); });
  })(); } catch (e) { dbg(e); }

