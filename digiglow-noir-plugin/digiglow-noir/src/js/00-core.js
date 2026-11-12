/* ===== Core: page setup, shared helpers (q, qa, seen), device flags, floating orbs, video autoplay, split headlines ===== */
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

