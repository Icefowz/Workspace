/* ===== Hero: office photo flashlight reveal (WebGL), team labels ===== */
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
