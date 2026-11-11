var DGN_V = (window.DGN_BASE || "") + "vendor/", DGN_M = (window.DGN_BASE || "") + "media/";

function dgnMain() {
(function () {
  var root = document.querySelector(".dgn");
  if (!root || root.dataset.ready) return;
  root.dataset.ready = "1";
  function dbg(e) { (window.__dgnErr = window.__dgnErr || []).push(String((e && (e.stack || e.message)) || e)); }
  window.addEventListener("error", function (e) { dbg((e.message || "resource") + " " + (e.filename || (e.target && e.target.src) || "") + ":" + (e.lineno || "")); }, true);
  var still = false;
  var lite = window.matchMedia("(max-width: 1033px)").matches;
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var GL = typeof THREE !== "undefined";
  var G = typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined";
  var motion = G;
  var heavy = motion && !lite;
  if (G) gsap.registerPlugin(ScrollTrigger);
  if (G && typeof ScrambleTextPlugin !== "undefined") gsap.registerPlugin(ScrambleTextPlugin);
  function goY(y) { window.scrollTo({ top: y, behavior: "smooth" }); }
  var DPR = Math.min(window.devicePixelRatio || 1, lite ? 1.25 : 1.75);
  function seen(el, cb) { if (!el) return; if ("IntersectionObserver" in window) new IntersectionObserver(function (e) { cb(e[0].isIntersecting); }, { rootMargin: "120px" }).observe(el); else cb(true); }
  function q(s, el) { return (el || root).querySelector(s); }
  function qa(s, el) { return Array.prototype.slice.call((el || root).querySelectorAll(s)); }
  var ORB = { g: null, m: null, q: [] }, DJ = { lv: false, lx: 0, ly: 0, lh: 0, tunST: null, svxST: null };
  function orbGet(cb) {
    if (ORB.g) { cb(); return; }
    ORB.q.push(cb); if (ORB.q.length > 1) return;
    function go() {
      try {
        new THREE.GLTFLoader().load(DGN_M + "ball_texture-web.glb", function (gl) {
          var src = null; gl.scene.updateMatrixWorld(true); gl.scene.traverse(function (o) { if (o.isMesh && !src) src = o; }); if (!src) return;
          var im = src.material.map && src.material.map.image, bcv = document.createElement("canvas"); bcv.width = 1024; bcv.height = 512; var bx2 = bcv.getContext("2d"), btx = new THREE.CanvasTexture(bcv);
          function paint() {
            if (im) bx2.drawImage(im, 0, 0, 1024, 512); else { bx2.fillStyle = "#2a0a1e"; bx2.fillRect(0, 0, 1024, 512); }
            btx.needsUpdate = true;
          }
          paint();
          ORB.img = im; ORB.g = new THREE.SphereGeometry(1, 40, 28); ORB.m = new THREE.MeshPhysicalMaterial({ map: btx, roughness: 0.22, metalness: 0.1, clearcoat: 1, clearcoatRoughness: 0.05, envMapIntensity: 0.9, emissive: 0xffffff, emissiveMap: btx, emissiveIntensity: 0.35 }); ORB.q.forEach(function (f) { f(); }); ORB.q = [];
        }, undefined, function (e) { dbg(e); });
      } catch (e) { dbg(e); }
    }
    if (THREE.GLTFLoader) { go(); return; }
    var gs = document.createElement("script"); gs.src = DGN_V + "three/examples/js/loaders/GLTFLoader.js"; gs.onload = go; gs.onerror = function () { dbg("load failed GLTFLoader"); }; document.head.appendChild(gs);
  }
  function orbs(sc, n, place, s0, s1) {
    var o = { im: null, d: [], m: new THREE.Object3D(), v: new THREE.Vector3() };
    for (var i = 0; i < n; i++) { var p = place(); o.d.push({ x: p[0], y: p[1], z: p[2], a: Math.random(), s: s0 + Math.pow(Math.random(), 2) * s1, p: Math.random() * 6.283, r: (Math.random() - 0.5) * 0.8 }); }
    orbGet(function () { o.im = new THREE.InstancedMesh(ORB.g, ORB.m, n); o.im.frustumCulled = false; sc.add(o.im); });
    return o;
  }
  function orbTick(o, t, y0, yr, sw, cm, n0) {
    if (!o || !o.im) return;
    o.d.forEach(function (b, i) {
      var y = ((b.y - y0 + t * (0.04 + b.a * 0.1)) % yr + yr) % yr + y0, x = b.x + Math.sin(t * 0.21 + b.a * 31 + y * 0.35) * 0.45, z = b.z + Math.cos(t * 0.17 + b.a * 17 + y * 0.3) * 0.45;
      if (sw) { var sr = Math.sqrt(x * x + z * z), sa = sw * (t * 1.6 + 3 / (sr + 0.4)), cs = Math.cos(sa), sn = Math.sin(sa), k = 1 - 0.58 * sw, nx = (cs * x + sn * z) * k; z = (cs * z - sn * x) * k; x = nx; }
      o.v.set(x, y, z); var f = Math.max(0, Math.min(1, (y - y0) / 0.6, (y0 + yr - y) / 0.6, (o.v.distanceTo(cm.position) - (n0 || 0.6)) / 1.8));
      o.m.position.copy(o.v); o.m.rotation.set(0.3 * Math.sin(b.p), t * b.r + b.p, 0.2); o.m.scale.setScalar(b.s * f); o.m.updateMatrix(); o.im.setMatrixAt(i, o.m.matrix);
    });
    o.im.instanceMatrix.needsUpdate = true;
  }
  function aurora(sc, k) {
    var m = new THREE.ShaderMaterial({ uniforms: { uT: { value: 0 }, uK: { value: k }, uOff: { value: 0 }, uA: { value: 1.6 }, uM: { value: new THREE.Vector2(0.5, 0.5) }, uIn: { value: 0 }, uRp: { value: [new THREE.Vector4(0, 0, -99, 0), new THREE.Vector4(0, 0, -99, 0), new THREE.Vector4(0, 0, -99, 0), new THREE.Vector4(0, 0, -99, 0)] } }, vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.999, 1.0); }", fragmentShader: "uniform float uT; uniform float uK; uniform float uOff; uniform float uA; uniform vec2 uM; uniform float uIn; uniform vec4 uRp[4]; varying vec2 vUv;\nvoid main(){ vec2 p = vUv; float t = uT * 0.05; float rw = 0.0;\n  for (int j = 0; j < 4; j++) { vec4 rp = uRp[j]; float ag = uT - rp.z; vec2 rd = (p - rp.xy) * vec2(uA, 1.0); float rr = length(rd); float wv = sin(rr * 38.0 - ag * 7.0) * exp(-rr * 5.0) * exp(-ag * 1.4) * rp.w * step(0.0, ag); rw += wv; p += rd / max(rr, 0.001) * wv * 0.012; }\n  vec2 md = (vUv - uM) * vec2(uA, 1.0); float spot = exp(-dot(md, md) * 6.0) * uIn; float pull = exp(-md.x * md.x * 4.0) * uIn;\n  p.y += uOff; vec3 col = vec3(0.043, 0.027, 0.035);\n  for (int i = 0; i < 3; i++) { float fi = float(i);\n    float y = p.y + 0.09 * sin(p.x * 2.6 + t * 2.2 + fi * 1.7) + 0.045 * sin(p.x * 6.3 - t * 3.1 + fi * 2.3);\n    float c = 0.68 - fi * 0.15; c = mix(c, uM.y + uOff + (fi - 1.0) * 0.06, pull * 0.45); float d = (y - c) * 9.0; float band = exp(-d * d); float up = smoothstep(c - 0.01, c + 0.04, y) * exp(-max(0.0, y - c) * 6.0);\n    float s = 0.5 + 0.5 * sin(p.x * 46.0 + sin(p.x * 4.0 + t * 3.0 + fi) * 5.0 + fi * 2.0); s = 0.25 + 0.75 * s * s;\n    vec3 pc = i == 0 ? vec3(0.62, 0.05, 0.42) : (i == 1 ? vec3(0.38, 0.1, 0.62) : vec3(0.6, 0.38, 0.12));\n    col += pc * (band * 0.9 + up * 1.1) * s * uK * (1.0 + spot * 1.1 + rw * 0.6); }\n  col += vec3(1.0, 0.35, 0.6) * spot * 0.02;\n  vec2 v = vUv - 0.5; col *= 1.0 - dot(v, v) * 1.2; gl_FragColor = vec4(col, 1.0); }", depthTest: false, depthWrite: false });
    var aq2 = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), m); aq2.frustumCulled = false; aq2.renderOrder = -999; sc.add(aq2); return m;
  }
  qa("video").forEach(function (v) {
    seen(v, function (on) { if (on) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } else v.pause(); });
  });

  qa(".dgn-split").forEach(function (h) {
    var out = [];
    Array.prototype.slice.call(h.childNodes).forEach(function (n) {
      if (n.nodeType === 3) n.textContent.split(/(\s+)/).forEach(function (t) { if (!t) return; if (/^\s+$/.test(t)) out.push(document.createTextNode(" ")); else { var w = document.createElement("span"); w.className = "dgn-w"; var s = document.createElement("span"); s.textContent = t; w.appendChild(s); out.push(w); } });
      else if (n.nodeName === "BR") out.push(n.cloneNode(false));
      else { var w2 = document.createElement("span"); w2.className = "dgn-w"; var s2 = document.createElement("span"); s2.appendChild(n.cloneNode(true)); w2.appendChild(s2); out.push(w2); }
    });
    h.textContent = ""; out.forEach(function (n) { h.appendChild(n); });
    if (!motion) return;
    var inner = qa(".dgn-w > span", h);
    if (h.tagName === "H1") gsap.from(inner, { yPercent: 110, rotate: 4, opacity: 0, filter: "blur(12px)", duration: 1.2, ease: "power4.out", stagger: 0.07, delay: 0.25, clearProps: "filter" });
    else gsap.from(inner, { yPercent: 110, rotate: 4, duration: 1, ease: "power4.out", stagger: 0.05, scrollTrigger: { trigger: h, start: "top 85%" } });
  });

  var intro = q(".dgn-intro");
  var hbg = intro && q(".dgn-hero__bg", intro), himg = hbg && q("img", hbg);
  if (GL && hbg && himg) try { (function () {
    var hc = document.createElement("canvas"); hc.className = "dgn-hero__cv"; hc.setAttribute("aria-hidden", "true"); hbg.insertBefore(hc, hbg.firstChild);
    var hr = new THREE.WebGLRenderer({ canvas: hc, antialias: false, alpha: false, powerPreference: "high-performance" }); hr.setPixelRatio(Math.min(DPR, 1.5)); hr.setClearColor(0x0b0709, 1);
    var hcam = new THREE.Camera(), HU = { uTex: { value: null }, uIA: { value: 1.5 }, uSA: { value: 1 }, uRes: { value: new THREE.Vector2(1, 1) }, uM: { value: new THREE.Vector2(0.5, 0.5) }, uR: { value: 150 }, uOn: { value: 0 }, uF: { value: new THREE.Vector2(0.42, 0.5) }, uP: { value: new THREE.Vector2(0.5, 0.5) }, uZ: { value: 1 }, uTxt: { value: new THREE.Vector4(0, 0, 0, 0) }, uTex2: { value: null }, uHas2: { value: 0 }, uLit: { value: 0 }, uT: { value: 0 }, uTr: { value: [] } }; for (var tri = 0; tri < 12; tri++) HU.uTr.value.push(new THREE.Vector3(0, 0, 0));
    var hm = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.ShaderMaterial({ uniforms: HU, depthTest: false, depthWrite: false,
      vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",
      fragmentShader: "uniform sampler2D uTex; uniform float uIA; uniform float uSA; uniform vec2 uRes; uniform vec2 uM; uniform float uR; uniform float uOn; uniform vec2 uF; uniform vec2 uP; uniform float uZ; uniform vec4 uTxt; uniform sampler2D uTex2; uniform float uHas2; uniform float uLit; uniform float uT; uniform vec3 uTr[12]; varying vec2 vUv;\n" +
        "float dmask(vec2 uv){ vec3 a = texture2D(uTex, uv).rgb, b = texture2D(uTex2, uv).rgb; return smoothstep(0.28, 0.45, length(a - b)); }\n" +
        "float lum2(vec2 uv){ return dot(texture2D(uTex2, uv).rgb, vec3(0.299, 0.587, 0.114)); }\n" +
        "void main(){ vec2 span = (uSA > uIA ? vec2(1.0, uIA / uSA) : vec2(uSA / uIA, 1.0)) / uZ; vec2 f = vec2(uF.x, 1.0 - uF.y); vec2 p = vec2(uP.x, 1.0 - uP.y);\n" +
        "  vec2 c = f - (p - 0.5) * span; c = clamp(c, span * 0.5, 1.0 - span * 0.5); vec2 iuv = c + (vUv - 0.5) * span;\n" +
        "  vec3 src = texture2D(uTex, iuv).rgb; src = (src - 0.5) * 1.08 + 0.5; src = clamp(src, 0.0, 1.0);\n" +
        "  vec3 src2 = texture2D(uTex2, iuv).rgb; src2 = clamp((src2 - 0.5) * 1.08 + 0.5, 0.0, 1.0);\n" +
        "  float l = dot(src, vec3(0.299, 0.587, 0.114)); l = smoothstep(0.02, 0.92, l);\n" +
        "  vec3 duo = mix(vec3(0.05, 0.012, 0.035), vec3(0.62, 0.1, 0.38), smoothstep(0.0, 0.6, l)); duo = mix(duo, vec3(1.0, 0.72, 0.86), smoothstep(0.6, 1.0, l)); duo *= 0.78;\n" +
        "  vec2 sg = (iuv - vec2(0.405, 0.51)) * vec2(1.0, 2.6); duo += vec3(1.0, 0.24, 0.62) * exp(-dot(sg, sg) * 38.0) * 0.32; src += src * exp(-dot(sg, sg) * 38.0) * 0.0;\n" +
        "  vec2 px = vUv * uRes; vec2 mp = uM * uRes; float d = length(px - mp); float rr = uR;\n" +
        "  float beam = exp(-pow(d / rr, 2.0) * 1.6) * uOn; float core = exp(-pow(d / (rr * 0.45), 2.0)) * uOn; float rev = beam;\n" +
        "  float trl = 0.0; for (int i = 0; i < 12; i++) { vec2 tp = uTr[i].xy * uRes; trl = max(trl, exp(-pow(length(px - tp) / rr, 2.0) * 1.6) * uTr[i].z); }\n  float lightK = max(beam, trl * 0.55); float pk = smoothstep(0.0, 0.22, lightK) * uHas2;\n" +
        "  float inT = step(uTxt.x, px.x) * step(px.x, uTxt.z) * step(uTxt.y, px.y) * step(px.y, uTxt.w); rev *= 1.0 - 0.0 * inT;\n" +
        "  vec3 img = mix(src, src2, pk); vec3 dark = mix(src * 0.07 + vec3(0.012, 0.004, 0.01), src * mix(vec3(1.0), vec3(1.04, 0.99, 0.94), 0.6) * 0.92, uLit); vec3 lit = img * (1.05 + 0.35 * core) * mix(vec3(1.0), vec3(1.06, 0.98, 0.92), core);\n  vec3 col = mix(dark, lit, lightK); col += vec3(1.0, 0.9, 0.8) * exp(-pow(d / (rr * 2.6), 2.0)) * uOn * 0.04;\n" +
        
        
        "  vec2 tp = span / max(uRes, vec2(1.0)) * 2.0; vec2 ox = vec2(tp.x, 0.0), oy = vec2(0.0, tp.y);\n" +
        "  float m0 = dmask(iuv); float sil = abs(dmask(iuv + ox) - dmask(iuv - ox)) + abs(dmask(iuv + oy) - dmask(iuv - oy));\n" +
        "  float det = (abs(lum2(iuv + ox) - lum2(iuv - ox)) + abs(lum2(iuv + oy) - lum2(iuv - oy))) * m0;\n" +
        "  float edge = clamp(sil * 0.85 + smoothstep(0.08, 0.26, det) * 0.4, 0.0, 1.0) * uHas2 * (1.0 - smoothstep(0.05, 0.5, lightK));\n" +
        "  float br = 0.62 + 0.38 * sin(uT * 1.6 + iuv.x * 7.0 - iuv.y * 3.0); float sweep = exp(-pow((fract(uT * 0.09) * 1.6 - 0.3 - iuv.x) * 9.0, 2.0));\n" +
        "  vec3 ink = vec3(1.0, 0.16, 0.6); col += ink * edge * (0.3 + 0.42 * sweep) * br * (1.0 - uLit * 0.5); col = mix(col, ink * 0.85, edge * uLit * 0.26 * (0.7 + 0.3 * br));\n" +
        "  gl_FragColor = vec4(col, 1.0); }" }));
    var hs = new THREE.Scene(); hs.add(hm);
    new THREE.TextureLoader().load(himg.currentSrc || himg.getAttribute("src"), function (tx) { tx.minFilter = THREE.LinearFilter; tx.generateMipmaps = false; HU.uTex.value = tx; HU.uIA.value = tx.image.width / Math.max(1, tx.image.height); hbg.classList.add("gl"); sw.classList.add("dgn-rdy"); });
    new THREE.TextureLoader().load(DGN_M + "hero/office-team.webp", function (t2) { t2.minFilter = THREE.LinearFilter; t2.generateMipmaps = false; HU.uTex2.value = t2; HU.uHas2.value = 1; });
    var HALL = [{ cx: 250, cy: 700 }, { cx: 520, cy: 720 }, { cx: 960, cy: 720 }, { cx: 1150, cy: 560 }, { cx: 1285, cy: 560 }, { cx: 1570, cy: 520 }, { cx: 1480, cy: 740 }];
    var sw = document.createElement("button"); sw.type = "button"; sw.className = "dgn-hero__sw"; sw.setAttribute("aria-pressed", "false"); sw.setAttribute("aria-label", "Ανάψτε τα φώτα του γραφείου"); sw.classList.add("dgn-nudge");
    sw.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.7.55 1.1 1.3 1.1 2.2h5c0-.9.4-1.65 1.1-2.2A6 6 0 0 0 12 3z"/></svg>';
    intro.appendChild(sw);
    sw.addEventListener("click", function () {
      var lit = sw.getAttribute("aria-pressed") !== "true"; sw.setAttribute("aria-pressed", lit ? "true" : "false"); sw.setAttribute("aria-label", lit ? "Σβήστε τα φώτα του γραφείου" : "Ανάψτε τα φώτα του γραφείου"); intro.classList.toggle("dgn-lit", lit); sw.classList.toggle("dgn-nudge", !lit);
      if (G) { gsap.killTweensOf(HU.uLit); gsap.to(HU.uLit, { value: lit ? 1 : 0, duration: lit ? 0.7 : 0.5, ease: lit ? "power2.out" : "power2.in" }); } else HU.uLit.value = lit ? 1 : 0;
    });
    function imgToScr(ix, iy) { var IA = HU.uIA.value, SA = HU.uSA.value, Z = HU.uZ.value, sx = (SA > IA ? 1 : SA / IA) / Z, sy = (SA > IA ? IA / SA : 1) / Z, fx = HU.uF.value.x, fy = 1 - HU.uF.value.y, ppx = HU.uP.value.x, ppy = 1 - HU.uP.value.y, cx = Math.min(1 - sx / 2, Math.max(sx / 2, fx - (ppx - 0.5) * sx)), cy = Math.min(1 - sy / 2, Math.max(sy / 2, fy - (ppy - 0.5) * sy)), u = ix / 2000, v = 1 - iy / 1116; return { x: ((u - cx) / sx + 0.5) * hW, y: (1 - ((v - cy) / sy + 0.5)) * hH }; }
    var trail = [], lastPush = 0;
    function hextra(now) {
      if (now - lastPush > 60) { lastPush = now; trail.unshift({ x: cur.x, y: cur.y, t: now, o: on }); if (trail.length > 12) trail.pop(); }
      for (var ti = 0; ti < 12; ti++) { var tr = trail[ti]; if (tr) { var ag = (now - tr.t) / 1200; HU.uTr.value[ti].set(tr.x, tr.y, tr.o * Math.pow(Math.max(0, 1 - ag), 1.5)); } else HU.uTr.value[ti].set(0, 0, 0); }
    }    var hW = 1, hH = 1, mobile = false, h1 = q("h1", intro);
    function hsize() {
      hW = hbg.clientWidth; hH = hbg.clientHeight; hr.setSize(hW, hH, false); HU.uSA.value = hW / Math.max(1, hH); hr.getDrawingBufferSize(HU.uRes.value);
      mobile = window.innerWidth < 1034; var k = HU.uRes.value.x / Math.max(1, hW);
      HU.uR.value = (mobile ? 150 : Math.max(170, Math.min(260, hW * 0.15))) * k;
      HU.uZ.value = 1; HU.uP.value.set(0.5, 0.5); HU.uF.value.set(mobile ? 0.2 : 0.5, 0.5);
      if (h1) { var hb = hbg.getBoundingClientRect(), r = h1.getBoundingClientRect(); HU.uTxt.value.set((r.left - hb.left) * k, (hb.bottom - r.bottom) * k, (r.right - hb.left) * k, (hb.bottom - r.top) * k); }
    }
    hsize(); window.addEventListener("resize", hsize); setTimeout(hsize, 1800);
    var tgt = new THREE.Vector2(0.5, 0.5), cur = new THREE.Vector2(0.5, 0.5), act = false, last = -9, on = 0, t0 = performance.now(), hon = false, gWas = false, gK = -1, gT = 0, gS = { x: 0, y: 0 };
    window.addEventListener("pointermove", function (e) { var b = hbg.getBoundingClientRect(); if (e.clientY > b.bottom || e.clientY < b.top) { act = false; return; } tgt.set((e.clientX - b.left) / b.width, 1 - (e.clientY - b.top) / b.height); if (!act) cur.copy(tgt); act = true; last = performance.now(); }, { passive: true });
    document.addEventListener("pointerleave", function () { act = false; });
    function hframe(now) {
      if (!hon) return; var t = (now - t0) / 1000;
      
      HU.uT.value = t; var ghost = !mobile && motion && HU.uHas2.value > 0 && (!act || now - last > 2200);
      if (mobile && !(act && now - last < 2500)) tgt.set(0.5 + 0.28 * Math.sin(t * 0.32), 0.44 + 0.1 * Math.sin(t * 0.47 + 1.3));
      if (ghost) { if (!gWas) { gK = -1; gT = 0; } if (now > gT) { var tries = 0; do { gK = (gK + 1) % HALL.length; var gp = imgToScr(HALL[gK].cx, HALL[gK].cy); tries++; } while ((gp.x < hW * 0.06 || gp.x > hW * 0.94 || gp.y < hH * 0.22 || gp.y > hH * 0.94) && tries < HALL.length); gT = now + 2600; gS = gp; } var wob = Math.min(1, (gT - now) / 2600); tgt.set((gS.x + Math.sin(t * 1.3) * 26 * wob) / hW, 1 - (gS.y + Math.cos(t * 1.1) * 18 * wob) / hH); }
      gWas = ghost;
      cur.lerp(tgt, ghost ? 0.035 : 0.07); HU.uM.value.copy(cur); hextra(now);
      on += (((act || mobile || ghost) ? 1 : 0) - on) * (act || mobile || ghost ? 0.08 : 0.035); HU.uOn.value = on;
      if (HU.uTex.value) hr.render(hs, hcam);
      requestAnimationFrame(hframe);
    }
    seen(intro, function (v) { hon = v; if (v) { hsize(); requestAnimationFrame(hframe); } });
    if (G && window.ScrollTrigger && motion) gsap.to(hbg, { yPercent: -5, ease: "none", scrollTrigger: { trigger: intro, start: "top top", end: function () { return "+=" + window.innerHeight; }, scrub: true } });
  })(); } catch (e) { dbg(e); }
  var CIRC = "float cH1(float n){ return fract(sin(n * 127.1) * 43758.5453); }\nfloat cH2(vec2 p){ return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453); }\nvec3 circ(vec2 p, float t){ vec2 id = floor(p), f = fract(p);\n  float oy = 0.5 + (cH1(id.y * 7.1 + 1.3) - 0.5) * 0.5, ox = 0.5 + (cH1(id.x * 5.3 + 2.9) - 0.5) * 0.5;\n  float hr = step(0.42, cH1(id.y * 1.37 + 4.1)) * step(0.3, cH2(id + 3.1)), vr = step(0.55, cH1(id.x * 2.71 + 9.2)) * step(0.4, cH2(id + 7.7));\n  float dh = abs(f.y - oy), dv = abs(f.x - ox);\n  float lh = hr * (1.0 - smoothstep(0.018, 0.045, dh)), lv = vr * (1.0 - smoothstep(0.018, 0.045, dv));\n  float gh = hr * exp(-dh * 22.0), gv = vr * exp(-dv * 22.0);\n  float pk = step(0.62, cH2(id + 1.3)) * max(hr, vr), pd = length(f - vec2(ox, oy));\n  float pad = pk * (1.0 - smoothstep(0.06, 0.09, pd)), ring = pk * (1.0 - smoothstep(0.0, 0.02, abs(pd - 0.13)));\n  float px = fract(p.x * 0.07 - t * 0.22 + cH1(id.y * 3.3) * 5.0), py = fract(p.y * 0.07 - t * 0.18 + cH1(id.x * 4.7) * 5.0);\n  float pu = lh * exp(-pow((px - 0.5) * 26.0, 2.0)) + lv * exp(-pow((py - 0.5) * 26.0, 2.0));\n  return vec3(max(max(lh, lv), max(pad * 0.9, ring)), max(gh, gv), pu); }\n";
  var ENVC = "vec3 envC(vec3 r){ float y = r.y; vec3 sky = mix(vec3(0.78, 0.74, 0.8), vec3(1.0, 0.99, 1.0), smoothstep(0.05, 0.75, y)); vec3 gnd = mix(vec3(0.05, 0.025, 0.04), vec3(0.75, 0.16, 0.45), smoothstep(-0.85, -0.04, y)); vec3 c = mix(gnd, sky, smoothstep(-0.015, 0.015, y)); c *= 1.0 - 0.85 * exp(-pow((y - 0.01) * 26.0, 2.0)); c += pow(max(0.0, dot(r, normalize(vec3(-0.45, 0.65, 0.6)))), 36.0) * 1.4; c += vec3(1.0, 0.35, 0.72) * pow(max(0.0, dot(r, normalize(vec3(0.7, -0.25, 0.65)))), 6.0) * 0.35; return c; }\n";
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

  var tun = q(".dgn-tun");
  if (tun && GL) try { (function () {
    var tcv = q("canvas", tun), tr = new THREE.WebGLRenderer({ canvas: tcv, antialias: true, powerPreference: "high-performance" });
    tr.setPixelRatio(Math.min(DPR, 1.5)); tr.setClearColor(0x0b0709, 1);
    var ts = new THREE.Scene(), tc = new THREE.PerspectiveCamera(68, 1, 0.05, 120), TFOG = new THREE.Color(0x0b0709);
    tc.up.set(0, 0, -1);
    var STOPS = [-10, -20, -30, -40, -50], PS = [0.2, 0.35, 0.5, 0.65, 0.8], items = qa(".dgn-tun__it", tun), intro = q(".dgn-tun__intro", tun), veil = q(".dgn-tun__veil", tun);
    var tat = document.createElement("canvas"); tat.width = 1920; tat.height = 1280;
    var tctx = tat.getContext("2d"), ttex = new THREE.CanvasTexture(tat);
    var TPAL = ["#2a0016", "#3a0c2a", "#1b0615", "#12061c", "#2c1020", "#20101c"];
    for (var c = 0; c < 16; c++) { var tg2 = tctx.createLinearGradient(0, 0, 480, 320); tg2.addColorStop(0, TPAL[c % 6]); tg2.addColorStop(1, ["#ff0785", "#9e36ff", "#8fa2ff", "#f01eae", "#ce0080", "#c9a36a"][c % 6]); tctx.save(); tctx.translate((c % 4) * 480, Math.floor(c / 4) * 320); tctx.fillStyle = tg2; tctx.fillRect(0, 0, 480, 320); tctx.restore(); }
    ttex.needsUpdate = true;
    var TU = { uAtlas: { value: ttex }, uFog: { value: TFOG }, uStops: { value: STOPS }, uPhase: { value: 0 }, uT: { value: 0 } };
    var tgeo = new THREE.CylinderGeometry(1, 1, 74, lite ? 48 : 72, lite ? 260 : 420, true); tgeo.translate(0, -33, 0);
    var tube = new THREE.Mesh(tgeo, new THREE.ShaderMaterial({ uniforms: TU, vertexShader: "uniform float uPhase; uniform float uStops[5];\nvarying vec2 vC; varying float vD; varying float vY; varying float vFl; varying float vFace;\nvoid main(){ float th = uv.x * 6.2831853; float y = position.y; float w = 0.0;\n  for (int i = 0; i < 5; i++) { float dy = y - uStops[i]; w += exp(-dy * dy * 0.08); }\n  float F = 4.0, K = 0.55; float a = F * th + y * K + uPhase; float fl = 0.5 + 0.5 * cos(a);\n  float r = 3.0 * (1.0 + 0.35 * w) + 0.22 * (fl - 0.5);\n  vec4 mv = modelViewMatrix * vec4(sin(th) * r, y, cos(th) * r, 1.0);\n  vec3 n = normalize(normalMatrix * vec3(-sin(th), 0.0, -cos(th)));\n  vD = -mv.z; vY = y; vFl = fl; vFace = abs(dot(n, normalize(-mv.xyz)));\n  vC = vec2((a / F) / 6.2831853 * 18.0, y * 1.35);\n  gl_Position = projectionMatrix * mv; }", fragmentShader: "uniform vec3 uFog; uniform float uStops[5]; uniform float uT;\nvarying vec2 vC; varying float vD; varying float vY; varying float vFl; varying float vFace;\nfloat h21(vec2 p){ return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453); }\n" + CIRC + "void main(){ vec3 cc = circ(vec2(vC.x * 1.3333333, vC.y), uT);\n  float glow = 0.0; for (int i = 0; i < 5; i++) { float dy = vY - uStops[i]; glow += exp(-dy * dy * 0.22); }\n  vec3 col = vec3(0.016, 0.01, 0.016) * (0.6 + 0.4 * vFl) + vec3(0.3, 0.06, 0.2) * pow(1.0 - vFace, 2.5) * 0.25;\n  col += (vec3(0.561, 0.004, 0.365) * 1.8 * (cc.x + cc.y * 0.35) + vec3(1.0, 0.6, 0.85) * cc.z * 1.2) * (0.75 + 0.25 * vFace) * (1.0 + glow * 0.6) + vec3(1.0, 0.72, 0.45) * glow * 0.04;\n  float fg = 1.0 - exp(-vD * vD * 0.0024);\n  gl_FragColor = vec4(mix(col, uFog, clamp(fg, 0.0, 1.0)), 1.0); }", side: THREE.DoubleSide, extensions: { derivatives: true } }));
    tube.frustumCulled = false;
    var tw = new THREE.Group(); tw.add(tube); ts.add(tw);
    var VSU = "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }", rings = [];
    STOPS.forEach(function (y) {
      var rm = new THREE.ShaderMaterial({ uniforms: { uI: { value: 1 }, uCol: { value: new THREE.Color(1.0, 0.62, 0.5) } }, vertexShader: VSU, fragmentShader: "uniform float uI; uniform vec3 uCol; varying vec2 vUv;\nvoid main(){ float r = length(vUv - 0.5) * 2.0; float a = exp(-pow((r - 0.66) * 9.0, 2.0)) * 0.9 + exp(-r * 3.2) * 0.06;\n  gl_FragColor = vec4(uCol * a * uI, 1.0); }", transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
      var rp = new THREE.Mesh(new THREE.PlaneGeometry(8.6, 8.6), rm); rp.rotation.x = -Math.PI / 2; rp.position.y = y; ts.add(rp); rings.push(rm);
    });
    var xm = new THREE.ShaderMaterial({ uniforms: { uI: { value: 0 } }, vertexShader: VSU, fragmentShader: "uniform float uI; varying vec2 vUv;\nvoid main(){ float r = length(vUv - 0.5) * 2.0; float a = pow(max(0.0, 1.0 - r), 1.6);\n  gl_FragColor = vec4(vec3(1.0, 0.86, 0.72) * a * uI, 1.0); }", transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
    var xp = new THREE.Mesh(new THREE.PlaneGeometry(9, 9), xm); xp.rotation.x = -Math.PI / 2; xp.position.y = -61; ts.add(xp);
    var TDN = lite ? 400 : 180, tdp = new Float32Array(TDN * 3), tds = new Float32Array(TDN), tdc = new Float32Array(TDN * 3), TDC = [[1, 0.78, 0.42], [1, 0.88, 0.62], [1, 0.7, 0.36], [0.74, 0.9, 0.5], [1, 0.5, 0.72]];
    for (var d = 0; d < TDN; d++) { var rr = Math.pow(Math.random(), 0.6) * 2.6, an = Math.random() * Math.PI * 2; tdp.set([Math.sin(an) * rr, 8 - Math.random() * 72, Math.cos(an) * rr], d * 3); tds[d] = Math.random(); tdc.set(TDC[d % 5], d * 3); }
    var tdg = new THREE.BufferGeometry(); tdg.setAttribute("position", new THREE.BufferAttribute(tdp, 3)); tdg.setAttribute("aS", new THREE.BufferAttribute(tds, 1)); tdg.setAttribute("aC", new THREE.BufferAttribute(tdc, 3));
    var tdm = new THREE.ShaderMaterial({ uniforms: { uTime: { value: 0 }, uPR: { value: 1 }, uFocus: { value: 4 } }, vertexShader: "attribute float aS; attribute vec3 aC; uniform float uTime; uniform float uPR; uniform float uFocus; uniform float uSwirl; varying vec3 vC; varying float vA; varying float vB;\nvoid main(){ vec3 p = position; float t = uTime;\n  p.y = mod(p.y + 64.0 + t * (0.05 + aS * 0.12), 72.0) - 64.0;\n  p.x += sin(t * 0.21 + aS * 31.0 + p.y * 0.35) * 0.45; p.z += cos(t * 0.17 + aS * 17.0 + p.y * 0.3) * 0.45;\n  float sr = length(p.xz), sa = uSwirl * (t * 1.6 + 3.0 / (sr + 0.4)), cs = cos(sa), sn = sin(sa);\n  p.xz = mat2(cs, -sn, sn, cs) * p.xz * mix(1.0, 0.42, uSwirl);\n  vec4 mv = modelViewMatrix * vec4(p, 1.0); float d = max(0.3, -mv.z);\n  float coc = clamp(abs(d - uFocus) / d * 2.2, 0.0, 1.0);\n  float core = (2.0 + aS * aS * 4.5) * (14.0 / d);\n  float sz = core + coc * (8.0 + aS * 30.0) * (9.0 / d + 0.3);\n  gl_PointSize = clamp(uPR * sz, 1.0, 96.0);\n  float tw = 0.55 + 0.45 * sin(t * (0.6 + aS * 1.6) + aS * 40.0);\n  vA = tw * mix(1.0, 0.12 + 0.18 * aS, smoothstep(0.0, 0.7, coc)) * smoothstep(48.0, 14.0, d) * smoothstep(0.4, 2.2, d);\n  vA = clamp(vA, 0.0, 1.0); vB = coc; vC = aC;\n  gl_Position = projectionMatrix * mv; }", fragmentShader: "varying vec3 vC; varying float vA; varying float vB;\nvoid main(){ float r = length(gl_PointCoord - 0.5) * 2.0; if (r > 1.0) discard;\n  float sharp = exp(-r * r * 9.0) + exp(-r * r * 60.0) * 0.8;\n  float disc = smoothstep(1.0, 0.8, r) * (0.72 + 0.28 * smoothstep(0.5, 0.92, r));\n  float a = mix(sharp, disc, smoothstep(0.15, 0.6, vB));\n  gl_FragColor = vec4(vC * a * vA * 1.4, 1.0); }", transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
    var tdust = new THREE.Points(tdg, tdm); tdust.frustumCulled = false;
    var tOrb = lite ? null : orbs(ts, 40, function () { var a = Math.random() * 6.283, r = Math.pow(Math.random(), 0.6) * 2.4; return [Math.sin(a) * r, 8 - Math.random() * 72, Math.cos(a) * r]; }, 0.06, 0.12);
    var CY = [[0, 9], [0.1, 1.5]];
    STOPS.forEach(function (y, i) { CY.push([PS[i] - 0.045, y + 5.2]); CY.push([PS[i] + 0.045, y + 3.4]); });
    CY.push([0.88, -48.5]); CY.push([0.97, -58.6]); CY.push([1, -59]);
    var tp = { t: 0, c: 0 }, tmx = 0, tmy = 0, tsx = 0, tsy = 0, act = -2, introOff = null, tt0 = performance.now();
    function tframe(t, p) {
      if (DJ.ptClear && DJ.tunST && window.scrollY >= DJ.tunST.start - 1) DJ.ptClear();
      tsx += (tmx - tsx) * 0.05; tsy += (tmy - tsy) * 0.05;
      var y = kv(CY, p), inside = Math.max(0, Math.min(1, (6 - y) / 4));
      tc.position.set(tsx * 0.5 * inside, y, tsy * 0.5 * inside);
      tc.lookAt(-tsx * 1.6 * inside, y - 10, -tsy * 1.6 * inside);
      tw.rotation.y = t * 0.12 + p * 5; TU.uPhase.value = t * 0.4; TU.uT.value = t;
      var near = -1;
      rings.forEach(function (rm, i) { var dd = Math.abs(p - PS[i]); rm.uniforms.uI.value = 0.3 + 1.1 * Math.max(0, 1 - dd / 0.08); if (dd < 0.065) near = i; });
      xm.uniforms.uI.value = Math.max(0, Math.min(1, (p - 0.84) / 0.13)) * 2.4;
      tdm.uniforms.uTime.value = t; orbTick(tOrb, t, -64, 72, 0, tc);
      if (!lite) {
        if (near !== act) { act = near; items.forEach(function (it, i) { it.classList.toggle("on", i === near); }); }
        var io = p > 0.07; if (io !== introOff) { introOff = io; intro.classList.toggle("off", io); }
        veil.style.opacity = Math.max(0, Math.min(1, (p - 0.93) / 0.065)).toFixed(3);
      }
      tr.render(ts, tc);
    }
    function tsize() { var w = tun.clientWidth, h = tun.clientHeight; tr.setSize(w, h, false); tc.aspect = w / Math.max(1, h); tc.updateProjectionMatrix(); tdm.uniforms.uPR.value = Math.min(DPR, 1.5) * h / 900; }
    var tredraw = function () {};
    var timgs = SRC.filter(function (s) { return !s.v; });
    function tload() {
      timgs.forEach(function (s, si) {
        var im = new Image(); im.crossOrigin = "anonymous"; im.decoding = "async";
        im.onload = function () { try { for (var c = 0; c < 16; c++) if (c % timgs.length === si) { var sc = Math.max(480 / im.naturalWidth, 320 / im.naturalHeight), sw = 480 / sc, sh = 320 / sc; tctx.drawImage(im, (im.naturalWidth - sw) / 2, (im.naturalHeight - sh) / 2, sw, sh, (c % 4) * 480, Math.floor(c / 4) * 320, 480, 320); } ttex.needsUpdate = true; tredraw(); } catch (e) {} };
        im.src = s.u;
      });
    }
    if (lite || still || !G) {
      tsize(); tredraw = function () { tframe(2, 0.3); }; tredraw();
      setTimeout(tload, 900);
      window.addEventListener("resize", function () { tsize(); tredraw(); });
      return;
    }
    tun.classList.add("dgn-tgl");
    tsize(); setTimeout(tload, 1400);
    window.addEventListener("resize", tsize);
    tun.addEventListener("pointermove", function (e) { var b = tun.getBoundingClientRect(); tmx = (e.clientX - b.left) / b.width * 2 - 1; tmy = (e.clientY - b.top) / b.height * 2 - 1; });
    tun.addEventListener("pointerleave", function () { tmx = 0; tmy = 0; });
    DJ.tunST = ScrollTrigger.create({ trigger: tun, start: "top top", end: function () { return "+=" + Math.round(window.innerHeight * 5); }, pin: true, onUpdate: function (s) { tp.t = s.progress; } });
    var ton = false, tbad = false;
    function tloop(now) { if (!ton) return; tp.c += (tp.t - tp.c) * 0.08; if (!tbad) { try { tframe((now - tt0) / 1000, tp.c); } catch (e) { tbad = true; dbg(e); } } requestAnimationFrame(tloop); }
    seen(tun, function (v) { ton = v; if (v) requestAnimationFrame(tloop); });
  })(); } catch (e) { dbg(e); }

  if (GL && heavy) try { (function () {
    var dcv = document.createElement("canvas"); dcv.className = "dgn-dcv"; dcv.setAttribute("aria-hidden", "true"); root.appendChild(dcv);
    var dr = new THREE.WebGLRenderer({ canvas: dcv, antialias: true, alpha: true }); dr.setPixelRatio(Math.min(DPR, 1.5)); dr.setClearColor(0x000000, 0);
    var dsc = new THREE.Scene(), dcam = new THREE.PerspectiveCamera(30, 1, 0.1, 100); dcam.position.set(0, 0, 10);
    if (THREE.RoomEnvironment) { try { dsc.environment = new THREE.PMREMGenerator(dr).fromScene(new THREE.RoomEnvironment(), 0.04).texture; } catch (e) {} }
    dsc.add(new THREE.AmbientLight(0xffffff, 0.12)); var dl = new THREE.DirectionalLight(0xffffff, 1.1); dl.position.set(3, 4, 6); dsc.add(dl); var dl2 = new THREE.PointLight(0xff4fb0, 1.2, 30); dl2.position.set(-4, -2, 4); dsc.add(dl2);
    var DOUT = [[0.8643,0.7633],[0.8589,0.7726],[0.8534,0.7818],[0.8478,0.7907],[0.8419,0.7995],[0.8359,0.8081],[0.8297,0.8165],[0.8233,0.8247],[0.8167,0.8328],[0.81,0.8407],[0.8031,0.8484],[0.796,0.856],[0.7887,0.8633],[0.7813,0.8705],[0.7736,0.8775],[0.7658,0.8844],[0.7579,0.891],[0.7497,0.8975],[0.7414,0.9038],[0.7329,0.91],[0.7242,0.9159],[0.7153,0.9217],[0.7063,0.9273],[0.6971,0.9328],[0.6877,0.938],[0.6781,0.9431],[0.6685,0.9479],[0.6587,0.9525],[0.6487,0.9569],[0.6387,0.9611],[0.6285,0.9651],[0.6182,0.9689],[0.6077,0.9724],[0.5972,0.9758],[0.5865,0.9789],[0.5757,0.9818],[0.5647,0.9845],[0.5536,0.987],[0.5424,0.9892],[0.5311,0.9913],[0.5196,0.9931],[0.508,0.9947],[0.4963,0.9961],[0.4845,0.9973],[0.4725,0.9983],[0.4604,0.999],[0.4482,0.9996],[0.4358,0.9999],[0.4234,1],[0,1],[0,0.2453],[0.2332,0.2453],[0.2332,0.7547],[0.4415,0.7547],[0.4478,0.7546],[0.454,0.7544],[0.4601,0.7542],[0.4662,0.7538],[0.4722,0.7533],[0.4782,0.7527],[0.484,0.752],[0.4898,0.7512],[0.4956,0.7503],[0.5012,0.7492],[0.5068,0.7481],[0.5124,0.7468],[0.5178,0.7455],[0.5232,0.744],[0.5285,0.7424],[0.5338,0.7407],[0.539,0.7389],[0.5441,0.737],[0.5491,0.735],[0.5541,0.7329],[0.559,0.7307],[0.5639,0.7283],[0.5686,0.7259],[0.5734,0.7233],[0.578,0.7207],[0.5825,0.7179],[0.587,0.7151],[0.5913,0.7122],[0.5956,0.7092],[0.5998,0.7061],[0.6039,0.7029],[0.6079,0.6996],[0.6118,0.6963],[0.6156,0.6928],[0.6194,0.6893],[0.623,0.6857],[0.6266,0.682],[0.6301,0.6782],[0.6334,0.6743],[0.6367,0.6703],[0.64,0.6662],[0.6431,0.6621],[0.6461,0.6578],[0.6491,0.6535],[0.6519,0.6491],[0.6547,0.6446],[0.6574,0.64],[0.6599,0.6353],[0.6624,0.6306],[0.6648,0.6257],[0.6671,0.6208],[0.6693,0.6158],[0.6714,0.6108],[0.6733,0.6056],[0.6752,0.6004],[0.6769,0.5951],[0.6786,0.5897],[0.6801,0.5843],[0.6815,0.5788],[0.6829,0.5732],[0.6841,0.5675],[0.6852,0.5617],[0.6862,0.5559],[0.6871,0.55],[0.6879,0.544],[0.6886,0.5379],[0.6892,0.5318],[0.6897,0.5256],[0.69,0.5193],[0.6903,0.5129],[0.6905,0.5065],[0.6905,0.5],[0.6905,0.4935],[0.6903,0.4871],[0.69,0.4807],[0.6897,0.4745],[0.6892,0.4683],[0.6886,0.4622],[0.6879,0.4562],[0.6871,0.4503],[0.6862,0.4444],[0.6852,0.4386],[0.6841,0.4329],[0.6829,0.4273],[0.6815,0.4218],[0.6801,0.4163],[0.6786,0.4109],[0.6769,0.4056],[0.6752,0.4003],[0.6733,0.3951],[0.6714,0.39],[0.6693,0.3849],[0.6671,0.3799],[0.6648,0.375],[0.6624,0.3701],[0.6599,0.3653],[0.6574,0.3606],[0.6547,0.3559],[0.6519,0.3514],[0.6491,0.3469],[0.6461,0.3426],[0.6431,0.3383],[0.64,0.3341],[0.6367,0.33],[0.6334,0.326],[0.6301,0.3221],[0.6266,0.3182],[0.623,0.3145],[0.6194,0.3108],[0.6156,0.3073],[0.6118,0.3038],[0.6079,0.3004],[0.6039,0.2971],[0.5998,0.2939],[0.5956,0.2908],[0.5913,0.2878],[0.587,0.2849],[0.5825,0.2821],[0.578,0.2793],[0.5734,0.2767],[0.5686,0.2741],[0.5639,0.2717],[0.559,0.2693],[0.5541,0.2671],[0.5491,0.265],[0.5441,0.2629],[0.539,0.261],[0.5338,0.2592],[0.5285,0.2576],[0.5232,0.256],[0.5178,0.2545],[0.5124,0.2532],[0.5068,0.2519],[0.5012,0.2508],[0.4956,0.2497],[0.4898,0.2488],[0.484,0.248],[0.4782,0.2473],[0.4722,0.2467],[0.4662,0.2462],[0.4601,0.2458],[0.454,0.2455],[0.4478,0.2454],[0.4415,0.2453],[0.2332,0.2453],[0.2286,0.2378],[0.2237,0.2301],[0.2187,0.2223],[0.2136,0.2144],[0.2082,0.2065],[0.2026,0.1984],[0.1968,0.1903],[0.1908,0.1821],[0.1846,0.1739],[0.1783,0.1656],[0.1716,0.1573],[0.1648,0.1489],[0.1578,0.1405],[0.1505,0.1321],[0.143,0.1237],[0.1353,0.1153],[0.1274,0.1069],[0.1192,0.0985],[0.1108,0.0901],[0.1021,0.0817],[0.0932,0.0734],[0.0841,0.0651],[0.0747,0.0568],[0.065,0.0486],[0.0622,0.0463],[0.0595,0.0441],[0.0568,0.0418],[0.054,0.0396],[0.0513,0.0374],[0.0485,0.0353],[0.0458,0.0331],[0.0431,0.031],[0.0403,0.0289],[0.0376,0.0268],[0.0349,0.0248],[0.0322,0.0227],[0.0295,0.0207],[0.0268,0.0187],[0.0241,0.0168],[0.0214,0.0148],[0.0187,0.0129],[0.016,0.011],[0.0133,0.0091],[0.0106,0.0072],[0.008,0.0054],[0.0053,0.0036],[0.0026,0.0018],[0,0],[0.4234,0],[0.4358,0.0001],[0.4482,0.0004],[0.4604,0.001],[0.4725,0.0017],[0.4845,0.0027],[0.4963,0.0039],[0.508,0.0053],[0.5196,0.0069],[0.5311,0.0087],[0.5424,0.0108],[0.5536,0.013],[0.5647,0.0155],[0.5757,0.0182],[0.5865,0.0211],[0.5972,0.0242],[0.6077,0.0276],[0.6182,0.0311],[0.6285,0.0349],[0.6387,0.0389],[0.6487,0.0431],[0.6587,0.0475],[0.6685,0.0521],[0.6781,0.0569],[0.6877,0.062],[0.6971,0.0673],[0.7063,0.0727],[0.7153,0.0783],[0.7242,0.0841],[0.7329,0.09],[0.7414,0.0962],[0.7497,0.1025],[0.7579,0.109],[0.7658,0.1156],[0.7736,0.1225],[0.7813,0.1295],[0.7887,0.1367],[0.796,0.144],[0.8031,0.1516],[0.81,0.1593],[0.8167,0.1672],[0.8233,0.1752],[0.8297,0.1835],[0.8359,0.1919],[0.8419,0.2005],[0.8478,0.2093],[0.8534,0.2182],[0.8589,0.2274],[0.8643,0.2367],[0.8694,0.2461],[0.8743,0.2557],[0.879,0.2654],[0.8835,0.2753],[0.8877,0.2853],[0.8917,0.2954],[0.8956,0.3056],[0.8992,0.316],[0.9025,0.3265],[0.9057,0.3371],[0.9087,0.3479],[0.9114,0.3588],[0.9139,0.3699],[0.9162,0.381],[0.9183,0.3923],[0.9201,0.4038],[0.9217,0.4153],[0.9232,0.427],[0.9244,0.4389],[0.9253,0.4508],[0.9261,0.4629],[0.9267,0.4751],[0.927,0.4875],[0.9271,0.5],[0.927,0.5125],[0.9267,0.5249],[0.9261,0.5371],[0.9253,0.5492],[0.9244,0.5611],[0.9232,0.573],[0.9217,0.5847],[0.9201,0.5962],[0.9183,0.6077],[0.9162,0.619],[0.9139,0.6301],[0.9114,0.6412],[0.9087,0.6521],[0.9057,0.6628],[0.9025,0.6735],[0.8992,0.684],[0.8956,0.6944],[0.8917,0.7046],[0.8877,0.7147],[0.8835,0.7247],[0.879,0.7346],[0.8743,0.7443],[0.8694,0.7539]], DHOLE = [[0.2332,0.7547],[0.4415,0.7547],[0.4478,0.7546],[0.454,0.7544],[0.4601,0.7542],[0.4662,0.7538],[0.4722,0.7533],[0.4782,0.7527],[0.484,0.752],[0.4898,0.7512],[0.4956,0.7503],[0.5012,0.7492],[0.5068,0.7481],[0.5124,0.7468],[0.5178,0.7455],[0.5232,0.744],[0.5285,0.7424],[0.5338,0.7407],[0.539,0.7389],[0.5441,0.737],[0.5491,0.735],[0.5541,0.7329],[0.559,0.7307],[0.5639,0.7283],[0.5686,0.7259],[0.5734,0.7233],[0.578,0.7207],[0.5825,0.7179],[0.587,0.7151],[0.5913,0.7122],[0.5956,0.7092],[0.5998,0.7061],[0.6039,0.7029],[0.6079,0.6996],[0.6118,0.6963],[0.6156,0.6928],[0.6194,0.6893],[0.623,0.6857],[0.6266,0.682],[0.6301,0.6782],[0.6334,0.6743],[0.6367,0.6703],[0.64,0.6662],[0.6431,0.6621],[0.6461,0.6578],[0.6491,0.6535],[0.6519,0.6491],[0.6547,0.6446],[0.6574,0.64],[0.6599,0.6353],[0.6624,0.6306],[0.6648,0.6257],[0.6671,0.6208],[0.6693,0.6158],[0.6714,0.6108],[0.6733,0.6056],[0.6752,0.6004],[0.6769,0.5951],[0.6786,0.5897],[0.6801,0.5843],[0.6815,0.5788],[0.6829,0.5732],[0.6841,0.5675],[0.6852,0.5617],[0.6862,0.5559],[0.6871,0.55],[0.6879,0.544],[0.6886,0.5379],[0.6892,0.5318],[0.6897,0.5256],[0.69,0.5193],[0.6903,0.5129],[0.6905,0.5065],[0.6905,0.5],[0.6905,0.4935],[0.6903,0.4871],[0.69,0.4807],[0.6897,0.4745],[0.6892,0.4683],[0.6886,0.4622],[0.6879,0.4562],[0.6871,0.4503],[0.6862,0.4444],[0.6852,0.4386],[0.6841,0.4329],[0.6829,0.4273],[0.6815,0.4218],[0.6801,0.4163],[0.6786,0.4109],[0.6769,0.4056],[0.6752,0.4003],[0.6733,0.3951],[0.6714,0.39],[0.6693,0.3849],[0.6671,0.3799],[0.6648,0.375],[0.6624,0.3701],[0.6599,0.3653],[0.6574,0.3606],[0.6547,0.3559],[0.6519,0.3514],[0.6491,0.3469],[0.6461,0.3426],[0.6431,0.3383],[0.64,0.3341],[0.6367,0.33],[0.6334,0.326],[0.6301,0.3221],[0.6266,0.3182],[0.623,0.3145],[0.6194,0.3108],[0.6156,0.3073],[0.6118,0.3038],[0.6079,0.3004],[0.6039,0.2971],[0.5998,0.2939],[0.5956,0.2908],[0.5913,0.2878],[0.587,0.2849],[0.5825,0.2821],[0.578,0.2793],[0.5734,0.2767],[0.5686,0.2741],[0.5639,0.2717],[0.559,0.2693],[0.5541,0.2671],[0.5491,0.265],[0.5441,0.2629],[0.539,0.261],[0.5338,0.2592],[0.5285,0.2576],[0.5232,0.256],[0.5178,0.2545],[0.5124,0.2532],[0.5068,0.2519],[0.5012,0.2508],[0.4956,0.2497],[0.4898,0.2488],[0.484,0.248],[0.4782,0.2473],[0.4722,0.2467],[0.4662,0.2462],[0.4601,0.2458],[0.454,0.2455],[0.4478,0.2454],[0.4415,0.2453],[0.2332,0.2453]], DOO = [[0.8643,0.7633],[0.8589,0.7726],[0.8534,0.7818],[0.8478,0.7907],[0.8419,0.7995],[0.8359,0.8081],[0.8297,0.8165],[0.8233,0.8247],[0.8167,0.8328],[0.81,0.8407],[0.8031,0.8484],[0.796,0.856],[0.7887,0.8633],[0.7813,0.8705],[0.7736,0.8775],[0.7658,0.8844],[0.7579,0.891],[0.7497,0.8975],[0.7414,0.9038],[0.7329,0.91],[0.7242,0.9159],[0.7153,0.9217],[0.7063,0.9273],[0.6971,0.9328],[0.6877,0.938],[0.6781,0.9431],[0.6685,0.9479],[0.6587,0.9525],[0.6487,0.9569],[0.6387,0.9611],[0.6285,0.9651],[0.6182,0.9689],[0.6077,0.9724],[0.5972,0.9758],[0.5865,0.9789],[0.5757,0.9818],[0.5647,0.9845],[0.5536,0.987],[0.5424,0.9892],[0.5311,0.9913],[0.5196,0.9931],[0.508,0.9947],[0.4963,0.9961],[0.4845,0.9973],[0.4725,0.9983],[0.4604,0.999],[0.4482,0.9996],[0.4358,0.9999],[0.4234,1],[0,1],[0,0.2453],[0.2332,0.2453],[0.2286,0.2378],[0.2237,0.2301],[0.2187,0.2223],[0.2136,0.2144],[0.2082,0.2065],[0.2026,0.1984],[0.1968,0.1903],[0.1908,0.1821],[0.1846,0.1739],[0.1783,0.1656],[0.1716,0.1573],[0.1648,0.1489],[0.1578,0.1405],[0.1505,0.1321],[0.143,0.1237],[0.1353,0.1153],[0.1274,0.1069],[0.1192,0.0985],[0.1108,0.0901],[0.1021,0.0817],[0.0932,0.0734],[0.0841,0.0651],[0.0747,0.0568],[0.065,0.0486],[0.0622,0.0463],[0.0595,0.0441],[0.0568,0.0418],[0.054,0.0396],[0.0513,0.0374],[0.0485,0.0353],[0.0458,0.0331],[0.0431,0.031],[0.0403,0.0289],[0.0376,0.0268],[0.0349,0.0248],[0.0322,0.0227],[0.0295,0.0207],[0.0268,0.0187],[0.0241,0.0168],[0.0214,0.0148],[0.0187,0.0129],[0.016,0.011],[0.0133,0.0091],[0.0106,0.0072],[0.008,0.0054],[0.0053,0.0036],[0.0026,0.0018],[0,0],[0.4234,0],[0.4358,0.0001],[0.4482,0.0004],[0.4604,0.001],[0.4725,0.0017],[0.4845,0.0027],[0.4963,0.0039],[0.508,0.0053],[0.5196,0.0069],[0.5311,0.0087],[0.5424,0.0108],[0.5536,0.013],[0.5647,0.0155],[0.5757,0.0182],[0.5865,0.0211],[0.5972,0.0242],[0.6077,0.0276],[0.6182,0.0311],[0.6285,0.0349],[0.6387,0.0389],[0.6487,0.0431],[0.6587,0.0475],[0.6685,0.0521],[0.6781,0.0569],[0.6877,0.062],[0.6971,0.0673],[0.7063,0.0727],[0.7153,0.0783],[0.7242,0.0841],[0.7329,0.09],[0.7414,0.0962],[0.7497,0.1025],[0.7579,0.109],[0.7658,0.1156],[0.7736,0.1225],[0.7813,0.1295],[0.7887,0.1367],[0.796,0.144],[0.8031,0.1516],[0.81,0.1593],[0.8167,0.1672],[0.8233,0.1752],[0.8297,0.1835],[0.8359,0.1919],[0.8419,0.2005],[0.8478,0.2093],[0.8534,0.2182],[0.8589,0.2274],[0.8643,0.2367],[0.8694,0.2461],[0.8743,0.2557],[0.879,0.2654],[0.8835,0.2753],[0.8877,0.2853],[0.8917,0.2954],[0.8956,0.3056],[0.8992,0.316],[0.9025,0.3265],[0.9057,0.3371],[0.9087,0.3479],[0.9114,0.3588],[0.9139,0.3699],[0.9162,0.381],[0.9183,0.3923],[0.9201,0.4038],[0.9217,0.4153],[0.9232,0.427],[0.9244,0.4389],[0.9253,0.4508],[0.9261,0.4629],[0.9267,0.4751],[0.927,0.4875],[0.9271,0.5],[0.927,0.5125],[0.9267,0.5249],[0.9261,0.5371],[0.9253,0.5492],[0.9244,0.5611],[0.9232,0.573],[0.9217,0.5847],[0.9201,0.5962],[0.9183,0.6077],[0.9162,0.619],[0.9139,0.6301],[0.9114,0.6412],[0.9087,0.6521],[0.9057,0.6628],[0.9025,0.6735],[0.8992,0.684],[0.8956,0.6944],[0.8917,0.7046],[0.8877,0.7147],[0.8835,0.7247],[0.879,0.7346],[0.8743,0.7443],[0.8694,0.7539]], DHH = [[0.2332,0.7547],[0.4415,0.7547],[0.4478,0.7546],[0.454,0.7544],[0.4601,0.7542],[0.4662,0.7538],[0.4722,0.7533],[0.4782,0.7527],[0.484,0.752],[0.4898,0.7512],[0.4956,0.7503],[0.5012,0.7492],[0.5068,0.7481],[0.5124,0.7468],[0.5178,0.7455],[0.5232,0.744],[0.5285,0.7424],[0.5338,0.7407],[0.539,0.7389],[0.5441,0.737],[0.5491,0.735],[0.5541,0.7329],[0.559,0.7307],[0.5639,0.7283],[0.5686,0.7259],[0.5734,0.7233],[0.578,0.7207],[0.5825,0.7179],[0.587,0.7151],[0.5913,0.7122],[0.5956,0.7092],[0.5998,0.7061],[0.6039,0.7029],[0.6079,0.6996],[0.6118,0.6963],[0.6156,0.6928],[0.6194,0.6893],[0.623,0.6857],[0.6266,0.682],[0.6301,0.6782],[0.6334,0.6743],[0.6367,0.6703],[0.64,0.6662],[0.6431,0.6621],[0.6461,0.6578],[0.6491,0.6535],[0.6519,0.6491],[0.6547,0.6446],[0.6574,0.64],[0.6599,0.6353],[0.6624,0.6306],[0.6648,0.6257],[0.6671,0.6208],[0.6693,0.6158],[0.6714,0.6108],[0.6733,0.6056],[0.6752,0.6004],[0.6769,0.5951],[0.6786,0.5897],[0.6801,0.5843],[0.6815,0.5788],[0.6829,0.5732],[0.6841,0.5675],[0.6852,0.5617],[0.6862,0.5559],[0.6871,0.55],[0.6879,0.544],[0.6886,0.5379],[0.6892,0.5318],[0.6897,0.5256],[0.69,0.5193],[0.6903,0.5129],[0.6905,0.5065],[0.6905,0.5],[0.6905,0.4935],[0.6903,0.4871],[0.69,0.4807],[0.6897,0.4745],[0.6892,0.4683],[0.6886,0.4622],[0.6879,0.4562],[0.6871,0.4503],[0.6862,0.4444],[0.6852,0.4386],[0.6841,0.4329],[0.6829,0.4273],[0.6815,0.4218],[0.6801,0.4163],[0.6786,0.4109],[0.6769,0.4056],[0.6752,0.4003],[0.6733,0.3951],[0.6714,0.39],[0.6693,0.3849],[0.6671,0.3799],[0.6648,0.375],[0.6624,0.3701],[0.6599,0.3653],[0.6574,0.3606],[0.6547,0.3559],[0.6519,0.3514],[0.6491,0.3469],[0.6461,0.3426],[0.6431,0.3383],[0.64,0.3341],[0.6367,0.33],[0.6334,0.326],[0.6301,0.3221],[0.6266,0.3182],[0.623,0.3145],[0.6194,0.3108],[0.6156,0.3073],[0.6118,0.3038],[0.6079,0.3004],[0.6039,0.2971],[0.5998,0.2939],[0.5956,0.2908],[0.5913,0.2878],[0.587,0.2849],[0.5825,0.2821],[0.578,0.2793],[0.5734,0.2767],[0.5686,0.2741],[0.5639,0.2717],[0.559,0.2693],[0.5541,0.2671],[0.5491,0.265],[0.5441,0.2629],[0.539,0.261],[0.5338,0.2592],[0.5285,0.2576],[0.5232,0.256],[0.5178,0.2545],[0.5124,0.2532],[0.5068,0.2519],[0.5012,0.2508],[0.4956,0.2497],[0.4898,0.2488],[0.484,0.248],[0.4782,0.2473],[0.4722,0.2467],[0.4662,0.2462],[0.4601,0.2458],[0.454,0.2455],[0.4478,0.2454],[0.4415,0.2453],[0.2612,0.2453],[0.2568,0.2456],[0.2525,0.2467],[0.2485,0.2484],[0.2447,0.2506],[0.2414,0.2535],[0.2385,0.2568],[0.2363,0.2606],[0.2346,0.2646],[0.2335,0.2689],[0.2332,0.2733]];
    function dInside(px, py, pl) { var c = false; for (var a = 0, b = pl.length - 1; a < pl.length; b = a++) { var xa = pl[a][0], ya = pl[a][1], xb = pl[b][0], yb = pl[b][1]; if ((ya > py) !== (yb > py) && px < (xb - xa) * (py - ya) / (yb - ya) + xa) c = !c; } return c; }
    function dEdge(px, py) { var m = 9; for (var a = 0, b = DOUT.length - 1; a < DOUT.length; b = a++) { var ax = DOUT[b][0], ay = DOUT[b][1], bx = DOUT[a][0], by = DOUT[a][1], vx = bx - ax, vy = by - ay, l2 = vx * vx + vy * vy || 1e-9, k = Math.max(0, Math.min(1, ((px - ax) * vx + (py - ay) * vy) / l2)), dx = px - ax - vx * k, dy = py - ay - vy * k; m = Math.min(m, Math.sqrt(dx * dx + dy * dy)); } return m; }
    var ds = new THREE.Shape(DOO.map(function (p) { return new THREE.Vector2(p[0], p[1]); })); ds.holes.push(new THREE.Path(DHH.map(function (p) { return new THREE.Vector2(p[0], p[1]); })));
    var dgeo = new THREE.ExtrudeGeometry(ds, { depth: 0.3, bevelEnabled: true, bevelThickness: 0.035, bevelSize: 0.009, bevelSegments: 4, curveSegments: 48 }), dof = new THREE.Vector3(); dgeo.computeBoundingBox(); dgeo.boundingBox.getCenter(dof); dgeo.translate(-dof.x, -dof.y, -dof.z); var dzf = dgeo.boundingBox.max.z - dof.z, dpv = new THREE.Vector3(), HOLE = DHOLE.map(function (p) { return [Math.min(0.69, p[0] + (p[0] < 0.3 ? 0.04 : 0)), 0.5 + (p[1] - 0.5) * 0.93]; });
    var dmat = new THREE.MeshPhysicalMaterial({ color: 0xb00c66, roughness: 0.28, metalness: 0.1, clearcoat: 1, clearcoatRoughness: 0.06, sheen: 0.3, sheenColor: new THREE.Color(0xff6fb8), envMapIntensity: 0.75 });
    var DUf = { uCry: { value: 0 }, uHolo: { value: 0 }, uHs: { value: 0 }, uHb: { value: 0 }, uT: { value: 0 }, uInk: { value: 1 }, uWob: { value: 1 }, uFill: { value: 1 }, uSweep: { value: -9 }, uMd: { value: new THREE.Vector3() }, uCirc: { value: 0 }, uChr: { value: 0 } }, DCIRC = typeof CIRC === "string" ? CIRC : "vec3 circ(vec2 p, float t){ return vec3(0.0); }\n";
    dmat.transparent = true;
    dmat.onBeforeCompile = function (sh) {
      Object.keys(DUf).forEach(function (k) { sh.uniforms[k] = DUf[k]; });
      sh.vertexShader = sh.vertexShader.replace("#include <common>", "#include <common>\nuniform float uT; uniform float uWob; uniform vec3 uMd; varying vec3 vLp;").replace("#include <begin_vertex>", "#include <begin_vertex>\n  vLp = position; transformed.x += sin(position.y * 3.0 + uT * 2.2) * 0.04 * uWob; transformed.y += sin(position.x * 3.5 + uT * 1.7) * 0.03 * uWob; transformed += uMd * max(0.0, dot(normalize(position + vec3(0.0001)), normalize(uMd + vec3(0.0001)))) * length(uMd) * 0.12 * uWob;");
      sh.fragmentShader = sh.fragmentShader.replace("#include <common>", "#include <common>\nuniform float uCry; uniform float uCirc; uniform float uChr;\n" + DCIRC + (typeof ENVC === "string" ? ENVC : "vec3 envC(vec3 r){ return vec3(0.8); }\n") + "float dScr(vec2 p, float ang, float dens){ float c = cos(ang), s = sin(ang); p = mat2(c, -s, s, c) * p; vec2 id = floor(p); vec2 f = fract(p); float h = fract(sin(dot(id, vec2(12.9898, 78.233))) * 43758.5453); float on = step(1.0 - dens, h); float l = abs(f.y - 0.5 + (f.x - 0.5) * (h - 0.5) * 0.4); return on * smoothstep(0.0, 0.2, f.x) * (1.0 - smoothstep(0.6, 1.0, f.x)) * (1.0 - smoothstep(0.0, 0.035, l)); }\nuniform float uT; uniform float uInk; uniform float uFill; uniform float uSweep; uniform float uHolo; uniform float uHs; uniform float uHb; varying vec3 vLp;\nvec3 holoP(float h){ h = fract(h) * 3.0; vec3 a = vec3(1.0, 0.03, 0.52); vec3 b = vec3(0.55, 0.15, 1.0); vec3 c = vec3(1.0, 0.72, 0.3); return h < 1.0 ? mix(a, b, h) : (h < 2.0 ? mix(b, c, h - 1.0) : mix(c, a, h - 2.0)); }\nfloat dRip(vec2 q){ return sin(q.x * 9.0 + uT * 1.6 + sin(q.y * 7.0 - uT * 1.3) * 1.5) * sin(q.y * 8.0 - uT * 1.1 + sin(q.x * 6.0 + uT) * 1.2); }").replace("#include <clipping_planes_fragment>", "#include <clipping_planes_fragment>\n  if (vLp.y > mix(-0.62, 0.62, uFill) + 0.035 * sin(vLp.x * 14.0 + uT * 4.0) * (1.0 - step(0.999, uFill))) discard;").replace("#include <color_fragment>", "#include <color_fragment>\n  float sw = dRip(vLp.xy * 0.8 + vec2(0.0, uT * 0.05)); vec3 inkC = mix(vec3(0.32, 0.0, 0.2), vec3(0.95, 0.06, 0.58), 0.5 + 0.5 * sw); inkC = mix(inkC, vec3(0.55, 0.15, 0.85), smoothstep(0.6, 1.0, dRip(vLp.yx * 1.3 - uT * 0.1)) * 0.5); diffuseColor.rgb = mix(diffuseColor.rgb, inkC, uInk); diffuseColor.rgb *= 1.0 - 0.8 * uCirc;").replace("#include <normal_fragment_maps>", "#include <normal_fragment_maps>\n  float re = 0.02; float r0 = dRip(vLp.xy * 3.0); vec2 rg = vec2(dRip(vLp.xy * 3.0 + vec2(re, 0.0)) - r0, dRip(vLp.xy * 3.0 + vec2(0.0, re)) - r0) / re; normal = normalize(normal + vec3(rg * (0.035 * uInk + 0.012 * uHolo), 0.0));\n  float hfv = abs(dot(normal, normalize(vViewPosition))); vec3 hcol = holoP(hfv * 1.6 + vLp.x * 0.8 + vLp.y * 0.6 + uHs + uHb + r0 * 0.08); float hbd = fract(vLp.x * 0.7 + vLp.y * 0.5 - uHs * 0.5) - 0.5; float hsh = exp(-hbd * hbd * 90.0);\n  diffuseColor.rgb = mix(diffuseColor.rgb, hcol * 0.75, uHolo);").replace("#include <emissivemap_fragment>", "#include <emissivemap_fragment>\n  float swb = vLp.x + vLp.y * 0.35 - uSweep; if (uCirc > 0.001) { vec3 cq = circ(vLp.xy * 7.0 + 3.0, uT); totalEmissiveRadiance += (vec3(0.561, 0.004, 0.365) * 1.8 * (cq.x + cq.y * 0.35) + vec3(1.0, 0.6, 0.85) * cq.z * 1.3) * uCirc; }\n  totalEmissiveRadiance += vec3(1.0, 0.78, 0.92) * exp(-swb * swb * 30.0) * 1.3 +(hcol * (0.32 + 0.4 * (1.0 - hfv)) + vec3(1.0, 0.92, 0.97) * hsh * 0.55) * uHolo;").replace("#include <output_fragment>", "outgoingLight = mix(outgoingLight, outgoingLight * 0.26 + totalEmissiveRadiance * 0.75, uCirc);\n  if (uChr > 0.001) { vec3 Vv = normalize(vViewPosition); vec3 rr = reflect(-Vv, normal); rr.y += vLp.y * 1.3; rr = normalize(rr); outgoingLight = mix(outgoingLight, envC(rr) + totalEmissiveRadiance * 0.3, uChr); }\n  if (uCry > 0.001) { vec3 Vc = normalize(vViewPosition); float fdc = abs(dot(normal, Vc)); float frc = pow(1.0 - fdc, 2.0); vec3 rc = reflect(-Vc, normal);\n  float hlc = exp(-pow((rc.x - 0.45) * 6.0, 2.0)) * (0.6 + 0.4 * rc.y) + exp(-pow((rc.y - 0.6) * 5.0, 2.0)) * 0.5 + exp(-pow((rc.x + 0.6) * 9.0, 2.0)) * 0.35;\n  float scc = dScr(vLp.xy * 9.0, 0.5, 0.3) + dScr(vLp.xy * 15.0 + 3.0, -0.9, 0.25);\n  float inr = 0.5 + 0.5 * sin(vLp.x * 7.0 + vLp.y * 5.0 + rc.x * 3.0 + uT * 0.7);\n  vec3 cry = vec3(1.0, 0.55, 0.78) * (0.2 + 0.55 * frc) + vec3(0.95, 0.28, 0.6) * (0.22 + 0.25 * inr) * fdc + vec3(1.0, 0.93, 0.97) * (hlc * 0.6 + scc * 0.45);\n  outgoingLight = mix(outgoingLight, cry, uCry); diffuseColor.a = mix(diffuseColor.a, diffuseColor.a * clamp(0.6 + 0.45 * frc + hlc * 0.3 + scc * 0.2, 0.0, 1.0), uCry); }\n#include <output_fragment>");
    };
    var ptc = document.createElement("canvas"); ptc.width = 512; ptc.height = 512; var ptx = ptc.getContext("2d"), ptex = new THREE.CanvasTexture(ptc), photoOn = false, flipK = 0, sweepT = -1, sweepF = 0;
    ptx.fillStyle = "#2a1020"; ptx.fillRect(0, 0, 512, 512);
    (function () { var im = new Image(); im.crossOrigin = "anonymous"; im.onload = function () { var sc = Math.max(512 / im.naturalWidth, 512 / im.naturalHeight), sw2 = 512 / sc, sh2 = 512 / sc; ptx.drawImage(im, (im.naturalWidth - sw2) / 2, (im.naturalHeight - sh2) * 0.3, sw2, sh2, 0, 0, 512, 512); ptex.needsUpdate = true; }; im.src = DGN_M + "team/photo-1.webp"; })();
    DJ.crewD = function (cc) { ptx.drawImage(cc, 0, (cc.height - cc.width) * 0.3, cc.width, cc.width, 0, 0, 512, 512); ptex.needsUpdate = true; };
    function setPhoto(on2) { if (on2 === photoOn) return; photoOn = on2; dmat.map = on2 ? ptex : null; dmat.color.set(on2 ? 0xffe2f0 : 0xb00c66); dmat.needsUpdate = true; }
    var dgrp = new THREE.Group(), dmesh = new THREE.Mesh(dgeo, dmat); dgrp.add(dmesh); dsc.add(dgrp);
    var dBalls = new THREE.Group(); dBalls.visible = false; dgrp.add(dBalls);
    (function () {
      var bp = [], tries = 0;
      while (bp.length < 46 && tries++ < 4000) { var qx = Math.random() * 0.93, qy = Math.random(), qin = dInside(qx, qy, DOUT) && dEdge(qx, qy) > 0.03, qho = false; if (!qin || qho) continue;
        var p = new THREE.Vector3(qx - dof.x, qy - dof.y, (Math.random() - 0.5) * 0.12); if (bp.some(function (o) { return o.p.distanceTo(p) < 0.07; })) continue; bp.push({ p: p, s: 0.026 + Math.random() * 0.03 }); }
      var o3d = new THREE.Object3D(), up = new THREE.Vector3(0, 1, 0), dv2 = new THREE.Vector3(), lk = [];
      bp.forEach(function (a, i) { var ds = []; bp.forEach(function (b, j) { if (j !== i) ds.push([a.p.distanceTo(b.p), j]); }); ds.sort(function (x, y) { return x[0] - y[0]; }); ds.slice(0, 2).forEach(function (dj) { var bj = dj[1]; if (dj[0] < 0.22 && !lk.some(function (l) { return (l[0] === bj && l[1] === i) || (l[0] === i && l[1] === bj); })) lk.push([i, bj]); }); });
      var rm2 = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.0035, 0.0035, 1, 6, 1), new THREE.MeshStandardMaterial({ color: 0xd8957a, metalness: 1, roughness: 0.25, emissive: 0x3a1408, emissiveIntensity: 0.6 }), Math.max(1, lk.length));
      lk.forEach(function (l, i) { var a = bp[l[0]].p, b = bp[l[1]].p; dv2.subVectors(b, a); var L = dv2.length(); o3d.position.addVectors(a, b).multiplyScalar(0.5); o3d.quaternion.setFromUnitVectors(up, dv2.normalize()); o3d.scale.set(1, L, 1); o3d.updateMatrix(); rm2.setMatrixAt(i, o3d.matrix); });
      rm2.count = lk.length; dBalls.add(rm2);
      var PN3 = lk.length * 2, pa3 = new Float32Array(PN3 * 3), pb3 = new Float32Array(PN3 * 3), ps3 = new Float32Array(PN3);
      lk.forEach(function (l, i) { for (var r = 0; r < 2; r++) { var a = bp[l[r ? 1 : 0]].p, b = bp[l[r ? 0 : 1]].p, q = i * 2 + r; pa3.set([a.x, a.y, a.z], q * 3); pb3.set([b.x, b.y, b.z], q * 3); ps3[q] = Math.random(); } });
      var pg3 = new THREE.InstancedBufferGeometry(); pg3.copy(new THREE.IcosahedronGeometry(1, 1)); pg3.setAttribute("aA", new THREE.InstancedBufferAttribute(pa3, 3)); pg3.setAttribute("aB2", new THREE.InstancedBufferAttribute(pb3, 3)); pg3.setAttribute("aS", new THREE.InstancedBufferAttribute(ps3, 1)); pg3.instanceCount = PN3;
      var dPulse = new THREE.Mesh(pg3, new THREE.ShaderMaterial({ uniforms: { uT: DUf.uT }, vertexShader: "attribute vec3 aA; attribute vec3 aB2; attribute float aS; uniform float uT; varying float vK;\nvoid main(){ float ph = fract(uT * (0.5 + aS * 0.6) + aS * 13.0); vec3 c = mix(aA, aB2, ph); vK = sin(ph * 3.14159);\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(c + position * 0.011 * (0.5 + 0.5 * vK), 1.0); }", fragmentShader: "varying float vK;\nvoid main(){ gl_FragColor = vec4(vec3(1.0, 0.62, 0.86) * (0.7 + 1.4 * vK), 1.0); }" }));
      dPulse.frustumCulled = false; dBalls.add(dPulse);
      var dGl = new THREE.PointLight(0xff5fb0, 1.6, 1.6); dGl.position.set(0, 0, 0.2); dBalls.add(dGl);
      orbGet(function () { var dbm = ORB.m.clone(); dbm.emissiveIntensity = 0.85; var im = new THREE.InstancedMesh(ORB.g, dbm, bp.length); bp.forEach(function (b, i) { o3d.position.copy(b.p); o3d.quaternion.identity(); o3d.rotation.set(Math.random() * 6.28, Math.random() * 6.28, 0); o3d.scale.setScalar(b.s); o3d.updateMatrix(); im.setMatrixAt(i, o3d.matrix); }); dBalls.add(im); });
    })();
    var LC = null, PN2 = 900, pph = new Float32Array(PN2 * 3), ppd = new Float32Array(PN2 * 3), pps = new Float32Array(PN2), pgeo = new THREE.BufferGeometry();
    for (var pi2 = 0; pi2 < PN2;) { var qx = Math.random() * 0.93, qy = Math.random(), qin = dInside(qx, qy, DOUT), qho = false; if (!qin || qho) continue;
      var hx = qx - dof.x, hy = qy - dof.y, hz = (Math.random() - 0.5) * 0.06, hl = Math.sqrt(hx * hx + hy * hy) + 0.05, pm = 2.5 + Math.random() * 4.5; pph.set([hx, hy, hz], pi2 * 3); ppd.set([hx / hl * pm + (Math.random() - 0.5) * 2.5, hy / hl * pm + (Math.random() - 0.5) * 2.5, (Math.random() - 0.3) * 4], pi2 * 3); pps[pi2] = Math.random(); pi2++; }
    pgeo.setAttribute("position", new THREE.BufferAttribute(pph, 3)); pgeo.setAttribute("aD", new THREE.BufferAttribute(ppd, 3)); pgeo.setAttribute("aS", new THREE.BufferAttribute(pps, 1));
    var PBU = { uV: { value: 0 }, uPu: { value: 0 }, uB: { value: 0 }, uK: { value: 1 }, uW: { value: 0 }, uT: { value: 0 }, uPR: { value: 1 } }, dpart = new THREE.Points(pgeo, new THREE.ShaderMaterial({ uniforms: PBU, vertexShader: "attribute vec3 aD; attribute float aS; uniform float uV; uniform float uPu; uniform float uB; uniform float uK; uniform float uW; uniform float uT; uniform float uPR; varying vec3 vC; varying float vA;\nvoid main(){ float b = clamp(uB * 1.25 - aS * 0.25, 0.0, 1.0); float an = b * (2.0 + aS * 3.0); float cs = cos(an); float sn = sin(an);\n  vec3 p = position + aD * b * uK; p.xy = mat2(cs, -sn, sn, cs) * p.xy * mix(1.0, 0.85, b);\n  if (uV > 0.5) { float vr = (length(aD.xy) * 1.1 + 0.6) * b; float vth = atan(aD.y, aD.x) * 0.35 + floor(aS * 4.0) * 1.5708 + b * b * (11.0 + aS * 6.0) + vr * 2.2; p = position * (1.0 - b) + vec3(cos(vth) * vr, sin(vth) * vr, -b * 1.2 + aD.z * b * 0.15); }\n  p += vec3(sin(uT * 2.0 + aS * 40.0), cos(uT * 1.7 + aS * 30.0), 0.0) * 0.012 * (1.0 - b);\n  vC = mix(mix(vec3(1.0, 0.16, 0.6), vec3(1.0, 0.93, 0.95), aS * 0.6 + b * 0.3), vec3(0.965, 0.937, 0.914), uW); vA = (0.75 + 0.25 * sin(uT * 3.0 + aS * 50.0)) * (1.0 + uPu * 2.5);\n  vec4 mv = modelViewMatrix * vec4(p, 1.0); gl_PointSize = uPR * (2.2 + aS * 2.2) * (1.0 + b * (1.6 + uV * 1.4)); gl_Position = projectionMatrix * mv; }", fragmentShader: "varying vec3 vC; varying float vA;\nvoid main(){ float r = length(gl_PointCoord - 0.5) * 2.0; if (r > 1.0) discard; float a = (exp(-r * r * 5.0) + exp(-r * r * 40.0) * 0.6) * vA; gl_FragColor = vec4(vC * a * 1.5, min(1.0, a)); }", transparent: true, depthWrite: false, depthTest: false, blending: THREE.CustomBlending, blendSrc: THREE.OneFactor, blendDst: THREE.OneMinusSrcAlphaFactor, blendSrcAlpha: THREE.OneFactor, blendDstAlpha: THREE.OneMinusSrcAlphaFactor }));
    dpart.frustumCulled = false; dpart.visible = false; dgrp.add(dpart); dmat.emissive = new THREE.Color(0xff3fa0); dmat.emissiveIntensity = 0;
    var NEU = { uP: { value: 0 }, uAl: { value: 1 } }, NEF = "uniform float uP; uniform float uAl; uniform float uW; varying vec2 vUv;\nvoid main(){ if (vUv.x > uP) discard; float hd = exp(-(uP - vUv.x) * 28.0); vec3 nc = mix(vec3(1.0, 0.22, 0.64), vec3(1.0, 0.86, 0.94), step(0.9, uW) * 0.75); gl_FragColor = vec4(nc * (1.2 + 2.6 * hd * (1.0 - step(1.0, uP))) * uAl * uW, 1.0); }";
    function nloopPts(a) { return a.map(function (pt) { return new THREE.Vector3(pt[0] - dof.x, pt[1] - dof.y, dzf + 0.01); }); }
    var OUT = DOO;
    var neon = new THREE.Group(); dgrp.add(neon);
    var gcv = document.createElement("canvas"); gcv.width = gcv.height = 128; var gcx = gcv.getContext("2d"), ggr = gcx.createRadialGradient(64, 64, 0, 64, 64, 64); ggr.addColorStop(0, "rgba(255,255,255,1)"); ggr.addColorStop(0.18, "rgba(255,190,225,0.9)"); ggr.addColorStop(0.45, "rgba(255,60,160,0.35)"); ggr.addColorStop(1, "rgba(255,40,150,0)"); gcx.fillStyle = ggr; gcx.fillRect(0, 0, 128, 128);
    var dglow = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(gcv), transparent: true, opacity: 0, depthTest: false, depthWrite: false, blending: THREE.AdditiveBlending })); dglow.renderOrder = 9; dglow.visible = false; dgrp.add(dglow);
    [OUT, DHH].forEach(function (pl) { var cv2 = new THREE.CatmullRomCurve3(nloopPts(pl), true, "catmullrom", 0.0); [[0.016, 1], [0.065, 0.42]].forEach(function (rw) { var nm = new THREE.Mesh(new THREE.TubeGeometry(cv2, 240, rw[0], 6, true), new THREE.ShaderMaterial({ uniforms: Object.assign({ uW: { value: rw[1] } }, NEU), vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }", fragmentShader: NEF, transparent: true, depthTest: false, depthWrite: false, blending: THREE.AdditiveBlending })); nm.renderOrder = 5; neon.add(nm); }); });
    var iaDone = false, iaT = -1, HI = { v: 0 }, E0 = 0.4; if (G && window.ScrollTrigger) gsap.to(HI, { v: 1, ease: "none", scrollTrigger: { trigger: q(".dgn-intro") || root, start: "top top", end: function () { return "+=" + Math.round(window.innerHeight * E0); }, scrub: 0.8 } }); else HI.v = 1;
    var HV = 10 * Math.tan(15 * Math.PI / 180), DH = 1.09, J = -1, mxo = 0, myo = 0, tmo = 0, tmy = 0, landed = false, sqk = 0, wasOn = true, dt0 = performance.now(), lastT = 0;
    if (DJ.dS) { var dmI = dmat.clone(); dmI.onBeforeCompile = dmat.onBeforeCompile; dmI.transparent = false; dmI.opacity = 1; dmI.envMap = DJ.dEnv || null; dmI.envMapIntensity = 0.9; var dIn = new THREE.Mesh(dgeo, dmI); dIn.visible = false; dIn.frustumCulled = false; DJ.dS.add(dIn); DJ.dIn = { m: dIn, mat: dmI, k: 1.0 / DH }; }
    var crewLt = q(".dgn-crew__light"), word = q(".dgn-crew__stage"), slot = q(".dgn-dslot"), bl = q(".dgn-dslot i"), svxEl = q(".dgn-crew"), svCan = null;
    if (word && word.classList.contains("dgn-crew__word")) { var wn = []; Array.prototype.slice.call(word.childNodes).forEach(function (n) { if (n.nodeType === 3) { n.textContent.split("").forEach(function (ch, i) { var s = document.createElement("span"); s.className = "dgn-wl"; s.textContent = ch; s.style.setProperty("--i", i); wn.push(s); }); } else wn.push(n); }); word.textContent = ""; wn.forEach(function (n) { word.appendChild(n); }); }
    root.classList.add("dgn-d3"); if (svxEl) svxEl.classList.add("dgn-ov");
    var blk = document.createElement("div"), blkO = -1; blk.className = "dgn-blk"; blk.setAttribute("aria-hidden", "true"); root.appendChild(blk);
    var intro = q(".dgn-intro");
    if (intro && G) { root.classList.add("dgn-ipin"); ScrollTrigger.create({ trigger: intro, start: "top top", end: function () { return "+=" + window.innerHeight; }, pin: true, pinSpacing: false }); if (svxEl) { DJ.teamLen = function () { return Math.round(window.innerHeight * 2.4); }; DJ.svxST = ScrollTrigger.create({ trigger: svxEl, start: "top top", end: function () { return "+=" + Math.round(window.innerHeight * 1.7); }, pin: true }); } ScrollTrigger.refresh(); }
    function cl(x) { return Math.max(0, Math.min(1, x)); }
    function es(x) { x = cl(x); return x * x * (3 - 2 * x); }
    function lp(a, b, k) { return a + (b - a) * k; }
    function mixP(a, b, k) { return { x: lp(a.x, b.x, k), y: lp(a.y, b.y, k), h: lp(a.h, b.h, k), rx: lp(a.rx, b.rx, k), ry: lp(a.ry, b.ry, k), rz: lp(a.rz, b.rz, k) }; }
    function slotP() {
      if (!slot || !bl) return { x: 0, y: -0.6, h: 0.2, rx: 0, ry: 0, rz: 0 };
      var r = slot.getBoundingClientRect(), b = bl.getBoundingClientRect(), fs = parseFloat(getComputedStyle(slot).fontSize) || 100, W = window.innerWidth, Hh = window.innerHeight, cap = fs * 0.72;
      return { x: (r.left + r.width / 2) / W * 2 - 1, y: 1 - (b.bottom - cap / 2) / Hh * 2, h: cap / Hh, rx: 0, ry: 0, rz: 0 };
    }
    function jt() {
      var y = window.scrollY, ss = spST; if (!ss) return 0;
      var vh = window.innerHeight;
      if (y < ss.start + vh) return cl((y - ss.start) / vh);
      if (y <= ss.end) return 1 + (y - ss.start - vh) / Math.max(1, ss.end - ss.start - vh);
      var ts = DJ.tunST, vs = DJ.svxST;
      if (ts) { if (y < ts.start) return 2; if (y <= ts.end) return 2 + (y - ts.start) / Math.max(1, ts.end - ts.start); }
      if (vs) { if (y < vs.start) return 3; if (y <= vs.end) return 3 + Math.min(1, (y - vs.start) / Math.max(1, DJ.teamLen ? DJ.teamLen() : vs.end - vs.start)); return 4 + (y - vs.end) / window.innerHeight; }
      return 3;
    }
    function pose(j, t) {
      var hs = { x: -0.66 + 0.04 * Math.sin(t * 0.7), y: -0.02 + 0.05 * Math.sin(t * 0.9), h: 0.24, rx: 0.12 + 0.1 * Math.sin(t * 0.6), ry: 0.6, rz: -0.1 };
      if (j < 1) {
        j = Math.max(0, (j - E0) / (1 - E0));
        var idle = { x: 0.44, y: 0.02 + 0.02 * Math.sin(t * 0.8), h: 0.58, rx: 0.12 + myo * 0.25, ry: -0.45 + Math.sin(t * 0.5) * 0.22 + mxo * 0.5, rz: 0.08 };
        var front = { x: 0, y: 0, h: 0.95, rx: 0, ry: 0, rz: 0 };
        if (j < 0.45) return mixP(idle, front, es(j / 0.45));
        var kp = (j - 0.45) / 0.55; front.h = 0.95 * Math.pow(7.5, kp * kp); return front;
      }
      if (j < 2) {
        var pos = (j - 1) * 14, ryB = 0.6 + Math.PI * 2 + Math.min(pos, 10) * 0.9;
        var fl = DJ.ov ? { x: DJ.ox, y: DJ.oy, h: DJ.oh * es(pos / 1.1), rx: DJ.orx || 0, ry: DJ.ory || 0, rz: DJ.orz || 0 } : { x: hs.x, y: hs.y + 0.05 * Math.sin(pos * 0.5), h: hs.h * es(pos / 1.1), rx: hs.rx, ry: ryB - (1 - es(pos / 1.1)) * 2.5, rz: hs.rz };
        if (pos < 10) return fl;
        if (DJ.lv) LC = { x: DJ.lx, y: DJ.ly, h: DJ.lh }; else if (pos < 10) LC = null;
        var L = LC ? { x: LC.x, y: LC.y, h: LC.h, rx: 0, ry: DJ.ov ? 0 : Math.round(ryB / 6.2832) * 6.2832, rz: 0 } : { x: -0.25, y: 0.03, h: 0.08, rx: 0, ry: Math.round(ryB / 6.2832) * 6.2832, rz: 0 };
        if (pos < 12.3) return mixP(fl, L, es((pos - 10) / 1.2));
        if (pos < 13.6) return L;
        var k = es((pos - 13.6) / 0.4), fd = { x: 0, y: -0.05, h: 0.05, rx: L.rx + 3.2, ry: L.ry + 1.2, rz: 2.0 };
        return mixP(L, fd, k);
      }
      if (j < 3) {
        var tp2 = j - 2, orr = es(tp2 / 0.08) * (1 - es((tp2 - 0.8) / 0.08)), oa = t * 1.3 + tp2 * 14, ow = Math.min(0.66, 0.42 * 1.6 / dcam.aspect + 0.2), od = 0.5 + 0.5 * Math.sin(oa);
        var td = { x: Math.cos(oa) * ow * orr, y: -0.02 + Math.sin(oa) * 0.5 * orr * 0.9 - (1 - orr) * 0.03, h: 0.05 + (0.035 + 0.05 * od) * orr, rx: 3.2 + t * 1.4, ry: 1.2 + t * 0.9 + oa * 0.5, rz: 2.0 + t * 0.6 };
        if (tp2 > 0.86) { var kk = es((tp2 - 0.86) / 0.07), kr = cl((tp2 - 0.93) / 0.07); td.x = lp(td.x, 0, kk); td.y = lp(td.y, 0.02, kk); td.h = lp(td.h, 0.022, kk) + kr * kr * 0.9; td.rx = lp(td.rx, 0, kk); td.ry = lp(td.ry, 0, kk); td.rz = lp(td.rz, 0, kk); }
        return td;
      }
      var GE = DJ.gEntry, T = GE ? { x: GE.x, y: GE.y, h: GE.h, rx: 0, ry: 0, rz: 0 } : slotP();
      if (j < 3.45) {
        var F0 = { x: T.x + 0.04, y: 1.45, h: T.h * 1.5, rx: 0.5, ry: Math.PI * 2, rz: 0.25 }, kf = cl((j - 3.03) / 0.42);
        return mixP(F0, T, kf * kf);
      }
      return T;
    }
    function hit() {
      sqk = 1; flipK = 1; jelT = lastT; if (DJ.crewHit) DJ.crewHit();
      [svCan, word, dcv].forEach(function (el) { if (!el) return; el.classList.remove("dgn-shake"); void el.offsetWidth; el.classList.add("dgn-shake"); });
      if (word && !word.classList.contains("hit")) word.classList.add("hit");
      var wd = slot && slot.parentNode && slot.closest(".dgn-crew__word, .dgn-gs__word");
      if (wd) { var wr = wd.getBoundingClientRect(), sr = slot.getBoundingClientRect(), fsz = parseFloat(getComputedStyle(wd).fontSize) || 100, bx = document.createElement("span"); bx.className = "dgn-spks"; bx.style.left = (sr.left + sr.width / 2 - wr.left) + "px"; bx.style.top = (sr.top + sr.height * 0.55 - wr.top) + "px"; bx.style.fontSize = fsz + "px";
        for (var si = 0; si < 16; si++) { var sp = document.createElement("i"); sp.style.setProperty("--a", (si / 16 * 360 + Math.random() * 18) + "deg"); sp.style.setProperty("--d", (0.45 + Math.random() * 0.7).toFixed(2) + "em"); sp.style.animationDelay = (Math.random() * 0.08).toFixed(2) + "s"; bx.appendChild(sp); }
        wd.appendChild(bx); setTimeout(function () { if (bx.parentNode) bx.parentNode.removeChild(bx); }, 1200); }
    }
    function dsize() { var w = window.innerWidth, h = window.innerHeight; dr.setSize(w, h, false); dcam.aspect = w / Math.max(1, h); dcam.updateProjectionMatrix(); }
    dsize(); window.addEventListener("resize", dsize);
    window.addEventListener("pointermove", function (e) { tmo = e.clientX / window.innerWidth * 2 - 1; tmy = e.clientY / window.innerHeight * 2 - 1; }, { passive: true });
    var nT0 = -1, jelT = -1;
    var trail = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.ShaderMaterial({ uniforms: { uA: { value: 0 } }, transparent: true, depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending, vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }", fragmentShader: "uniform float uA; varying vec2 vUv;\nvoid main(){ float x = abs(vUv.x - 0.5) * 2.0; float a = uA * pow(1.0 - vUv.y, 2.0) * pow(1.0 - x * x, 3.0); gl_FragColor = vec4(mix(vec3(0.85, 0.8, 0.9), vec3(1.0), (1.0 - vUv.y) * (1.0 - x)), a * 0.7); }" })); trail.renderOrder = -1; trail.visible = false; dsc.add(trail);
    function dframe(t) {
      var jt2 = jt(); J = J < 0 ? jt2 : J + (jt2 - J) * 0.12; if (Math.abs(jt2 - J) > 1.5) J = jt2;
      mxo += (tmo - mxo) * 0.05; myo += (tmy - myo) * 0.05;
      if (!landed && J >= 3.45 && J < 4.5) { landed = true; hit(); } else if (landed && J < 3.4) { landed = false; flipK = 0; jelT = -1; setPhoto(false); if (word) word.classList.remove("hit"); }
      iaDone = HI.v >= 0.999; if (iaT < 0) iaT = t;
      var bTs = DJ.tunST, bVs = DJ.svxST, bY = window.scrollY, bo = 0;
      if (bTs && bVs) bo = bY < bVs.start - 1 ? es(((bY - bTs.start) / Math.max(1, bTs.end - bTs.start) - 0.8) / 0.17) : 1 - es((bY - bVs.start) / (window.innerHeight * 0.16));
      if (Math.abs(bo - blkO) > 0.002) { blkO = bo; blk.style.opacity = bo.toFixed(3); blk.style.visibility = bo > 0.002 ? "visible" : "hidden"; }
      if (svxEl && bTs) svxEl.classList.toggle("dgn-cshow", bY >= bTs.end - 1);
      var p = pose(J, t), dtt = Math.max(0, Math.min(0.1, t - lastT)); lastT = t; sqk = Math.max(0, sqk - dtt * 3.2);
      var on = J < 2.99 || J > 3.02; on = on && (J < 1 ? p.h < 6.5 : p.h < 1.25) && p.h > 0.004 && p.y > -1.6 && p.y < 1.8 && !(landed && jelT >= 0 && t - jelT > 0.3);
      dgrp.visible = on; if (!on) trail.visible = false;
      if (on) {
        var jd = t - jelT, s = p.h * 2 * HV / DH, sq = J >= 3.03 && J < 3.45 ? 1 + 0.42 * Math.pow(cl((J - 3.03) / 0.42), 2) : landed && jelT >= 0 && jd < 1.8 ? 1 - 0.3 * Math.sin(jd * 19) * Math.exp(-jd * 3.4) : 1 - 0.22 * Math.sin(sqk * Math.PI) * sqk;
        var ia = HI.v * 3.3, st2 = 1;
        if (!iaDone) {
          var dp2 = cl(ia / 1.5), fi = cl((ia - 1.5) / 0.9); st2 = es((ia - 2.2) / 0.9);
          NEU.uP.value = dp2 * 1.002; NEU.uAl.value = 1 - cl((ia - 2.1) / 0.5); neon.visible = NEU.uAl.value > 0.001 && NEU.uP.value > 0.01;
          dmesh.visible = ia >= 1.5; DUf.uFill.value = es(fi); s *= 1 + 0.05 * Math.sin(cl((ia - 2.3) / 0.4) * Math.PI);
          p.rx *= st2; p.ry *= st2; p.rz *= st2;
          
        } else if (J >= 2.99 && J < 3.45) {
          neon.visible = false; dmesh.visible = true; DUf.uFill.value = 1;
        } else if (neon.visible || !dmesh.visible || DUf.uFill.value < 1) { neon.visible = false; dmesh.visible = true; DUf.uFill.value = 1; }
        DUf.uCirc.value = J >= 0.97 && J < 2 ? es((J - 0.97) / 0.05) * (1 - es(((J - 1) * 14 - 10) / 0.4)) : J >= 2.86 && J < 3 ? es((J - 2.86) / 0.06) : 0;
        var gk = J >= 2.86 && J < 3 ? es((J - 2.86) / 0.06) : J >= 3 && J < 3.08 ? 1 - es((J - 3) / 0.08) : 0, emi = Math.max(gk * 3.5, flipK * 1.4);
        var sfd = ((DJ.stK || 0) - 0.62) / 0.11, sf = J >= 3.45 && (DJ.stK || 0) > 0 ? Math.exp(-sfd * sfd) : 0; dmat.emissiveIntensity = Math.max(emi, sf * 2.5); dglow.visible = gk > 0.01 || flipK > 0.01 || sf > 0.01; dglow.material.opacity = Math.max(gk, flipK * 0.75, sf); dglow.scale.setScalar(sf > Math.max(gk, flipK) ? 4.5 : gk > flipK ? 5 : 2.6 + (1 - flipK) * 1.4);
        DUf.uT.value = t; DUf.uInk.value = J < 1 ? 1 : 0; DUf.uWob.value = 1 - es(Math.max(0, J - E0) / 0.4);
        var mdx = (mxo - p.x), mdy = (-myo - p.y), mdd = Math.sqrt(mdx * mdx + mdy * mdy), mk = J < E0 + 0.4 ? Math.max(0, 1 - mdd / 0.9) : 0; DUf.uMd.value.set(mdx, mdy, 0.25).normalize().multiplyScalar(mk);
        if (J >= 1 && J < 1.09) { if (sweepF !== 1) { sweepF = 1; sweepT = t; } } else if (J < 1) sweepF = 0;
        if (flipK > 0) { flipK = Math.max(0, flipK - dtt / 0.6); p.x += (Math.random() - 0.5) * 0.008 * flipK; p.y += (Math.random() - 0.5) * 0.008 * flipK; if (sweepF !== 2) { sweepF = 2; sweepT = t; } } if (photoOn) setPhoto(false);
        var hpos = (J - 1) * 14; DUf.uCry.value = 0; DUf.uChr.value = 0; DUf.uHolo.value = 0; dBalls.visible = false;
        if (DUf.uHolo.value > 0) { DUf.uHs.value = hpos * 0.35 + t * 0.04; DUf.uHb.value += (Math.round(kv(KF.Focus.card, Math.max(0, Math.min(14, hpos)))) * 0.33 - DUf.uHb.value) * 0.05; }
        if (J >= 1.778 && J < 1.82 && sweepF !== 4) { sweepF = 4; sweepT = t; }
        var bpos = (J - 1) * 14, pOn = J > 1.7 && J < 2 && bpos >= 10 && bpos < 13.6; dpart.visible = pOn;
        if (pOn) { var bb = bpos < 10.5 ? es((bpos - 10) / 0.5) : bpos < 11.2 ? 1 - es((bpos - 10.5) / 0.7) : bpos < 12.3 ? 0 : bpos < 12.8 ? es((bpos - 12.3) / 0.5) : 1 - es((bpos - 12.8) / 0.8); PBU.uB.value = bb; PBU.uK.value = bpos < 11.2 ? 0.55 : 1; PBU.uW.value = bpos < 12.8 ? es((bpos - 10.3) / 0.8) : 1 - es((bpos - 12.8) / 0.35); PBU.uT.value = t; PBU.uV.value = bpos >= 12.8 ? 1 : 0; var pud = (bpos - 13.55) / 0.06; PBU.uPu.value = Math.exp(-pud * pud); PBU.uPR.value = Math.min(DPR, 1.5) * window.innerHeight / 900; }
        if (iaDone) dmesh.visible = !pOn;
       if (bpos >= 13.6 && J < 2 && sweepF !== 5) { sweepF = 5; sweepT = t; }
        dmat.opacity = J >= 1 && J < 1.72 ? 1 - 0.7 * (DJ.ob || 0) : landed && jelT >= 0 ? 1 - es(cl((t - jelT - 0.06) / 0.14)) : 1;
        DUf.uSweep.value = sweepT >= 0 && t - sweepT < 0.9 ? -0.9 + (t - sweepT) / 0.9 * 2.0 : -9;
        dgrp.position.set(p.x * HV * dcam.aspect, p.y * HV - (1 - sq) * p.h * HV, 0); dgrp.scale.set(s * (2 - sq), s * sq, s); dgrp.rotation.set(p.rx, p.ry, p.rz); if (DJ.dIn) { DJ.dIn.mat.emissiveIntensity = dmat.emissiveIntensity; if (J >= 1 && J < 2 && bpos < 10) dgrp.visible = false; }
        var tA = J >= 3.03 && J < 3.45 ? Math.sin(cl((J - 3.03) / 0.42) * Math.PI * 0.92) : 0; trail.visible = tA > 0.01; if (trail.visible) { var tl = s * (1.2 + 4.0 * tA); trail.position.set(dgrp.position.x, dgrp.position.y + tl / 2 + s * 0.15, -0.3); trail.scale.set(s * 0.55, tl, 1); trail.material.uniforms.uA.value = tA * 0.85; }
      }
      if (intro) {
        if (J > E0 + 0.45 * (1 - E0) && J < 0.995 && on) {
          dgrp.updateMatrixWorld(true); var ir = intro.getBoundingClientRect(), W = window.innerWidth, Hh = window.innerHeight, ph = "M" + (-ir.left) + " " + (-ir.top) + "H" + (W - ir.left) + "V" + (Hh - ir.top) + "H" + (-ir.left) + "Z";
          HOLE.forEach(function (hp, hi) { dpv.set(hp[0] - dof.x, hp[1] - dof.y, dzf).applyMatrix4(dgrp.matrixWorld).project(dcam); ph += (hi ? "L" : "M") + ((dpv.x + 1) / 2 * W - ir.left).toFixed(1) + " " + ((1 - dpv.y) / 2 * Hh - ir.top).toFixed(1); });
          intro.style.clipPath = "path(evenodd, \"" + ph + "Z\")"; intro.style.visibility = "";
        } else { intro.style.clipPath = ""; intro.style.visibility = J > E0 + 0.45 * (1 - E0) ? "hidden" : ""; }
      }
      if (on || wasOn) dr.render(dsc, dcam);
      wasOn = on;
    }
    window.__df = dframe;
    (function dloop(now) { try { dframe((now - dt0) / 1000); } catch (e) { dbg(e); return; } requestAnimationFrame(dloop); })(performance.now());
  })(); } catch (e) { dbg(e); }

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
})();
}
var dgnLibs = [[DGN_V + "three/build/three.min.js", function () { return !!(window.THREE); }], [DGN_V + "three/examples/js/environments/RoomEnvironment.js", function () { return !!(window.THREE && THREE.RoomEnvironment); }], [DGN_V + "three/examples/js/shaders/CopyShader.js", function () { return !!(window.THREE && THREE.CopyShader); }], [DGN_V + "three/examples/js/shaders/LuminosityHighPassShader.js", function () { return !!(window.THREE && THREE.LuminosityHighPassShader); }], [DGN_V + "three/examples/js/postprocessing/Pass.js", function () { return !!(window.THREE && THREE.Pass); }], [DGN_V + "three/examples/js/postprocessing/EffectComposer.js", function () { return !!(window.THREE && THREE.EffectComposer); }], [DGN_V + "three/examples/js/postprocessing/RenderPass.js", function () { return !!(window.THREE && THREE.RenderPass); }], [DGN_V + "three/examples/js/postprocessing/ShaderPass.js", function () { return !!(window.THREE && THREE.ShaderPass); }], [DGN_V + "three/examples/js/postprocessing/UnrealBloomPass.js", function () { return !!(window.THREE && THREE.UnrealBloomPass); }], [DGN_V + "gsap/gsap.min.js", function () { return !!(window.gsap); }], [DGN_V + "gsap/ScrollTrigger.min.js", function () { return !!(window.ScrollTrigger); }], [DGN_V + "gsap/ScrambleTextPlugin.min.js", function () { return !!(window.ScrambleTextPlugin); }]];
(function dgnLoad(i) {
  if (i >= dgnLibs.length) { dgnMain(); return; }
  if (dgnLibs[i][1]()) { dgnLoad(i + 1); return; }
  var s = document.createElement("script"); s.src = dgnLibs[i][0]; s.async = false;
  s.setAttribute("data-no-optimize", "1"); s.setAttribute("data-cfasync", "false"); s.setAttribute("nowprocket", "");
  s.onload = function () { dgnLoad(i + 1); };
  s.onerror = function () { (window.__dgnErr = window.__dgnErr || []).push("load failed " + dgnLibs[i][0]); dgnLoad(i + 1); };
  document.head.appendChild(s);
})(0);
